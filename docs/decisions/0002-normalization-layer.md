# ADR 0002 — Canonical API Normalization Layer

Status: Accepted  
Date: 2026-09-18

## Problem

Existing local component APIs contain inconsistent axes, generic property names, typos, and ambiguous values.

Renaming all Figma assets immediately would create migration risk.

## Decision

Store both:
- exact current Figma API for lookup
- canonical semantic API for new work/documentation

Legacy names are resolved through `registry/aliases.json`.

## Consequence

Agents can locate old nodes without copying naming debt into new components.
Ambiguous values remain unresolved until evidence exists.
