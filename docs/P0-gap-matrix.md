# P0 — Design System Gap Matrix

Status: Active  
Source: Figma Master Screens audit  
Figma file key: `cipkv7yTxyE29VCfMphE0W`

## Decision vocabulary

- **KEEP** — usable as current source with minor or no changes.
- **MERGE** — multiple implementations represent the same semantic component/pattern and should converge.
- **RENAME** — structure is usable but naming/API is inconsistent.
- **REBUILD** — visual/semantic concept is valid but implementation is not suitable as a reusable DS asset.
- **DEPRECATE** — legacy/reference implementation that must not be used for new work.
- **REVIEW** — evidence is insufficient to make a final migration decision.

## P0 Findings

### Foundations

| Area | Current evidence | Decision | Priority | Required action |
|---|---|---|---|---|
| Color | Repeated raw colors including #00008F, #FFFFFF, #FAFAFA, #F7F7F8, #E2EFFF, #E3000A | REBUILD | P0 | Create primitive + semantic variable collections; bind components incrementally |
| Typography | Application screens predominantly use DB Helvethaica X; IBM Plex, SF Pro, Montserrat also appear | REVIEW | P0 | Define approved family/weight/size/line-height matrix before creating text styles |
| Spacing | Repeated raw gaps 4/8/10/12/16/20/24 | REBUILD | P0 | Define canonical spacing scale and semantic usage rules |
| Radius | Repeated 4/8/12/16/full plus inconsistent raw values | REBUILD | P0 | Define radius scale and replace hardcoded equivalents |
| Elevation | Local file contains only one effect style: Drop shadow | REVIEW | P1 | Inventory actual shadows before defining elevation tokens |
| Iconography | High reuse of icon/general, base-icon, icon/navbar, icon/arrow | MERGE | P0 | Establish icon source, size, stroke/fill, naming and instance-swap contract |
| Responsive | Desktop/Tablet/Mobile exists but axes vary: Responsive, responsive, .device, Property | RENAME | P0 | Normalize to Device=Desktop/Tablet/Mobile |

### Core Components

| Family | Evidence from audited pages | Decision | Priority | Target contract |
|---|---|---|---|---|
| Button | Heavy reuse across Case, Campaign, Dashboard, Health, Compensation, Memo | MERGE | P0 | Button + Icon Button; Style/Size/State |
| Input | input-text heavily reused across multiple domains | MERGE | P0 | Input/Textarea/Select with semantic states |
| Checkbox | Used heavily in dashboard/list patterns | KEEP + RENAME | P1 | Normalize variant/property naming |
| Radio | High use in Customer Filter | KEEP + RENAME | P1 | Normalize state API |
| Badge | badge, badge-status-type, badge-claim-type, badge-tier variants | MERGE | P0 | Base Badge + documented domain badge patterns |
| Tab / Chip | tab/chip and tab with divider appear across features | MERGE | P0 | Separate Tab from Chip; consistent State/Size |
| Divider | Reused broadly | KEEP | P1 | Bind semantic border token |
| Header | Multiple Header instances in Case/Health/Compensation | MERGE | P0 | Clarify page header vs table header |
| Menu / Navigation | menu, icon/navbar, side-bar variations | MERGE | P0 | Navigation primitives + Sidebar pattern |
| Drawer | Current Memo page contains drawer component set | KEEP + RENAME | P0 | Normalize Device/State axes; make reusable |
| Modal / Overlay | Used in Case/Memo/filter flows | MERGE | P1 | Base Modal + Overlay, not feature-specific |
| Toast | Present in Compensation edge cases | REVIEW | P1 | Validate behavior/states before promotion |
| Table | Multiple domain tables and rows | REBUILD | P0 | Core Table primitives + domain row patterns |
| Search | Search UI repeated in list flows | MERGE | P1 | Search field + search/filter composition |
| Filter | Customer/Case/Campaign filters vary widely | REBUILD | P0 | Core filter controls + domain criteria pattern |
| Pagination | Appears in data-heavy pages | REVIEW | P1 | Inventory before canonicalization |
| Loading / Empty / Error | Multiple page-specific implementations | MERGE | P0 | Shared feedback/state patterns |

