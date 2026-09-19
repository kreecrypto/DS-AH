---
id: responsive-accessibility
version: 1.0.0
scope: core
---

# Responsive & Accessibility Skill

## Purpose
Keep layouts usable across supported viewports and preserve accessible interaction/state semantics.

## Trigger
Use for responsive screens, public-facing flows, forms, navigation, tables, interactive states, or when QA requires it.

## Responsive procedure
1. Read approved responsive evidence/policy.
2. Identify which properties are fixed, fluid, wrapped, collapsed, stacked or hidden.
3. Preserve content priority at narrower widths.
4. Prefer reflow and pattern changes over proportional shrinking.
5. Verify text wrapping, touch targets, table behavior, navigation and modal boundaries.
6. Record unsupported viewport assumptions instead of inventing breakpoints.

## Accessibility checks
- semantic contrast and readable text
- visible focus
- distinguishable disabled/selected/error/success states
- labels not dependent on color alone
- control labels and error messages remain clear
- interactive target size appropriate to product platform
- logical order for keyboard/screen-reader implementation handoff
- no essential information encoded only in icon/color

## Rules
- Use repository/product accessibility policy when more specific.
- Do not claim formal WCAG compliance unless it was actually evaluated against the required criterion.
- Accessibility improvements in ADAPT mode must not silently redesign unrelated structure.

## Output
responsive coverage, accessibility risks, fixes and unresolved assumptions.
