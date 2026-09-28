---
id: UX-PATTERN-EMPTY-ERROR
element: Skeleton
category: pattern
---

# Empty, No-results & Error States

## Distinguish
First-use empty: nothing created yet.
Cleared empty: content was removed/completed.
No-results: data exists but current query/filter matches none.
Error: expected content/action could not complete.
Permission state: content exists but user cannot access it.

## Content
Explain what state occurred, preserve relevant context, and provide the most useful recovery/next action.

## Error recovery
Prefer retry when transient, correction when input-related, escalation/help when user cannot resolve, and safe fallback when a dependency is unavailable.

## Agent rule
Never use one generic empty-state component/content for semantically different states.
