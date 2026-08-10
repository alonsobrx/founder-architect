# Validation and Release Status

## Version 0.1.0

Status: independent research preview, public by direct link, excluded from search-engine indexing.

Responsible preview publisher: Arnoldo A. Alonso.

The ownership, public contact, seven economic scenario defaults, security posture, and unresolved decisions were approved on August 10, 2026, and are recorded in [`DECISIONS.md`](DECISIONS.md).

## Completed on August 10, 2026

- Official-source and checksum ledger created.
- Official, Calculated, Scenario, and Unknown classifications applied.
- Independent formula checks passed for workload, surge, compensation, and Board sensitivity calculations.
- JSON and CSV structure checks passed.
- English and Spanish HTML structure, duplicate-ID, fragment-link, local-file, and form-label checks passed.
- Dependency-free JavaScript calculators and all AI-registry filters passed functional browser tests.
- Chrome accessibility-tree inspection found named controls and expected landmarks.
- Page-level horizontal reflow checks passed at 320 CSS pixels.
- Text-resize smoke testing passed at 200 percent on a desktop viewport.
- Light and dark presentation smoke tests passed without browser-console or script errors.
- A repository threat model, responsible-disclosure policy, incident-response sequence, and privacy boundary were documented.
- GitHub Actions were converted to explicit least-privilege permissions, timeouts, concurrency controls, disabled checkout credential persistence, and immutable commit-SHA action references.
- Automated current-tree and Git-history checks were added for high-confidence credentials, Social Security number patterns, unsafe static-site behavior, and workflow supply-chain risks.
- CodeQL analysis was configured for JavaScript and Python.
- Dependabot monitoring was configured for GitHub Actions.
- A privacy, evidence, accessibility, and security pull-request checklist was added.

## Required before an indexed public release

### Independent review

- Manual TalkBack review on Android.
- Manual NVDA review with Firefox and Chrome on Windows.
- Manual VoiceOver review with Safari.
- Keyboard-only review by a second tester.
- Review at 200 and 400 percent browser zoom.
- Qualified human Spanish-language review.
- Independent legal review of petition language and requested relief.
- Independent economic or public-administration review of scenario assumptions.
- Independent privacy and cybersecurity review.

### GitHub and account controls

- Verify multi-factor authentication for the owner, preferably with a passkey or hardware security key.
- Store recovery codes offline and verify account-recovery methods.
- Protect `main` with a repository rule that requires pull requests, CODEOWNERS review, successful Observatory validation, successful Security baseline, and successful CodeQL analysis where applicable.
- Prohibit force-pushes and deletion of `main`.
- Enable native secret scanning, push protection, Dependabot alerts, and private vulnerability reporting when available.
- Remove or disable unused collaborators, applications, deploy keys, webhooks, Actions secrets, wiki, projects, and merge methods.
- Create a signed or otherwise attributable versioned release after the review gates close.

### Publication and evidence

- Publish the final petition in accessible HTML and Markdown.
- Add a redacted exhibit index.
- Resolve material review findings and publish the review and correction logs.
- Document the exact legal status of Veterans Defense Fund before making organizational or fundraising claims.
- Decide whether to use a dedicated GitHub organization, permanent repository, and custom domain.
- Remove `noindex, nofollow` only through a reviewed and attributable release decision.

The project does not claim certified WCAG conformance, legal validation, peer review, zero vulnerabilities, or completed account-level security controls while these gates remain open.
