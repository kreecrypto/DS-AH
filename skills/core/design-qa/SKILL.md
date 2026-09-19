---
id: design-qa
version: 2.0.0
scope: core
---

# Design QA Skill

## Purpose
Verify that a design is structurally correct, interaction-complete, system-compliant, accessible, content-safe and visually faithful before completion.

## Trigger
Mandatory after CREATE/MODIFY and for QA requests.

## Gate sequence

### QA-01 Reference Fidelity
- approved authority resolved
- Build Mode correct
- Reference Gate valid
- comparable reference/result evidence available when required
- no unexplained material divergence

### QA-02 Design System Compliance
- approved component identities
- correct variable/style bindings
- no unnecessary detached instances
- no duplicate semantic components/tokens
- ownership level justified for new assets

### QA-03 Interaction / States
- required states defined
- action outcomes clear
- validation/recovery defined where relevant
- cancel/back/close behavior safe
- loading/error/retry/empty/success handled when relevant

### QA-04 Responsive & Accessibility
- supported viewports/layout modes checked
- reflow/collapse behavior valid
- no clipping at supported sizes
- contrast/focus/state distinction checked
- essential meaning not encoded only by color/icon

### QA-05 Content QA
- terminology consistent
- CTA/action labels clear
- error/empty/loading/success content valid
- no placeholder-only labels
- realistic wrapping/truncation checked

### QA-06 Visual Quality
- hierarchy
- composition
- alignment
- spacing rhythm
- proportion
- typography
- color/surface
- iconography
- density
- state polish
- edge quality

### QA-07 Structural QA
- Auto Layout/constraints stable
- no accidental absolute positioning
- no overlap/clipping/overflow
- repeated patterns remain structurally consistent
- layer/component organization remains usable

### QA-08 Scope Integrity
- requested change complete
- unrelated areas unchanged for ADAPT
- no invented modules in REPRODUCE
- no hidden scope expansion

## Gate status
Every gate is one of:
- PASS
- FAIL
- BLOCKED
- NOT_APPLICABLE

## Final result
- PASS — every required blocking gate is PASS; NOT_APPLICABLE is justified.
- FAIL — one or more required gates fail.
- BLOCKED — required evidence, authority, tool capability or business rule prevents safe verification.

P2 polish may be recorded as a non-blocking note; it does not create a separate final result.

## Fix behavior
For CREATE/MODIFY with write authorization:
- P0/P1 FAIL enters Fix Loop.
- Re-run failed and dependent gates.
- Do not complete while a safely fixable blocking failure remains.

For QA-only/read-only tasks:
- report FAIL with required action; do not mutate Figma without separate write authorization.

## Required evidence
Use the Evidence Matrix schema. Never report PASS from visual impression alone.
