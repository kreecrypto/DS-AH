# SOP-02 — Inspect & Audit

## Goal

Understand the current experience before proposing changes.

## 1. Inspect order

Inspect in this order:

1. Page / flow context
2. Information architecture
3. User journey
4. Screen hierarchy
5. Primary task
6. Search / filter / sort
7. Forms and controls
8. Interaction and state
9. UX writing
10. Design System usage
11. Responsive behavior
12. Accessibility
13. Visual quality
14. Edge cases
15. Prototype/linking evidence

## 2. IA audit

Check:

- grouping
- naming
- ordering
- navigation depth
- discoverability
- duplication
- cross-screen consistency
- whether categories match user mental model

Finding format:

```text
Finding:
Evidence:
User impact:
Severity:
Recommendation:
Acceptance criteria:
```

## 3. Hierarchy audit

Check:

- page title and context
- primary vs secondary action
- visual priority
- scan path
- card/table density
- alignment
- spacing rhythm
- section boundaries
- repeated competing emphasis

Ask: “Within 3–5 seconds, can the user identify what this page is for and what action matters most?”

## 4. Search audit

Check:

- search target is clear
- placeholder explains searchable attributes when needed
- search does not compete with unrelated filters
- clear/reset behavior
- query persistence
- no-result state
- loading behavior
- typo/partial matching expectations
- result count
- applied query visibility

## 5. Filter audit

Check:

- filter taxonomy
- control type fits data
- single vs multiple selection
- selected state visibility
- Apply vs instant apply behavior
- Clear / Reset
- default values
- dependent filters
- result count preview
- empty/no-result recovery
- mobile behavior
- overflow for many filters

Filter must help the user narrow data, not create another navigation system.

## 6. Form audit

Check:

- field order
- required vs optional
- labels
- validation timing
- helper text
- defaults
- disabled/read-only distinction
- destructive action protection
- save/continue enablement
- error recovery
- review/readback before high-risk submit

## 7. UX writing audit

Review:

- page titles
- labels
- CTA verbs
- helper text
- empty states
- error messages
- confirmation messages
- modal titles
- destructive warnings

Writing should explain the user action and consequence, not internal system terminology.

## 8. State audit

Minimum states when applicable:

- default
- hover/focus
- active
- selected
- disabled
- loading
- success
- error
- empty
- no result
- partial/incomplete
- offline/timeout
- permission denied

## 9. Audit report structure

Group findings by zone or task, not random observations.

Recommended order:

- Executive summary
- Critical flow
- IA
- Search & Filter
- Interaction
- Content
- Design System
- Accessibility/Responsive
- Visual
- State coverage
- Prioritized findings
- Acceptance criteria
