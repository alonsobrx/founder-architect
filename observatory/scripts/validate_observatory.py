#!/usr/bin/env python3
"""Standard-library validation for the observatory's data, formulas, and HTML."""
from __future__ import annotations

import csv
import json
import math
import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    raise AssertionError(message)


def close(actual: float, expected: float, tolerance: float = 1e-8) -> None:
    if not math.isclose(actual, expected, rel_tol=tolerance, abs_tol=tolerance):
        fail(f"Expected {expected!r}; received {actual!r}")


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.duplicate_ids: list[str] = []
        self.fragment_links: list[str] = []
        self.local_links: list[str] = []
        self.h1_count = 0
        self.main_count = 0
        self.lang: str | None = None
        self.input_ids: set[str] = set()
        self.label_fors: set[str] = set()
        self.implicit_label_depth = 0
        self.unlabelled_implicit_controls: list[str] = []
        self.external_scripts: list[str] = []
        self.external_styles: list[str] = []
        self._stack: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        self._stack.append(tag)
        if tag == "html":
            self.lang = values.get("lang")
        if tag == "h1":
            self.h1_count += 1
        if tag == "main":
            self.main_count += 1
        element_id = values.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicate_ids.append(element_id)
            self.ids.add(element_id)
        if tag == "label":
            self.implicit_label_depth += 1
            if values.get("for"):
                self.label_fors.add(values["for"] or "")
        if tag in {"input", "select", "textarea"}:
            if element_id:
                self.input_ids.add(element_id)
            if self.implicit_label_depth == 0 and not values.get("aria-label") and not values.get("aria-labelledby"):
                self.unlabelled_implicit_controls.append(element_id or tag)
        if tag == "a" and values.get("href"):
            href = values["href"] or ""
            if href.startswith("#") and len(href) > 1:
                self.fragment_links.append(href[1:])
            elif not href.startswith(("http://", "https://", "mailto:", "tel:", "javascript:")):
                self.local_links.append(href)
        if tag == "script" and values.get("src", "").startswith(("http://", "https://")):
            self.external_scripts.append(values.get("src") or "")
        if tag == "link" and values.get("rel") == "stylesheet" and values.get("href", "").startswith(("http://", "https://")):
            self.external_styles.append(values.get("href") or "")

    def handle_endtag(self, tag: str) -> None:
        if tag == "label":
            self.implicit_label_depth = max(0, self.implicit_label_depth - 1)
        if self._stack:
            self._stack.pop()


