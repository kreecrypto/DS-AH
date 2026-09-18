# Next Work — External blockers only

Repository evidence work for Design Agent v1 is complete to the extent currently provable.

## Completed

- [x] Local Core DS inventory: 352 variables / 264 colors / 57 component owners.
- [x] Full upstream bound-variable extraction: Foundations 24-variable occurrence + 9-variable occurrence + legacy Color 2 variables.
- [x] Preferred Agent defaults for duplicate Checkbox/Radio families without migrating existing Figma instances.
- [x] Responsive `typography/screensize` scanned across all non-empty pages: 0 bindings; marked `AGENT_DEPRECATED_UNUSED`.
- [x] Quick-menu numeric variants inspected to vector level; no semantic metadata exists; Agent policy blocks guessed semantics.
- [x] Visual Baseline v1: 8 Core references stored as PNG in repo.
- [x] Agency/Admin state-flow registry created from observed states/scenario stages.
- [x] Code Connect checked and blocker recorded.
- [x] Figma remains read-only.

## External blockers

1. **Quick-menu semantic names** — source variants contain only unlabeled vectors. Requires owner-provided mapping or source rename.
2. **Code Connect** — current Figma seat requires Dev/Full on Organization/Enterprise, and no application source repo is identified.
3. **Upstream source-file mutation** — upstream variable values are fully readable from bindings, but the source Figma file URL is not exposed by the current library inventory.
4. **Source cleanup/migration** — deleting/deprecating legacy Figma components or dead token requires a separate explicit write/governance request.

These blockers do not prevent Design Agent v1 from read/review/reuse/QA operation.
