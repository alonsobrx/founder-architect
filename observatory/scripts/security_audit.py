#!/usr/bin/env python3
"""Fail closed on high-confidence secret, PII, static-site, and workflow risks."""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

MAX_TEXT_BYTES = 2_000_000
TEXT_SUFFIXES = {
    ".cff", ".css", ".csv", ".html", ".js", ".json", ".md", ".py",
    ".txt", ".xml", ".yaml", ".yml",
}
TEXT_NAMES = {
    ".gitignore", "CNAME", "CODEOWNERS", "LICENSE", "LICENSE.md",
    "README", "SECURITY.md",
}
SKIP_PARTS = {
    ".git", ".mypy_cache", ".pytest_cache", ".ruff_cache", ".venv",
    "__pycache__", "build", "dist", "node_modules", "venv",
}

SECRET_PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    (
        "private key material",
        re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----"),
    ),
    (
        "GitHub access token",
        re.compile(r"\b(?:gh[pousr]_[A-Za-z0-9]{36,255}|github_pat_[A-Za-z0-9_]{20,255})\b"),
    ),
    (
        "AWS access key",
        re.compile(r"\b(?:AKIA|ASIA)[0-9A-Z]{16}\b"),
    ),
    (
        "Google API key",
        re.compile(r"\bAIza[0-9A-Za-z_-]{35}\b"),
    ),
    (
        "Slack token",
        re.compile(r"\bxox[baprs]-[0-9A-Za-z-]{10,}\b"),
    ),
    (
        "OpenAI API key",
        re.compile(r"\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b"),
    ),
    (
        "Stripe live secret",
        re.compile(r"\b(?:sk|rk)_live_[0-9A-Za-z]{16,}\b"),
    ),
    (
        "JSON Web Token",
        re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b"),
    ),
)

GENERIC_SECRET_ASSIGNMENT = re.compile(
    r"""(?ix)
    \b(?:api[_-]?key|client[_-]?secret|access[_-]?token|refresh[_-]?token|password|passwd)\b
    \s*[:=]\s*
    ["'](?!\$\{\{)([A-Za-z0-9_./+=:-]{20,})["']
    """
)

SSN_PATTERN = re.compile(
    r"(?<!\d)(?!000|666|9\d\d)\d{3}-(?!00)\d{2}-(?!0000)\d{4}(?!\d)"
)

FORBIDDEN_JS_PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    ("dynamic eval", re.compile(r"\beval\s*\(")),
    ("Function constructor", re.compile(r"\bnew\s+Function\s*\(")),
    ("document.write", re.compile(r"\bdocument\.write(?:ln)?\s*\(")),
    ("innerHTML assignment", re.compile(r"\.innerHTML\s*=")),
    ("outerHTML assignment", re.compile(r"\.outerHTML\s*=")),
    ("insertAdjacentHTML", re.compile(r"\.insertAdjacentHTML\s*\(")),
    ("network fetch", re.compile(r"\bfetch\s*\(")),
    ("XMLHttpRequest", re.compile(r"\bXMLHttpRequest\b")),
    ("WebSocket", re.compile(r"\bWebSocket\b")),
    ("EventSource", re.compile(r"\bEventSource\b")),
    ("sendBeacon", re.compile(r"\bsendBeacon\s*\(")),
    ("browser persistent storage", re.compile(r"\b(?:localStorage|sessionStorage|indexedDB)\b")),
    ("cookie access", re.compile(r"\bdocument\.cookie\b")),
)

REMOTE_ACTION = re.compile(r"^\s*-\s+uses:\s*([^#\s]+)", re.MULTILINE)
FULL_COMMIT_SHA = re.compile(r"^[0-9a-fA-F]{40}$")
WRITE_PERMISSION = re.compile(r"^\s+([a-z-]+):\s*write\s*$", re.MULTILINE)
UNTRUSTED_WORKFLOW_CONTEXT = re.compile(
    r"\$\{\{\s*github\.event\.(?:"
    r"pull_request\.(?:title|body|head\.ref)|"
    r"issue\.(?:title|body)|"
    r"comment\.body|"
    r"review\.body|"
    r"head_commit\.message"
    r")\s*\}\}"
)


