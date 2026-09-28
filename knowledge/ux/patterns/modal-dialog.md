---
id: UX-PATTERN-MODAL-DIALOG
element: Skeleton
category: pattern
---

# Modal / Dialog

## Use
Focused decision or short task that must temporarily interrupt the underlying context.

## Avoid
Long multi-step workflows, dense content, primary navigation, or tasks requiring frequent comparison with obscured background content.

## Rules
One clear purpose. Explicit title. Primary and secondary actions reflect consequences. Destructive actions require proportionate safeguards. Define dismiss behavior and unsaved-change behavior.

## States
Default, loading action, validation error, success transition, destructive confirmation, unavailable action.

## Accessibility
Move focus into the dialog, maintain logical focus containment where appropriate, provide an accessible name, support expected dismissal behavior, and restore focus meaningfully on close.
