# Design Agent Deep Flow

Status: Active  
Applies to: DS-AH Design Agent  
Canonical full-write path: CREATE_SCREEN / MODIFY_SCREEN / FIX

## 0. Core rule

The Design Agent must not jump from a user request directly to Figma mutation.

Canonical full flow:

User Request  
→ Resolve Intent  
→ Load Agent Skills  
→ Figma Inspect  
→ Resolve Reference  
→ Design Decision  
→ Change Scope  
→ Write Permission  
→ Figma Execution Plan  
→ Mutation  
→ Verification  
→ Design QA  
→ Visual Regression  
→ Fix Loop  
→ Evidence  
→ Complete

Not every command executes every stage. Read-only commands skip write-only stages, but they must never skip required evidence or authority checks.

---

# Stage 01 — User Request

## Objective
Convert the raw user message into an explicit task envelope without prematurely deciding the design solution.

## Inputs
- user message
- supplied Figma URL/file/node
- supplied screenshots/files
- explicit constraints
- explicit references
- current task context only

## Extract
- requested action
- target artifact
- target file/node if supplied
- product/domain clues
- requested change
- preservation constraints
- explicit write language
- explicit exploration language
- requested output
- acceptance cues

## Do not infer
- business rules
- write permission
- source authority
- exact component identity
- Build Mode solely from "new screen/file"
- design solution

## Output — Task Envelope
- rawRequest
- requestedAction
- target
- constraints
- explicitReference
- explicitWriteSignal
- explicitExploreSignal
- requestedDeliverable

## Gate
TASK_PARSED

PASS when the task can be routed safely.  
BLOCKED only when the target/request is too incomplete to perform even safe inspection.

## Owner
Design Agent controller.

## Next
Resolve Intent.

---

# Stage 02 — Resolve Intent

## Objective
Classify what kind of design work is being requested and select the workflow.

## Supported intents
- INSPECT
- CREATE_SCREEN
- MODIFY_SCREEN
- REVIEW
- QA
- FIX
- COMPONENT
- HANDOFF

## Resolution order
1. explicit command/alias
2. explicit action language
3. target/action relationship
4. current-task context
5. unresolved

## Distinguish carefully

### CREATE
A new design composition is requested.

### MODIFY
An existing design must change while preserving unaffected areas.

### FIX
A known defect/finding is to be corrected. Route operationally through MODIFY + QA.

### REVIEW
Analyze and report. No mutation.

### QA
Verify against gates/evidence. No mutation unless separately rerouted to FIX.

### INSPECT
Read structure/evidence only.

## Also resolve
- product
- domain
- target candidate
- workflow
- default permission state

## Output
- command
- product/domain
- workflow
- targetCandidate
- defaultPermission
- unresolved routing facts

## Gate
INTENT_RESOLVED

BLOCKED if a wrong workflow choice could cause unsafe mutation and cannot be resolved.

## Owner
Intent Router + Product Router.

## Next
Load Agent Skills.

---

# Stage 03 — Load Agent Skills

## Objective
Load only the professional capabilities required by the resolved command and task conditions.

## Inputs
- command
- product/domain
- task characteristics
- skill router

## Base routing examples

### CREATE / MODIFY / FIX
Load:
- Figma Inspect
- Reference Resolution
- Information Architecture
- Interaction Design
- Design System Compliance
- UX Writing
- Visual Quality
- Responsive & Accessibility
- Figma Execution
- Design QA
- Reference Fidelity
- Visual Regression
- Fix Loop
- Evidence

### REVIEW
Load read-only review skills.

### QA
Load verification skills; do not load write permission from a skill.

## Conditional loading
Examples:
- complex prototype → Interaction Design
- component ownership issue → Design System Compliance
- responsive target → Responsive & Accessibility
- developer handoff requested → Developer Handoff

