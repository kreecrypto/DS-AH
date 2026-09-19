# Design Agent Skill System

Status: Active
Version: 1.0

## Why this layer exists
Workflows describe task sequence. Registries describe verified design evidence. Skills describe reusable professional capability.

Keeping them separate prevents three common failures:
1. context overload
2. duplicated rules inside every workflow
3. design drift when the agent improvises aesthetic judgment

## Architecture

User request
→ intent router
→ product/reference router
→ skill router
→ task-scoped skills
→ workflow
→ registries/live Figma
→ execution
→ QA/evidence

## Priority
When instructions conflict:
1. explicit current user instruction
2. safety/write gate
3. approved product/reference evidence
4. system contract
5. product policy/workflow
6. core skill
7. generic design convention

A generic skill must never override verified product evidence.

## Versioning
Skill behavior changes must update the skill version and should be reviewed together with router/eval changes when routing behavior changes.
