# Figma SOP — Design Agent

Status: Active  
Scope: Figma capability layer for DS-AH Design Agent  
Default mode: READ_ONLY

## 1. Purpose

This SOP defines **how the Design Agent works with Figma**.

It does not replace Design Skills such as Information Architecture, Interaction Design, Design System Compliance, UX Writing, Visual Quality, Responsive & Accessibility, or Design QA.

**Agent Skills decide what should happen. Figma Skills inspect, execute, and verify that decision on the canvas.**

## 2. Responsibility split

### Agent Skills — THINK / DECIDE

Agent Skills own:
- reference/source authority
- IA
- interaction/state behavior
- design-system decisions
- content decisions
- visual quality
- responsive/accessibility decisions
- QA result
- regression classification
- fix decision
- evidence

Agent Skills must not contain low-level Figma mutation logic as their primary responsibility.

### Figma Skills — READ / WRITE / VERIFY

Figma capability owns:
- inspect nodes/pages
- inspect components/instances
- inspect variables/styles
- inspect Auto Layout and sizing
- inspect prototype/state evidence
- create/edit nodes
- swap components
- change properties/variants
- bind variables/styles
- create/update Auto Layout
- create prototype links when approved
- return changed node IDs
- inspect result after write
- capture visual evidence

Figma capability must not invent design decisions.

## 3. Mandatory operating flow

User Request  
→ Resolve Intent  
→ Load Agent Skills  
→ Figma Inspect  
→ Resolve Reference / Source  
→ Design Decision  
→ Change Scope  
→ Write Permission  
→ Figma Execution Plan  
→ Figma Mutation  
→ Figma Verification  
→ Design QA  
→ Visual Regression when applicable  
→ Fix Loop when needed  
→ Evidence  
→ Complete

Never skip directly from request to Figma mutation.

For the full stage-by-stage contract, use `docs/design-agent-flow.md`. The machine-readable equivalent is `agent/flow/design-agent-flow.json`.

## 4. Figma modes

### READ_ONLY

Use for:
- INSPECT
- REVIEW
- standalone QA
- source/reference resolution
- component/variable discovery
- pre-write inspection
- post-write verification

Allowed:
- metadata reads
- screenshots
- variable/component/library reads
- read-only Plugin API inspection

Not allowed:
- node mutation
- property changes
- text edits
- component swaps
- variable creation/update
- prototype changes

### WRITE_ALLOWED

Only when all controller guards pass:
- explicit current-task Figma write instruction
- exact target resolved
- Change Scope defined
- Reference Gate = PASS or EXPLORE_EXPLICIT
- write capability available

Reference PASS alone does not authorize write.

## 5. SOP-01 — Inspect first

Before creating or modifying anything:

1. Resolve exact file and node when supplied.
2. Open the exact supplied target/reference first.
3. Inspect structure before appearance.
4. Inspect existing components before creating replacements.
5. Inspect variables/styles before introducing raw values.
6. Inspect Auto Layout/constraints before changing geometry.
7. Inspect naming conventions before creating new nodes.
8. Inspect existing states/prototypes before adding behavior.
9. Record UNKNOWN when evidence is unavailable.
10. Confirm no canvas change occurred during inspection.

For a new/blank file, inspect the approved source/reference and subscribed design-system assets before design execution.

## 6. SOP-02 — Resolve before create

Before new UI is created, resolve:

- approved reference
- reusable component
- domain pattern
- Core DS component
- variable/style
- component ownership
- layout pattern

Preference:

1. approved instance/property change
2. component/variant reuse
3. approved domain composition
4. Core primitive composition
5. justified new asset

Do not rebuild an approved component because editing a raw frame is easier.

## 7. SOP-03 — Build a Figma execution plan

For each material write, define:

- target node/area
- operation
- expected result
- upstream Design Decision
- approved component/variable
- protected neighboring areas
- verification method

