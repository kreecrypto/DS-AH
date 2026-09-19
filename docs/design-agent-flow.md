# Design Agent Production Flow v2.3

Status: Active  
Applies to: DS-AH Design Agent  
Purpose: Canonical production workflow for Figma design work

## Core principle

**Resolve → Inspect → Baseline → Decide → Scope → Authorize → Revalidate → Plan → Mutate → Recover if needed → Verify → QA-01..09 → QA-10 → Final QA → Fix Loop → Evidence → Complete**

A tool call is never a substitute for a design decision, verification, or QA result.

---

# Canonical write flow

User Request  
→ Resolve Intent  
→ Load Agent Skills  
→ Figma Inspect  
→ Capture Baseline  
→ Resolve Reference  
→ Design Decision  
→ Change Scope  
→ Write Permission  
→ **Pre-write Revalidation**  
→ Figma Execution Plan  
→ Mutation  
→ **Mutation Recovery if needed**  
→ Verification  
→ **QA-01..QA-09**  
→ **QA-10 Visual Regression**  
→ **Final QA Aggregation**  
→ Fix Loop when needed  
→ Evidence  
→ Complete

Conditional stages may be skipped only when their machine contract explicitly says NOT_APPLICABLE.

---

# Stage 01 — User Request

## Objective
Create a task envelope without solving the design prematurely.

## Extract
- requested action
- target artifact/file/node
- constraints
- preservation requirements
- explicit reference
- explicit write signal
- explicit exploration signal
- requested deliverable
- acceptance cues

## Never infer here
- source authority
- write permission
- component identity
- business rules
- design solution

## Output
Task Envelope.

## Gate
TASK_PARSED.

---

# Stage 02 — Resolve Intent

## Intents
INSPECT / REVIEW / QA / HANDOFF / COMPONENT / CREATE_SCREEN / MODIFY_SCREEN / FIX(alias of modify).

Resolve command, workflow, product/domain, target candidate, and default permission.

Wrong workflow selection is blocking when it could cause unsafe mutation.

---

# Stage 03 — Load Agent Skills

Load only required professional skill contracts and record versions.

Skills never grant write permission.

CREATE/MODIFY/FIX load full design + execution + QA pipeline.
COMPONENT uses the explicit component subflow.
Prototype/responsive complexity activates the corresponding specialist path.

---

# Stage 04 — Figma Inspect

Mode: READ_ONLY.

Inspect exact target/reference first:
- file/page/node identity
- hierarchy
- Auto Layout/constraints
- components/instances/variants
- variables/styles
- content/typography
- state/prototype evidence
- responsive evidence

Facts must be tagged VERIFIED / CONFLICT / UNKNOWN.

Unknown is not PASS.

---

# Stage 05 — Capture Baseline

## Why
A later write must prove that the canvas it plans to edit is still the canvas that was inspected.

## Capture
Create a Baseline Fingerprint containing enough material evidence to detect decision-invalidating change:
- fileKey/nodeId/pageId
- node type
- parent identity
- bounds/dimensions
- child count when meaningful
- Auto Layout/material structure
- component identity
- important variable bindings
- viewport/state
- screenshot/metadata evidence refs

## Baseline types
- Authority baseline: approved Master/reference.
- Preservation baseline: pre-change target/protected area.
- Responsive baseline: one per supported viewport/state where required.

## Rule
Do not claim transaction/version semantics that Figma does not expose. This fingerprint is an evidence comparison contract, not a database lock.

---

# Stage 06 — Resolve Reference

Resolve candidate authority and Build Mode.

Authority default:
1. exact user-approved reference
2. current Product Master
3. approved domain pattern
4. Core DS
5. existing target as preservation evidence
6. legacy/archive/reference-only as context

Reference Gate:
PASS / EXPLORE_EXPLICIT / BLOCKED_REFERENCE_AMBIGUOUS / BLOCKED_REFERENCE_MISSING.

Reference PASS never grants write permission.

---

# Stage 07 — Design Decision

Synthesize:
- IA
- interaction/states
- DS reuse/ownership
- content
- visual hierarchy/composition/density
- responsive/accessibility
- acceptance criteria

REPRODUCE = preserve.
ADAPT = smallest coherent delta.
EXPLORE = explicit new direction, still respecting approved foundations unless in scope.

If a material business rule must be invented, BLOCKED.

---

# Stage 08 — Change Scope

Required:
- allowedChanges
- protectedAreas
- outOfScope
- affectedStates
- affectedViewports
- dependentChangeRules

A dependent change is allowed only when necessary, minimal, documented, and verified.

Visual polish never expands scope by itself.

---

# Stage 09 — Write Permission

WRITE_ALLOWED requires all:
1. explicit current-task write signal
2. target resolved
3. scope resolved
4. Reference Gate PASS or EXPLORE_EXPLICIT
5. Figma write capability available

