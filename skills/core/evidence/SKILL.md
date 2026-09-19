---
id: evidence
version: 1.0.0
scope: core
---

# Evidence Skill

## Purpose
Produce a traceable execution record so every PASS/FAIL/BLOCKED claim can be audited.

## Trigger
Mandatory at completion of CREATE/MODIFY/REVIEW/QA.

## Required evidence envelope
- command
- product/domain
- buildMode
- referenceGate
- exact reference source
- sourceOfTruth
- loadedSkills with versions
- writeMode
- target file/node
- reuse decision
- changed scope
- state/responsive coverage
- gate results
- visual/reference comparison
- findings and acceptance criteria when reviewing
- fix-loop iterations when used
- final result
- open gaps/blockers

## Evidence Matrix
Each gate record must include:
- gateId
- status: PASS | FAIL | BLOCKED | NOT_APPLICABLE
- evidence
- affected node/area when applicable
- severity when failed
- required action
- verification result after fix when applicable

## Rules
- No PASS without evidence.
- Unknown is not PASS.
- Missing tool capability is BLOCKED.
- Evidence must distinguish inspected facts from assumptions.
- Record exact file/node IDs when available; never fabricate them.

## Final result
For QA-oriented completion:
- PASS — all required blocking gates pass.
- FAIL — at least one blocking gate fails and has not been corrected.
- BLOCKED — verification/correction cannot proceed safely due to missing authority/tool/evidence.