Examples of operations:
- SWAP_COMPONENT
- SET_VARIANT
- SET_PROPERTY
- EDIT_TEXT
- BIND_VARIABLE
- UPDATE_AUTO_LAYOUT
- RESIZE
- MOVE
- CREATE_FRAME
- CREATE_COMPONENT
- ADD_PROTOTYPE_LINK

Do not use a generic "redesign frame" operation when smaller operations can satisfy the task.

## 8. SOP-04 — Work incrementally

Figma writes must be incremental.

Guidelines:
- keep a write call to roughly 10 logical operations or fewer
- build structure before detail
- validate after each meaningful structural step
- fix a discovered problem before building more on top of it
- preserve stable node IDs when possible
- keep workflow state outside the Figma document

For large screens:
1. inspect
2. create/confirm skeleton
3. populate one region at a time
4. verify region
5. continue
6. final full-screen verification

## 9. SOP-05 — Auto Layout first for structural relationships

When children have a structural relationship, use Auto Layout rather than manual x/y positioning.

Use Auto Layout for:
- rows
- columns
- button groups
- form fields
- card content
- navigation groups
- repeated list rows
- grouped controls

Absolute positioning is acceptable only when intentional, such as:
- overlays
- decorative layers
- source-approved exceptions
- intentionally floating UI

### Sizing discipline

Distinguish:
- child sizing: FIXED / HUG / FILL
- Auto Layout frame axis sizing: FIXED / AUTO

Append a child to the correct Auto Layout parent before applying FILL/HUG behavior that depends on parent context.

## 10. SOP-06 — Component discipline

For instances/components:

- resolve actual component identity
- visible name is not identity proof
- preserve instance identity
- prefer semantic properties/variants
- do not detach for convenience
- do not create local copies of approved remote components
- do not invent placeholder property names
- preserve domain/Core ownership rules

When component identity is unresolved and materially affects execution, block rather than guess.

## 11. SOP-07 — Variable and style discipline

Prefer bound semantic variables/styles.

Do not:
- replace a bound variable with a raw value for convenience
- invent variable IDs/names
- create duplicate semantic tokens
- bind an unrelated token because the visual value matches

When creating variables:
- assign explicit scopes
- preserve collection/mode semantics
- verify resulting binding

## 12. SOP-08 — Text editing discipline

Before editing existing text:
1. identify text-capable node
2. inspect current font/style
3. load required font asynchronously
4. await font loading
5. mutate text/style
6. return mutated node ID
7. verify wrapping/clipping afterward

Never assume a font style name from memory.

For wrapping text:
- verify width is non-zero
- use content-appropriate text auto-resize behavior
- verify resulting line breaks visually

## 13. SOP-09 — Page discipline

Page context may reset between Figma execution calls.

Rules:
- resolve the target page each call
- switch pages using the supported asynchronous page-switch method
- switch page at most once per execution call
- split multi-page work into independent page-scoped operations
- do not assume the previous call's current page remains active

## 14. SOP-10 — Return affected node IDs

Every Figma mutation must return all created/mutated node IDs.

Minimum write result:

```json
{
  "createdNodeIds": [],
  "mutatedNodeIds": []
}
```

Add when useful:
- operation count
- component IDs
- variable IDs
- warnings
- verification status

A write without affected node IDs is incomplete for DS-AH audit purposes.

## 15. SOP-11 — Verify every material mutation

Tool success is not design success.

After mutation:

### Structural verification
Check:
- target nodes exist
- expected hierarchy
- expected component identity
- Auto Layout intact
- sizing behavior
- no accidental detach
- no unexpected hidden/clipped nodes

### Visual verification
Check:
- screenshot/result
- hierarchy
- spacing/alignment
- typography
- content wrapping
- state appearance
- no overlap/clipping
- requested delta is visible

### Scope verification
Check:
- allowed area changed
- protected areas unchanged
- dependent changes are minimal and documented

Do not report completion before verification.

## 16. SOP-12 — Screenshot rules

Use visual capture after:
- new screen skeleton milestone when appearance matters
- component creation
- major layout mutation
- state change
- responsive change
- final result

Use comparable viewport/state for regression evidence.

