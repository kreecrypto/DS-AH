# Bank SOP Workflow

Status: Active  
Execution layer: `knowledge/ux/sop-bank/`  
Router: `agent/bank-sop-router.json`

## Purpose

Translate Bank's recurring UX/UI working style into a deterministic DS-AH workflow while preserving all reference, scope, write-permission, QA, regression, and evidence controls.

## Canonical flow

```text
REQUEST
→ RESOLVE TASK MODE
→ LOAD BANK SOP MODULES
→ CONTEXT
→ INSPECT
→ AUDIT
→ DEFINE PROBLEM
→ PRIORITIZE
→ DESIGN DECISION
→ CHANGE SCOPE
→ WRITE PERMISSION
→ IMPLEMENT WHEN AUTHORIZED
→ PROTOTYPE / STATE COVERAGE
→ VERIFY
→ DESIGN QA
→ VISUAL REGRESSION WHEN APPLICABLE
→ FIX LOOP
→ HANDOFF / EVIDENCE
→ PASS / FAIL / BLOCKED
```

## Stage 1 — Resolve task mode

Classify request as:

- INSPECT
- REVIEW
- EXPLORE
- CREATE
- MODIFY
- FIX
- QA
- HANDOFF

Natural language may be Thai or English.

Use `agent/bank-sop-router.json` for recurring shorthand.

## Stage 2 — Load SOP modules

Load only relevant modules.

### Inspect
- 01 Intake & Context
- 02 Inspect & Audit

### Audit UX/UI
- 01 Intake & Context
- 02 Inspect & Audit
- 07 Templates & Checklists

### Improve / Final Direction
- 02 Inspect & Audit
- 03 Design & Improve
- 04 Figma Implementation
- 06 Design QA & Handoff

### Search & Filter
- 02 Inspect & Audit
- 03 Design & Improve

### Prototype / States
- 05 Prototype, States & Edge Cases
- 04 Figma Implementation when writing
- 06 Design QA & Handoff

### Fix All
- 02 Inspect & Audit
- 04 Figma Implementation
- 06 Design QA & Handoff
- 08 Command Playbook

## Stage 3 — Context gate

Resolve:

- user goal
- business goal
- target
- current flow
- constraints
- source of truth
- protected scope
- unknowns

Do not guess UNKNOWN business logic.

## Stage 4 — Inspect gate

Inspect before recommendation or mutation.

Required minimum:

- IA
- hierarchy
- interaction
- state
- content
- DS usage
- responsive/accessibility risk
- edge cases

## Stage 5 — Audit and priority

Classify findings:

- P0 Blocking
- P1 Major
- P2 Moderate
- P3 Polish

Every finding must connect:

```text
Evidence → Problem → User Impact → Recommendation → Acceptance Criteria
```

## Stage 6 — Design decision

For material change, record:

- problem
- chosen pattern
- reason
- alternatives considered when relevant
- affected scope
- protected scope
- required states
- validation plan

Use `templates/bank-design-decision.md`.

## Stage 7 — Write gate

CREATE / MODIFY / FIX never means immediate write.

WRITE_ALLOWED still requires:

- explicit current-task write request
- target resolved
- reference gate valid
- Change Scope defined
- write capability available

If not satisfied, remain READ_ONLY / WRITE_PENDING.

## Stage 8 — Implementation

Follow `docs/figma-sop.md`.

Order:

```text
Structure
→ Layout
→ Component composition
→ Content
→ States
→ Visual polish
→ Prototype
→ Verification
```

Work incrementally.

## Stage 9 — State/prototype gate

Critical flows require more than Happy Path.

Cover, when applicable:

- loading
- empty
- no result
- invalid data
- error
- permission
- timeout
- conflict
- cancel
- back
- retry
- partial/incomplete
- success

Use `templates/bank-state-matrix.md`.

## Stage 10 — QA

Run:

1. requirement/reference
2. user goal
3. IA
4. hierarchy
5. interaction
6. state coverage
7. UX writing
8. Design System
9. responsive/accessibility
10. visual quality
11. prototype flow
12. regression
13. evidence

No PASS from metadata alone when visual claims are involved.

## Stage 11 — Fix loop

```text
Finding
→ Severity
→ Smallest valid patch
→ Verify
→ Re-run affected QA
→ Regression
→ Evidence
```

P0/P1 unresolved → no PASS.

## Stage 12 — Handoff

Include:

- final target
- flow
- state matrix
- components
- validation
- responsive rules
- accessibility
- edge cases
- business rules
- acceptance criteria
- known blockers

## Completion

Use exactly one:

- PASS
- FAIL
- BLOCKED
