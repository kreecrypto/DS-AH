---
id: UX-PATTERN-TABLE-LIST
element: Skeleton
category: pattern
---

# Table & List

## Use
Table for comparison across consistent attributes; list/card when scanning identity/status/action is more important than column comparison.

## Anatomy
Title/context, count, search/filter when needed, headers/labels, rows/items, selection, row action, bulk action, pagination/load strategy and states.

## Rules
Prioritize columns by task. Keep row identity clear. Align actions with scope. Separate row and bulk actions. Define sorting semantics. Preserve filters/sort/navigation context when returning from detail.

## States
Loading, populated, selected, filtered, empty, no-results, partial/error, permission-restricted.

## Large datasets
Do not solve scale by UI alone. Define server-side search/filter/sort/pagination where required. Communicate result limits and export behavior explicitly.

## Accessibility
Semantic table/list structure in implementation, keyboard reachable actions, non-color selection/status, clear sort state and meaningful labels.
