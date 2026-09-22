# Policy — Reuse-First Figma Write

## Purpose
Make live Figma writes inherit the product's existing design language instead of creating visually plausible but system-inconsistent UI.

## Mandatory decision ladder
For every intended UI role, evaluate in this order:

1. **Instance** — approved existing component directly fits.
2. **Variant** — same component family, different approved property/state.
3. **Override** — exposed text/icon/content/property override is sufficient.
4. **Domain Pattern** — compose an approved business-aware pattern.
5. **Template/Layout** — reuse an approved screen composition/archetype.
6. **Local Structure** — create bounded layout structure from approved primitives.
7. **New Reusable Asset** — only after the New Component Gate proves a gap.

The agent must record the first usable level and why lower-priority creation was unnecessary.

## Forbidden shortcuts
- rectangle + text replacing an available button/input/badge/card primitive
- detached instance to avoid learning its properties
- new local token because the target file does not expose local variables
- copying a screenshot visually while ignoring existing component identity
- combining multiple screen references into a new hybrid without explicit authority resolution

## Reuse evidence
Each reused asset should record, when available:
- Figma node/component key
- canonical name
- source library/domain
- variant/property mapping
- token/variable dependencies
- visual role
- reference evidence

## Exception
A custom structure is allowed when:
- no approved asset represents the role,
- it is inside authorized scope,
- it does not invent a new reusable API by accident,
- Visual Authority and System Authority remain satisfied,
- the gap is documented.

## Acceptance
A write cannot PASS QA-02 if a materially equivalent approved component existed and the agent created a custom duplicate without documented justification.
