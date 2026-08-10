# Observatory Threat Model

## Purpose

This document defines what the Veterans Benefits Capacity and Due Process Observatory protects, the principal ways it could be harmed, the controls now implemented in the repository, and the risks that still require human or GitHub account-level action.

## Security objectives

The Observatory has five primary security objectives.

1. **Research integrity.** Published figures, formulas, classifications, source records, and petition language must not be silently altered or misrepresented.
2. **Veteran privacy.** No protected veteran, medical, claims, financial, or identifying information may enter the public repository or its history.
3. **Publication authenticity.** Visitors must be able to determine which repository, commit, release, and responsible publisher produced the public version.
4. **Software and workflow integrity.** A pull request or dependency must not gain unauthorized code execution, credentials, or write access.
5. **Availability and recoverability.** Defacement or deployment failure must be detectable and reversible from reviewed Git history.

## Protected assets

The protected assets are:

- the GitHub account and repository permissions;
- the `main` branch, tags, releases, and GitHub Pages deployment;
- official-source records and document checksums;
- economic assumptions, formulas, scripts, and generated values;
- English and Spanish public text;
- accessibility behavior and user trust;
- private Ayala intellectual property kept outside this repository; and
- the safety and dignity of veterans whose experiences inform the project.

## Likely adversaries and failure sources

The model considers:

- opportunistic attackers seeking account access or defacement;
- politically or commercially motivated actors seeking to alter, discredit, suppress, or poison the research;
- malicious or compromised dependencies and GitHub Actions;
- contributors who unintentionally commit credentials, protected records, unsupported claims, or unsafe code;
- source-site changes that silently alter definitions, files, or tables;
- translation, accessibility, formula, or publication errors that create reputational harm without malicious intent; and
- compromise of a future custom domain, registrar, DNS account, or external hosting layer.

## Trust boundaries

The principal trust boundaries are:

1. the repository owner’s GitHub account and recovery methods;
2. GitHub’s repository, Actions, Pages, issue, and release infrastructure;
3. pull requests and content supplied by contributors;
4. official agency and institutional source systems;
5. local devices used to edit or approve publication changes;
6. future domain, DNS, email, form, analytics, or hosting providers; and
7. confidential Ayala or veteran systems, which must remain completely separate.

## Principal attack scenarios and controls

### Account takeover

An attacker who controls the owner account could alter `main`, workflows, Pages, issues, releases, or repository settings.

Controls include least-privilege application access, protected-branch or repository rules, required pull requests, required checks, CODEOWNERS review, account multi-factor authentication, passkeys or hardware security keys, offline recovery codes, signed releases, and prompt revocation of unknown sessions and applications.

### Malicious pull request or workflow supply-chain attack

A contribution could attempt to execute untrusted event text, steal a token, persist checkout credentials, use an unreviewed action tag, inherit secrets, or gain write permissions.

Automated controls reject mutable action references, excessive write permissions, `pull_request_target`, `workflow_run`, inherited secrets, credential persistence, unsafe shell interpolation, download-and-execute pipelines, missing timeouts, and workflows without concurrency controls. External actions are pinned to full commit SHAs.

### Credential or protected-information publication

A secret, Social Security number, medical record, or claim file could be committed accidentally and remain recoverable from Git history even after deletion.

Controls include a restrictive `.gitignore`, pull-request privacy checklist, repository and history scanning, suppressed matched values in CI output, explicit security policies, and a rule that public GitHub channels never serve as claims intake. A real disclosure requires immediate revocation, history remediation when appropriate, evidence preservation, and affected-person notification.

### Source or data poisoning

An official webpage, workbook, downloaded file, or transformation could change, be misread, or be deliberately substituted.

Controls include source identity, retrieval date, reporting period, document location, checksum, classification, formula disclosure, reproducible scripts, independent review, correction logs, and fail-closed validation when calculated values do not match official inputs.

### Client-side injection or surveillance

A change could introduce externally hosted JavaScript, a tracker, data collection, a transmitting form, dangerous HTML injection, browser storage, cookies, or a network call.

The Observatory security audit prohibits external scripts and stylesheets, executable inline scripts, active-content embedding, insecure active URLs, data-submitting forms, dynamic code execution, dangerous DOM HTML sinks, browser storage, cookie access, and client-side network APIs. The public calculators remain local and dependency-free.

### Defacement, deletion, or unavailable deployment

A bad merge, compromised account, or platform incident could damage or remove the live site.

Controls include Git history, reviewed pull requests, validation workflows, Pages deployment history, attributable releases, and a documented ability to revert to a known-good commit. The responsible publisher may suspend public access when integrity cannot be established.

## Manual controls that remain mandatory

The following settings cannot be proven by repository files alone and must be enabled and periodically verified in GitHub or the relevant account:

- multi-factor authentication for the owner, preferably with a passkey or hardware security key;
- offline recovery codes stored outside the editing device;
- a repository rule protecting `main` from deletion and force-pushes;
- required pull requests, CODEOWNERS review, and required successful security and validation checks;
- native secret scanning, push protection, Dependabot alerts, and private vulnerability reporting when available;
- removal of unused collaborators, applications, deploy keys, webhooks, Actions secrets, wikis, projects, and merge methods;
- signed or otherwise attributable release tags;
- device encryption, operating-system updates, screen lock, and malware protection on editing devices; and
- registrar MFA, registry lock where available, DNSSEC, and controlled DNS access before a custom domain is used.

The current GitHub connection can edit repository content and workflows but does not expose every account-level or repository-rules setting. Those settings remain explicit release gates rather than being falsely described as active.

## Hosting constraint

GitHub Pages is suitable for this static preview, but repository files cannot impose a complete server-side security-header policy. A future interactive system, claims intake, authenticated portal, API, database, or confidential communications service must use a separately reviewed architecture with secure headers, encryption, access control, logging, backups, rate limits, vulnerability management, and an incident-response plan. It must not be added directly to this public static repository.

## Incident-response sequence

When a credible security or privacy incident is identified:

1. stop publication or revert to the last known-good commit when continued exposure creates risk;
2. revoke and rotate affected credentials before attempting cosmetic cleanup;
3. preserve relevant commits, workflow logs, timestamps, access records, and reports;
4. determine whether protected information, source integrity, or release authenticity was affected;
5. notify GitHub, affected individuals, counsel, agencies, or other parties when legally or operationally required;
6. remediate the root cause, including Git-history cleanup when necessary;
7. rerun validation, security scanning, and manual review; and
8. publish a factual incident and correction record when disclosure does not create additional harm.

## Residual risk

No automated scanner can prove the absence of every vulnerability, credential, privacy exposure, legal error, or manipulated source. The project therefore does not promise zero risk. It requires layered controls, independent review, attributable decisions, conservative publication, and rapid correction.
