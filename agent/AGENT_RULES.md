# Agent Design Rules

These rules are mandatory for agents modifying product design files.

1. Inspect before creating.
2. Search for an existing component before creating a new one.
3. Prefer approved Master Screens over exploration/reference screens.
4. Never use Archived or Deprecated content as implementation source unless explicitly instructed.
5. Never detach an instance only to make a visual change that should be represented by a component property or variant.
6. Never create `Property 1`, `Property 2`, `Variant4`, `Stage6`, or equivalent placeholder variant names.
7. Use semantic variant axes such as `Device`, `State`, `Style`, `Size`, `Role`, or a documented domain axis.
8. Do not introduce a new color, spacing, radius, or typography value when an approved token already represents the requirement.
9. Preserve the existing approved visual language unless a task explicitly requests a redesign.
10. Core components must not encode feature-specific business content.
11. Domain patterns may encode business structure but must reuse Core Components internally.
12. A full page or screen is not automatically a component.
13. Responsive behavior must be explicit for Desktop, Tablet, and Mobile when the source feature supports all three.
14. New reusable assets require a clear reason: reuse gap, behavior gap, or semantic mismatch.
15. After changes, verify structure, visual output, states, responsive behavior, naming, and source-of-truth compliance.

## New Component Decision Tree

- Existing exact component? → Reuse.
- Existing component with required variant possible? → Extend.
- Same visual but incompatible API? → Wrap or normalize.
- Different semantic purpose? → Create a new component.
- One-off page composition? → Keep as a screen/frame, not a component.

## Forbidden Actions

- Do not treat screenshots, PDFs, Archived areas, or UT exploration as canonical UI.
- Do not create a new token merely because a raw value is easy to enter.
- Do not introduce duplicate component families with different names.
- Do not rename established business concepts without explicit instruction.
- Do not rebuild an approved component from scratch when extension is sufficient.