## Rules
- Skill loading never grants write permission.
- Load full production skill contract, not a summary.
- Record skill ID + version.
- Do not run irrelevant skills merely because they exist.

## Output
- loadedSkills[]
- versions
- conditionalReason
- skillDependencies

## Gate
SKILLS_READY

## Owner
Skill Router.

## Next
Figma Inspect.

---

# Stage 04 — Figma Inspect

## Objective
Build a verified model of the live target/reference before making design decisions.

## Mode
READ_ONLY

## Inspect in order

### A. Target identity
- file
- page
- node
- type
- dimensions
- role

### B. Structure
- hierarchy
- frames/sections
- Auto Layout
- constraints
- clipping
- hidden nodes
- repeated structures

### C. Design System identity
- instances
- components
- component sets
- variants/properties
- local vs remote
- variables/styles

### D. Content
- text hierarchy
- labels
- realistic wrapping pressure

### E. Interaction
- states
- prototype links
- overlays
- destinations

### F. Responsive evidence
- viewport variants
- reflow
- stack/wrap/hide/collapse

## Fact status
Every material observation is:
- VERIFIED_LIVE_FIGMA
- VERIFIED_REGISTRY
- VERIFIED_REFERENCE
- CONFLICT
- UNKNOWN

## Output
- inspectionEvidence
- exactNodeIds
- componentIdentity
- variableBindings
- layoutEvidence
- stateEvidence
- responsiveEvidence
- conflicts
- unknowns

## Gate
INSPECTION_READY

BLOCKED when a later decision requires evidence that cannot be safely obtained.

## Owner
Figma Inspect Skill + Figma capability.

## Next
Resolve Reference.

---

# Stage 05 — Resolve Reference

## Objective
Determine which source has authority and what Build Mode applies.

## Inputs
- Task Envelope
- product/domain
- inspection evidence
- explicit user reference
- Master/domain/Core registries
- source-priority policy

## Candidate classes
- exact user-approved reference
- current Product Master
- approved domain pattern
- Core DS
- existing target preservation baseline
- legacy
- archive
- reference-only
- experimental
- unknown

## Authority order
Default:
1. exact user-approved reference
2. current Product Master
3. approved domain pattern
4. Core DS
5. existing target as preservation evidence
6. legacy/archive/reference-only for context only

## Resolve Build Mode

### REPRODUCE
Approved matching design exists and no bounded change is requested.

### ADAPT
Approved baseline exists and the request is a bounded change.

### EXPLORE
Only when explicitly requested/authorized.

## Reference Gate
- PASS
- EXPLORE_EXPLICIT
- BLOCKED_REFERENCE_AMBIGUOUS
- BLOCKED_REFERENCE_MISSING

## Rules
- Blank/new target is not a reference.
- Visual similarity is not authority.
- Do not mix equal candidate Masters to bypass ambiguity.
- Reference PASS does not grant write permission.

## Output
- buildMode
- referenceGate
- selectedReference
- preservationBaseline
- rejectedCandidates
- authorityRationale

## Gate
REFERENCE_RESOLVED

## Owner
Reference Resolution Skill.

## Next
Design Decision.

---

# Stage 06 — Design Decision

## Objective
Convert verified task/reference evidence into one explicit design solution before touching the canvas.

## Inputs
- task
- reference authority
- Build Mode
- inspection
- applicable Agent Skills

## Decision dimensions

### Information Architecture
- task hierarchy
- grouping
- section order
- navigation
- search/filter/disclosure

### Interaction
- controls
- states
- transitions
- validation
- recovery
- destructive/async behavior

### Design System
- reused components
- component ownership
- variants/properties
- variables/styles
- new asset justification

### Content
- labels
- CTA
- status
- error/empty/loading/success content
- terminology

### Visual
- hierarchy
- composition
- density
- spacing
- typography
- color/surface
- iconography

### Responsive / Accessibility
- supported viewports
- reflow rules
- state/focus expectations
- non-color meaning

