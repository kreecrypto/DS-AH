# Website Implementation Workflow v1.0

## Purpose

Turn verified Figma Design System evidence and DS-AH GitHub knowledge into implementation-ready website changes without allowing the documentation website to redefine the Design System.

Authority order:

`Figma Core DS → approved domain pattern / Master → GitHub canonical mapping → website implementation`

The website is a consumer and documentation surface. It is not a source of truth for tokens, component APIs, or design semantics.

---

## Canonical flow

User Request
→ Resolve Website Intent
→ Load DS-AH Context
→ Inspect Existing Website/Code
→ Resolve Figma/System Authority
→ Create Website Implementation Brief
→ Map Figma Assets/Tokens to Web Primitives
→ Define Route/Page Scope
→ Define Acceptance Criteria
→ Branch / Worktree
→ Implement Shell or Feature Slice
→ Static Validation
→ Runtime Verification
→ Responsive QA
→ Accessibility QA
→ Design-System Compliance QA
→ Visual Fidelity / Regression
→ Content & State QA
→ Fix Loop
→ Evidence Pack
→ Pull Request
→ Review Gate
→ Merge
→ Post-merge Runtime Check
→ Complete

---

## Phase W0 — Intake and intent

### Inputs
- user request
- target website/runtime URL
- target repository
- exact Figma reference when supplied
- requested page/component/pattern
- constraints such as “match structure”, “do not change DS”, or “leave placeholder content”

### Classify intent
Choose one:
- WEBSITE_SHELL
- DOCS_ROUTE
- FOUNDATION_DOC
- COMPONENT_DOC
- PATTERN_DOC
- FIGMA_MAPPING
- AGENT_DOC
- QA_DOC
- BUG_FIX
- VISUAL_PARITY_FIX
- RESPONSIVE_FIX
- ACCESSIBILITY_FIX
- CONTENT_ONLY

### Exit gate W0
Must know:
- repository
- route or affected area
- whether exact visual reference exists
- whether task is implementation vs documentation-only
- explicit scope boundaries

Unknown content may be represented as an explicit placeholder when the user has allowed it. Unknown design behavior must never be invented.

---

## Phase W1 — Load authoritative context

Read only the context needed for the task:

1. `AGENTS.md`
2. `agent/manifest.json`
3. `registry/documentation-site.json`
4. matching Core token chunk from `registry/core-ds-tokens/`
5. matching component records from `registry/core-ds-components.json`
6. `registry/core-ds-preferred.json` when duplicate families exist
7. `registry/core-ds-component-dependencies.json` for dependency identity
8. `registry/core-ds-responsive-decision.json`
9. domain/master registries only when the task needs them
10. visual baseline records when comparable assets exist

### Hard rules
- Prefer Figma `componentKey` over display name.
- Do not replace a legacy instance merely because a same-name Core component exists.
- Do not use deprecated Responsive token `typography/screensize`.
- Use text Desktop/Mobile modes and explicit layout breakpoints.
- Use `container` for documentation card-like composition until a distinct Card API is formally approved.
- External/domain-only components stay outside Core until governance promotes them.

### Exit gate W1
Every web UI role being implemented must be classified as:
- CORE_REUSE
- DOMAIN_REUSE
- WEBSITE_COMPOSITION
- CONTENT_ONLY
- BLOCKED_UNRESOLVED

---

## Phase W2 — Inspect existing website/code before changes

Inspect:
- framework and package manager
- routing model
- layout/shell files
- component folder conventions
- token/CSS variable strategy
- typography loading
- icon strategy
- search implementation
- responsive breakpoints
- tests and CI
- existing accessibility patterns
- deployment/runtime setup

Do not introduce a second token system, second router convention, or parallel component library unless explicitly required.

### Output
Create a short implementation baseline:
- current architecture
- reusable existing code
- gaps
- files likely to change
- risk areas

### Exit gate W2
No implementation plan until existing code reuse candidates are identified.

---

## Phase W3 — Website Implementation Brief

Before coding, create a task brief containing:

