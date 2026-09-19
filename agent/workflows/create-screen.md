# Workflow — CREATE SCREEN v2

Use only when the user explicitly asks to create/build a Figma screen.

## Flow

**Figma Inspect → Reference / Source Resolution → Information Architecture → Interaction Design → Design System Compliance → UX Writing / Content → Visual Quality → Responsive & Accessibility → Figma Execution → Design QA → Reference Fidelity → Visual Regression → Fix Loop when needed → Evidence**

## 1. Figma Inspect
Inspect supplied target/reference and relevant approved Master evidence. Record structure, component identities, variables, layout behavior, visible states and unknowns.

## 2. Reference / Source Resolution
Resolve product/domain, Build Mode and exact authority.
Do not enter mutation when the gate is ambiguous or missing.
A new/blank file is only a destination.

## 3. Information Architecture
For REPRODUCE, preserve approved hierarchy/grouping/order.
For ADAPT, change only IA explicitly in scope.
For EXPLORE, define primary task, content hierarchy, grouping, navigation and progressive disclosure before visual composition.

## 4. Interaction Design
Define interactive inventory, states, transitions, validation/recovery, back/cancel/close, destructive behavior and async states where relevant.

## 5. Design System Compliance
Resolve reuse/extend/wrap/create decisions. Reuse approved domain/Core components and variables before creation.

## 6. UX Writing / Content
Verify terminology, labels, CTA, state copy, errors, empty/loading/success, placeholder use and realistic wrapping.

## 7. Visual Quality
Apply approved visual grammar. Check hierarchy, composition, spacing rhythm, alignment, typography, color, density, iconography and edge polish.

## 8. Responsive & Accessibility
Verify supported viewport behavior and accessibility state semantics. Do not invent unsupported breakpoints.

## 9. Figma Execution
Mutate only after explicit write authorization and a passed reference gate. Preserve Auto Layout, constraints, naming and unaffected structure.

## 10. Design QA
Run the full QA gate sequence.

## 11. Reference Fidelity
For REPRODUCE/ADAPT, compare reference and result dimension-by-dimension.

## 12. Visual Regression
Compare baseline/result at equivalent viewport/state and classify differences.

## 13. Fix Loop
If any safely fixable P0/P1 gate fails:
Diagnose → smallest fix → re-run failed/dependent gates → visual regression → repeat.
Stop only at PASS or genuine BLOCKED state.

## 14. Evidence
Return structured execution evidence and gate matrix.

## Completion
Final status is PASS, FAIL, or BLOCKED.
Do not report PASS without required evidence.
