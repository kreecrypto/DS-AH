# Core Design System Figma Inspection — 2026-09-18

Source: `5ZFIRJWtmEIvuq95Rhyo6I` · node `0:1`  
Mode: **read-only**. No Figma changes were made.

## Result

This file is the canonical Core Design System source behind the Master Screens consumer file.

### Inventory
- 32 pages
- 5 local variable collections
- 352 local variables: 264 COLOR, 14 STRING, 74 FLOAT
- 41 text styles
- 7 paint styles
- 0 effect styles
- 0 grid styles

### Foundation collections
- `color`: 264 direct semantic values, one mode, no aliases
- `text`: 45 variables with Desktop/Mobile modes
- `spacing`: 28 variables
- `shape`: 14 variables
- `Responsive`: 1 zero-valued variable; meaning is not sufficiently documented

Typography uses **DB Helvethaica X** across semantic families. Weights are 35 Thin, 45 Li, 55 Regular, 75 Bd, 85 Blk.

Spacing scale for both gap and padding:
`0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80`.

Radius scale:
`0, 2, 4, 8, 12, 16, 9999`, with special button/input/image/popover values.

Primary colors include:
- Primary: `#00008F`
- Primary hover: `#0000F7`
- Primary active: `#0000D2`
- Strong/red: `#E3000A`
- Text primary: `#1A1D21`

## Core components

Published keys were extracted directly. See `registry/core-ds-components.json`.

Strong reusable families include Button, Icon Button, Badge, Input, Dropdown, List, Tabs, Toggle, Sidebar/Menu, Scrollbar, Breadcrumb, Container, Avatar and the icon libraries.

## Debt confirmed inside Core DS

- duplicate Checkbox sets
- duplicate Radio sets
- `.device`, `ischeck`, `stage` axes
- `disable` instead of disabled
- `fasle`
- `checkbok`
- `buttom-right`
- `bottom-shet`
- `qualtification`
- `perfomance`
- numeric icon variants `01..10`
- horizontal scrollbar `Property 1`
- duplicate text-style names: `Title/lg`, `Body/xlg/xlg`
- `Body/xlg/xlg` uses 24px font with 18px line-height

Agent rule: exact Figma names are for lookup; canonical API names are for new work.

## Upstream dependency

Core DS is not fully standalone. Some component nodes bind to remote `Foundations` variables (spacing, radius, stroke, Inter typography, neutral color) and at least one remote `Color` variable.

Preserve existing bindings. Do not flatten to raw values without a migration decision.

## Binding samples

- Button: 63.1%
- Input: 59.1%
- Navbar: 47.6%
- Icon: 50%
- Badge page: 2.4% page-wide, but badge variants themselves are semantically token-bound

## Source order

`Core DS source → approved Master Screen/domain pattern → template/screen`.
