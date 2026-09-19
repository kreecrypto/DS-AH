---
id: interaction-design
version: 1.0.0
scope: core
---

# Interaction Design Skill

## Purpose
Define and review behavior, state transitions and user control before visual execution.

## Trigger
Mandatory for CREATE/MODIFY/REVIEW/QA when the screen contains interactive controls, forms, modal/drawer, search/filter, navigation, tables, menus, destructive actions, asynchronous states, or prototypes.

## Required inputs
- task/flow goal
- approved interaction pattern/reference
- visible controls and states
- platform constraints when known

## Procedure
1. Inventory interactive elements and their purpose.
2. Define entry condition and expected outcome.
3. Map states: default, hover, focus, pressed, selected, disabled, loading, empty, error, success as applicable.
4. Map transitions and triggers.
5. Check back/cancel/close behavior.
6. Check destructive actions for confirmation/recovery.
7. Check validation timing and error recovery.
8. Check async loading/retry/timeout behavior when relevant.
9. Check dropdown/modal/drawer dismissal and focus behavior.
10. Check whether interaction causes unexpected layout shift or lost context.
11. When prototype evidence exists, verify source-to-destination mapping.

## Interaction Gate
FAIL when:
- a required state has no defined behavior
- an action has no visible outcome
- destructive behavior lacks required confirmation/recovery
- cancel/back produces data loss without warning
- interaction state is visually or semantically ambiguous
- loading/error/retry path is missing for a relevant async action

## Hard rules
- Do not invent business rules from UI alone.
- Do not infer unsupported transitions.
- Prefer approved product/Core interaction patterns.
- Preserve state geometry where possible.
- Disabled is not a substitute for explaining unmet requirements when feedback is needed.

## Evidence
- interaction inventory
- state matrix
- transition/trigger mapping
- validation/recovery behavior
- prototype/flow evidence when available
- interaction gate result