## Decision principle by Build Mode

### REPRODUCE
Decision is primarily preservation.

### ADAPT
Decision defines the smallest coherent delta.

### EXPLORE
Decision can create a new composition but still respects approved foundations/components unless explicitly changed.

## Acceptance criteria
Every material decision should translate into observable acceptance criteria.

Examples:
- Existing header remains unchanged.
- Five plans use one consistent horizontal card pattern.
- Selected state is visually distinct without relying on color alone.
- Card content wraps without clipping at supported width.

## Output — Design Decision
- designIntent
- iaDecision
- interactionDecision
- reusePlan
- contentDecision
- visualDecision
- responsiveDecision
- acceptanceCriteria
- knownUnknowns

## Gate
DESIGN_DECISION_READY

BLOCKED if the design would require inventing a material business rule.

## Owner
Design Agent + loaded Agent Skills.

## Next
Change Scope.

---

# Stage 07 — Change Scope

## Objective
Define exactly what may change and what must remain untouched.

## Inputs
- user request
- Design Decision
- target inspection
- baseline/reference

## Required scope fields

### Allowed Changes
Exact regions/properties/behaviors allowed to change.

### Protected Areas
Areas that must remain unchanged.

### Out of Scope
Related improvements that are intentionally excluded.

### Affected States
Default/selected/error/etc. included in the change.

### Affected Viewports
Desktop/mobile/tablet widths that are part of scope.

## Dependency rule
A dependent change is permitted only when necessary for the allowed change to remain structurally/systemically correct.

It must be:
- minimal
- explained
- verified

## Example
Request: "Make this card horizontal."

Allowed:
- target card internal layout
- dependent card height
- approved responsive behavior

Protected:
- page header
- navigation
- surrounding unrelated cards
- global tokens

Out of scope:
- redesign filter bar
- new visual style
- unrelated typography cleanup

## Output
- allowedChanges[]
- protectedAreas[]
- outOfScope[]
- affectedStates[]
- affectedViewports[]
- dependentChangeRules

## Gate
SCOPE_RESOLVED

FAIL if the proposed design requires unrelated redesign.  
BLOCKED if safe boundaries cannot be determined.

## Owner
Design Agent controller.

## Next
Write Permission.

---

# Stage 08 — Write Permission

## Objective
Decide whether the Agent may mutate Figma now.

## Permission states
- READ_ONLY
- INSPECT_ALLOWED
- WRITE_PENDING
- WRITE_ALLOWED
- WRITE_BLOCKED

## WRITE_ALLOWED requires all
1. explicit current-task Figma write signal
2. exact target resolved
3. Change Scope defined
4. Reference Gate = PASS or EXPLORE_EXPLICIT
5. Figma write capability available

## WRITE_BLOCKED examples
- ambiguous reference
- missing required reference
- unresolved target
- undefined scope
- unavailable write capability

## Important
These do NOT grant write:
- CREATE intent by itself
- prior approval from an old task
- reference PASS by itself
- GitHub contract state
- skill availability
- "this would be better"

## Output
- permissionState
- permissionEvidence
- missingGuards
- authorizedTarget
- authorizedScope

## Gate
WRITE_ALLOWED or READ_ONLY_ROUTE

For a write task without WRITE_ALLOWED: stop mutation path.

## Owner
Write Permission controller.

## Next
Figma Execution Plan for authorized write work.
Read-only flows route toward findings/QA/evidence.

---

# Stage 09 — Figma Execution Plan

## Objective
Translate the Design Decision into small node-level Figma operations.

## Inputs
- WRITE_ALLOWED
- Design Decision
- Change Scope
- Figma inspection
- DS reuse decisions

## For each operation define
- operationId
- target node/area
- operation type
- reason
- expected delta
- component/variable identity
- protected neighbors
- verification method
- execution batch

