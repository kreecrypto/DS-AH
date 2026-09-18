# Design System Architecture

## Operating model

`Remote Core DS → Approved Domain Pattern → Template/Screen`

The repo supplies a normalization and routing layer around that system.

## Foundation

Use remote DS variables first:
- color
- spacing
- shape/radius
- text/typography

See `registry/foundations.json`.

## Core

Cross-domain components from the remote DS.

See `registry/core-components.json`.

## Domain Pattern

Business-aware local patterns from approved/current Master Screen evidence.

See `registry/domain-patterns.json`.

## Template

Composition guidance such as List, Detail, Form, Dashboard, Search/Filter, Overlay/Drawer.

See `registry/templates.json`.

## Screen

Feature-specific composition. Do not promote automatically.

## Agent support layer

- `AGENTS.md` entrypoint
- `agent/COMMANDS.md` routing
- `agent/workflows/` procedures
- `registry/aliases.json` legacy lookup
- `policies/` guardrails
- `schemas/` machine contracts

## Dependency rule

Higher layers may depend on lower layers.

Core must not depend on feature-specific patterns.  
Domain patterns should reuse Core.  
Screens should compose rather than duplicate.
