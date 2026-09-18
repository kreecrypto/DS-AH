# Context Loading Protocol

Load the minimum context needed, in this order.

## Always load

1. `AGENTS.md`
2. `design.md`
3. `agent/manifest.json`
4. `policies/source-priority.md`
5. `registry/libraries.json`

## Then load by task

### Core UI task
Load `registry/core-ds-components.json`, `registry/core-ds-tokens/index.json`, `registry/core-ds-preferred.json`, and `registry/core-ds-coverage.json`.
Load only the semantic token chunk needed for the task.
If component identity/dependency is relevant, also load `registry/core-ds-component-dependencies.json` and `registry/core-ds-dependencies.json`.

### Domain feature task
Load `registry/domain-patterns.json`, `registry/figma-sources.json`, and relevant Core component entries.

### Naming or migration task
Load `registry/aliases.json` and `policies/naming.md`.

### Responsive task
Load `policies/responsive.md`.

### Review / QA task
Load `agent/workflows/review.md`, `agent/workflows/qa.md`, and the relevant source registry entry.

## Figma context rule

Never rely on repo documentation alone for a node-level change. Inspect the target Figma node in the current task because the canvas may have changed after the last repo audit.

Repo = operating contract and known evidence.  
Figma = current visual/structural evidence.

When they conflict, report the conflict and do not silently choose one.


### Visual QA task
Load `registry/visual-baselines.json` and the relevant PNG baseline only after resolving the target component identity.

### State / flow task
Load `registry/state-flows.json` plus the relevant domain/source registry. Do not invent transitions that are not encoded.

### Upstream variable dependency task
Load `registry/core-ds-upstream-foundations.json`. Preserve existing upstream bindings; use local semantic tokens for new work unless component ownership requires otherwise.

### Code Connect task
Load `registry/code-connect-status.json` before attempting mappings.
