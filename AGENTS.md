# Design Agent Entry Point

This repository powers **Design Agent v1**.

## Start sequence

Before any design task:

1. Read `agent/SYSTEM.md`.
2. Read `agent/runtime.json`.
3. Route intent with `agent/router/intent.json`.
4. Resolve product with `agent/product-router.json`.
5. Load the matching workflow and only the registries required for that product.
6. Inspect the live Figma target read-only.
7. Resolve Source of Truth.
8. Resolve Core component identity.
9. Resolve product/domain pattern identity.
10. Decide reuse / extend / wrap / create / screen-only.
11. Execute only with explicit current-task write authorization.
12. Run QA.
13. Emit evidence using the output schemas.

## Figma safety

Figma is **read-only by default**.

Do not create, edit, rename, delete, detach, move, bind, publish, or reorganize Figma nodes during inspect/review/planning/repo tasks.

## Source model

- Core DS: `5ZFIRJWtmEIvuq95Rhyo6I`
- Agency Master Screens: `cipkv7yTxyE29VCfMphE0W`
- Admin Master Screens: `rEJCvUGUfzzQ3jegheRhnr`

See `agent/product-router.json` for registry routing.

## Critical identity rule

Same component name does **not** prove same published identity.

Verify component keys and live ownership before substitution.

## Completion contract

Return:
- routed command
- product
- Source of Truth
- reuse decision
- write mode
- responsive/state coverage
- QA result
- open gaps