@dataclass(frozen=True)
class Finding:
    location: str
    rule: str
    detail: str

    def render(self) -> str:
        return f"{self.location}: {self.rule}: {self.detail}"


def run_git(root: Path, args: list[str], *, input_text: str | None = None) -> str:
    result = subprocess.run(
        ["git", *args],
        cwd=root,
        input=input_text,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or f"git {' '.join(args)} failed")
    return result.stdout


def is_candidate_text(path: Path) -> bool:
    if any(part in SKIP_PARTS for part in path.parts):
        return False
    return path.suffix.lower() in TEXT_SUFFIXES or path.name in TEXT_NAMES


def tracked_files(root: Path) -> list[Path]:
    try:
        output = run_git(root, ["ls-files", "-z"])
    except (FileNotFoundError, RuntimeError):
        return sorted(
            path for path in root.rglob("*")
            if path.is_file() and is_candidate_text(path.relative_to(root))
        )

    paths: list[Path] = []
    for item in output.split("\0"):
        if not item:
            continue
        relative = Path(item)
        if is_candidate_text(relative):
            paths.append(root / relative)
    return sorted(paths)


def read_text(path: Path) -> str | None:
    try:
        if path.stat().st_size > MAX_TEXT_BYTES:
            return None
        return path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return None


def line_number(text: str, offset: int) -> int:
    return text.count("\n", 0, offset) + 1


def scan_sensitive_text(text: str, location: str, *, generic: bool = True) -> list[Finding]:
    findings: list[Finding] = []
    for name, pattern in SECRET_PATTERNS:
        match = pattern.search(text)
        if match:
            findings.append(
                Finding(
                    f"{location}:{line_number(text, match.start())}",
                    "secret-scan",
                    f"possible {name}; matched value intentionally suppressed",
                )
            )

    if generic:
        match = GENERIC_SECRET_ASSIGNMENT.search(text)
        if match:
            findings.append(
                Finding(
                    f"{location}:{line_number(text, match.start())}",
                    "secret-scan",
                    "possible hard-coded credential assignment; matched value intentionally suppressed",
                )
            )

    match = SSN_PATTERN.search(text)
    if match:
        findings.append(
            Finding(
                f"{location}:{line_number(text, match.start())}",
                "privacy-scan",
                "possible Social Security number; matched value intentionally suppressed",
            )
        )
    return findings


class StaticHTMLSecurityParser(HTMLParser):
    """Conservative parser for the dependency-free public observatory pages."""

    RESOURCE_TAGS = {"audio", "embed", "iframe", "img", "object", "script", "source", "track", "video"}

    def __init__(self, location: str) -> None:
        super().__init__(convert_charrefs=True)
        self.location = location
        self.findings: list[Finding] = []

    def add(self, rule: str, detail: str) -> None:
        line, column = self.getpos()
        self.findings.append(Finding(f"{self.location}:{line}:{column + 1}", rule, detail))

    @staticmethod
    def is_external(value: str) -> bool:
        stripped = value.strip()
        if stripped.startswith("//"):
            return True
        parsed = urlsplit(stripped)
        return bool(parsed.scheme or parsed.netloc)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        lowered = tag.lower()
        names = [name.lower() for name, _ in attrs]
        if len(names) != len(set(names)):
            self.add("html-security", f"duplicate attribute on <{lowered}>")

        values = {name.lower(): (value or "") for name, value in attrs}

        for name in names:
            if name.startswith("on"):
                self.add("html-security", f"inline event handler {name!r} is forbidden")

        for name in ("href", "src", "action", "formaction", "xlink:href"):
            value = values.get(name, "").strip()
            lowered_value = value.lower()
            if lowered_value.startswith(("javascript:", "vbscript:", "data:text/html")):
                self.add("html-security", f"active URL scheme is forbidden in {name}")
            if lowered_value.startswith("http://"):
                self.add("html-security", f"insecure HTTP URL is forbidden in {name}")

        if lowered in {"base", "embed", "iframe", "object"}:
            self.add("html-security", f"<{lowered}> is outside the observatory threat model")

        if lowered == "script":
            src = values.get("src", "").strip()
            script_type = values.get("type", "").strip().lower()
            if src:
                if self.is_external(src):
                    self.add("html-security", "externally hosted scripts are forbidden")
            elif script_type != "application/ld+json":
                self.add("html-security", "inline executable scripts are forbidden")

        if lowered == "link":
            rel = {part.lower() for part in values.get("rel", "").split()}
            href = values.get("href", "").strip()
            if "stylesheet" in rel and href and self.is_external(href):
                self.add("html-security", "externally hosted stylesheets are forbidden")

        if lowered in self.RESOURCE_TAGS:
            src = values.get("src", "").strip()
            if src and self.is_external(src):
                self.add("html-security", f"external active resource on <{lowered}> is forbidden")

        if lowered == "form" and values.get("action", "").strip():
            self.add("html-security", "public observatory forms must not transmit data")

        if lowered == "a" and values.get("target", "").lower() == "_blank":
            rel = {part.lower() for part in values.get("rel", "").split()}
            if "noopener" not in rel:
                self.add("html-security", 'target="_blank" requires rel="noopener"')


