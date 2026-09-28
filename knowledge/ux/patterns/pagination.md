---
id: UX-PATTERN-PAGINATION
element: Skeleton
category: pattern
---

# Pagination & Large Result Navigation

## Decision
Use pagination when users benefit from stable boundaries, orientation, revisiting results or server-side scale. Consider incremental loading for exploratory feeds where position precision is less important.

## Rules
Show current position/context, preserve filters and sort, make next/previous predictable, avoid losing context after detail navigation.

## Scale
Define total/count semantics, maximum display limits, query constraints and export paths. A display limit must not remove the user's ability to locate and act on an individual record.

## Accessibility
Clear control names, current page indication, keyboard access and predictable focus after navigation.
