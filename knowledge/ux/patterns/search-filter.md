---
id: UX-PATTERN-SEARCH-FILTER
element: Skeleton
category: pattern
---

# Search & Filter

## Purpose
Help users locate known items or progressively narrow a large dataset while preserving context.

## Use when
Large datasets, member/customer lists, admin tables, transactions, multi-attribute collections.

## Avoid when
The collection is small enough to scan, or filters introduce more complexity than the dataset.

## Rules
Keep search and filter semantics distinct. Show active filters and result count. Provide clear/reset. Preserve applied criteria when navigating to an item and back when appropriate. Explain zero results and provide a recovery action.

## States
Default, focused/typing, loading, filtered, no results, error, disabled, permission-restricted.

## Edge cases
Long queries, conflicting filters, stale results, zero results, unavailable filter values, restricted records, large result sets.

## Accessibility
Programmatic labels, keyboard operation, visible focus, logical focus order and appropriate announcement of result changes.

## Validation
Task completion, time to find, query/filter reformulation, zero-result rate, error rate and recovery success.

## Related
Table/List, Pagination, Empty State, Error State.
