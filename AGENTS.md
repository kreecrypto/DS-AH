# Agent Entry Point

This repository is the operating contract for design work against the product Master Screens.

## Non-negotiable start sequence

Before any design task:

1. Read `design.md`.
2. Read `agent/manifest.json`.
3. Read `registry/figma-sources.json`.
4. Read `registry/libraries.json`.
5. Route the request using `agent/COMMANDS.md`.
6. Load the matching workflow in `agent/workflows/`.
7. Inspect Figma read-only before proposing or making a change.
8. Search the existing Design System library before creating any component, variable, or pattern.
9. Use approved local domain patterns only after checking the Core library.
10. Run the QA workflow before declaring completion.

## Default safety mode

Figma is **read-only by default**.

Do not create, edit, rename, delete, detach, move, bind, publish, or reorganize Figma nodes unless the user explicitly asks for a Figma write action in the current task.

Repository documentation may be updated when the task asks to maintain the design-system knowledge base.

## Source priority

Use sources in this order:

1. Existing Core Design System library
2. Approved Master Screen / approved local component set
3. Current domain pattern
4. Current feature screen
5. Draft/reference material only for research

Never implement from Archived, Deprecated, Legacy, screenshot-only, PDF-only, or exploratory material unless the user explicitly promotes it.

## Canonical vs legacy API

The Figma file contains legacy names and inconsistent variant axes. Never copy those names blindly.

Use:
- `registry/aliases.json` to resolve legacy names
- `registry/core-components.json` for remote Core APIs
- `registry/domain-patterns.json` for local pattern APIs
- `policies/naming.md` for new work

The registry records both current Figma API and canonical API so an agent can find existing nodes without perpetuating naming debt.

## Agent completion contract

A task is complete only when the response can state:
- which Source of Truth was used
- which existing component/library was reused
- what was changed or proposed
- which responsive states were considered
- which QA checks passed
- any unresolved evidence gaps

If any of those are unknown, report the gap instead of guessing.