def validate_data() -> None:
    metrics = json.loads((ROOT / "data/metrics.json").read_text(encoding="utf-8"))
    sources = json.loads((ROOT / "data/sources.json").read_text(encoding="utf-8"))
    assumptions = json.loads((ROOT / "data/model-assumptions.json").read_text(encoding="utf-8"))
    ai = json.loads((ROOT / "data/va-ai-vba-use-cases.json").read_text(encoding="utf-8"))

    official = metrics["official"]
    calculated = metrics["calculated"]

    total_receipts = official["fy2027_rating_receipts"] + official["fy2027_nonrating_receipts"]
    total_production = official["fy2027_rating_production"] + official["fy2027_nonrating_production"]
    total_inventory = official["fy2027_rating_year_end_inventory"] + official["fy2027_nonrating_year_end_inventory"]
    assert calculated["fy2027_total_receipts"] == total_receipts
    assert calculated["fy2027_total_production"] == total_production
    assert calculated["fy2027_total_year_end_inventory"] == total_inventory
    assert calculated["fy2027_production_margin"] == total_production - total_receipts
    close(calculated["fy2027_production_margin_percent_of_receipts"], (total_production - total_receipts) / total_receipts * 100)
    close(calculated["fy2027_planned_utilization_percent"], total_receipts / total_production * 100)
    assert calculated["five_percent_receipt_surge_shortfall"] == ((total_receipts * 105 + 99) // 100) - total_production
    assert calculated["ten_percent_receipt_surge_shortfall"] == ((total_receipts * 110 + 99) // 100) - total_production

    close(calculated["compensation_recipient_share_percent"], official["compensation_recipients_fy2025"] / official["living_veterans_fy2025"] * 100)
    close(calculated["veterans_100_percent_share_all_veterans_percent"], official["veterans_100_percent_fy2025"] / official["living_veterans_fy2025"] * 100)
    close(calculated["veterans_100_percent_share_recipients_percent"], official["veterans_100_percent_fy2025"] / official["compensation_recipients_fy2025"] * 100)

    board_output = official["fy2025_board_decisions"] / official["fy2025_board_fte"]
    close(calculated["fy2025_board_decisions_per_fte"], board_output)
    assert calculated["board_fte_keep_pace_ceiling"] == math.ceil(official["fy2027_board_appeals_received"] / board_output)
    assert calculated["board_fte_reduce_25000_ceiling"] == math.ceil((official["fy2027_board_appeals_received"] + 25_000) / board_output)
    assert calculated["board_fte_reduce_50000_ceiling"] == math.ceil((official["fy2027_board_appeals_received"] + 50_000) / board_output)

    records = ai["records"]
    assert len(records) == ai["counts"]["vba_use_cases"] == official["vba_ai_use_cases_2025"]
    stage_counts = {key.split(") ", 1)[-1]: value for key, value in ai["counts"]["stage"].items()}
    impact_counts = {key.split(") ", 1)[-1]: value for key, value in ai["counts"]["impact"].items()}
    assert Counter(r["development_stage"] for r in records) == Counter(stage_counts)
    assert Counter(r["high_impact_status"] for r in records) == Counter(impact_counts)
    deployed_high = sum(r["development_stage"] == "Deployed" and r["high_impact_status"] == "High-impact" for r in records)
    assert deployed_high == ai["counts"]["deployed_high_impact"] == official["vba_ai_deployed_high_impact_2025"]
    assert len({r["use_case_id"] for r in records}) == len(records)

    assert assumptions["version"] == metrics["metadata"]["version"]
    for source in sources["sources"]:
        checksum = source.get("sha256")
        if checksum and not re.fullmatch(r"[0-9a-f]{64}", checksum):
            fail(f"Invalid SHA-256 in source {source['id']}")

    for csv_name in ("metrics.csv", "sources.csv"):
        rows = list(csv.reader((ROOT / "data" / csv_name).open(encoding="utf-8", newline="")))
        widths = {len(row) for row in rows}
        if len(widths) != 1:
            fail(f"Inconsistent CSV row widths in {csv_name}: {sorted(widths)}")


def validate_html(path: Path, expected_lang: str) -> None:
    text = path.read_text(encoding="utf-8")
    parser = AuditParser()
    parser.feed(text)
    assert parser.lang == expected_lang, f"{path}: expected lang={expected_lang!r}, got {parser.lang!r}"
    assert parser.h1_count == 1, f"{path}: expected one h1"
    assert parser.main_count == 1, f"{path}: expected one main landmark"
    assert not parser.duplicate_ids, f"{path}: duplicate IDs {parser.duplicate_ids}"
    missing_fragments = sorted(set(parser.fragment_links) - parser.ids)
    assert not missing_fragments, f"{path}: missing fragment targets {missing_fragments}"
    unlabelled = [control for control in parser.unlabelled_implicit_controls if control not in parser.label_fors]
    assert not unlabelled, f"{path}: controls without labels {unlabelled}"
    assert not parser.external_scripts, f"{path}: external scripts are not permitted"
    assert not parser.external_styles, f"{path}: external stylesheets are not permitted"
    assert 'name="robots" content="noindex, nofollow"' in text
    assert "Do not submit personal claim" in text or "No envíe información personal" in text

    for href in parser.local_links:
        clean = href.split("#", 1)[0]
        if not clean or clean.endswith(("bio.html", "/")):
            continue
        target = (path.parent / clean).resolve()
        if not target.exists():
            fail(f"{path}: missing local link target {href} -> {target}")

    if expected_lang == "es":
        assert ">Fuente</a>" in text
        assert ">Source</a>" not in text
        assert "Página dinámica" in text


def main() -> int:
    validate_data()
    validate_html(ROOT / "index.html", "en")
    validate_html(ROOT / "es/index.html", "es")
    print("Observatory validation passed: data, formulas, HTML structure, labels, links, and bilingual controls.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (AssertionError, KeyError, ValueError, json.JSONDecodeError) as exc:
        print(f"Validation failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
