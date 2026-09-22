# Admin Portal Composition Knowledge — Deep Extraction Phase 1

Date: 2026-09-22  
Figma file: `rEJCvUGUfzzQ3jegheRhnr`  
Page: `Master screen` (`80:71254`)  
Output status: **SOURCE_READY / LIVE_FIGMA_VERIFIED**

## Objective

Convert approved Admin Portal Master Screen evidence into reusable Composition Knowledge so Design Agent writes inherit existing product structure instead of generating generic layouts.

This phase intentionally separates:
- **Visual/Composition Authority** — approved screen geometry and relationships
- **System Authority** — Core DS components, variants, variables and APIs
- **Content Authority** — domain labels, fields, permissions and business behavior

## Extracted packages

### 1. Desktop application shell
Evidence includes:
- External Links default `44:1720`
- Unique Link create `152:40756`
- Unique Link edit `154:42853`
- Unique Link view `162:10938`
- Terms landing `821:220320`

Verified recurring facts:
- 240px sidebar
- main workspace directly follows sidebar
- 64px top header
- 16px major main-region rhythm
- main workspace width varies by family (1040/1048 observed), so width must follow locked reference

### 2. Master List
Primary composition example: Terms landing `821:220320`  
Supporting state-rich example: External Links default `44:1720`

Verified composition:
`Shell → List title/query toolbar → Table/Rows → Pagination`

Terms baseline:
- content: 1008px, padding 12/16/12/16
- inner content: 976px
- toolbar: 44px
- table header: 44px
- row: 68px
- pagination: 28px

External Links family also exposes Default / Scroll / Search Found / Search Not Found / Reload / Empty state evidence.

### 3. Filter Drawer
Primary evidence: `184:75335`

Verified composition:
`Current List → Overlay → Right Drawer → Header/Close → Criteria Stack → Actions`

Desktop baseline:
- viewport 1280x720
- right drawer 420px
- 16px drawer padding
- inner column 388px
- header row 30px
- criteria vertical gap 8px
- large input 388x82
- paired date row gap 12px

### 4. Create/Edit Form
Create: `152:40756`  
Edit: `154:42853`

Verified reuse:
- shared sidebar/main shell
- standard header with `back=true`
- shared `header text` component family
- Create selects `mode=create`
- Edit selects `mode=edit`
- body uses 16px horizontal inset and 16px internal horizontal gap

This is direct evidence for **Variant/Override before Rebuild**.

### 5. Detail/View
View: `162:10938`

Verified reuse:
- same shell/back-header/body alignment as Create/Edit
- `header text` selects `mode=view`
- `show status=true`
- read-only grouped detail body
- contextual duplicate/delete/edit actions

## Agent retrieval rule

For a request such as “Create Role Master” with no exact visual reference:
1. retrieve exact product/domain evidence first
2. if no exact Role Master exists, resolve `MASTER_LIST` archetype
3. load `admin-portal.master-list.desktop.v1` for **composition only**
4. use Core DS for component identity/tokens
5. require Content Authority for Role-specific columns, actions and permissions
6. do not invent Role business content from the generic list package

## Durable visual evidence

Temporary screenshot URLs are not stored. Each package stores Figma file/node IDs; runtime must request a fresh screenshot at verification time.

Representative screenshot generation was successfully resolved for:
- `44:1720`
- `184:75335`
- `152:40756`
- `162:10938`
- `821:220320`

## Known gaps / next extraction

- Tablet/mobile composition
- deep inspection of each List feedback state
- field-level API map for Create/Edit
- domain-specific Role/User/Permission screens if/when an exact approved source is available
- composition retrieval evals and live test write