Metadata alone is insufficient for visual-quality claims.

## 17. SOP-13 — Error recovery

When a Figma operation errors:

1. Determine whether retry is safe without rereading canvas.
2. If safety is uncertain, inspect canvas first.
3. Identify whether partial mutation occurred.
4. Correct only the failed/affected part.
5. Do not recreate the full design unless required.
6. Verify after retry.

Never assume failed tool execution means zero canvas changes.

## 18. SOP-14 — Figma output channel discipline

For Plugin API execution:
- return structured results
- do not rely on console output
- do not rely on user notifications as execution evidence
- await asynchronous operations
- return actionable IDs and status

Execution scripts must terminate predictably.

## 19. SOP-15 — CREATE flow

CREATE_SCREEN:

1. Inspect destination and approved source.
2. Resolve reference and Build Mode.
3. Load Design Agent Skills.
4. Complete Design Decision.
5. Define Change Scope.
6. Confirm WRITE_ALLOWED.
7. Discover reusable components/variables.
8. Build Figma execution plan.
9. Create skeleton.
10. Verify skeleton.
11. Populate sections incrementally.
12. Verify each material section.
13. Run full-screen verification.
14. Run Design QA.
15. Run Reference Fidelity/Visual Regression when applicable.
16. Fix P0/P1.
17. Emit Evidence.

## 20. SOP-16 — MODIFY/FIX flow

MODIFY_SCREEN / FIX:

1. Inspect exact target.
2. Capture pre-change preservation baseline.
3. Resolve approved authority.
4. Build Mode defaults to ADAPT.
5. Define allowed/protected scope.
6. Confirm WRITE_ALLOWED.
7. Prefer property/variant/token changes over rebuild.
8. Make smallest coherent mutation.
9. Verify target.
10. Compare protected areas with baseline.
11. Run QA.
12. Run Visual Regression.
13. Fix P0/P1 within scope.
14. Emit Evidence.

Small change never authorizes surrounding redesign.

## 21. SOP-17 — REVIEW/QA flow

REVIEW and standalone QA are read-only.

Allowed:
- inspect
- screenshot
- compare
- record findings
- propose solution
- create acceptance criteria

Not allowed:
- mutate findings automatically

To apply findings:
REVIEW/QA  
→ user/current task authorizes fix  
→ reroute to MODIFY/FIX  
→ re-evaluate scope/permission  
→ execute  
→ QA again

## 22. SOP-18 — Completion criteria

A Figma write task is complete only when:

- requested change exists on canvas
- mutation was verified
- component/token integrity is acceptable
- protected scope is preserved
- relevant QA gates resolved
- regression passes when required
- no unresolved P0/P1 remains
- evidence includes changed node IDs

Final result:
- PASS
- FAIL
- BLOCKED

## 23. Hard prohibitions

Never:
- write before inspecting
- let Figma tooling invent the design decision
- treat a blank file as design authority
- detach instances for convenience
- replace approved variables with raw values without explicit migration
- use manual coordinates where structural Auto Layout is required
- invent node IDs/component keys/variable IDs
- invent prototype destinations
- silently expand scope
- continue building on a known broken structural state
- claim mutation success without post-write verification
- claim visual PASS from metadata alone
- mutate during REVIEW/standalone QA without rerouting and authorization

## 24. Pre-flight checklist

Before a Figma write:
- [ ] Agent Skills completed required design decisions
- [ ] exact target resolved
- [ ] approved source/reference resolved
- [ ] Build Mode resolved
- [ ] Change Scope defined
- [ ] permission = WRITE_ALLOWED
- [ ] reusable components/variables inspected
- [ ] node-level execution plan exists
- [ ] protected areas identified

Before completing:
- [ ] all created/mutated node IDs recorded
- [ ] structural verification complete
- [ ] visual verification complete
- [ ] protected areas checked
- [ ] QA run
- [ ] regression run when applicable
- [ ] P0/P1 resolved or genuine blocker recorded
- [ ] Evidence Matrix updated

## 25. Relationship to DS-AH Skills

