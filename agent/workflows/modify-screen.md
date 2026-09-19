# Workflow — MODIFY SCREEN v2

Use when changing an existing screen.

## Flow

**Figma Inspect → Reference / Source Resolution → Information Architecture → Interaction Design → Design System Compliance → UX Writing / Content → Visual Quality → Responsive & Accessibility → Figma Execution → Design QA → Reference Fidelity → Visual Regression → Fix Loop when needed → Evidence**

## Preservation baseline
Before mutation:
1. inspect exact target
2. capture/record pre-change state
3. resolve approved authority
4. default Build Mode to ADAPT
5. define explicit change boundary

## Analysis stages
- IA: determine whether grouping/order/navigation changes are actually required.
- Interaction: determine state/behavior impact.
- DS: determine property/variant/domain/Core/screen-only ownership.
- Content: determine terminology/state-copy impact.
- Visual: define the smallest coherent visual change.
- Responsive/accessibility: assess supported viewport and state impact.

## Execution
Prefer property/variant changes over detach/rebuild.
Preserve unaffected shell, layout, components, content and behavior.

## Post-write
1. Design QA
2. compare against approved reference
3. compare unaffected areas against pre-change baseline
4. run Visual Regression
5. send P0/P1 failures through Fix Loop
6. produce Evidence Matrix

## Hard rule
A small requested change never authorizes surrounding redesign.

## Completion
Final status is PASS, FAIL, or BLOCKED.
