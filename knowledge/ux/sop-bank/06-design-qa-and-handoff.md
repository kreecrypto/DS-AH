# SOP-06 — Design QA & Dev Handoff

## Goal

Verify the design and make implementation intent unambiguous.

## 1. QA order

Run:

1. Reference / requirement fidelity
2. User goal
3. IA
4. Hierarchy
5. Interaction
6. State coverage
7. Content / UX writing
8. Design System compliance
9. Responsive / accessibility
10. Visual quality
11. Prototype flow
12. Regression
13. Evidence

## 2. QA result

Each finding must be:

- PASS
- FAIL
- BLOCKED
- N/A

Avoid “looks okay” as QA evidence.

## 3. Design System QA

Check:

- correct components
- correct variants
- correct tokens
- no accidental detach
- consistent sizing
- approved icon family
- naming
- spacing
- typography
- semantic states

## 4. Accessibility QA

At minimum check:

- contrast
- text size/readability
- keyboard/focus intent where relevant
- touch target
- labels
- form association
- error communication
- color is not sole signal
- modal focus/close behavior
- responsive zoom/reflow risk

## 5. Responsive QA

Check:

- container width
- wrapping
- table overflow
- filter collapse
- navigation behavior
- modal/drawer sizing
- sticky/fixed elements
- CTA visibility
- text truncation
- chart/data readability

## 6. Visual QA

Check:

- alignment
- spacing rhythm
- typography hierarchy
- consistent radius
- borders/dividers
- icon alignment
- density
- repeated element consistency
- empty space
- clipping
- overlap

## 7. Fix loop

```text
Finding
→ classify severity
→ patch smallest valid scope
→ verify
→ rerun affected QA
→ regression check
→ update evidence
```

Do not fix one issue by creating another inconsistency.

## 8. Dev handoff package

Include:

- final Figma screen/frame
- flow
- state matrix
- component/variant notes
- responsive behavior
- content rules
- validation rules
- data assumptions
- edge cases
- analytics/event requirements when relevant
- acceptance criteria
- known limitations

## 9. Handoff acceptance criteria

A developer should be able to answer:

- What is the primary task?
- Which component/state is used?
- What happens on click/input?
- What happens when data is empty/loading/error?
- What happens on smaller viewport?
- Which rules are business logic vs presentation?
- What is considered done?

If these cannot be answered from design + documentation, handoff is incomplete.
