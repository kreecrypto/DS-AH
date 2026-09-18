# ADR 0005 — Admin Portal Master Screens Source

Status: Accepted  
Date: 2026-09-18

## Decision

Figma file `rEJCvUGUfzzQ3jegheRhnr` is the canonical Admin Portal source for domain Master Screens and Case Scenario flows.

It is **not** a foundation source.

## Agent rule

For Admin Portal work:

1. inspect/search primitive dependencies live
2. reuse the Admin local published domain component key where one exists
3. use scenario sections for flow and exception evidence
4. do not create local foundations in this file by default
5. do not assume same-name remote assets have the same published key as the currently audited Agency Core DS
6. treat the Rich Text Editor dependency as its own upstream subsystem
