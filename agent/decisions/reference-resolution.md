# Decision — Reference Resolution & Fidelity Gate

This decision is mandatory before every CREATE_SCREEN or MODIFY_SCREEN write.

## Step 1 — Determine Build Mode

Use exactly one:

- **REPRODUCE**: matching approved/current Master exists. This is the default.
- **ADAPT**: user requests a bounded change to an existing design.
- **EXPLORE**: user explicitly asks for a new concept/direction/from-scratch solution.

A blank/new file is a destination, not a design mode.

## Step 2 — Resolve the reference

Priority:

1. user-supplied exact Figma node
2. exact named approved/current Master Screen
3. explicit domain mapping to a single approved/current Master
4. unique approved/current candidate from registry

Do not silently fall back to legacy/reference-only screens.

## Step 3 — Run the gate

### PASS
One exact/unique approved reference is resolved.

### BLOCKED_REFERENCE_AMBIGUOUS
More than one approved/current source is plausible.

Example:
`สร้างหน้า Dashboard` in Agency context is ambiguous because Team Performance and My Performance are both primary candidates.

The agent must not build a generic dashboard from memory or mix both designs.

### BLOCKED_REFERENCE_MISSING
No valid source is found and EXPLORE was not explicitly requested.

### EXPLORE_EXPLICIT
The user explicitly requested original exploration.

## Step 4 — Fidelity contract

For REPRODUCE:
- use the source layout as the structural blueprint
- preserve section order and page shell
- preserve component families and state model
- preserve spacing/geometry unless target constraints require a documented adaptation
- content substitution must not change the layout concept

For ADAPT:
- preserve everything outside the requested change scope

## Completion gate

After a Figma write, compare the result with the approved reference.

If material layout/hierarchy differences exist outside the requested scope:
- QA = FAIL
- fix before reporting completion
