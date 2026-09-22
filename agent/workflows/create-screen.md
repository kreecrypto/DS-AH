# Workflow — CREATE SCREEN v2.4 + Write Fidelity Extension

## Goal
Create a screen that looks and behaves like it belongs to the same product, not like a generic AI-generated screen.

## Canonical flow
Inspect → Baseline → Retrieve Reference Candidates → Score/Rank References → Resolve Authority Lanes → Reference Lock → Visual Grammar → DS Mapping → Screen Archetype → Composition Knowledge → Reuse Map → Design Decision → Scope + Mutation Budget → Permission → Pre-write Revalidation → Write Plan → Structure Pass → REPRODUCE Skeleton Checkpoint when applicable → Component Composition Pass → Content + State Pass → Visual Polish Pass → Verification → Visual Delta → QA-01A → QA-01B → QA-02..09 → QA-10 → Delta Patch Loop → Evidence.

## Reference retrieval
Use this order:
1. exact current-task user visual/Figma reference
2. exact named approved product screen
3. same-product screen with matching job-to-be-done
4. approved domain pattern
5. approved template/archetype evidence
6. Core DS component/foundation evidence
7. general design knowledge only for unresolved details

Never let a lower source silently replace a higher source.

## Scoring
Only score when the reference is not already explicit. Use `agent/reference/reference-resolver.json`.
Score product/domain, screen job, composition/layout, interaction/state, component overlap, density/hierarchy, and approval/currency.

A strong semantic match with weak composition is supporting evidence, not Primary Visual Authority.

## Screen Archetype
Use `agent/archetypes/screen-archetypes.json`.
Archetype defines expected regions and UX flow. Locked Visual Authority still owns composition.

## Composition Knowledge
For every major region resolve:
- role/purpose
- approved example screens
- pattern/component family
- ordering
- alignment anchors
- spacing rhythm
- responsive behavior
- states
- allowed variability
- visual invariants

## Reuse Map
Resolve every planned UI role in this order:
1. instantiate approved component
2. select approved variant/state
3. override exposed properties/content
4. compose existing domain pattern
5. reuse existing template/layout
6. create bounded local structure
7. create a reusable asset only through the New Component Gate

Custom rectangle + text is not an acceptable substitute for an available component instance.

## Write Plan
Conform to `agent/write/write-plan.schema.json`.
Every operation declares region, role, operation type, source asset, expected properties, token dependencies, protected siblings, verification target and recovery hint.

## Execution passes

### Pass A — Structure
Create page/frame, major regions, Auto Layout hierarchy, columns/grid, content width, section ordering, scroll behavior and container geometry. No decorative polish.

### Pass B — Component Composition
Instantiate/compose approved header/navigation, search/filter, buttons, inputs, tables/lists, cards, tabs/chips, status/badges, pagination and domain patterns. Validate identity and variants before continuing.

### Pass C — Content + State
Apply labels/data, icons, validation and all relevant empty/loading/error/success/selected/active/disabled states.

### Pass D — Visual Polish
Normalize spacing, alignment, sizing, typography hierarchy, density and optical balance. Polish cannot expand scope.

## REPRODUCE
Apply `agent/flow/reference-reproduce.json`.
Skeleton checkpoint covers canvas/aspect ratio, major regions, grid, repeated bounds/order, major spacing and hierarchy.
P0/P1 skeleton mismatch blocks detail build.

## Verification
Verify reuse identity, variant/property correctness, semantic variables/tokens, Auto Layout/constraints, state coverage, archetype completeness and visual alignment.

## Visual Delta
Generate structured delta records for GEOMETRY, ALIGNMENT, SPACING, TYPOGRAPHY, COLOR_SURFACE, COMPONENT_IDENTITY, VARIANT_STATE, CONTENT, DENSITY, RESPONSIVE and SCOPE.

Patch P0/P1 by root cause and re-run verification. Do not redraw the whole screen unless the root cause is structural and scope authorizes it.

## Completion
PASS / FAIL / BLOCKED only after final aggregation and evidence.
