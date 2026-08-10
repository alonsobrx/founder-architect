# Veterans Benefits Capacity and Due Process Observatory

An accessible, bilingual, reproducible research preview examining VA claims workload, staffing, appeals, accredited representation, and artificial-intelligence governance.

## Live preview

- English: <https://alonsobrx.github.io/founder-architect/observatory/>
- Spanish: <https://alonsobrx.github.io/founder-architect/observatory/es/>

The preview is intentionally marked `noindex, nofollow` until substantive, legal, accessibility, cybersecurity, economics, and Spanish-language review is complete.

## Responsible preview publisher

Arnoldo A. Alonso is the independent research director and responsible preview publisher. Veterans Defense Fund remains described as a public-interest initiative in development unless a different legal status is documented and approved.

The approved ownership, contact, economic assumptions, security posture, and unresolved decisions are recorded in [`DECISIONS.md`](DECISIONS.md).

## Evidence rules

Every quantitative statement is labeled as one of four classes:

1. **Official** — published by an identified authoritative source.
2. **Calculated** — derived from official inputs with the formula disclosed.
3. **Scenario** — an editable planning assumption.
4. **Unknown** — a material fact not established by the public record.

## Repository contents

- `index.html`: authoritative English HTML publication.
- `es/index.html`: complete Spanish publication path.
- `styles.css`: black-and-white, high-contrast responsive design.
- `app.js`: dependency-free calculators and AI-registry filtering.
- `data/metrics.json` and `data/metrics.csv`: official, calculated, and scenario inputs.
- `data/sources.json` and `data/sources.csv`: source ledger, limitations, and checksums.
- `data/model-assumptions.json`: model formulas and caveats.
- `data/va-ai-vba-use-cases.json`: reproducible VBA subset of the official VA AI inventory.
- `scripts/recalculate_metrics.py`: dependency-free recalculation of every derived metric.
- `scripts/validate_observatory.py`: standard-library checks for formulas, data, HTML, controls, and links.
- `scripts/security_audit.py`: current-tree and Git-history checks for high-confidence secrets, privacy exposures, unsafe static-site behavior, and workflow risks.
- `GOVERNANCE.md`: correction, review, independence, and release controls.
- `DECISIONS.md`: dated decisions and unresolved authority questions.
- `SECURITY.md`: Observatory-specific security and privacy policy.
- `THREAT_MODEL.md`: assets, adversaries, trust boundaries, controls, residual risks, and incident response.
- `petition/README.md`: publication gates for the future living petition.
- `STATUS.md`: completed automated checks and unresolved manual review gates.

## Security architecture

The Observatory is a static, dependency-light publication with no login, database, server-side application, analytics service, tracker, public upload, payment flow, or claims-intake endpoint. Its calculators operate locally and are not designed to transmit or retain user input.

Automated controls include:

- immutable commit-SHA pinning for GitHub Actions;
- explicit least-privilege workflow permissions, timeouts, and concurrency controls;
- CodeQL analysis for JavaScript and Python;
- current-tree and Git-history scanning for high-confidence credentials and Social Security number patterns;
- rejection of external scripts and stylesheets, executable inline scripts, active-content embedding, data-submitting forms, dangerous DOM injection sinks, browser storage, cookies, and network calls in the Observatory;
- CODEOWNERS routing and a privacy, evidence, accessibility, and security pull-request checklist; and
- Dependabot monitoring for GitHub Actions updates.

Account multi-factor authentication, protected-branch or repository rules, native secret scanning, push protection, private vulnerability reporting, signed releases, and other account-level controls must be enabled and verified separately. The project does not claim that a setting is active unless GitHub reports it as active.

See [`SECURITY.md`](SECURITY.md) and [`THREAT_MODEL.md`](THREAT_MODEL.md).

## Accessibility

Accessible HTML is authoritative. The project targets WCAG 2.2 Level AA, but does not claim certified conformance. Automated semantic, formula, link, and browser checks are necessary but insufficient. Required manual acceptance testing includes TalkBack, NVDA, VoiceOver, keyboard-only operation, and zoom at 200 and 400 percent.

## Privacy and legal boundary

Do not submit or commit medical records, VA file numbers, Social Security numbers, addresses, passwords, private correspondence, individual claim files, Ayala client data, proprietary Ayala logic, or patent-sensitive material.

This is independent public-interest research. It is not affiliated with VA and is not legal advice. The public repository must never become a confidential veteran system.

## Licenses

- Code: MIT License.
- Project-created research text and data: Creative Commons Attribution 4.0 International.
- U.S. government source materials retain their applicable public-domain or source-specific status.

## Maintainer

Arnoldo A. Alonso — [LinkedIn](https://www.linkedin.com/in/alonsobrx)
