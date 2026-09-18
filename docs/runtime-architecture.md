# Runtime Architecture — GitHub as KB, ChatGPT as Agent Runtime

Status: Active  
Date: 2026-09-18

## Decision

DS-AH uses a split architecture:

### GitHub
Role: **Knowledge Base / Source of Truth only**

Stores:
- Core DS evidence
- product Master Screen evidence
- component/token registries
- source priority and ownership policies
- Master/reference routing
- workflows
- QA rules
- visual baselines
- eval fixtures
- audit and decision history

GitHub does not execute Figma design work.

### ChatGPT
Role: **Design Agent runtime**

Responsibilities:
- understand the user request
- read the relevant DS-AH KB files
- resolve product/domain
- resolve Build Mode
- resolve exact approved Master/reference
- enforce Reference Fidelity Gate
- orchestrate MCP tools
- perform QA
- update the KB when new verified evidence should be retained

### Figma MCP
Role: **Live design execution layer used through ChatGPT**

Responsibilities:
- inspect live Figma
- resolve node/component/variable identities
- create/modify approved target designs
- capture screenshots/context
- perform live visual/structural verification

## Explicit non-goals

Do not:
- configure GitHub as the Figma execution runtime
- require a GitHub Custom Agent for this workflow
- duplicate MCP configuration into DS-AH
- allow GitHub CI to mutate Figma
- treat repository metadata as proof that a live Figma write happened

## Execution flow

`User → ChatGPT → DS-AH KB → Reference Gate → Figma MCP → QA → Evidence`

## Permission model

Repository state never authorizes a live Figma write.

Figma write requires:
1. explicit current user instruction
2. valid target/reference resolution
3. Reference Fidelity Gate = PASS or explicit EXPLORE mode
4. live MCP capability in the ChatGPT session

## Failure behavior

If MCP is unavailable, ChatGPT must:
- keep work at planning/review/KB level
- report the live execution blocker
- never fabricate node IDs, screenshots, mutations, or QA evidence
