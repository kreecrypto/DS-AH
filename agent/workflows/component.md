# Workflow — COMPONENT v2.3

## Purpose
Resolve component identity, ownership, API, variants/properties, state coverage, dependencies, and normalization decisions.

## Default mode
READ_ONLY.

COMPONENT now has an explicit machine flow:
User Request → Intent → Skills → Inspect → Baseline → Reference → Component Decision → QA-01..09 as applicable → Final Aggregation → Evidence.

QA-10 is normally NOT_APPLICABLE unless comparison/visual mutation evidence is part of the task.

## Decision tree
1. Exact approved Core component exists → REUSE.
2. Existing owner supports required semantic property/variant → EXTEND only if ownership permits.
3. Duplicate local semantic component → identify canonical owner and migration/alias need.
4. Visual similarity with different business semantics → keep distinct.
5. One-off composition → SCREEN_ONLY.
6. Ambiguous semantic state/variant → REVIEW_REQUIRED.

## Required checks
- exact identity/key where available
- owner Core / Domain / Screen
- semantic purpose
- property/variant API
- default values
- state coverage
- responsive behavior
- content constraints
- token dependencies
- interaction/accessibility implications
- consumer impact

## Mutation rule
COMPONENT intent never mutates by itself.

If component creation/edit/normalization must change Figma:
COMPONENT decision
→ reroute to MODIFY_SCREEN/FIX
→ explicit Change Scope
→ WRITE_ALLOWED
→ Pre-write Revalidation
→ execution
→ verification
→ QA-01..09
→ QA-10 if visual comparison applies
→ Final QA
→ Evidence.