- task ID
- intent
- target route(s)
- Figma source/file/node
- Core component keys
- token groups required
- visual authority
- content authority
- responsive expectations
- states required
- accessibility expectations
- placeholders allowed
- files in scope
- files explicitly out of scope
- acceptance criteria
- evidence required

### Change-scope rule
A visual polish request cannot expand into DS refactoring.
A docs-route task cannot silently mutate Core Figma.
A missing component cannot be created as Core merely to unblock website composition.

---

## Phase W4 — Map Design System to web implementation

For each UI role create a mapping row:

| Web role | Figma authority | componentKey/token | Web implementation | Decision |
|---|---|---|---|---|
| primary action | button | a312... | existing Button primitive | CORE_REUSE |
| icon action | button icon | e384... | Button/IconButton | CORE_REUSE |
| search | desktop/search | 8c565... | Search control | CORE_REUSE |
| text input | input-text | 874270... | Input | CORE_REUSE |
| navigation item | menu | c27fb... | NavItem | CORE_REUSE |
| sidebar | side-bar | 27cffe... | DocsSidebar | ADAPT_COMPOSITION |
| mobile menu | mobile/menu | cdd936... | MobileNav | CORE_REUSE |
| header | header | 769388... | PageHeader | ADAPT_COMPOSITION |
| breadcrumb | breadcrumb | cf65... | Breadcrumb | CORE_REUSE |
| tab/chip | tab family | 8240... / a5b3... | Tabs/Chip | CORE_REUSE |
| docs content card | container | 878930... | ContentPanel | USE_CONTAINER_FIRST |

### Token mapping
Prefer semantic roles:
- background
- text
- stroke
- interaction
- feedback
- focus
- spacing
- radius
- typography

Raw hex/pixel values are fallback evidence only when no semantic token mapping exists.

### Exit gate W4
No component is implemented without an authority/mapping decision.

---

## Phase W5 — Route/page composition order

Implement in this dependency order:

1. Website Shell
2. Global Navigation / Search
3. Foundations pages
4. Styling Hooks documentation
5. Component Page Template
6. First Core docs: Button, Input, Container
7. Remaining component docs
8. Pattern Template
9. Figma Mapping
10. Agent
11. QA

Do not start isolated deep routes before the shared shell/template is stable unless fixing an existing production bug.

---

## Phase W6 — Implementation strategy

### Slice size
Prefer one independently verifiable vertical slice:
- route
- data/config
- components
- responsive rules
- tests
- evidence

### Reuse order
1. existing website component
2. mapped Core web primitive
3. domain component
4. website-only composition
5. new primitive only after governance evidence

### Styling
- consume mapped design tokens
- avoid one-off magic values when token exists
- preserve canonical DS semantics even when Figma display names contain legacy spelling
- keep legacy alias only at lookup/integration boundary

### Assets
- use verified icon/image source
- do not redraw Figma icons from memory
- keep asset provenance when required

---

## Phase W7 — Static validation

Required where supported:
- install/lockfile consistency
- lint
- typecheck
- unit tests
- build
- route generation validation
- registry validation when mapping files change

Any failure introduced by the change blocks QA.

---

## Phase W8 — Runtime verification

For every changed route verify:
- route loads directly
- client navigation works
- refresh/deep-link works
- no console/runtime errors
- navigation active state is correct
- search opens/closes and keyboard behavior works
- links/buttons have expected states
- loading/empty/error states are represented when applicable

If the application is SPA/client-routed, runtime inspection must use an interactive browser rather than relying on crawler route discovery.

---

## Phase W9 — Responsive QA

Minimum view classes:
- Desktop
- Tablet when the product actually supports it
- Mobile

Check:
- shell/navigation transformation
- reading width
- typography reflow
- component wrapping
- overflow/scroll
- table/pattern behavior
- touch targets
- sticky/fixed regions
- modal/sheet behavior

Use explicit layout behavior. Do not resurrect `Responsive/typography/screensize`.

---

## Phase W10 — Accessibility QA