Otherwise remain READ_ONLY / WRITE_PENDING / WRITE_BLOCKED.

Previous-task authorization does not carry forward automatically.

---

# Stage 10 — Pre-write Revalidation

## Purpose
Protect against stale canvas/reference evidence between Inspect and Mutation.

Immediately before write:
1. re-read material target/reference evidence
2. produce fresh fingerprint
3. compare with baseline
4. determine whether any difference invalidates:
   - reference authority
   - Design Decision
   - Change Scope
   - component/token identity
   - execution plan

## Results

### CURRENT
No decision-invalidating change. Continue.

### STALE_BASELINE
Material change exists.

Route:
STALE_BASELINE
→ no write
→ Figma Inspect
→ Capture Baseline
→ revalidate Reference
→ revalidate Design Decision
→ revalidate Scope
→ re-evaluate Permission
→ Pre-write Revalidation again.

Do not simply refresh the baseline and continue; that would hide concurrent change.

### BLOCKED
Fresh comparison cannot be established safely.

Emit Evidence and Block.

## Required for
Every CREATE/MODIFY/FIX write.

---

# Stage 11 — Figma Execution Plan

Translate design into node-level operations:
- operationId
- target node/area
- operation type
- expected delta
- approved component/variable
- protected neighbors
- verification method
- batch

Preferred order:
property/variant → content → variable/style → Auto Layout → component swap → composition → justified creation → rebuild only if necessary.

Execution is incremental; roughly ten logical operations or fewer per write call is the default safety target.

---

# Stage 12 — Mutation

Preconditions:
- WRITE_ALLOWED
- Pre-write Revalidation CURRENT
- operation plan exists
- target/scope/reference still valid

Rules:
- preserve identity
- Auto Layout for structural relationships
- approved variable/style bindings
- load fonts before text mutation
- await async calls
- return ALL created/mutated node IDs
- stop on unexpected structure

Tool success only means the call returned; it does not mean design correctness.

---

# Stage 13 — Mutation Recovery

Enter when:
- write tool errors
- timeout
- incomplete affected-node return
- unexpected node state
- write outcome cannot be proven

## First rule
Freeze later execution batches.

## Canvas write-state classification

### NO_WRITE
Direct evidence proves no planned mutation reached canvas.

A corrected retry may occur only after scope/permission/target are still valid.

### PARTIAL_WRITE
Some operations reached canvas.

Required:
- inspect actual target
- compare with pre-batch baseline
- identify exact applied vs unapplied operations
- create smallest recovery plan
- recover/correct
- verify before continuing

### UNKNOWN_WRITE
Cannot prove whether mutation occurred.

Mandatory read-only canvas inspection before any retry.

### RECOVERED
Canvas has been corrected into a verified coherent state.

Route to Verification.

## Never assume
- tool error = zero canvas changes
- automatic transaction rollback exists
- rebuilding the whole frame is safer than targeted recovery

## Block when
- protected-area state cannot be proven
- target is lost
- recovery requires unauthorized scope expansion
- write permission no longer valid
- capability unavailable

---

# Stage 14 — Verification

Three layers:

## Structural
node existence, hierarchy, component identity, Auto Layout, sizing, variable/style bindings, prototype destination, no accidental detach.

## Visual
screenshot, hierarchy, spacing, typography, wrapping, state appearance, overlap/clipping, expected visual delta.

## Scope
allowed areas changed; protected areas stable; dependent changes minimal/documented.

Mismatch classification:
EXECUTION_DEFECT / DESIGN_DECISION_GAP / SCOPE_VIOLATION / UNKNOWN.

FAIL may enter Fix Loop or re-plan depending on root cause.
BLOCKED routes to Evidence.

---

# Stage 15 — QA Pre-Regression

This stage owns **QA-01 through QA-09 only**.

1. QA-01 Reference Fidelity
2. QA-02 Design System Compliance
3. QA-03 Information Architecture
4. QA-04 Interaction / States
5. QA-05 Responsive & Accessibility
6. QA-06 Content QA
7. QA-07 Visual Quality
8. QA-08 Structural QA
9. QA-09 Scope Integrity

Record statuses and evidence.

**Do not compute final QA yet.**
QA-10 has not happened.

---

# Stage 16 — QA-10 Visual Regression

Run after QA-01..09 resolve.

Compare:
- authority baseline
- preservation baseline for MODIFY/FIX
- result

Use equivalent viewport/state/content condition.

Classify:
EXPECTED_REQUESTED_CHANGE / EXPECTED_DEPENDENT_CHANGE / APPROVED_EXCEPTION / REGRESSION_P0 / REGRESSION_P1 / POLISH_P2 / UNKNOWN_DIFFERENCE.

QA-10:
PASS / FAIL / BLOCKED / NOT_APPLICABLE with rationale.

