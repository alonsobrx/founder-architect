# Observatory Security and Privacy Policy

## Architecture and attack surface

The public Observatory is intentionally static and dependency-light. It has no login, database, server-side application, payment flow, analytics service, advertising tracker, claims-intake endpoint, or public file-upload function. Its calculators operate locally in the browser and are not designed to transmit or retain user input.

That architecture reduces risk but does not eliminate it. Repository compromise, malicious pull requests, poisoned source data, workflow supply-chain attacks, account takeover, defacement, and accidental publication of protected information remain material threats.

## Information that must never enter this repository

Do not submit or commit:

- individual veteran claim files or medical records;
- VA file numbers, Social Security numbers, full birth dates, signatures, home addresses, or banking information;
- passwords, API keys, tokens, private keys, recovery codes, or environment files;
- private veteran communications or attorney-client material;
- Ayala client data, proprietary models, unreleased patent material, or trade secrets.

Use aggregated public data, official records, redacted examples cleared for publication, and synthetic test data only.

## Enforced controls

The security baseline checks the current repository and Git history for high-confidence credentials and Social Security number patterns. It also rejects the following in the Observatory:

- externally hosted scripts or stylesheets;
- executable inline scripts other than non-executable JSON-LD metadata;
- iframes, embedded objects, and base-element URL rewriting;
- insecure HTTP active content or active URL schemes;
- forms that transmit data;
- dynamic code execution and dangerous DOM HTML-injection sinks;
- browser storage, cookie access, and client-side network calls;
- mutable GitHub Action references;
- excessive workflow permissions, credential persistence, untrusted shell interpolation, and download-and-execute shell pipelines.

CodeQL separately analyzes the JavaScript and Python source. Dependabot monitors GitHub Actions references. All workflows use explicit permissions and timeouts.

## Hosting limitation

GitHub Pages controls the HTTP response headers for this preview. This repository cannot independently set a complete production header policy such as Content Security Policy, Permissions Policy, or other edge-enforced headers. Before a high-risk interactive service is added, deployment should move behind an edge or hosting layer that supports reviewed security headers, logging, rate controls, and incident response. The current Observatory must remain a static public research publication.

## Reporting

For an exploitable vulnerability or privacy exposure, follow the private reporting procedure in the repository-level [`SECURITY.md`](../SECURITY.md). Do not publish exploit details or protected information in an issue.

Data corrections and accessibility defects are not security reports unless they expose protected information or create an exploitable condition. Ordinary corrections should identify the disputed statement, authoritative source, exact page or table, and requested change without attaching private records.

## Residual risk and release authority

No public system can honestly promise zero vulnerabilities. The release standard is documented risk reduction, fail-closed automation, independent review, rapid correction, and transparent residual-risk disclosure. The responsible publisher retains authority to suspend the site if integrity, privacy, or account security is uncertain.

See [`THREAT_MODEL.md`](THREAT_MODEL.md) for assets, adversaries, trust boundaries, controls, and unresolved manual gates.