### Domain Patterns

| Domain | Current source | Decision | Priority | Notes |
|---|---|---|---|---|
| Live Chat | Master + component sections | KEEP | P1 | Preserve domain-specific conversation structures |
| Case | Master Screen + extensive component set | KEEP + MERGE | P0 | Best source for forms/list/status patterns |
| Campaign | Master + component sections | KEEP + MERGE | P0 | Reconcile list/filter/table with Case equivalents |
| Team Performance | Master + component sections | KEEP | P0 | Strong responsive evidence |
| My Performance | Responsive + component-heavy | KEEP + MERGE | P0 | Merge shared performance primitives with Team Performance |
| Competition Tracking | Mostly screen/reference | REVIEW | P1 | Do not promote whole screens as components |
| Persistency | Mixed screenshots + screens | REVIEW | P1 | Separate current implementation from reference images |
| Health Portfolio | Master + components + responsive | KEEP + MERGE | P0 | Reconcile common table/badge/navigation assets |
| Compensation & Taxation | Components + permutations + edge cases | KEEP | P0 | Strong state/edge-case source |
| Agent Statement | Master component + responsive scenarios | KEEP + RENAME | P0 | Normalize property names and device axes |
| Customer/Prospect | Responsive scenarios; no local component library | REBUILD | P1 | Extract reusable list/card/filter patterns |
| Customer Filter | UT exploration + drawer/filter | REVIEW | P1 | Promote only validated interaction patterns |
| Memo NEW | Current Desktop/Mobile + drawer component | KEEP | P0 | Use as current drawer/memo pattern source |

## Page / Source Authority Matrix

| Page | Authority | Agent usage |
|---|---|---|
| Live Chat & Chatbot | Current DS source | Allowed |
| Case Management | Primary DS source | Allowed |
| Campaign | Current DS source | Allowed |
| Performance Dashboard | Legacy candidate | Reference only |
| Team Performance Dashboard | Primary DS source | Allowed |
| My Performance Dashboard | Primary DS source | Allowed |
| Campaign & Competition Tracking Dashboard | Pattern reference | Conditional |
| Persistency Dashboard | Mixed maturity | Conditional |
| GA Owner Dashboard | Reference only | Forbidden as implementation source |
| Health Portfolio Monitoring | Primary DS source | Allowed |
| Compensation & Taxation | Primary DS source | Allowed |
| Agent Statement | Current DS source | Allowed |
| My Service Memo | Reference-heavy | Reference only |
| Customer List + Prospect List | Pattern source | Conditional |
| Customer List (Filter) | UT/pattern source | Conditional |
| Memo (NEW) | Current source | Allowed |
| Empty separator / empty sprint pages | No authority | Ignore |

## Naming debt

The following forms must be removed from reusable assets during migration:

- `Property 1`
- `Property 2`
- `Variant4`
- `Stage6`
- mixed `responsive` / `Responsive`
- mixed `.device` / `Device`
- legacy typo-based screen names such as `managemment`

Preferred axes:

- `Device`
- `State`
- `Style`
- `Size`
- `Role`
- explicitly documented domain-specific axes

## P0 Exit Criteria

P0 is complete when:

- [ ] Every high-use component family has a Keep/Merge/Rename/Rebuild/Deprecate decision.
- [ ] Source-of-truth pages are classified.
- [ ] Typography approval matrix is resolved.
- [ ] Color/spacing/radius token candidates are approved or corrected.
- [ ] Core component naming contract is locked.
- [ ] Responsive variant contract is locked.
- [ ] Legacy/reference sources are explicitly blocked for Agent implementation.
- [ ] P1 token/component build backlog is ready.
