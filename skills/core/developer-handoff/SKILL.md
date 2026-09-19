---
id: developer-handoff
version: 1.0.0
scope: core
---

# Developer Handoff Skill

## Purpose
Convert verified Figma/design decisions into implementation-ready evidence without inventing specifications.

## Trigger
Use for HANDOFF or final implementation documentation.

## Include
- exact source file/node
- component names/identities
- variant/property/state mapping
- token/variable references
- spacing/layout rules
- responsive behavior
- content rules/truncation
- interaction behavior
- empty/loading/error/success states
- assets/icons
- accessibility notes
- open questions

## Rules
- Prefer semantic token/component names to copied pixels.
- Distinguish design intent from implementation suggestion.
- Do not invent API/data contracts from UI alone.
- Call out one-off overrides explicitly.
- If Code Connect evidence is unavailable, do not claim component-code parity.

## Completion
Handoff is complete only when a developer can identify source, states, responsive behavior and reusable assets without guessing.
