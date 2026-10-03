# SOP-01 — Intake & Context

## Goal

Resolve what is being designed, why it matters, who uses it, what may change, and what must be preserved before UI work begins.

## 1. Intake checklist

Capture:

- target product / feature
- target screen / flow
- user type
- user goal
- business goal
- current problem
- task trigger
- expected outcome
- known constraints
- existing Design System
- approved Figma/reference
- device / viewport
- data dependencies
- technical constraints
- deadline/review context when relevant

Unknown information should be marked **UNKNOWN**, not guessed.

## 2. Context resolution

For an existing product:

1. Inspect the supplied target first.
2. Identify upstream and downstream screens.
3. Identify how the user arrives.
4. Identify what the user expects after the task.
5. Identify related patterns in the same product.
6. Identify reusable components.
7. Identify protected areas that should not change.

For a new feature:

1. Define user problem.
2. Define success.
3. Resolve system/product constraints.
4. Find approved patterns.
5. Define minimum complete flow.
6. List required states and edge cases.

## 3. Problem statement

Use:

```text
[User] needs to [goal]
when [context/trigger]
but currently [problem]
which causes [impact].
```

A UI symptom is not automatically the root problem.

## 4. Scope model

Classify each area as:

- IN SCOPE
- DEPENDENT CHANGE
- PROTECTED
- OUT OF SCOPE
- UNKNOWN

Small requested changes do not authorize a surrounding redesign.

## 5. Evidence hierarchy

Prefer:

1. exact current-task user reference
2. current approved product screen
3. product/domain Design System
4. approved internal pattern
5. validated UX pattern
6. new exploration

Do not replace an exact supplied reference with a generic preferred pattern without an explicit reason.

## 6. Output

Before moving to Inspect/Audit, produce:

- resolved target
- user goal
- problem statement
- constraints
- scope
- reference/source
- unknowns
- evidence required next