This SOP governs the Figma capability layer.

### Agent Skills
- Reference Resolution
- Information Architecture
- Interaction Design
- Design System Compliance
- UX Writing
- Visual Quality
- Responsive & Accessibility
- Design QA
- Visual Regression
- Fix Loop
- Evidence

### Figma capability
- Figma Inspect
- Figma Resolve
- Figma Create/Modify
- Figma Component/Variable operations
- Figma Prototype operations
- Figma Verify

The Design Agent remains responsible for the final decision and QA result.


## 26. SOP-19 — Capture baseline before write

For CREATE/MODIFY/FIX, capture a material Baseline Fingerprint after inspection and before planning a write.

Baseline evidence should cover the target/reference properties that can invalidate the Design Decision or execution plan, such as identity, hierarchy, bounds, Auto Layout, component identity, variable bindings, viewport/state, and visual evidence.

The baseline is evidence, not a lock or Figma transaction version.

## 27. SOP-20 — Pre-write revalidation

Immediately before every write:

1. re-read material target/reference evidence
2. create fresh fingerprint
3. compare with baseline
4. classify CURRENT / STALE_BASELINE / BLOCKED

CURRENT → continue.  
STALE_BASELINE → stop write and return to Inspect.  
BLOCKED → no write; Evidence/Blocked.

Never silently refresh a stale baseline and continue with an old Design Decision.

## 28. SOP-21 — Mutation recovery

A tool error does not prove zero write.

On error/incomplete return/unexpected result:
- freeze later batches
- obey safe retry metadata when available
- inspect canvas when write state is uncertain
- classify NO_WRITE / PARTIAL_WRITE / UNKNOWN_WRITE / RECOVERED
- recover the smallest affected scope
- verify before continuing

Never assume transaction rollback exists.

Canonical machine policy: `agent/flow/mutation-recovery.json`.

## 29. SOP-22 — Resume / re-entry

When a run is BLOCKED but can later continue, Evidence must emit a resume checkpoint.

Resume at the earliest invalidated stage:
- Reference issue → Resolve Reference
- business decision → Design Decision
- scope update → Change Scope
- write authorization → Write Permission
- stale canvas → Figma Inspect
- tool restored → Pre-write Revalidation
- unknown mutation → Mutation Recovery
- missing QA evidence → Verification

Revalidate target/reference/baseline before reusing old context.

Canonical policy: `agent/flow/reentry-resume.json`.

## 30. SOP-23 — Specialized subflows

Use `docs/figma-specialized-subflows.md` and `agent/flow/specialized-subflows.json`.

Mandatory nested patterns exist for:
- COMPONENT
- PROTOTYPE
- MULTI_PAGE
- RESPONSIVE

They never bypass Reference, Scope, Permission, Pre-write Revalidation, Verification, QA, or Evidence.

## 31. SOP-24 — Phased QA and final aggregation

Post-write order is fixed:

Verification  
→ QA-01..QA-09  
→ QA-10 Visual Regression  
→ Final QA Aggregation.

QA-10 must not be marked PASS before Visual Regression actually runs.

After Fix Loop:
Fix  
→ Verification  
→ affected QA-01..QA-09  
→ QA-10  
→ Final QA Aggregation.

Fix Loop may never return directly to Complete/PASS.

## 32. Production write checklist

Before mutation:
- [ ] inspection evidence current
- [ ] baseline fingerprint captured
- [ ] Reference Gate eligible
- [ ] Design Decision ready
- [ ] Change Scope ready
- [ ] WRITE_ALLOWED
- [ ] Pre-write Revalidation = CURRENT
- [ ] operation plan ready

On mutation error:
- [ ] later batches frozen
- [ ] canvas state classified
- [ ] recovery verified before continuation

Before PASS:
- [ ] Verification PASS
- [ ] QA-01..QA-09 resolved
- [ ] QA-10 resolved or justified N/A
- [ ] Final QA Aggregation PASS
- [ ] every Fix Loop iteration re-entered full required QA
- [ ] Evidence complete
