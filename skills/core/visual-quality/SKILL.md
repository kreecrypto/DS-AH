---
id: visual-quality
version: 2.4.0
scope: core
category: visual-direction
---

# Visual Quality Skill

## Mission
Produce and verify UI that is visually coherent, intentional, polished, and faithful to the locked Visual Authority without subjective redesign outside scope.

For REPRODUCE/ADAPT, fidelity outranks personal taste.

## Activate when
Mandatory for CREATE_SCREEN.
Mandatory for MODIFY_SCREEN/FIX.
Mandatory for REVIEW and QA where visual quality/fidelity matters.
Use whenever a visual reference is supplied.

## Required inputs
- Reference Lock
- approved visual reference
- live Figma inspection
- baseline evidence
- Design System foundations/components
- IA/content hierarchy
- interaction states
- Change Scope
- supported viewports

## Visual grammar extraction
Before Design Decision on reference-based work, extract a structured Visual Grammar.

### Canvas
- aspect ratio
- width/height when known
- background role
- outer margin

### Layout
- grid type
- columns/rows
- column/row gaps
- alignment anchors
- major region bounds

### Hierarchy
- primary focal area
- secondary areas
- action hierarchy
- metric/value hierarchy
- dominant visual anchors

### Repeated pattern
- pattern name
- count
- card/row anatomy
- invariant order
- repeated geometry
- internal alignment

### Typography
- role hierarchy
- family/style if known
- size/weight/line height
- numeric emphasis
- wrapping behavior

### Surface
- radius
- stroke
- elevation
- fill
- divider
- nesting

### Color roles
- background
- primary/secondary text
- accent
- positive/negative/status
- chart roles

### Iconography
- family
- stroke/fill behavior
- optical size
- placement

### Chart grammar
- geometry
- axes
- labels
- trend line/bar style
- badges/markers
- legend
- baseline

### State grammar
- default
- selected
- hover/focus if visible
- disabled/error/loading/empty as applicable

### Responsive grammar
- fixed/fluid behavior
- wrapping
- stack/collapse/hide
- scroll
- substitute pattern

### Fidelity anchors
List the most important visual properties that must match.

### Unknowns
Record material unknowns explicitly.
Do not silently invent them in REPRODUCE.

Write output against agent/planner/visual-grammar.schema.json.

## Quality dimensions

### 1. Hierarchy
Check task/focus, values/actions, status prominence and decorative restraint.

### 2. Composition
Check balance, grouping, whitespace, major alignment and repeated geometry.

### 3. Spacing rhythm
Check repeated relationships and approved spacing semantics.

### 4. Alignment
Check edges, baselines, columns, card anchors and optical alignment.

### 5. Proportion
Check component size, padding, whitespace, label/value/action balance.

### 6. Typography
Check approved family, role, weight, line height, wrapping and numeric scanability.

### 7. Color
Check semantic roles, state distinction, contrast and accent restraint.

### 8. Surface and shape
Check radius, stroke, elevation, fill and nesting consistency.

### 9. Iconography
Check approved family, meaning, consistency and alignment.

### 10. Density and scanability
Preserve working density and avoid unnecessary cardification.

### 11. State polish
Check relevant visual states while preserving geometry stability.

### 12. Edge quality
Check clipping, overflow, awkward wrap, uneven heights and one-off raw values.

### 13. Data visualization sanity
Check readable labels, legends, baseline and no invented data meaning.

### 14. Visual accessibility
Coordinate contrast, focus, non-color state cues and text size.

## REPRODUCE skeleton protocol
Use agent/flow/reference-reproduce.json.

Build first:
1. canvas
2. major regions
3. grid
4. repeated-card bounds/order
5. major gaps/margins
6. hierarchy blocks

Then capture comparable visual evidence.
Side-by-side compare with locked reference.
Do not continue detail work with unresolved P0/P1 skeleton mismatch.

## Visual Quality Gate

### PASS
- no P0/P1
- Visual Grammar complete enough for task
- locked visual roles preserved
- repeated patterns consistent
- relevant states/viewports stable

### FAIL
Any unresolved material visual defect or unexplained reference drift.

### BLOCKED
Comparable visual evidence or authoritative grammar cannot be established.

## Anti-patterns
- redesigning unrelated areas to make it prettier
- substituting Product Master composition for user ref
- adding new surface language without evidence
- changing density to appear modern
- hiding IA problems with visual polish
- metadata-only visual PASS
- raw screenshot matching that breaks DS semantics
- continuing detail build after skeleton fidelity failure

## Required evidence
- Reference Lock
- Visual Grammar
- protected visual properties
- hierarchy
- composition
- spacing/alignment
- typography
- color/surface
- iconography
- density
- chart/state observations
- skeleton side-by-side when REPRODUCE
- P0/P1/P2 list
- Visual Quality Gate result

## Downstream handoff
Pass:
- Visual Grammar
- fidelity anchors
- protected visual properties
- expected visual delta
- skeleton checkpoint requirements
to DS Mapping, Design Decision, Execution, QA-01B, QA-07, Regression, Fix Loop, and Evidence.
