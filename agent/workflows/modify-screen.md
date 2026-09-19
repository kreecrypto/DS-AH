# Workflow — MODIFY SCREEN v2.1

## Control flow

**Inspect target/baseline → Resolve Authority → Design Decision → Change Scope → Permission → Adapt → QA → Regression → Fix Loop → Evidence**

## Baseline
Before mutation:
1. inspect exact target
2. capture/record pre-change state
3. resolve approved source authority
4. Build Mode defaults to ADAPT
5. define explicit change boundary

## Change Scope
Must list:
- allowed changes
- protected areas
- out-of-scope
- affected states
- affected viewports

Everything not explicitly changed is preserved by default.

## Permission
MODIFY intent = WRITE_PENDING.
WRITE_ALLOWED requires explicit current-task write language + resolved target + scope + valid reference gate + live write capability.

## Analysis
- IA impact
- interaction/state impact
- DS/component ownership
- UX writing/content impact
- visual change
- responsive/accessibility impact

## Execution
Prefer property/variant changes over detach/rebuild.
Make the smallest coherent in-scope change.
Do not change protected areas.

## Post-write
1. verify mutation
2. Design QA
3. Reference Fidelity
4. compare protected/unaffected areas to pre-change baseline
5. Visual Regression
6. P0/P1 fix loop when safely fixable and authorized
7. Evidence Matrix

A protected-area change outside approved scope is QA-09 FAIL.

## Completion
PASS | FAIL | BLOCKED.
