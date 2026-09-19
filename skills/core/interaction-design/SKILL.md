---
id: interaction-design
version: 2.2.0
scope: core
category: ux-behavior
---

# Interaction Design Skill

## Mission
Define and verify how controls, states, transitions, validation, recovery, and feedback behave so the user can predict the result of every material action.

Interaction Design controls behavior, not visual decoration.

## Activate when
Use for CREATE/MODIFY/REVIEW/QA involving:
- forms
- buttons/actions
- dropdown/menu
- search/filter
- table actions
- selection
- tabs/accordions
- modal/drawer/popover
- multi-step flow
- navigation
- async operations
- destructive actions
- prototype flows

## Required inputs
- user/task goal
- approved interaction/reference pattern
- inspected controls/states
- business rules known from evidence
- Change Scope for MODIFY

## Interaction inventory
For every material interactive element record:
- element
- purpose
- trigger
- precondition
- default state
- possible states
- outcome
- failure/recovery
- focus/keyboard implications when relevant

## State model
Consider as applicable:
- default
- hover
- focus
- pressed
- selected
- expanded/collapsed
- disabled
- read-only
- loading
- empty
- error
- warning
- success
- partial/indeterminate
- dirty/unsaved

Do not require states that are irrelevant to the control/platform.

## Transition model
For each action define:
1. trigger
2. guard/precondition
3. immediate feedback
4. transition
5. destination/result
6. recovery path
7. persistence/unsaved implication when known

## Procedure
1. Inventory controls.
2. Map entry condition and completion condition.
3. Build state matrix.
4. Build transition matrix.
5. Check validation timing.
6. Check destructive action safety.
7. Check cancel/back/close semantics.
8. Check async feedback and retry.
9. Check overlays/dropdowns dismissal.
10. Check focus continuity and context preservation.
11. Check layout stability across state change.
12. Compare with approved product/Core interaction patterns.
13. Verify prototype links when live evidence exists.
14. In ADAPT, keep changes inside scope.

## Forms
Verify:
- persistent labels
- required/optional meaning
- validation timing appropriate to task
- field error connected to field
- summary/global error when needed
- disabled vs enabled behavior explainable
- submit prevents duplicate action
- dirty state/cancel behavior when data loss matters
- success confirmation is visible

Do not invent validation/business constraints.

## Modal / Drawer / Popover
Verify:
- entry trigger
- title/purpose
- primary/secondary actions
- close/dismiss behavior
- outside click / Esc only if supported by product pattern
- destructive/data-loss warning where needed
- return focus/context
- overflow/scroll boundaries

## Search / Filter
Verify:
- apply behavior (immediate vs explicit)
- active-state visibility
- clear/reset
- empty results
- loading
- retry/error
- persistence after navigation if evidenced
- filter count/chips where approved

## Tables / Lists
Verify:
- row selection vs navigation distinction
- bulk-action eligibility
- disabled bulk actions
- pagination/sort/filter consequences
- empty/loading/error states
- action feedback
- row-level destructive confirmation where needed

## Destructive actions
Require evidence for:
- what is destroyed
- whether reversible
- confirmation need
- consequence text
- success/failure feedback

Do not add confirmation to every destructive-looking action if approved policy says otherwise; flag uncertainty.

## Interaction Gate

### PASS
Every material action has a clear trigger, valid state, visible outcome, and recovery path where failure is possible.

### FAIL
Examples:
- action has no observable result
- required state missing
- selected/disabled/error state ambiguous
- cancel/back loses data unexpectedly
- destructive action lacks required safeguard
- async operation lacks loading/error/retry
- overlay has no reliable dismissal
- transition breaks user context

### BLOCKED
Use when behavior depends on unknown business rules and cannot be inferred from approved patterns.

## Anti-patterns
- using disabled controls as unexplained dead ends
- relying only on color for selected/error state
- changing geometry substantially between control states
- adding animation to compensate for unclear behavior
- inventing prototype destinations
- assuming desktop hover behavior on touch interfaces
- silently changing interaction semantics in a visual-only request

## Required evidence
- interaction inventory
- state matrix
- transition matrix
- validation/recovery decisions
- destructive-action handling
- async-state coverage
- overlay/navigation behavior
- prototype evidence
- scope impact
- interaction gate result
- unresolved rules

## Downstream handoff
Pass behavior/state requirements to UX Writing, Visual Quality, Responsive & Accessibility, Execution, QA, Handoff, and Evidence.
