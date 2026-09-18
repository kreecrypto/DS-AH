# ADR 0001 — Source Priority

Status: Accepted  
Date: 2026-09-18

## Decision

Agents must prefer the existing remote Core Design System library before local Master Screen components for common UI/foundations.

Order:

1. Remote Core DS
2. approved/current Master Screen pattern
3. local domain pattern
4. screen-only composition
5. reference material

## Why

The audit confirmed that highly reused primitives are remote library components and that remote foundation variables exist even though the target file has no local variables.

Creating local replacements would fragment the system.

## Consequence

New Core assets require explicit evidence that the remote DS cannot satisfy the need.
