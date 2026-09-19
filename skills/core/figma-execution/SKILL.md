---
id: figma-execution
version: 1.0.0
scope: core
---

# Figma Execution Skill

## Purpose
Translate an approved design decision into safe, reversible Figma changes.

## Trigger
Use only for explicit CREATE/MODIFY/FIX/APPLY/IMPLEMENT requests.

## Preconditions
- current task explicitly authorizes write
- target file/node resolved
- Build Mode resolved
- Reference Fidelity Gate = PASS or EXPLORE_EXPLICIT
- required product evidence loaded
- relevant reference inspected read-only first

## Execution procedure
1. Build an execution plan at component/frame level.
2. Reuse existing components and variables.
3. Preserve Auto Layout and constraints.
4. Modify the smallest required scope first.
5. Keep unaffected structure unchanged.
6. Use semantic component properties/variants instead of detached/manual overrides.
7. Preserve naming conventions and layer organization.
8. After mutation, inspect/capture the result.
9. Run Design QA + Visual Quality Gate.
10. Fix material divergence before reporting completion.

## REPRODUCE
Match approved hierarchy, geometry, section order, component families, spacing rhythm, states and responsive behavior.

## ADAPT
Change only the requested scope; surrounding layout and system language remain stable.

## EXPLORE
May create new concepts only when exploration is explicit. Even then, reuse foundations and components unless the exploration brief says otherwise.

## Prohibited
- hidden redesign outside scope
- detached instances for convenience
- placeholder properties such as Property 1 / Variant6
- fabricated tokens/variables
- writing before reference ambiguity is resolved
- claiming a mutation that was not verified

## Output evidence
- nodes/areas changed
- reused components/variables
- new assets, if any
- before/after reference
- QA result
- unresolved limitations
