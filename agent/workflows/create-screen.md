# Workflow — CREATE SCREEN

Use only when the user explicitly asks to create/build a Figma screen.

## Preflight

1. Run INSPECT on the relevant feature/Master Screen.
2. Load source registry and domain-pattern registry.
3. Search the Core DS library for every required common UI family.
4. List intended reused components before creating anything.
5. Identify responsive targets and required states.
6. Identify any missing pattern/component and route that gap through COMPONENT workflow.

## Build order

1. Reuse existing layout/template pattern when available.
2. Compose approved domain patterns.
3. Use Core remote components for primitives.
4. Apply existing DS variables/styles where available.
5. Add only feature-specific composition/content at screen level.

## New reusable asset rule

A new reusable component requires evidence that:
- no Core equivalent exists
- no approved local equivalent exists
- the need repeats or represents a stable semantic unit
- the proposed API has semantic variant names

## Completion

Run QA and document:
- reused library assets
- reused local patterns
- newly created assets, if any
- responsive/state coverage
- unresolved gaps
