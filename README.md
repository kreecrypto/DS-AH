# Product Design System (DS-AH)

Central source of truth for UI foundations, reusable components, domain patterns, templates, and agent-facing design rules.

## Purpose

This repository keeps Figma, UX/UI decisions, and AI-assisted design work consistent across the product.

## Source Figma

- File key: `cipkv7yTxyE29VCfMphE0W`
- Audit entry node: `1:12191`
- Reference: https://www.figma.com/design/cipkv7yTxyE29VCfMphE0W/?node-id=1-12191

## Repository structure

- `design.md` — primary design-system contract for designers and agents
- `docs/source-of-truth.md` — screen/page authority and maturity rules
- `docs/architecture.md` — DS layers and naming architecture
- `docs/P0-gap-matrix.md` — Keep / Merge / Rename / Rebuild / Deprecate decisions
- `docs/component-inventory.md` — audited cross-domain component evidence
- `plan/P0-backlog.md` — execution checklist and P0 exit gate
- `agent/AGENT_RULES.md` — mandatory AI/agent behavior
- `tokens/` — token definitions and migration scaffold
- `components/` — core component specs
- `patterns/` — domain patterns
- `templates/` — reusable page templates

## Working principle

**Extract existing patterns first → normalize second → document the contract → migrate incrementally.**

Do not create a new pattern when an approved equivalent already exists.
