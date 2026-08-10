# Security and Privacy Policy

## Supported publication

Security fixes apply to the current `main` branch and the live GitHub Pages publication. Older commits, preview branches, downloaded copies, and third-party mirrors are not separately maintained.

## Security boundary

This repository is a public, static publication. It is not a veteran claims-intake system, medical-record system, authentication service, payment system, or confidential communications channel.

Never submit or commit:

- veteran medical records or claim files;
- VA file numbers or Social Security numbers;
- full birth dates, signatures, home addresses, banking information, or private correspondence;
- passwords, API keys, authentication tokens, private keys, or recovery codes;
- Ayala client data, proprietary adjudication logic, unreleased patent disclosures, or trade secrets.

Public GitHub issues and pull requests are permanently inappropriate for protected personal information, attorney-client material, or exploit details that would create immediate risk.

## Reporting a vulnerability

Use GitHub private vulnerability reporting when that repository feature is enabled. Do not open a public issue for an exploitable vulnerability, leaked credential, or privacy exposure.

Until private vulnerability reporting is enabled, send the maintainer a short message through [LinkedIn](https://www.linkedin.com/in/alonsobrx) stating only that you need a secure channel for a security report. Do not include exploit instructions, credentials, personal data, or veteran records in that message.

A useful private report should identify:

1. the affected URL, file, workflow, or commit;
2. the security impact;
3. reproducible steps using non-sensitive test data;
4. whether the issue is currently being exploited; and
5. a safe remediation proposal, when available.

The project will attempt to acknowledge a complete report within three business days and provide an initial triage decision within seven business days. These are operational targets, not contractual guarantees.

## Good-faith research

Good-faith research must avoid privacy invasion, denial of service, social engineering, destructive testing, credential theft, data exfiltration, and access to systems or information not owned by the researcher. Stop testing and report immediately if protected information or a real credential is encountered.

## Current automated controls

The repository is designed to fail closed through:

- least-privilege GitHub Actions permissions;
- immutable commit-SHA pinning for external actions;
- automated CodeQL analysis for JavaScript and Python;
- automated current-tree and Git-history scanning for high-confidence credentials and Social Security number patterns;
- static-site checks that prohibit external scripts and stylesheets, executable inline scripts, active-content embedding, data-submitting forms, dangerous DOM injection sinks, browser storage, cookies, and network calls in the Observatory;
- CODEOWNERS review routing;
- Dependabot monitoring for GitHub Actions updates; and
- explicit privacy and security checklists for pull requests.

Repository rules, account multi-factor authentication, passkeys or hardware security keys, private vulnerability reporting, and native GitHub secret-scanning settings must also be enabled and periodically verified by the repository owner. Configuration claims are not made unless GitHub reports them as active.

For the Observatory threat model and residual risks, see [`observatory/THREAT_MODEL.md`](observatory/THREAT_MODEL.md).
