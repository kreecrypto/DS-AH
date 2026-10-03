# SOP-05 — Prototype, States & Edge Cases

## Goal

Design how the product behaves, not only how screens look.

## 1. Flow model

Every key flow should define:

```text
Entry
→ Action
→ System response
→ User decision
→ Next state
→ Success / Recovery / Exit
```

## 2. Happy path

The happy path must include:

- clear entry
- clear primary action
- feedback after action
- clear progression
- completion confirmation
- expected next step

## 3. Exception paths

For each critical task consider:

- missing required data
- invalid data
- duplicated data
- no search result
- too many results
- permission restriction
- timeout
- backend error
- stale data
- interrupted flow
- user cancels
- user goes back
- partial save
- destructive action
- alternative route

## 4. State matrix

Use:

| Component/Screen | Default | Loading | Empty | Error | Success | Disabled | Selected | Edge |
|---|---|---|---|---|---|---|---|---|

State coverage should be explicit before handoff.

## 5. Prototype linking

Prototype only validated transitions.

Do not invent destinations because a screen visually appears related.

Each interaction should define:

- trigger
- destination
- transition
- condition
- data/state change
- back behavior

## 6. Modal / drawer / popover rule

For transient UI define:

- why it opens
- what context remains visible
- dismissal
- Esc/back behavior where applicable
- destructive safety
- submit/loading state
- success/failure behavior
- focus behavior

## 7. Multi-account / conflicting-state pattern

When one device/session can involve multiple accounts or identities:

- clearly state active account
- explain conflict
- prevent accidental cross-account action
- define switch behavior
- preserve or discard in-progress data intentionally
- make the consequence explicit

## 8. Completion gate

A prototype is not complete if only the happy path is linked while critical error/exception behavior is undefined.
