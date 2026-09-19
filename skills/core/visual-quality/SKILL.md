---
id: visual-quality
version: 1.0.0
scope: core
---

# Visual Quality Skill

## Purpose
Produce UI that is visually coherent, deliberate, polished and faithful to the approved design language. This skill controls aesthetic quality without inventing a new visual language.

## Trigger
Mandatory for CREATE, MODIFY, REVIEW and visual QA.

## Core principle
**Beauty is controlled visual hierarchy + proportion + rhythm + alignment + typography + restraint + consistency + detail quality.**

For REPRODUCE/ADAPT, fidelity outranks personal taste. A "prettier" redesign that drifts from the approved Master is a failure.

## Visual quality dimensions

### 1. Hierarchy
- One clear primary focus per section.
- Heading, supporting text, values and actions must have distinguishable emphasis.
- Primary CTA must not compete with secondary actions.
- Information importance must map to visual emphasis.

### 2. Composition
- Use intentional grouping and whitespace.
- Balance visual weight across the frame.
- Avoid accidental empty zones, crowded islands and floating elements.
- Major blocks must align to a shared grid or clear optical axis.
- Repeated cards/rows must share geometry unless content requires an approved exception.

### 3. Spacing rhythm
- Prefer system spacing tokens.
- Repeated relationships must use repeated spacing.
- Inner padding < gap between sibling groups < gap between major sections.
- Avoid near-duplicate spacing values that create visual noise.
- Check vertical rhythm from top to bottom, not component-by-component only.

### 4. Alignment
- Text, controls, icons and content edges must align intentionally.
- Baselines matter for compact horizontal UI.
- Misalignment of 1–3 px is still a quality defect when visibly inconsistent.
- Center alignment is not a substitute for hierarchy.

### 5. Proportion
- Component size should reflect importance and interaction needs.
- Do not oversize cards, icons, pills or whitespace merely to look modern.
- Maintain approved density of the product.
- Control line length and content width.

### 6. Typography
- Use approved families/styles/tokens.
- Limit unnecessary size/weight changes.
- Distinguish hierarchy using a controlled combination of size, weight and color.
- Avoid faux-bold, arbitrary letter spacing and inconsistent line-height.
- Numeric data and labels must remain scannable.

### 7. Color
- Use semantic/tokenized color where available.
- Color must communicate hierarchy/state, not decorate randomly.
- Maintain contrast and state distinction.
- Avoid introducing extra accent colors not present in the system.
- Disabled, hover, selected, warning, error and success states must remain semantically distinct.

### 8. Shape and surface
- Radius, border, elevation and dividers must follow system patterns.
- Avoid mixing multiple visual surface styles in one screen.
- Use elevation only when it communicates layering or interaction.

### 9. Iconography
- Use one approved icon family/style per context.
- Match stroke/fill, optical size and bounding box.
- Icons must support meaning; decorative icons should not compete with content.

### 10. Density and scanability
- Optimize for the product's working context.
- Reduce decoration before reducing essential information.
- Dense enterprise UI can still be beautiful when alignment and hierarchy are disciplined.
- Avoid both over-compression and excessive cardification.

### 11. State polish
Check default, hover, focus, pressed, selected, disabled, loading, empty, error and success states when relevant.
State changes must preserve geometry where possible to avoid layout jump.

### 12. Edge quality
Check:
- clipping
- overflow
- truncation
- awkward wrapping
- orphan labels
- uneven card heights
- inconsistent dividers
- icon/text centering
- inconsistent corner radius
- accidental one-off colors
- raw values replacing variables

## Anti-drift protocol
Before changing a design:
1. identify the approved visual grammar
2. list the elements that must remain unchanged
3. isolate the requested change
4. make the smallest coherent visual change
5. compare before/after
6. revert unrelated beautification

## Visual Quality Gate
A result cannot PASS when any P0/P1 defect exists.

P0:
- broken hierarchy that prevents task understanding
- severe overlap/clipping
- unreadable contrast
- wrong component family/source
- material deviation from approved reference outside requested scope

P1:
- inconsistent spacing/alignment across repeated patterns
- wrong typography hierarchy
- density materially inconsistent with product
- broken responsive composition
- selected/disabled/error states visually ambiguous

P2:
- minor optical alignment
- small rhythm inconsistencies
- decorative polish

## Required evidence
- reference used
- visual grammar preserved
- hierarchy result
- spacing/alignment result
- typography/color result
- density result
- state result
- edge-quality result
- remaining P2 polish, if any
