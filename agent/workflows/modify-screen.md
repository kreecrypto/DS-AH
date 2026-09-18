# Workflow — MODIFY SCREEN

Use when changing an existing approved/current screen.

1. Inspect the exact target node.
2. Identify its instances and source components.
3. Determine whether the requested change belongs to:
   - instance property
   - domain pattern
   - Core component
   - screen-only composition
4. Prefer property/variant changes over detaching/rebuilding.
5. Preserve unchanged structure.
6. Do not propagate a screen-specific requirement into Core without cross-domain evidence.
7. Check Desktop/Tablet/Mobile impact.
8. Run QA against the previous/approved state.

If the requested change reveals a reusable API gap, route that portion through COMPONENT workflow before implementation.
