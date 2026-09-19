---
id: reference-source-resolution
version: 1.0.0
scope: core
---

# Reference / Source Resolution Skill

## Purpose
Resolve the exact design authority before analysis, review, QA, or mutation.

## Trigger
Mandatory for CREATE_SCREEN, MODIFY_SCREEN and QA. Use for REVIEW when source authority affects the finding.

## Required inputs
- user request
- target Figma file/node when supplied
- resolved product/domain
- reference router and source-priority policy
- available Master/domain/Core evidence

## Procedure
1. Parse whether the user supplied an exact approved reference.
2. Resolve product/domain and candidate approved Masters.
3. Classify candidates as current/approved, domain pattern, Core, legacy, archive, screenshot/reference-only, or exploratory.
4. Resolve Build Mode: REPRODUCE, ADAPT, or EXPLORE.
5. Select the highest-authority source according to repository policy.
6. Record exact fileKey/nodeId/name/classification.
7. Detect ambiguity before any Figma mutation.
8. Verify that the live inspected node still matches the recorded authority.
9. Produce a Reference Gate result.

## Reference Gate
- PASS — exact approved authority resolved.
- EXPLORE_EXPLICIT — user explicitly authorized from-scratch/exploration.
- BLOCKED_REFERENCE_AMBIGUOUS — multiple equally valid approved sources remain.
- BLOCKED_REFERENCE_MISSING — no approved source can be proven and exploration was not authorized.

## Hard rules
- A blank/new target file is never a design reference.
- Same screen name does not prove same authority.
- Legacy/archive/reference-only material cannot outrank an approved/current Master.
- Do not merge modules from different candidate Masters to bypass ambiguity.
- Do not fabricate authority from visual similarity.

## Evidence
- buildMode
- referenceGate
- exact reference source
- candidate sources considered
- source authority rationale
- unresolved ambiguity/gaps

## Block conditions
Any CREATE/MODIFY mutation is blocked unless the gate is PASS or EXPLORE_EXPLICIT.
