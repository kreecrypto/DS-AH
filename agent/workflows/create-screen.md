# Workflow — CREATE SCREEN v2.1

## Control flow

**Inspect → Resolve Authority → Design Decision → Change Scope → Permission → Skill Pipeline → Execute → QA → Fidelity/Regression → Fix Loop → Evidence**

## Preflight
1. Resolve product/domain/target.
2. Inspect exact approved reference candidates.
3. Resolve Build Mode and Reference Gate.
4. Create Design Decision.
5. Define Change Scope:
   - allowed changes
   - protected areas
   - out-of-scope
   - affected states
   - affected viewports
6. Evaluate Write Permission.

Do not mutate unless permission = WRITE_ALLOWED.

## Design pipeline
Figma Inspect
→ Reference / Source Resolution
→ Information Architecture
→ Interaction Design
→ Design System Compliance
→ UX Writing / Content
→ Visual Quality
→ Responsive & Accessibility
→ Figma Execution

### REPRODUCE
Preserve approved shell, IA, geometry, section order, components, spacing, states and responsive behavior.

### ADAPT
Preserve unaffected structure and modify only approved scope.

### EXPLORE
Only with explicit exploration intent. Reuse approved foundations/components unless brief changes the system.

## Post-write
1. Verify mutation.
2. Run QA-01..QA-10 as applicable.
3. Run Reference Fidelity.
4. Run Visual Regression.
5. If fixable P0/P1 fails and permission remains WRITE_ALLOWED, enter Fix Loop.
6. Re-run failed/dependent gates until PASS or genuine BLOCKED.
7. Emit Evidence Matrix.

## Completion
Final result = PASS | FAIL | BLOCKED.
No PASS without evidence. No execution without scope and permission.
