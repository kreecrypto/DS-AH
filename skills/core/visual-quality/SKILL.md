---
id: visual-quality
version: 2.2.0
scope: core
category: visual-direction
---

# Visual Quality Skill

## Mission
Produce and verify UI that is visually coherent, intentional, polished, and faithful to the approved product language without introducing subjective redesign outside scope.

For REPRODUCE/ADAPT:
**fidelity and system consistency outrank personal taste.**

## Activate when
Mandatory for CREATE_SCREEN, MODIFY_SCREEN, REVIEW, QA, and any task where visual quality is explicitly discussed.

## Required inputs
- approved reference/design grammar
- live inspection evidence
- DS foundations/components
- IA/content hierarchy
- interaction states
- Change Scope
- supported viewports when relevant

## Visual grammar extraction
Before changing anything, identify:
- page shell
- grid/alignment axes
- density
- spacing scale/rhythm
- typography hierarchy
- surface style
- border/radius/elevation
- icon family
- action hierarchy
- color hierarchy
- repeated component geometry

Record what must remain unchanged.

## Quality dimensions

### 1. Hierarchy
Check:
- primary task/focus visible
- headings/values/actions ranked correctly
- primary CTA does not compete with secondary actions
- important status is perceivable
- decorative emphasis does not outrank task content

### 2. Composition
Check:
- balance of visual weight
- intentional grouping
- whitespace distribution
- major block alignment
- repeated geometry
- no isolated/floating controls
- no accidental dead zones

### 3. Spacing rhythm
Check relationships, not individual gaps only:
- icon ↔ label
- label ↔ value
- field ↔ helper/error
- item ↔ item
- group ↔ group
- section ↔ section

Prefer approved spacing tokens.
Repeated relationships should repeat spacing.

### 4. Alignment
Check:
- left/right edges
- text baselines
- control baselines
- icon optical alignment
- column alignment
- header/body alignment
- repeated card anchors

A visible 1–3 px inconsistency can be a defect in repeated structures.

### 5. Proportion
Check:
- component size relative to importance
- card padding vs content
- icon/button size
- line length
- whitespace vs density
- visual balance between label/value/action

Avoid oversizing to appear "modern".

### 6. Typography
Verify:
- approved family/style
- semantic hierarchy
- size/weight/line-height
- line wrapping
- numeric scanability
- label/value contrast
- no faux bold
- no arbitrary tracking

### 7. Color
Verify:
- semantic token use
- emphasis
- state distinction
- contrast sanity
- no unnecessary accent proliferation
- error/warning/success/selected/disabled differentiation

Color must support meaning, not decorate randomly.

### 8. Surface and shape
Verify:
- radius
- stroke
- divider
- elevation
- fill
- container nesting

Avoid mixing unrelated surface systems on one screen.

### 9. Iconography
Verify:
- approved family
- stroke/fill consistency
- optical size
- alignment
- semantic meaning
- no decorative competition

### 10. Density and scanability
For enterprise UI:
- preserve working density
- reduce decoration before information
- avoid excessive cardification
- preserve table/list scan lines
- maintain predictable row rhythm

### 11. State polish
Check relevant:
- default
- hover
- focus
- pressed
- selected
- disabled
- loading
- empty
- error
- success

Prefer geometry stability across states.

### 12. Edge quality
Inspect:
- clipping
- overflow
- awkward wrapping
- orphan labels
- uneven card/row height
- inconsistent divider
- icon/text centering
- inconsistent radius
- one-off raw color
- overlapping focus/error states

### 13. Data visualization sanity
When charts/metrics exist, verify:
- value hierarchy
- label readability
- legend clarity
- color semantics
- comparison baseline
- no decorative distortion
- no loss of important precision

Do not invent chart meaning/data.

### 14. Visual accessibility
Coordinate with Responsive & Accessibility for:
- contrast
- focus visibility
- non-color state cues
- text sizing
- target clarity

## Anti-drift protocol
Before mutation:
1. extract approved visual grammar
2. list protected visual properties
3. isolate requested change
4. define expected visual delta
5. implement smallest coherent delta
6. compare reference/result
7. revert unrelated beautification

## Severity

### P0
- task hierarchy unusable
- severe overlap/clipping
- unreadable critical content
- wrong component family/source
- material out-of-scope reference drift
- critical state visually indistinguishable

### P1
- repeated spacing/alignment inconsistency
- wrong typography hierarchy
- product density drift
- broken responsive composition
- ambiguous selected/disabled/error state
- material icon/surface inconsistency

### P2
- minor optical correction
- small rhythm inconsistency
- non-blocking decorative polish

## Visual Quality Gate

### PASS
- no P0/P1
- approved visual grammar preserved
- requested visual delta is coherent
- repeated patterns are consistent
- relevant states/viewports are visually stable

### FAIL
Any unresolved P0/P1.

### BLOCKED
Use when comparable visual evidence or authoritative visual grammar cannot be established.

## Anti-patterns
- redesigning unrelated areas to make screen prettier
- introducing new shadows/radii/colors without system evidence
- adding cards around every section
- increasing whitespace at cost of working density
- changing typography hierarchy globally for one local issue
- using visual polish to hide IA/interaction problems
- screenshot matching via raw overrides that break DS

## Required evidence
- reference/visual grammar
- protected visual properties
- hierarchy
- composition
- spacing/alignment
- typography
- color/surface
- iconography
- density
- state polish
- edge quality
- visual accessibility observations
- P0/P1/P2 list
- visual gate result

## Downstream handoff
Pass visual constraints/deltas to Execution, QA, Regression, Fix Loop, and Evidence.
