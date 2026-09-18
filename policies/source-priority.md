# Policy — Source Priority

## Priority order

1. `[DS] Agency Portal - Design System (Copy)` for Core components and foundations
2. Approved Master Screens in the target Figma file
3. Approved local/domain component sets
4. Current feature screens
5. Reference/exploration material for research only

## Important distinction

The target Figma file has no local variable collections at the time of the 2026-09-18 audit, but it consumes remote DS components and the remote DS exposes variables.

Therefore:
- absence of local variables does **not** mean the system has no tokens
- agents must search the remote DS before proposing new tokens

## Conflicts

If an approved Master Screen visually conflicts with the Core library:
- do not silently override either source
- capture the exact conflict
- identify whether it is a sanctioned domain override, stale screen, or stale library
- request/record a decision before normalization