## Preferred operation order
1. set existing component property/variant
2. edit approved content
3. bind variable/style
4. adjust Auto Layout/property
5. swap approved component
6. adjust wrapper/composition
7. create justified new element
8. rebuild only if necessary

## Common operation types
- SET_PROPERTY
- SET_VARIANT
- SWAP_COMPONENT
- EDIT_TEXT
- BIND_VARIABLE
- UPDATE_AUTO_LAYOUT
- RESIZE
- MOVE
- CREATE_NODE
- CREATE_COMPONENT
- UPDATE_PROTOTYPE

## Batch rules
- incremental
- roughly ≤10 logical operations per write call
- structure before detail
- verify after meaningful structural batches
- do not build further on a known broken batch

## Output
- operationPlan[]
- executionBatches[]
- verificationPlan[]
- rollback/recovery notes where relevant

## Gate
EXECUTION_PLAN_READY

## Owner
Figma Execution Skill + Design Agent.

## Next
Mutation.

---

# Stage 10 — Mutation

## Objective
Execute only the approved operation plan on the authorized target/scope.

## Preconditions
- permission = WRITE_ALLOWED
- reference still valid
- target still valid
- scope still valid
- operation plan exists

## Execution rules
- work incrementally
- preserve component identity
- use Auto Layout for structural relationships
- preserve/bind approved variables/styles
- load fonts before text mutation
- return all created/mutated node IDs
- await async Figma operations
- stop when unexpected structural change is detected

## Minimum write result
- createdNodeIds[]
- mutatedNodeIds[]
- operationsCompleted[]
- warnings[]

## Mid-write checkpoint
After structural changes verify:
- target exists
- expected hierarchy
- no accidental detach
- Auto Layout intact
- protected region not touched

## Mutation failure
If tool errors:
- determine whether partial write occurred
- inspect before retry when uncertain
- target the smallest recovery change

## Output
- mutationResult
- affectedNodeIds
- executedOperations
- warnings/errors

## Gate
MUTATION_RECORDED

Tool success alone is not PASS.

## Owner
Figma capability under Figma Execution Skill.

## Next
Verification.

---

# Stage 11 — Verification

## Objective
Prove that the actual live Figma result matches the execution plan and did not cause unintended changes.

## Three verification layers

### Structural
Verify:
- expected nodes exist
- hierarchy
- component identity
- Auto Layout
- sizing
- variables/styles
- prototype destinations
- no accidental detach

### Visual
Verify:
- screenshot
- hierarchy
- spacing/alignment
- typography
- wrapping
- clipping/overlap
- states
- requested visual delta

### Scope
Verify:
- allowed areas changed
- protected areas unchanged
- dependent changes minimal
- no unrelated redesign

## Compare
Expected delta vs observed delta.

Classify mismatch:
- EXECUTION_DEFECT
- DESIGN_DECISION_GAP
- SCOPE_VIOLATION
- UNKNOWN

## Output
- verificationStatus
- structuralEvidence
- visualEvidence
- scopeEvidence
- mismatchRecords

## Gate
VERIFIED

PASS → Design QA.  
FAIL → Fix Loop or re-plan depending on root cause.  
BLOCKED → evidence/blocker path.

## Owner
Figma Inspect + Figma Execution + Visual Quality/DS as needed.

## Next
Design QA.

---

# Stage 12 — Design QA

## Objective
Evaluate the result against explicit quality gates.

## QA gates
- QA-01 Reference Fidelity
- QA-02 Design System Compliance
- QA-03 Information Architecture
- QA-04 Interaction / States
- QA-05 Responsive & Accessibility
- QA-06 Content QA
- QA-07 Visual Quality
- QA-08 Structural QA
- QA-09 Scope Integrity
- QA-10 Visual Regression

## Per-gate status
- PASS
- FAIL
- BLOCKED
- NOT_APPLICABLE

## Severity
- P0 critical
- P1 material
- P2 polish

