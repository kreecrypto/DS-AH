# ADR 0006 — Core DS Deep Inspect Baseline

Status: Accepted as repository evidence baseline  
Date: 2026-09-18

## Decision

The repository treats the 2026-09-18 read-only Deep Inspect as the complete local-source inventory baseline for Figma file `5ZFIRJWtmEIvuq95Rhyo6I`:

- 352 local variables
- 264 local color variables
- 41 text styles
- 7 paint styles
- 57 local published component owners

## Important limitation

Completeness refers to the **local Core DS source file**. It does not mean all upstream remote libraries, product-domain patterns, visual baselines, or developer mappings are complete.

## Agent implication

Agents may rely on the registry for discovery and routing, but must still live-inspect the target Figma node before a write.
