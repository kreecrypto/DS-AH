# AH Design System Website v1

## Objective

Build a documentation portal inspired by the information architecture and documentation behavior of mature systems such as Salesforce Lightning Design System, while preserving AH visual identity and audited AH Core DS authority.

## Build sequence

1. Website Shell
2. Navigation / Search
3. Foundations
4. Global Styling Hooks
5. Component Template
6. Button / Input / Card starter set
7. Pattern Template
8. Figma Mapping
9. Agent tab
10. QA

## Architecture

- GitHub = operational knowledge/source registry
- Figma = audited design workspace/source
- AHDS Portal = human-readable explorer
- ChatGPT Design Agent = runtime consumer

The portal must not silently become a second source of truth. Values exposed in the portal must map to registry evidence or be explicitly marked as documentation-only composition.

## v1 routes

- /
- /foundations
- /styling-hooks
- /components
- /components/button
- /components/input
- /components/card
- /patterns
- /patterns/search-filter
- /figma
- /agent
- /qa

## Quality gates

- semantic hooks for UI demos
- no raw colors in TSX
- required route contract
- production Next.js build
- Figma source mapping visible
- component and agent guidance separated
- responsive documentation shell

Visual-regression evidence is required after deployment and is not claimed by repository-only QA.