## Defect record
- defectId
- gate
- severity
- location
- expected
- observed
- evidence
- rootCause
- requiredAction
- fixability

## Final QA rule
- any required BLOCKED → final BLOCKED
- otherwise any P0/P1 FAIL → FAIL / Fix Loop
- all required gates PASS → QA PASS
- P2 recorded separately

## Output
- gateMatrix
- defectRecords
- p2Polish
- qaResult

## Owner
Design QA Skill + specialist skills.

## Next
Visual Regression when applicable, otherwise Fix Loop/Evidence depending on result.

---

# Stage 13 — Visual Regression

## Objective
Detect unintended visual/structural changes against approved or preservation baselines.

## Required for
- REPRODUCE writes
- ADAPT writes
- MODIFY/FIX
- any task where before/after fidelity is required

## Baselines

### Authority baseline
Approved reference/Master.

### Preservation baseline
Pre-change target for unaffected areas.

## Compare equivalent
- viewport
- state
- content condition
- region

## Compare dimensions
- geometry
- spacing/alignment
- typography
- component identity/state
- color/surface
- content visibility
- responsive behavior
- clipping/overflow

## Difference classification
- EXPECTED_REQUESTED_CHANGE
- EXPECTED_DEPENDENT_CHANGE
- APPROVED_EXCEPTION
- REGRESSION_P0
- REGRESSION_P1
- POLISH_P2
- UNKNOWN_DIFFERENCE

## Output
- baselineEvidence
- resultEvidence
- differenceRecords
- regressionResult

## Gate
REGRESSION_PASS / FAIL / BLOCKED

## Owner
Visual Regression Skill.

## Next
Fix Loop if P0/P1; otherwise Evidence.

---

# Stage 14 — Fix Loop

## Objective
Correct fixable P0/P1 failures without expanding the original task.

## Entry conditions
- P0/P1 exists
- write permission remains valid
- failure is safely fixable

## Root-cause classes
- REFERENCE
- IA
- INTERACTION
- DESIGN_SYSTEM
- CONTENT
- VISUAL
- RESPONSIVE_ACCESSIBILITY
- STRUCTURE
- EXECUTION
- SCOPE
- UNKNOWN

## Fixability
- SELF_FIXABLE
- SCOPE_UPDATE_REQUIRED
- BUSINESS_DECISION_REQUIRED
- AUTHORITY_REQUIRED
- TOOL_BLOCKED

## Iteration
1. collect blocking defects
2. group by root cause
3. prioritize P0 then P1
4. choose smallest root-cause fix
5. check scope
6. re-check permission
7. execute fix
8. verify mutation
9. rerun failed gate
10. rerun dependent gates
11. rerun regression when needed
12. repeat

## Never
- downgrade severity to finish
- hide/delete failing content
- re-baseline against the failed result
- fix unrelated P2 first
- redesign protected areas

## Exit
PASS when no P0/P1 remains.  
BLOCKED when a safe fix requires unavailable authority/business/tool/scope decision.

## Output
- fixIterations[]
- resolvedDefects[]
- remainingDefects[]
- finalFixState

## Owner
Fix Loop Skill + root-cause specialist skill + Figma Execution.

## Next
Back to Design QA, then Regression as required.

---

# Stage 15 — Evidence

## Objective
Create the auditable record proving what the Agent did and why the final result is valid.

## Required evidence envelope
- command
- product/domain
- target
- loaded skills + versions
- inspection evidence
- Build Mode
- Reference Gate/source
- Design Decision
- Change Scope
- Write Permission
- Execution Plan
- affected node IDs
- verification evidence
- QA matrix
- regression
- fix iterations
- final result
- open gaps

## Evidence quality
- E0 claim only
- E1 indirect
- E2 direct inspection
- E3 comparative baseline/result
- E4 verified post-fix comparison

Reference-based write PASS should normally have E3/E4 evidence where applicable.

