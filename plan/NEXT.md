# Next Work — Repository Only

The Core DS deep inspection baseline is now complete for the local source file.

## Completed in Deep Inspect

- [x] Reconcile all local variables: 352/352.
- [x] Reconcile all color tokens: 264/264.
- [x] Extract full local text, spacing, shape and responsive variables.
- [x] Extract all 41 text styles and 7 paint styles.
- [x] Inventory all 57 local published component owners.
- [x] Add missing `bg` owner to Core registry.
- [x] Resolve common-family coverage: Search / Select / Textarea / Modal / Toast / Pagination / Table.
- [x] Create Preferred/Legacy candidate matrix for duplicate Checkbox and Radio families.
- [x] Record hidden remote/stale component dependencies.

## Remaining evidence work

1. Inspect the upstream remote `Foundations` and legacy `Color` source libraries directly if their source Figma files become available.
2. Resolve semantic names for quick-menu numeric icon variants.
3. Resolve the `Responsive/typography/screensize = 0` variable or formally deprecate it.
4. Get explicit design governance approval for Checkbox/Radio preferred candidates and missing-family ownership decisions.
5. Add visual baseline screenshots/regression references.
6. Add developer component mapping / Code Connect when code ownership is available.
7. Add per-domain state diagrams for product Master Screens.

No Figma migration is implied by this backlog.
