# GitHub Custom Agent

The project-level GitHub custom agent profile is:

`.github/agents/design-agent.agent.md`

Agent ID: `design-agent`

Target: `github-copilot`

The profile deliberately does not hard-code a `tools` allowlist. GitHub custom agents inherit all tools available in the current agent environment when `tools` is omitted, including repository-configured MCP tools.

This matters for DS-AH because Figma execution must only happen when a Figma MCP capability is actually available. The profile explicitly forbids claiming Figma execution when that capability is absent.

The profile delegates detailed behavior to the repository operating contract:

- `AGENTS.md`
- `agent/SYSTEM.md`
- `agent/runtime.json`
- `agent/reference-router.json`
- product/domain registries
- task workflows
- QA and output schemas

## Expected behavior

Generic requests such as `Build a Dashboard` must not trigger blank-canvas invention when multiple approved Dashboard Masters exist.

The agent must resolve the Master first or block the write with `BLOCKED_REFERENCE_AMBIGUOUS`.

## Validation

Run:

`npm run validate`

The validator checks that the GitHub agent profile exists and contains the required master-first fidelity contract.