Blocking checks:
- semantic landmarks
- heading hierarchy
- labels and accessible names
- keyboard reachability
- visible focus
- dialog focus handling
- contrast against approved tokens
- touch target sizing
- meaningful icon labels
- reduced-motion consideration where animation exists

No “visual match” may override an accessibility blocker without explicit product decision.

---

## Phase W11 — Design System Compliance QA

Check:
- correct Core/domain ownership
- correct component identity
- correct states/variants
- semantic token use
- no unauthorized Card/Core primitive
- no same-name identity substitution
- no deprecated Responsive token
- canonical API used in new code
- legacy aliases isolated
- no website token values overriding Figma authority

Blocking severity:
- P0: wrong authority/source or invented system primitive
- P1: wrong component identity/state/token semantics
- P2: naming/cleanup issue without behavioral or visual impact

---

## Phase W12 — Visual fidelity and regression

When exact reference exists:
1. capture reference
2. capture implementation at matched viewport
3. compare shell/grid/hierarchy first
4. compare typography, spacing, states, surfaces
5. fix material differences
6. repeat

For existing pages:
- capture before
- implement
- capture after
- confirm intended region changed
- confirm preserved regions did not drift

Metadata-only evidence cannot pass visual parity.

---

## Phase W13 — Content/state QA

Verify:
- terminology follows approved documentation vocabulary
- component property names shown to users use canonical naming
- Figma legacy spellings appear only when documenting the literal source API
- examples cover required states
- missing source content uses explicit placeholder labels, never invented facts
- code examples do not claim Code Connect parity while Code Connect remains blocked

---

## Phase W14 — Fix loop

For every blocker:
1. classify gate
2. identify root cause
3. make smallest scoped fix
4. rerun static validation
5. rerun affected runtime/visual checks
6. rerun regression
7. update evidence

Never fix a local mismatch by changing Design System authority without a separate DS governance task.

---

## Phase W15 — Evidence pack

A website implementation is not complete without:

- task/intent
- changed routes
- changed files
- Figma reference(s)
- componentKey mappings
- token groups used
- before/after or reference/result captures when visual
- responsive evidence
- accessibility checks
- static validation result
- runtime result
- open gaps
- explicit PASS / FAIL / BLOCKED

Recommended storage:
- PR body for human review
- machine-readable record under implementation evidence when persistent traceability is required

---

## Phase W16 — Pull request contract

PR must state:

### What
Routes/components changed.

### Why
User requirement and approved authority.

### DS mapping
Figma component keys and token families consumed.

### Scope
In-scope and deliberately untouched areas.

### Verification
Build/typecheck/tests/runtime/responsive/a11y/visual.

### Evidence
Screenshots or artifacts.

### Gaps
Known unresolved items.

### Merge gate
Do not merge if:
- static validation fails
- authority is unresolved
- P0/P1 DS compliance issue remains
- reference visual comparison is required but unavailable
- changed route fails runtime/deep-link
- accessibility blocking issue remains

---

## Phase W17 — Post-merge verification

After merge:
- confirm deployment/runtime corresponds to merged SHA when observable
- smoke-test changed routes
- verify no shell/nav/search regression
- record deployment-specific blocker separately from implementation quality

Production deployment is not required to prove code correctness when deployment is explicitly out of scope, but runtime evidence must be clearly labeled local/preview/production.

---

## Completion states

### PASS
All required gates pass and evidence is present.

### FAIL
Implementation exists but one or more blocking quality gates fail.

### BLOCKED
Required external authority/capability/reference is unavailable and guessing would be required.

---

## Agent invariants

- Inspect before implement.
- Figma remains system authority.
- GitHub remains mapping/contract/evidence authority.
- Website remains consumer/presentation layer.
- componentKey beats display name.
- Reuse beats recreation.
- Semantic token beats raw value.
- Container before new Card.
- Explicit Device behavior beats deprecated Responsive token.
- No scope expansion through cleanup.
- No PASS without runtime and applicable visual evidence.
