# Design Agent v1

Version: 1.0.0

Design Agent v1 is a repository-driven design execution contract.

It is not a separate autonomous background service. It defines how an AI agent should route, inspect, decide, execute, QA, and hand off design work using Figma and Git evidence.

## Capabilities

- classify design task intent
- resolve Core / Agency / Admin product context
- load only relevant registries
- enforce read-only default
- resolve Source of Truth
- resolve component identity and reuse
- separate exact Figma API from canonical API
- produce structured execution/decision/QA outputs
- run deterministic routing smoke tests in CI

## Runtime sequence

`ROUTE → PRODUCT → CONTEXT → INSPECT → SOURCE → CORE → DOMAIN → DECIDE → EXECUTE → QA → EVIDENCE`

## Invocation

Natural language is supported.

Explicit commands are also supported:

- `DS:INSPECT`
- `DS:REVIEW`
- `DS:CREATE`
- `DS:MODIFY`
- `DS:FIX`
- `DS:COMPONENT`
- `DS:QA`
- `DS:HANDOFF`

## Important

A create/modify route does not automatically permit a Figma mutation. The current task still needs explicit Figma write authorization.
