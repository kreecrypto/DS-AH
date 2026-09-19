---
id: design-qa
version: 1.0.0
scope: core
---

# Design QA Skill

## Purpose
Verify that a design is structurally correct, system-compliant and visually faithful before completion.

## Trigger
Mandatory after CREATE/MODIFY; use directly for QA requests.

## QA sequence

### Gate A — Reference
- correct approved reference?
- correct Build Mode?
- no unresolved reference ambiguity?

### Gate B — Structure
- expected shell/hierarchy?
- Auto Layout/constraints stable?
- no accidental absolute positioning?
- no clipping/overflow/overlap?

### Gate C — System
- approved component identities?
- variables/styles bound correctly?
- no unnecessary detached instances?
- no duplicate tokens/components?

### Gate D — States
- required states present?
- selected/disabled/error/loading states semantically correct?
- interaction geometry stable?

### Gate E — Responsive
- expected breakpoints/layout modes represented?
- content reflows instead of merely shrinking?
- no unsupported assumptions?

### Gate F — Visual fidelity
- hierarchy
- geometry
- section order
- spacing rhythm
- typography
- color
- component family
- density
- edge polish

### Gate G — Scope
- requested change complete?
- unrelated areas unchanged for ADAPT?
- no extra invented modules in REPRODUCE?

## Result
- PASS: all required gates pass and evidence exists.
- PASS_WITH_P2: only minor polish remains and does not affect fidelity/usability.
- FAIL: P0/P1 defect or required evidence missing.
- BLOCKED: cannot verify due to missing reference/tool/evidence.

Never report PASS from visual impression alone.
