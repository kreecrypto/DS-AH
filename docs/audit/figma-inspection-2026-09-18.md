# Detailed Figma Inspection — 2026-09-18

Mode: **read-only**  
Target file: `cipkv7yTxyE29VCfMphE0W`

No Figma nodes, variables, styles, components, pages, or properties were created or modified during this audit.

## File-level findings

- 22 top-level pages were discovered.
- Local variable collections: 0.
- Local variables: 0.
- Local text styles: 0.
- Local paint styles: 0.
- Local effect styles: 1 (`Drop shadow`).
- The file heavily consumes remote components.
- Search identified the primary Core library as `[DS] Agency Portal - Design System (Copy)`.

Key implication: no-local-variables does not mean no Design System. Core foundations exist remotely and should be searched/reused.

## Representative page scale

### Live Chat & Chatbot
- ~8,101 frames
- ~8,357 instances
- 95 components
- 9 component sets
- 5,757 text nodes
- Contains Desktop/Tablet/Mobile, Components, Master Screen and Archived sections

### Case Management
- ~42,988 frames
- ~38,840 instances
- 164 components
- 23 component sets
- ~36,154 text nodes
- Strongest source for form/list/filter/status patterns

### Team Performance Dashboard
- ~59,380 frames
- ~36,133 instances
- 227 components
- 40 component sets
- Dedicated Desktop/Tablet/Mobile, Master Screens and component sections

### Health Portfolio Monitoring
- ~32,667 frames
- ~26,861 instances
- 112 components
- 14 component sets

### Compensation & Taxation
- ~20,804 frames
- ~21,575 instances
- 220 components
- 18 component sets
- Strong permutation/edge-case evidence

## Remote Core component evidence

High-use Case Management instances were resolved to remote owners.

### Button
Current axes:
- type: primary / outline / ghost
- state: default / active / disabled / error / hover
- size: xss / xs / sm / md / lg
- optional left/right icons

### Input
Current states include:
- default
- focused
- error
- disabled
- read-only
- warning
- chip input/typing variants
- view

Additional boolean properties cover label, required, help text, icons, clear/delete, scroll and badges.

### Menu
Current axes:
- .device: desktop/tablet
- status: selected/default/sub/sub-selected
- expand: yes/no

### Badge
Current families/states include success, warning, error, info and multiple badge colors; sizes sm/md.

### Other confirmed remote Core
- icon/general
- icon/navbar
- icon/arrow
- base-icon
- button icon
- divider
- tab/chip
- checkbox
- radio
- breadcrumb
- list-related components

Machine-readable detail lives in `registry/core-components.json`.

## Remote foundation evidence

Search against the Core library confirmed:

### Color collection
Examples:
- text/primary
- text/secondary
- text/tertiary
- text/disabled
- text/primary/inverse
- icon/primary
- bg/interaction/primary/default
- bg/interaction/primary/hover
- bg/interaction/primary/active
- stroke/Interaction/primary/hover

### Spacing collection
- gap/none through gap/9xl
- padding/none through padding/9xl

### Shape collection
- radius/none
- radius/xs / sm / md / lg / xl / full
- radius/image/*
- radius/forms/input
- radius/button/default
- radius/popover/container

### Text collection
- font/size/xs through font/size/9xl
- font-family evidence exists

## Typography observations from screens

Application screens predominantly use:
- DB Helvethaica X / 55 Regular
- DB Helvethaica X / 75 Bd

Other fonts appear in cover/reference/mobile/platform contexts. Font-family authority is therefore not inferred solely from frequency.

## Naming/API debt discovered

Repeated issues:
- Property 1 / Property 2
- Variant4 / Variant6
- Stage6 / Stage7
- mixed responsive / Responsive / .device / device
- Size used as viewport axis in some local patterns
- typos: managemment, serach, attrach, collaps, Uplaod, Offine, Infomation, decending, successd
- raw frame names used as variant values
- numeric state values without semantics

The repo uses a normalization layer instead of forcing immediate Figma renames.

## Duplicate/local ownership findings

Examples:
- duplicate `attrachment file card` component sets in Case
- duplicate `icon-health` sets in Health
- duplicate health table row sets
- repeated shared filter implementations across Case, Campaign and Health

These are merge candidates, not automatic merge instructions.

## Component-set errors observed

Some sets returned Figma property-definition errors during read:
- Team Performance: `View All Team & Agent`
- Compensation: `Monthly Compensation Comparison`
- Compensation: some Table/Breadcrumb sets
- Memo NEW: `drawer`

Agents must not infer missing APIs from these errors. Inspect variants visually/structurally and mark unresolved semantics.

## Source maturity finding

The Master Screens file mixes:
- Master Screens
- components
- current feature work
- Archived sections
- UT iterations
- screenshots
- PDF references
- empty/separator pages

Presence in the file is not sufficient authority.

Use `registry/figma-sources.json` before implementation.

## Final architectural conclusion

The correct operating model is:

`Remote Core DS → Approved local Domain Pattern → Template/Screen`

with a repo normalization layer that maps messy legacy Figma APIs to semantic canonical APIs for future work.
