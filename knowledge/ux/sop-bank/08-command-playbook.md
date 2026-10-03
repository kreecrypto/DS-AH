# SOP-08 — Bank Command Playbook

This playbook translates common short commands into an expected workflow.

## “Inspect”

Meaning:

- inspect exact target first
- understand page/flow context
- inspect IA, hierarchy, components, states, content
- do not mutate

Expected output:

- current structure
- key issues
- unknowns
- evidence

## “Audit UX/UI”

Meaning:

```text
Inspect
→ identify findings
→ classify P0–P3
→ explain user impact
→ propose fix
→ acceptance criteria
```

Do not return only visual opinions.

## “Improve”

Meaning:

- use validated findings
- change the smallest coherent scope
- preserve approved Design System
- include states and edge cases
- explain old vs new delta

## “Implement”

Meaning:

```text
Inspect
→ resolve reference
→ define scope
→ implement incrementally
→ verify
→ QA
→ evidence
```

Implementation is not complete at tool success.

## “Compare Old vs New”

Required dimensions:

- IA
- hierarchy
- interaction
- Search & Filter
- content
- states
- Design System
- visual clarity

Explain **what changed and why**.

## “Final Direction”

Meaning:

- converge from exploration
- make one coherent direction
- resolve contradictions
- complete required states
- prepare for prototype/QA

It does not mean visual polish only.

## “Review UX Writing”

Review:

- page title
- labels
- CTAs
- helper text
- errors
- empty state
- modal
- confirmation
- tone
- duplication

Prefer user language over system language.

## “Review Search & Filter”

Always inspect both as a system:

- search intent
- searchable attributes
- filter taxonomy
- filter control types
- applied states
- clear/reset
- result feedback
- no-result recovery
- mobile behavior

## “Make Prototype”

Do:

- link validated flow
- cover happy path
- cover material exceptions
- define Back/Cancel
- define modal behavior
- verify navigation

Do not create arbitrary links to make screens appear connected.

## “Fix All”

Meaning:

1. collect all known findings
2. deduplicate
3. order P0 → P3
4. identify dependencies
5. fix smallest coherent groups
6. verify after each group
7. rerun QA
8. report unresolved blockers

“Fix All” is not permission to redesign protected areas.

## “Make 3 Solutions”

Solutions must differ at the concept/workflow level, not just color/spacing.

Suggested pattern:

- A: minimum change
- B: optimized workflow
- C: structural alternative

Each solution includes:
- concept
- when useful
- trade-off
- key interaction
- impact on current system

## “Audit and Implement”

Treat as two explicit phases:

```text
Phase 1 — READ ONLY AUDIT
→ findings
→ design decision

Phase 2 — WRITE
→ scoped mutation
→ verification
→ QA
```

Never blend inspection and uncontrolled mutation.
