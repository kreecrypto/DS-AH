# SOP-03 — Design & Improve

## Goal

Turn validated findings into coherent design changes without unnecessary redesign.

## 1. Start from findings

Every material change should map to:

- a user problem
- a finding
- a requirement
- an approved direction

Do not redesign areas just because they can look better.

## 2. Solution framing

For each problem define:

```text
Problem
→ UX principle
→ Design decision
→ Expected user effect
→ Scope
→ Required states
→ Validation
```

## 3. Exploration

When multiple solutions are useful, explore meaningfully different directions.

Example:

- Direction A — minimal change / low disruption
- Direction B — workflow optimization
- Direction C — structural redesign

Do not create three cosmetic variants of the same idea.

## 4. Old vs New compare

Compare using consistent dimensions:

| Area | Old | New | Why it changed |
|---|---|---|---|
| IA | | | |
| Search | | | |
| Filter | | | |
| Hierarchy | | | |
| Interaction | | | |
| States | | | |
| Content | | | |
| Visual | | | |

Explain the design delta in user terms.

## 5. Search & Filter improvement pattern

Recommended order:

1. Identify what users search for.
2. Separate free-text search from structured filters.
3. Prioritize frequent filters.
4. Hide advanced filters until needed.
5. Make applied filters visible.
6. Show result impact.
7. Provide clear/reset.
8. Design zero-result recovery.
9. Verify mobile/compact behavior.

## 6. Data-limit / large-list pattern

When a system cannot reasonably display or edit all records at once:

1. Explain the limit.
2. Preserve the user's goal.
3. Provide refinement/filtering.
4. Show result count.
5. Separate browse/edit from bulk export.
6. Define large-result behavior.
7. Define single-record recovery if individual editing remains required.
8. Show processing and export states.

Avoid a dead-end message that only says “too many results.”

## 7. Complex workflow pattern

For flows such as case creation, onboarding, approval, renewal, or multi-step tasks:

- define step goal
- define entry criteria
- define completion criteria
- identify optional/conditional branches
- define Back behavior
- preserve entered data where appropriate
- define validation timing
- define review/readback
- define cancel/recovery
- define alternate/exception paths

## 8. Visual improvement

Visual polish should improve:

- hierarchy
- grouping
- readability
- density
- alignment
- consistency

Visual polish must not silently change business behavior.

## 9. Acceptance criteria

Every improved feature should have observable criteria.

Example:

```text
Given a user has selected 3 filters
When results refresh
Then all applied filters remain visible,
the updated result count is shown,
and the user can clear one filter without resetting the others.
```
