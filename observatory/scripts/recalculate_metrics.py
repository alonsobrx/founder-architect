#!/usr/bin/env python3
"""Recalculate all derived observatory metrics from the official input fields."""
from __future__ import annotations

import argparse
import csv
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
METRICS_JSON = ROOT / "data/metrics.json"
METRICS_CSV = ROOT / "data/metrics.csv"


def calculate(official: dict[str, float | int]) -> dict[str, float | int]:
    total_receipts = official["fy2027_rating_receipts"] + official["fy2027_nonrating_receipts"]
    total_production = official["fy2027_rating_production"] + official["fy2027_nonrating_production"]
    total_inventory = official["fy2027_rating_year_end_inventory"] + official["fy2027_nonrating_year_end_inventory"]
    margin = total_production - total_receipts
    board_output = official["fy2025_board_decisions"] / official["fy2025_board_fte"]

    return {
        "compensation_recipient_share_percent": official["compensation_recipients_fy2025"] / official["living_veterans_fy2025"] * 100,
        "veterans_100_percent_share_all_veterans_percent": official["veterans_100_percent_fy2025"] / official["living_veterans_fy2025"] * 100,
        "veterans_100_percent_share_recipients_percent": official["veterans_100_percent_fy2025"] / official["compensation_recipients_fy2025"] * 100,
        "fy2027_total_receipts": total_receipts,
        "fy2027_total_production": total_production,
        "fy2027_total_year_end_inventory": total_inventory,
        "fy2027_production_margin": margin,
        "fy2027_production_margin_percent_of_receipts": margin / total_receipts * 100,
        "fy2027_planned_utilization_percent": total_receipts / total_production * 100,
        "five_percent_receipt_surge_shortfall": ((total_receipts * 105 + 99) // 100) - total_production,
        "ten_percent_receipt_surge_shortfall": ((total_receipts * 110 + 99) // 100) - total_production,
        "fy2025_board_decisions_per_fte": board_output,
        "board_fte_keep_pace_ceiling": math.ceil(official["fy2027_board_appeals_received"] / board_output),
        "board_fte_reduce_25000_ceiling": math.ceil((official["fy2027_board_appeals_received"] + 25_000) / board_output),
        "board_fte_reduce_50000_ceiling": math.ceil((official["fy2027_board_appeals_received"] + 50_000) / board_output),
    }


def equal(actual: float | int, expected: float | int) -> bool:
    if isinstance(expected, int):
        return actual == expected
    return math.isclose(float(actual), expected, rel_tol=1e-10, abs_tol=1e-10)


def write_csv(payload: dict) -> None:
    with METRICS_CSV.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["classification", "metric", "value"])
        for group in ("official", "calculated", "scenario_defaults"):
            for key, value in payload[group].items():
                writer.writerow([group, key, value])


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="Update calculated fields and metrics.csv.")
    parser.add_argument("--check", action="store_true", help="Fail when stored calculated fields differ. This is the default.")
    args = parser.parse_args()

    payload = json.loads(METRICS_JSON.read_text(encoding="utf-8"))
    expected = calculate(payload["official"])
    differences = {
        key: {"stored": payload["calculated"].get(key), "expected": value}
        for key, value in expected.items()
        if key not in payload["calculated"] or not equal(payload["calculated"][key], value)
    }

    if args.write:
        payload["calculated"] = expected
        METRICS_JSON.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
        write_csv(payload)
        print("Updated calculated metrics and metrics.csv.")
        return 0

    if differences:
        print(json.dumps(differences, indent=2))
        return 1

    print(f"Calculated metric check passed: {len(expected)} derived fields.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
