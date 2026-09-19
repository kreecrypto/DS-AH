# Workflow — COMPONENT v2.1

Use for component resolution, API audit, normalization or controlled component change planning.

## Default control mode
READ_ONLY. A component mutation must be rerouted/authorized as MODIFY with scope and permission.

## Decision tree
1. Exact approved Core component exists → REUSE.
2. Approved component supports required semantic variant/property → EXTEND only if ownership permits.
3. Same semantic component duplicated locally → resolve canonical owner and aliases.
4. Visual similarity with different business semantics → keep distinct.
5. One-off composition → SCREEN_ONLY, do not promote.
6. Ambiguous state/variant meaning → REVIEW_REQUIRED.

## Required checks
- exact published identity/key where available
- owner: Core / Domain / Screen
- semantic name
- semantic properties/variants
- state coverage
- responsive behavior
- interaction contract
- content constraints
- accessibility implications
- dependency/token bindings

## Output
Component decision + evidence. Do not mutate solely because COMPONENT intent was detected.