def audit_html(root: Path) -> list[Finding]:
    findings: list[Finding] = []
    for path in (root / "observatory").rglob("*.html"):
        text = read_text(path)
        if text is None:
            continue
        relative = path.relative_to(root).as_posix()
        parser = StaticHTMLSecurityParser(relative)
        parser.feed(text)
        findings.extend(parser.findings)
    return findings


def audit_javascript(root: Path) -> list[Finding]:
    findings: list[Finding] = []
    for path in (root / "observatory").rglob("*.js"):
        text = read_text(path)
        if text is None:
            continue
        relative = path.relative_to(root).as_posix()
        for name, pattern in FORBIDDEN_JS_PATTERNS:
            match = pattern.search(text)
            if match:
                findings.append(
                    Finding(
                        f"{relative}:{line_number(text, match.start())}",
                        "javascript-security",
                        f"{name} is forbidden in the dependency-free observatory",
                    )
                )
    return findings


def audit_workflows(root: Path) -> list[Finding]:
    findings: list[Finding] = []
    workflow_dir = root / ".github" / "workflows"
    if not workflow_dir.exists():
        return [Finding(".github/workflows", "workflow-security", "workflow directory is missing")]

    for path in sorted([*workflow_dir.glob("*.yml"), *workflow_dir.glob("*.yaml")]):
        text = read_text(path)
        if text is None:
            continue
        relative = path.relative_to(root).as_posix()

        if "pull_request_target:" in text:
            findings.append(Finding(relative, "workflow-security", "pull_request_target is forbidden"))
        if "workflow_run:" in text:
            findings.append(Finding(relative, "workflow-security", "workflow_run is forbidden"))
        if "secrets: inherit" in text:
            findings.append(Finding(relative, "workflow-security", "secrets inheritance is forbidden"))
        if "continue-on-error: true" in text:
            findings.append(Finding(relative, "workflow-security", "security checks must fail closed"))
        if "permissions:" not in text:
            findings.append(Finding(relative, "workflow-security", "explicit least-privilege permissions are required"))
        if "timeout-minutes:" not in text:
            findings.append(Finding(relative, "workflow-security", "every workflow job requires a timeout"))
        if "concurrency:" not in text:
            findings.append(Finding(relative, "workflow-security", "concurrency control is required"))
        if re.search(r"permissions:\s*(?:write-all|\{\s*\})", text):
            findings.append(Finding(relative, "workflow-security", "write-all or empty permissions are forbidden"))

        for permission in WRITE_PERMISSION.findall(text):
            if not (path.name == "codeql.yml" and permission == "security-events"):
                findings.append(
                    Finding(relative, "workflow-security", f"write permission {permission!r} is not approved")
                )

        for action in REMOTE_ACTION.findall(text):
            if action.startswith("./"):
                continue
            if action.startswith("docker://"):
                findings.append(Finding(relative, "workflow-security", "mutable Docker actions are forbidden"))
                continue
            if "@" not in action:
                findings.append(Finding(relative, "workflow-security", f"action {action!r} has no immutable ref"))
                continue
            _, ref = action.rsplit("@", 1)
            if not FULL_COMMIT_SHA.fullmatch(ref):
                findings.append(
                    Finding(relative, "workflow-security", f"action {action!r} must be pinned to a 40-character commit SHA")
                )

        if "actions/checkout@" in text and "persist-credentials: false" not in text:
            findings.append(
                Finding(relative, "workflow-security", "checkout must disable persisted credentials")
            )

        if UNTRUSTED_WORKFLOW_CONTEXT.search(text):
            findings.append(
                Finding(relative, "workflow-security", "untrusted event text must not be interpolated into shell commands")
            )

        if re.search(r"(?:curl|wget)[^\n|]*\|\s*(?:ba)?sh\b", text):
            findings.append(Finding(relative, "workflow-security", "download-and-execute shell pipelines are forbidden"))
        if re.search(r"\bchmod\s+777\b", text):
            findings.append(Finding(relative, "workflow-security", "world-writable permissions are forbidden"))

    return findings


