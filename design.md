# Product Design System Contract

Status: Operational baseline v1.0  
Audit baseline: 2026-09-18

## 1. System objective

Provide a stable contract so human designers and agents can work on Master Screens without:
- inventing duplicate components
- copying legacy naming debt
- using Archived/reference screens as implementation source
- creating new tokens when the existing DS already provides them
- assuming responsive/state behavior

## 2. Source hierarchy

Use in this order:

1. Existing Core Design System library
2. Approved / current Master Screen evidence
3. Approved local domain pattern
4. Current feature screen composition
5. Draft/reference material for research only

The primary Core library discovered in the audit is recorded in `registry/libraries.json`.

## 3. Layer model

### Foundation
Remote DS variables/styles for color, spacing, shape/radius, typography and other primitives/semantics.

### Core
Cross-domain UI such as Button, Input, Menu, Icons, Badge, Divider, Tab/Chip, Checkbox, Radio, Breadcrumb.

### Domain Pattern
Business-aware reusable patterns such as case status, campaign card, performance section, compensation table, live-chat flow, memo drawer.

### Template
Reusable page composition such as List, Detail, Form, Dashboard, Search/Filter.

### Screen
Feature-specific composition. A screen is not automatically a component.

Dependency direction:

`Screen → Template/Domain Pattern → Core → Foundation`

## 4. Figma operating mode

Read-only is the default for agents.

Inspection, review, audit, planning, documentation, and repo-maintenance requests do not authorize Figma writes.

A Figma write requires an explicit create/edit/fix instruction in the current task.

## 5. Foundation rule

The target Master Screens file had no local variable collections during the audit, but the remote Core DS exposes variables.

Therefore:
- always search remote variables first
- do not create a local token layer merely because the target file has no local variables
- raw values observed in screens are evidence, not canonical tokens
- unresolved foundation areas must be documented rather than guessed

Known remote collections/evidence are recorded in `registry/foundations.json`.

## 6. Core component rule

Search the remote Core library before creating a common component.

Confirmed reusable families include:
- Button / Icon Button
- Input
- Menu / Sidebar-related navigation
- General/Navbar/Arrow/Base icons
- Badge
- Divider
- Tab/Chip
- Checkbox
- Radio
- Breadcrumb
- List-related primitives

Exact current APIs and canonicalized APIs are recorded in `registry/core-components.json`.

## 7. Local pattern rule

Local components may represent valid domain behavior even when naming is inconsistent.

Do not rebuild them solely because their API is messy.

For local patterns:
1. preserve exact Figma names in `figmaCurrentApi` for lookup
2. define semantic `canonicalApi` for new work
3. mark ambiguous states `REVIEW_REQUIRED`
4. merge duplicates only with sufficient evidence

See `registry/domain-patterns.json`.

## 8. Naming contract

For new reusable assets use semantic axes:

- `Device`
- `State`
- `Style`
- `Size`
- `Role`
- `Type`
- `Expand`
- explicit domain axes

Do not create placeholder axes/values such as `Property 1`, `Variant6`, `Stage7`, or raw frame names.

Use `registry/aliases.json` to find legacy assets.

## 9. Responsive contract

Canonical device values:

- `Desktop`
- `Tablet`
- `Mobile`

Legacy axes such as `responsive`, `Responsive`, `.device`, `device`, and some uses of `Size` are lookup aliases, not the desired API for new work.

## 10. State contract

Use semantic states where applicable:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Empty
- Error
- Retry
- Success
- Warning
- Expanded
- Collapsed

Domain-specific states are allowed when they represent genuine business states.

## 11. New component gate

Before creating a reusable asset, prove:

1. no suitable Core DS asset exists
2. no approved local pattern already serves the same semantic purpose
3. the need is reusable/stable rather than one-screen composition
4. ownership layer is clear: Core or Domain
5. canonical API uses semantic naming
6. responsive/state requirements are known

If evidence is incomplete, do not create; mark the gap.

## 12. Agent task protocol

Every task routes through `agent/COMMANDS.md`.

Default sequence:

`INSPECT → resolve source → search/reuse → CREATE/MODIFY if explicitly requested → QA → HANDOFF`

## 13. QA gate

A task is not complete until the agent can report:

- Source of Truth used
- Core/library reuse decision
- domain pattern reuse decision
- responsive coverage
- state coverage
- naming/API compliance
- visual/content/accessibility checks
- unresolved gaps

QA result must be `PASS`, `PASS_WITH_GAPS`, or `FAIL`.
