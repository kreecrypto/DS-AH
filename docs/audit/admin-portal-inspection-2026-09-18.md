# Admin Portal Master Screens Inspection — 2026-09-18

Source Figma: `rEJCvUGUfzzQ3jegheRhnr`  
Entry node: `0:1`  
Mode: **read-only**. No Figma nodes, components, variables, or styles were modified.

## Executive result

This file is a domain Master Screen + Case Scenario source for Admin Portal. It is not a foundation library.

- 9 pages
- 0 local variable collections
- 0 local variables
- 0 local paint/text/effect/grid styles
- a large local published domain-component inventory
- scenario flows expressed with Sections, reusable master instances, flow headers, notes, and connectors

## Primary domains

1. Unique Link (Personal + Event & Campaign)
2. External Links & Tools Management
3. Preset Tools Management
4. Terms and Condition
5. Template Notification

The `Master screen` page is the strongest local source for Unique Link, Terms, External Links, and Preset reusable domain components.

Template Notification maintains its own explicit `Master screen` and `Component` sections on the Template Notification page.

## Scenario model

The dominant flow grammar is:

**Create → Search/Filter where applicable → View/Delete → Edit → Preview**

Scenario sections also encode exception/validation branches using `header-flow-section`, `Connector line`, `note-general`, and labels such as `Pass all validations`.

Terms and Condition explicitly contains incomplete/complete/error branches, including duplicate-name/date error evidence.

## Published Admin domain assets

Published keys were extracted for domain master screens and components. See:

- `registry/admin-portal-components.json`
- `registry/admin-portal-scenarios.json`

Examples include:
- Unique Link create/view/edit/table/search/drawer
- Terms landing/filter/create/edit/view + preview/text-area/table/row
- External Links create/view/edit/table/filter/preview
- Preset Tools management/filter and selection components
- Notification create/edit/view/table/preview + content/sending components

## Important dependency finding

This file has no local foundations. Domain components consume remote UI assets extensively.

However, several resolved remote parent keys **do not match** the current canonical Agency Core DS component keys even when the names are the same. Example:

- current Agency Core DS `menu`: `c27fb78...`
- Admin file resolved remote `menu`: `ac0bdae...`

Therefore, agents must not assume name equality means identical published identity or current-library lineage.

Use live inspection / design-system search before importing a primitive into Admin Portal.

## Rich Text Editor subsystem

Terms and Notification depend on a separate rich-text UI subsystem:
- menu-bar__button--base
- menu-bar__button
- text-style/alignment/color dropdowns
- undo/redo
- bold/italic/underline/strike
- inline code
- clear formatting
- bulleted/numbered list icons

Do not replace this subsystem with generic Core DS assets without an explicit migration decision.

## Naming/API debt

Confirmed examples:
- `Terms and Conditon management`
- `sceen`
- `Property 1` on several component sets
- mixed `Default/default`
- language option `th - default`
- device axis mixing empty state: `desktop empty`, `mobile empty`
- `table  joiner` double-space
- state values such as `select-01`, `selected-05`, `select more than 12`

Exact Figma API remains lookup evidence; canonical API in Git is the clean contract for new work.

## Agent source order for Admin Portal

**Core/foundation authority → Admin remote primitive identity check → Admin local domain master component → Admin scenario flow → one-off screen**

No local foundation token should be created just because this consumer file has zero local variables.
