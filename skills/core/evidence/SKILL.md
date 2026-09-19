---
id: evidence
version: 2.2.0
scope: core
category: auditability
---

# Evidence Skill

## Mission
Make every material design decision, mutation, QA result, and completion claim auditable.

Evidence separates:
- what was observed
- what was decided
- what was changed
- what was verified
- what remains unknown

No PASS exists without evidence.

## Activate when
Mandatory at completion of:
- CREATE_SCREEN
- MODIFY_SCREEN/FIX
- REVIEW
- QA
- HANDOFF where design/system claims are made

Also use incrementally at major control transitions.

## Evidence quality levels

### E0 — Claim only
Statement without supporting source.
Never sufficient for PASS.

### E1 — Indirect
Registry/text policy or secondary evidence.
Useful but may not prove live Figma state.

### E2 — Direct inspection
Exact live file/node/structure evidence.

### E3 — Comparative
Baseline/reference and result evidence at comparable state/viewport.

### E4 — Verified post-fix
Comparative evidence after correction plus re-tested gates.

For reference-based CREATE/MODIFY PASS, use E3/E4 where applicable.

## Evidence provenance
Every material evidence item should identify:
- source type
- file/path or Figma fileKey/nodeId
- state/viewport where relevant
- what fact it supports
- whether direct or inferred

Never fabricate identifiers.

## Fact status
Label material statements:
- VERIFIED
- INFERRED
- UNKNOWN
- CONFLICTED

INFERRED cannot substitute for required VERIFIED evidence.

## Required execution envelope
Record:
- command
- product/domain
- control state
- Build Mode
- Reference Gate
- reference source
- source of truth
- target
- loaded skills + versions
- Design Decision
- Change Scope
- permission state
- reuse/ownership decisions
- affected states/viewports
- mutation summary
- QA gates
- regression
- Fix Loop iterations
- final result
- open gaps/blockers

## Evidence Matrix
For each applicable gate record:
- gateId
- status
- evidence
- evidence quality
- affected node/area
- severity
- defect/action if failed
- post-fix verification if applicable

## Review evidence
Each review finding should include:
- exact location
- observation
- impact
- evidence
- proposed bounded solution
- acceptance criteria
- whether a Figma write would be required

Separate observation from hypothesis.

## Mutation evidence
For each material write record:
- planned operation
- actual target
- operation performed
- expected delta
- observed result
- verification evidence
- scope classification

Tool-call success alone is E0/E1 operational evidence, not proof of correct design state.

## Reference evidence
Record:
- selected authority
- candidate sources
- rejected candidates
- reason
- exact node where available
- Build Mode
- gate result

## Scope evidence
Record:
- allowed changes
- protected areas
- out-of-scope
- dependent changes
- actual changed areas
- QA-09 result

## Fix evidence
Per iteration:
- defect(s)
- root cause
- correction
- verification
- gates re-run
- regression result
- remaining failures

## Final result rules

### PASS
Allowed only when:
- required gates pass
- required evidence quality is met
- no unresolved P0/P1
- no material UNKNOWN/CONFLICT affecting completion
- regression passes when applicable

### FAIL
Use when:
- evidence proves unresolved blocking defect
- safe correction was not performed/authorized

### BLOCKED
Use when:
- required authority/evidence/tool/business rule unavailable
- safe verification cannot complete

## NOT_APPLICABLE evidence
If a gate is N/A, record why it is not applicable.
"N/A" without rationale is invalid.

## Contradiction handling
When live Figma, registry, and documentation conflict:
1. record each source
2. mark CONFLICTED
3. apply source-authority policy
4. do not erase losing evidence
5. block if conflict cannot be safely resolved

## Anti-patterns
- screenshot-only PASS when component identity matters
- "done" without changed-node evidence
- evidence copied from a previous task
- hiding unknowns
- mixing assumption into fact statement
- using tool success as QA
- omitting failed iterations from final record

## Minimum evidence by task

### CREATE/MODIFY
E2 inspection + E3 reference/result + QA matrix + scope/mutation evidence.

### REVIEW
E2 inspection where Figma is available + finding evidence.

### QA
E2 per target and E3 where comparison is required.

### HANDOFF
Verified source/component/state/token references.

## Required output
- evidence envelope
- provenance records
- gate matrix
- defect/finding records
- mutation records
- comparison records
- fix history
- unresolved facts
- final result

## Downstream handoff
Evidence is the final audit artifact consumed by the completion controller and future design audits.
