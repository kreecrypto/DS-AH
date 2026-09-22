# Design Agent Write Fidelity — Deep Workflow Extension

Status: Operational extension for Design Control Agent v2.4  
Purpose: Make Figma Write consistently inherit the same product language, Design System, screen grammar and composition patterns as approved existing work.

## 1. Problem statement

A generic AI write flow often produces a screen that is individually attractive but does not look as if the same product team designed it. Typical causes:
- prompt-first design with insufficient retrieval
- component recreation instead of reuse
- Design System used only for color/typography, not composition
- no screen-family/archetype resolution
- mixing several references without authority lanes
- one-shot mutation without structure checkpoint
- visual QA reports symptoms but does not create a bounded patch plan

This extension converts write behavior from **generate** to **retrieve → resolve → compose → verify → patch**.

## 2. Knowledge model

### Visual Authority
Owns composition, geometry, hierarchy, density, card anatomy, spatial rhythm and visual relationships.

### System Authority
Owns component identity/API, semantic variables, typography foundations, icons and accessibility primitives.

### Content Authority
Owns verified product labels, data, business behavior and domain terminology.

### Preservation Authority
Owns unchanged target regions during MODIFY/FIX.

### Composition Knowledge
Connects a screen job to reusable regions and tells the agent how components are normally assembled in this product.

## 3. Reference retrieval and scoring

When the user supplies an exact reference, lock it; do not score alternatives against it.

Otherwise build a candidate set and evaluate:
- product/domain match
- job-to-be-done
- composition/layout
- interaction/state
- component/pattern overlap
- density/hierarchy
- approval/currency

Use one Primary Visual Authority whenever possible. Secondary references are lane-specific gap fillers.

### Anti-hybrid rule
Do not merge “best parts” of unrelated masters by default. Mixed-reference composition requires explicit synthesis intent or a documented source gap.

## 4. Screen archetype

Archetype answers: **what regions must this kind of screen normally contain?**

It does not answer: **what should this screen look like?** That remains the job of Visual Authority.

This separation prevents both missing UX structure and design drift.

## 5. Composition Knowledge

A component registry tells the agent what exists. Composition Knowledge tells it how approved screens assemble those things.

For each region store:
- role and purpose
- order
- component/pattern families
- source examples
- alignment anchors
- spacing rhythm
- state behavior
- responsive behavior
- visual invariants
- allowed content variation

This is the layer that lets a new Role Master feel like the existing User/Master screens without cloning the wrong business content.

## 6. Reuse Map

Every planned role passes the same ladder:

**Instance → Variant → Override → Domain Pattern → Template/Layout → Local Structure → Approved New Reusable Asset**

The agent must prefer the earliest valid rung.

This prevents:
- custom button rectangles
- duplicated filters
- one-off table patterns
- local tokens that conflict with remote DS
- detached instances created only for convenience

## 7. Mutation Budget

Every write has a maximum change radius.

MICRO < LOCAL < REGIONAL < STRUCTURAL < FULL.

For MODIFY/FIX, the agent captures a Preservation Baseline and declares protected regions before mutation.

Mutation Budget is also used during QA: a defect outside authorized scope is reportable but not automatically fixable.

## 8. Write Plan

Before mutation, convert design intent to explicit operations.

Each operation names:
- region and UI role
- operation type
- source component/pattern
- property/variant target
- token dependencies
- protected siblings
- verification target
- recovery hint

This eliminates “creative wandering” during write execution.

## 9. Four-pass execution

### A. Structure Pass
Page/frame, major regions, Auto Layout hierarchy, grid/columns, content width, scroll model and container geometry.

### B. Component Composition Pass
Instantiate and compose approved components/patterns. Validate identity before content polish.

### C. Content + State Pass
Labels, data, icons, validation and interaction states.

### D. Visual Polish Pass
Spacing, alignment, sizing, typography hierarchy, density and optical balance.

Never start with polish. If the skeleton is wrong, polishing only makes the wrong structure more expensive to fix.

## 10. Verification and Visual Delta

Verification is both structural and visual.

A Visual Delta is not “looks a bit off.” It is a structured record:
- category
- severity
- expected
- actual
- root cause
- patch target
- scope permission
- evidence

This makes the Fix Loop deterministic.

## 11. Root-cause patching

Examples:
- repeated cards shifted → inspect parent Auto Layout, not every child x-position
- wrong button size → set component Size property, do not resize the instance manually
- spacing mismatch across section → resolve the container gap/token
- wrong visual density → inspect archetype/composition values before adjusting isolated paddings
- correct screenshot but custom primitives → QA-02 still fails because structural/system fidelity is wrong

## 12. Acceptance model

A write is strong only when all four are true:
1. **Authority Fidelity** — right reference/source
2. **System Fidelity** — right components/variables/API
3. **Composition Fidelity** — right screen grammar/archetype/relationships
4. **Visual Fidelity** — result matches expected geometry/hierarchy/density

A beautiful screen may still FAIL if any blocking fidelity dimension fails.

## 13. Example — Role Master

Request: “Create Role Master using Agency Core DS.”

Expected reasoning:
1. retrieve approved Master/User/Permission screens
2. resolve MASTER_LIST archetype
3. lock closest same-product screen as Primary Visual Authority
4. map header/search/filter/table/status/actions/pagination to approved assets
5. build Reuse Map
6. Structure Pass
7. component composition
8. content/state
9. visual polish
10. compare, emit deltas, patch
11. PASS only after QA-01A/01B/02..10

The agent should behave like a designer extending an existing product, not a designer starting from a blank canvas.
