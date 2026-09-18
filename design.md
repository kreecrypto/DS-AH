# Product Design System Contract

Status: Draft v0.1  
Scope: Master Screens and future agent-assisted UX/UI work

## 1. Source of Truth

1. Approved Master Screens and approved component sets are the primary visual source of truth.
2. Archived, deprecated, exploratory, PDF reference, screenshot reference, and UT exploration areas are never implementation sources unless explicitly promoted.
3. Existing approved components must be reused before creating new components.
4. Existing visual language must be preserved unless the task explicitly requests a redesign.

## 2. Design System Layers

### Foundations
Color, typography, spacing, radius, elevation, iconography, sizing, and responsive breakpoints.

### Core Components
Buttons, inputs, selects, checkboxes, radio buttons, switches, badges, tabs, dividers, navigation, drawers, modals, toast, tables, pagination, search, filter, list rows, loading, empty, and error states.

### Domain Patterns
Customer, Case, Campaign, Performance, Health, Compensation, Agent Statement, Memo, and Competition patterns.

### Templates
List, List + Filter, Detail, Create/Edit Form, Search Result, Dashboard, and multi-step flows.

### Screens
Feature-specific compositions. Screens are not automatically reusable components.

## 3. Responsive Contract

Use exactly these device values where a responsive variant is required:

- `Device=Desktop`
- `Device=Tablet`
- `Device=Mobile`

Avoid generic variant names such as `Property 1`, `Property 2`, `Variant4`, or numeric stage names.

## 4. State Contract

Prefer semantic state names:

- `State=Default`
- `State=Hover`
- `State=Focus`
- `State=Pressed`
- `State=Disabled`
- `State=Loading`
- `State=Empty`
- `State=Error`
- `State=Success`

Use domain-specific state names only when they represent genuine business states.

## 5. Candidate Foundations from Existing Screens

These values were observed repeatedly during the first audit and remain provisional until formally approved and tokenized.

### Color candidates
- Brand blue: `#00008F`
- Surface: `#FFFFFF`
- Subtle surfaces: `#FAFAFA`, `#F7F7F8`
- Light brand surface: `#E2EFFF`
- Critical: `#E3000A`

### Spacing candidates
- `4, 8, 10, 12, 16, 20, 24`

### Radius candidates
- `4, 8, 12, 16, full`

### Typography observations
Application screens predominantly use `DB Helvethaica X` Regular and Bold. Other families found in the source file must not be treated as approved system typography without an explicit source-of-truth decision.

## 6. Component Selection Rules

Before creating a component:

1. Inspect the approved Master Screen for the relevant feature.
2. Search for an existing local component or component set.
3. Check whether the requirement can be satisfied through an existing variant/property.
4. Reuse the existing component when its visual and behavioral contract matches.
5. Extend an existing component only when the new behavior belongs to the same semantic component family.
6. Create a new component only when no approved reusable equivalent exists.

## 7. Naming Rules

### Component
Use semantic names, e.g. `Button`, `Input`, `Customer Card`, `Case Status Badge`.

### Variants
Use `Axis=Value`, e.g.:

`Device=Desktop, State=Default, Style=Primary`

### Screens
Use:

`screen/<domain>/<purpose>/<device>`

Example:

`screen/case-management/list/desktop`

## 8. Source Status

Every reusable source should be classifiable as:

- `Approved`
- `Current`
- `Draft`
- `Reference Only`
- `Legacy`
- `Deprecated`
- `Archived`

Agents must not use `Reference Only`, `Legacy`, `Deprecated`, or `Archived` as implementation source without explicit instruction.

## 9. Agent Rules

See `agent/AGENT_RULES.md`. Those rules are mandatory for agent-assisted design work.

## 10. QA Gate

A design is not complete until it passes:

- Design-system reuse check
- Naming check
- Responsive check
- Component/state coverage check
- Layout and spacing check
- Content check
- Accessibility review
- Visual regression review against the approved reference
