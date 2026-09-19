---
id: ux-review
version: 1.0.0
scope: core
---

# UX Review Skill

## Purpose
Review a screen or flow using evidence, task goals and system rules, then produce actionable findings without redesigning by preference.

## Trigger
Use for REVIEW and before major ADAPT work.

## Review lenses
1. task clarity and primary action
2. information architecture and grouping
3. discoverability and affordance
4. interaction/state completeness
5. error prevention and recovery
6. consistency with known patterns
7. content clarity and label precision
8. efficiency for frequent users
9. accessibility/responsiveness where relevant
10. visual quality

## Finding format
Every finding must include:
- Severity: High / Medium / Low
- Location: exact screen/node/region
- Observation: what is visible
- Impact: what user/system risk it creates
- Evidence: reference, pattern, state or heuristic
- Proposed solution: concrete and bounded
- Acceptance check: how to know it is fixed

## Rules
- Separate facts from hypotheses.
- Do not call a difference a defect unless an approved rule/reference supports it or the usability impact is clear.
- Preserve the existing design language unless the task is explicit exploration.
- Do not use severity as aesthetic preference scoring.
- Prioritize task blockers and state gaps over cosmetic polish.

## Output
Annotated findings plus a short ordered fix plan by severity/dependency.
