# Product Design System Operating Repository (DS-AH)

This repository is the operational Source of Truth for agents and designers working with the product Master Screens.

It does **not** replace the existing Figma Core Design System library. It tells agents how to discover, reuse, normalize, review, QA, and document that system safely.

## Start here

1. `AGENTS.md` — mandatory agent entrypoint
2. `design.md` — design-system contract
3. `agent/manifest.json` — machine-readable map
4. `agent/COMMANDS.md` — workflow router
5. `registry/` — Figma/library/component/pattern evidence
6. `policies/` — system rules
7. `agent/workflows/` — execution procedures

## Documentation website

- Runtime: `https://ah-design-system.kreetaphon-game.chatgpt.site`
- Role: documentation/presentation surface only; it does not override Figma Core DS authority.
- Registry: `registry/documentation-site.json`
- Audit: `docs/audit/ah-design-system-site-inspection-2026-09-20.md`
- Consumption rule: **Figma Core DS → approved domain pattern/Master → GitHub canonical mapping → website composition**.

## Figma target

- File key: `cipkv7yTxyE29VCfMphE0W`
- Audit entry node: `1:12191`
- Figma is read-only by default for agents unless the user explicitly requests a write action.

## Core source discovered by audit

Primary reusable Core source:

`[DS] Agency Portal - Design System (Copy)`

The audit confirmed remote Core components and variables for common UI. Agents must search/reuse this library before proposing new Core assets or foundation tokens.

## Repository map

### Agent system
- `AGENTS.md`
- `agent/manifest.json`
- `agent/COMMANDS.md`
- `agent/context-loading.md`
- `agent/AGENT_RULES.md`
- `agent/workflows/`

### Machine-readable registry
- `registry/figma-sources.json`
- `registry/libraries.json`
- `registry/core-components.json`
- `registry/domain-patterns.json`
- `registry/foundations.json`
- `registry/aliases.json`

### Policies
- `policies/source-priority.md`
- `policies/naming.md`
- `policies/responsive.md`
- `policies/component-ownership.md`

### Audit / planning
- `docs/audit/figma-inspection-2026-09-18.md`
- `docs/P0-gap-matrix.md`
- `docs/component-inventory.md`
- `plan/P0-backlog.md`

### Validation
- `schemas/agent-task.schema.json`
- `schemas/registry-entry.schema.json`
- `scripts/validate-registry.mjs`
- `npm run validate`

## Working principle

**Inspect → search existing DS → resolve Source of Truth → reuse → normalize only where needed → QA → handoff.**

Do not create a new component, pattern, or token merely because the existing Figma naming is messy. The normalization layer exists so agents can find legacy assets while producing clean new work.


## Canonical Core DS source

Direct Core DS inspection is registered from Figma file `5ZFIRJWtmEIvuq95Rhyo6I`.

- `registry/core-ds-source.json`
- `registry/core-ds-foundations.json`
- `registry/core-ds-components.json`
- `registry/core-ds-dependencies.json`
- `docs/audit/core-ds-inspection-2026-09-18.md`

Agent source order: **Core DS source → approved domain pattern → template/screen**.


## Admin Portal Master Screens source

Direct Admin Portal inspection is registered from Figma file `rEJCvUGUfzzQ3jegheRhnr`.

- `registry/admin-portal-source.json`
- `registry/admin-portal-scenarios.json`
- `registry/admin-portal-components.json`
- `registry/admin-portal-dependencies.json`
- `docs/audit/admin-portal-inspection-2026-09-18.md`

Admin Portal agent order:

**foundation/Core authority → verify remote primitive identity → Admin domain component → scenario flow → one-off screen**.

Important: the Admin file has no local foundations, and some same-name remote component keys differ from the currently audited Agency Core DS identities.


## Design Agent v1

The repo now contains an executable **agent contract** rather than only design-system documentation.

Start with:
- `agent/SYSTEM.md`
- `agent/runtime.json`
- `agent/product-router.json`
- `agent/router/intent.json`

Runtime:

**Route → Product → Context → Inspect → Source → Reuse → Execute if authorized → QA → Evidence**

Validation:
- `npm run validate`
- `npm run test:agent`

See `docs/design-agent-v1.md`.


## Master-first Fidelity Gate

Design Agent v1.1 does not treat a new file as a blank-canvas brief.

For CREATE/MODIFY:
**resolve approved Master → pass reference gate → inspect → reproduce/adapt → visual compare → QA**.

Generic screen types with multiple approved Masters, such as an unspecified Agency "Dashboard", are blocked from Figma write until the reference/domain is resolved.

Run `npm run test:fidelity` for regression coverage.


## Runtime Architecture — GitHub KB + ChatGPT MCP

This repository is intentionally **knowledge-only** from an execution perspective.

- **GitHub** stores the Design Agent knowledge base: source registries, policies, workflows, reference routing, token/component evidence, visual baselines, tests, audits, and decision history.
- **ChatGPT** is the runtime that interprets this knowledge.
- **Figma MCP through ChatGPT** is the only live Figma execution path for this project.

There is no required GitHub Custom Agent and no Figma MCP configuration should be stored here merely to make GitHub execute design work.

Runtime flow:

**User → ChatGPT → read DS-AH KB → resolve Master/reference → Figma MCP → visual QA → evidence/update KB when needed**

This separation keeps GitHub deterministic and auditable while keeping live external actions inside the ChatGPT session.


## Website Implementation Workflow

Website implementation is governed separately from live Figma mutation work.

Start with:
- `agent/workflows/website-implementation.md`
- `agent/gates/website-quality-gates.json`
- `agent/web/website-implementation-brief.schema.json`
- `docs/website-implementation-pr-checklist.md`

Canonical website flow:

**Request → inspect code/runtime → resolve Figma authority → map componentKey/tokens → define route scope → implement → static validation → runtime → responsive/a11y → visual regression → evidence → PR → merge → post-merge check**

Authority remains:

**Figma Core DS → approved domain pattern / Master → GitHub canonical mapping → website implementation**

The website must not create a parallel token system or redefine Core component APIs.