def audit_current_tree(root: Path) -> list[Finding]:
    findings: list[Finding] = []
    for path in tracked_files(root):
        text = read_text(path)
        if text is None:
            continue
        relative = path.relative_to(root).as_posix()
        generic = path.suffix.lower() not in {".md", ".txt"}
        findings.extend(scan_sensitive_text(text, relative, generic=generic))
    findings.extend(audit_html(root))
    findings.extend(audit_javascript(root))
    findings.extend(audit_workflows(root))
    return findings


def audit_git_history(root: Path) -> list[Finding]:
    """Scan unique historical text blobs without printing matched secret material."""
    try:
        output = run_git(root, ["rev-list", "--objects", "--all"])
    except (FileNotFoundError, RuntimeError) as exc:
        return [Finding("git-history", "history-scan", f"unable to scan history: {exc}")]

    candidates: dict[str, str] = {}
    for line in output.splitlines():
        sha, separator, path_text = line.partition(" ")
        if not separator:
            continue
        path = Path(path_text)
        if is_candidate_text(path):
            candidates.setdefault(sha, path.as_posix())

    if not candidates:
        return []

    checks = run_git(
        root,
        ["cat-file", "--batch-check=%(objectname) %(objecttype) %(objectsize)"],
        input_text="\n".join(candidates) + "\n",
    )
    metadata: dict[str, tuple[str, int]] = {}
    for line in checks.splitlines():
        parts = line.split()
        if len(parts) == 3 and parts[2].isdigit():
            metadata[parts[0]] = (parts[1], int(parts[2]))

    findings: list[Finding] = []
    for sha, path_text in candidates.items():
        object_type, size = metadata.get(sha, ("", 0))
        if object_type != "blob" or size > MAX_TEXT_BYTES:
            continue
        try:
            content = run_git(root, ["cat-file", "blob", sha])
        except RuntimeError:
            continue
        location = f"history:{path_text}@{sha[:12]}"
        findings.extend(scan_sensitive_text(content, location, generic=False))
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--repository-root",
        type=Path,
        default=Path(__file__).resolve().parents[2],
        help="Repository root. Defaults to the directory two levels above this script.",
    )
    parser.add_argument(
        "--history",
        action="store_true",
        help="Also scan unique text blobs reachable from Git history.",
    )
    args = parser.parse_args()
    root = args.repository_root.resolve()

    findings = audit_current_tree(root)
    if args.history:
        findings.extend(audit_git_history(root))

    unique = sorted({finding.render() for finding in findings})
    if unique:
        print("Security baseline failed. No matched secret values are printed.", file=sys.stderr)
        for item in unique:
            print(f"- {item}", file=sys.stderr)
        return 1

    scope = "current tree and Git history" if args.history else "current tree"
    print(f"Security baseline passed for {scope}: secrets, PII, static-site risks, and workflow controls.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