## Rules
- no PASS without evidence
- UNKNOWN is not PASS
- record conflicts
- record failed iterations
- tool-call success is not design proof

## Output
- Evidence Matrix
- provenance
- final audit envelope

## Gate
EVIDENCE_COMPLETE

## Owner
Evidence Skill.

## Next
Complete.

---

# Stage 16 — Complete

## Objective
Close the run with a precise final status and no hidden unresolved blocking issue.

## Final statuses

### PASS
Use when:
- requested work is complete
- required gates pass
- no unresolved P0/P1
- evidence complete
- regression passes when required

### FAIL
Use when:
- blocking defect remains
- work cannot be claimed correct
- issue is not being further fixed in the current authorized flow

### BLOCKED
Use when:
- missing authority
- missing business rule
- unavailable tool capability
- unresolved scope
- required evidence unavailable
prevents safe completion.

## Completion output
- finalResult
- concise change/result summary
- exact target
- important node IDs
- QA/regression status
- remaining P2
- blockers/open gaps

## Rule
"Done" is not a valid result without PASS/FAIL/BLOCKED evidence.

---

# Command-to-Stage Matrix

| Stage | INSPECT | REVIEW | CREATE | MODIFY/FIX | QA | HANDOFF |
|---|---:|---:|---:|---:|---:|---:|
| User Request | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Resolve Intent | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Load Agent Skills | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Figma Inspect | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Resolve Reference | conditional | conditional | ✓ | ✓ | ✓ | conditional |
| Design Decision | — | findings/solution | ✓ | ✓ | — | — |
| Change Scope | — | — | ✓ | ✓ | — | — |
| Write Permission | — | READ_ONLY | ✓ | ✓ | READ_ONLY | READ_ONLY |
| Execution Plan | — | — | ✓ | ✓ | — | — |
| Mutation | — | — | ✓ | ✓ | — | — |
| Verification | — | — | ✓ | ✓ | verification-only | source verification |
| Design QA | — | review checks | ✓ | ✓ | ✓ | conditional |
| Visual Regression | — | conditional | ✓ when applicable | ✓ | conditional | — |
| Fix Loop | — | — | if P0/P1 | if P0/P1 | — unless rerouted FIX | — |
| Evidence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Complete | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

# Failure / Return Paths

## Reference ambiguity
Resolve Reference  
→ BLOCKED_REFERENCE_AMBIGUOUS  
→ no write  
→ Evidence  
→ BLOCKED

## Missing explicit write permission
Write Permission  
→ WRITE_PENDING  
→ no mutation  
→ report what is ready / missing authorization  
→ Evidence

## Mutation mismatch
Mutation  
→ Verification FAIL  
→ classify root cause  
→ Fix Loop or Execution Re-plan  
→ Verification

## QA P0/P1
Design QA  
→ Fix Loop  
→ Verification  
→ Design QA  
→ Regression if applicable

## Regression P0/P1
Visual Regression  
→ Fix Loop  
→ Verification  
→ affected QA gates  
→ Visual Regression

## Unknown business behavior
Design Decision / QA / Fix Loop  
→ BLOCKED  
→ Evidence  
→ Complete as BLOCKED

---

# Canonical full-write success path

CREATE / MODIFY / FIX

1. TASK_PARSED  
2. INTENT_RESOLVED  
3. SKILLS_READY  
4. INSPECTION_READY  
5. REFERENCE_RESOLVED  
6. DESIGN_DECISION_READY  
7. SCOPE_RESOLVED  
8. WRITE_ALLOWED  
9. EXECUTION_PLAN_READY  
10. MUTATION_RECORDED  
11. VERIFIED  
12. QA_PASS  
13. REGRESSION_PASS  
14. FIX_LOOP_SKIPPED_OR_PASS  
15. EVIDENCE_COMPLETE  
16. PASS

This is the canonical Design Agent execution contract.
