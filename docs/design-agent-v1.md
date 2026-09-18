# Design Agent v1.1

Design Agent v1.1 is a repository-driven design execution contract focused on **Master-first reproduction and controlled adaptation**.

## Main behavior change from v1.0

A CREATE request no longer means "compose a reasonable screen from the Design System."

It means:

`Resolve approved reference → reproduce/adapt it → reuse DS → visually compare → QA`

A blank/new Figma file is only the destination.

## Build modes

- **REPRODUCE** — default when approved/current Master exists.
- **ADAPT** — bounded change to an existing design.
- **EXPLORE** — only when explicitly requested.

## Reference Fidelity Gate

CREATE/MODIFY writes require:
- exact user reference, or
- one uniquely resolved approved/current Master, or
- explicit EXPLORE request.

If multiple Masters are plausible, write is blocked.

Example: generic Agency "Dashboard" is ambiguous because Team Performance Dashboard and My Performance Dashboard are both primary candidates. The agent must not invent a generic dashboard.

## Runtime

`ROUTE → PRODUCT → BUILD MODE → REFERENCE → FIDELITY GATE → INSPECT → SOURCE → REUSE → WRITE → VISUAL COMPARE → QA → EVIDENCE`

## Regression tests

`npm run test:fidelity` protects the reference-resolution behavior that failed in the first New File Dashboard test.