---

# Stage 17 — Final QA Aggregation

Only this stage computes the final QA result.

## Preconditions
- QA-01..QA-09 all have statuses
- QA-10 has status or justified NOT_APPLICABLE
- required evidence exists

## Calculation
- any required BLOCKED → BLOCKED
- otherwise any required FAIL → FAIL
- otherwise PASS
- P2 remains separate

If FAIL contains safely fixable P0/P1 and WRITE_ALLOWED remains valid → Fix Loop.

This closes the ordering defect where QA could previously include QA-10 before regression had actually run.

---

# Stage 18 — Fix Loop

Entry:
- final QA has P0/P1
- issue is safely fixable
- write permission remains valid

Loop:
1. group defects by root cause
2. prioritize P0 then P1
3. define smallest fix
4. check scope
5. re-check permission
6. Pre-write Revalidation when canvas/reference may have changed since last verified write
7. execute fix
8. verify mutation

## Mandatory return path

Fix Loop  
→ Verification  
→ affected QA-01..09  
→ QA-10  
→ Final QA Aggregation.

Never:
- return directly from Fix Loop to PASS
- skip QA-10 because the original regression already ran
- re-baseline against the failed result
- downgrade severity to exit

Repeat until PASS or genuine BLOCKED.

---

# Stage 19 — Evidence

Required envelope:
- command/product/domain/target
- loaded skills/versions
- inspection
- baseline fingerprint
- Reference Gate/source
- Design Decision
- Change Scope
- permission
- pre-write revalidation result
- execution plan
- mutation + affected node IDs
- recovery record when used
- verification
- QA-01..09
- QA-10
- Final QA
- Fix Loop iterations
- resume checkpoint when blocked/resumable
- final result/open gaps

No PASS without evidence.

---

# Stage 20 — Complete

Final result:
PASS / FAIL / BLOCKED.

PASS requires complete applicable flow and evidence.
BLOCKED should emit a resume checkpoint whenever the blocker can later be resolved.

---

# Resume / Re-entry

A BLOCKED run is complete for audit purposes, but a later user/tool resolution can start a new run using the previous checkpoint.

The new run must:
1. validate checkpoint
2. verify target still exists
3. determine which previous evidence is still valid
4. revalidate stale baseline if any canvas change may have occurred
5. resume at the earliest invalidated stage

## Resume mapping

- Reference ambiguous/missing → RESOLVE_REFERENCE
- Business decision supplied → DESIGN_DECISION
- Scope approval/update → CHANGE_SCOPE
- Explicit write authorization supplied → WRITE_PERMISSION
- Stale baseline → FIGMA_INSPECT
- Restored tool capability → PRE_WRITE_REVALIDATION
- Unknown partial mutation → MUTATION_RECOVERY
- Missing QA evidence supplied/restored → VERIFICATION

Do not restart from User Request unless task intent/target itself changed materially.

---

# Specialized Subflows

Canonical definitions: `agent/flow/specialized-subflows.json` and `docs/figma-specialized-subflows.md`.

Specialized subflows are nested paths, not permission bypasses.

## COMPONENT
Read-only resolution by default. Any mutation reroutes to MODIFY/FIX.

## PROTOTYPE
Requires source + destination + interaction decision + scope + permission. Verify trigger/action/destination and recovery/back/close behavior.

## MULTI_PAGE
Discover pages first. One page switch per execution call. Each page has page-scoped target/scope/baseline/verification. Global PASS only after all required page operations pass.

## RESPONSIVE
Resolve supported viewports from evidence. Baseline and regression are viewport/state specific. Never invent breakpoints.

---

# Command Stage Rules

## INSPECT
Request → Intent → Skills → Inspect → Evidence → Complete.

## REVIEW
Request → Intent → Skills → Inspect → Baseline as needed → Reference → Review/Decision → QA-01..09 → QA-10 when comparison applies → Final QA → Evidence → Complete.

## CREATE / MODIFY / FIX
Full 20-stage write flow.

## QA
Request → Intent → Skills → Inspect → Baseline → Reference → Verification → QA-01..09 → QA-10 → Final QA → Evidence → Complete.

## HANDOFF
Read-only verified source path.

## COMPONENT
Explicit read-only component machine path. Mutation is rerouted to MODIFY/FIX.

---

# Production invariants

- No mutation before inspection.
- No write without explicit permission.
- Every write gets pre-write revalidation.
- Stale baseline forces re-inspection.
- Mutation error freezes later batches until canvas state is classified.
- QA-01..09 always precede QA-10.
- Final QA always follows QA-10 or justified N/A.
- Fix Loop always returns through Verification and affected QA.
- Resumable blocker emits checkpoint.
- Specialized subflow cannot bypass parent guards.
- No PASS without evidence.
