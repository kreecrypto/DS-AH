# SOP-07 — Templates & Checklists

## 1. UX Audit finding

```markdown
### [Finding title]

Area:
Screen:
Severity: P0 / P1 / P2 / P3

Problem:
Evidence:
User impact:
Root cause:
Recommendation:
Acceptance criteria:
```

## 2. Old vs New comparison

```markdown
### [Area]

Old:
- 

New:
- 

Why:
- 

Expected improvement:
- 

Preserved:
- 
```

## 3. Design decision

```markdown
Decision:
Problem addressed:
Chosen pattern:
Reason:
Scope:
Protected areas:
Required states:
Design System assets:
Risks:
Validation:
```

## 4. State matrix

```markdown
| Screen/Component | Default | Loading | Empty | Error | Success | Disabled | Selected | Notes |
|---|---|---|---|---|---|---|---|---|
```

## 5. Search & Filter checklist

- [ ] searchable fields are clear
- [ ] search and filter have distinct roles
- [ ] filter taxonomy is understandable
- [ ] common filters prioritized
- [ ] selected filters visible
- [ ] clear/reset exists
- [ ] result count visible when useful
- [ ] no-result recovery exists
- [ ] loading/error handled
- [ ] mobile/compact behavior defined
- [ ] applied state persists intentionally

## 6. Form checklist

- [ ] fields ordered by user logic
- [ ] required fields clear
- [ ] helper text only where useful
- [ ] validation timing defined
- [ ] errors explain recovery
- [ ] disabled/read-only visually distinct
- [ ] destructive actions protected
- [ ] review/readback for high-risk submit
- [ ] back/cancel behavior defined
- [ ] data preservation behavior defined

## 7. Figma implementation checklist

Before:
- [ ] inspect exact target
- [ ] resolve reference
- [ ] capture baseline
- [ ] define scope
- [ ] inspect reusable assets
- [ ] define states

After:
- [ ] structure verified
- [ ] components verified
- [ ] tokens verified
- [ ] responsive risk checked
- [ ] visual evidence captured
- [ ] P0/P1 fixed
- [ ] protected area preserved

## 8. Dev handoff checklist

- [ ] final screen
- [ ] flow
- [ ] states
- [ ] interaction
- [ ] components
- [ ] responsive
- [ ] accessibility
- [ ] validation
- [ ] business rules
- [ ] edge cases
- [ ] acceptance criteria
- [ ] unresolved/blockers
