---
id: design-system-compliance
version: 1.0.0
scope: core
---

# Design System Compliance Skill

## Purpose
Keep new and modified UI inside the approved system and prevent design drift.

## Trigger
Use for CREATE, MODIFY, COMPONENT, REVIEW and QA.

## Source order
1. exact approved user reference
2. approved/current Product Master
3. approved domain component/pattern
4. Core DS component
5. Core DS foundations/tokens
6. new screen-only composition only when no approved reusable solution exists

## Decision procedure
For every visible UI element ask:
1. Does an approved instance already exist?
2. Is there a domain component/pattern?
3. Is there a Core primitive?
4. Can an existing component be extended with a valid property/variant?
5. Is a wrapper/composition sufficient?
6. Only then: is creation justified?

## Hard rules
- Reuse before create.
- Do not detach instances to obtain minor visual differences.
- Do not recreate Core assets because names are messy.
- Do not replace bound variables with raw values without an explicit migration.
- Do not introduce duplicate semantic tokens.
- Do not mix components from unrelated product domains merely because they look similar.
- Preserve published identity unless migration is explicitly requested.
- New components require a documented ownership level: Core, domain, or screen-only.

## Compliance evidence
- reused Core assets
- reused domain assets
- any extensions and why
- any new assets and why existing assets were insufficient
- token/variable bindings
- exceptions and migration notes

## Fail conditions
FAIL when a suitable approved asset exists but the result invents a parallel component/token/pattern without evidence.
