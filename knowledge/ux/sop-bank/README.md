# Bank UX/UI SOP

Status: Active  
Owner: Bank  
Scope: End-to-end UX/UI operating procedure across product design, Figma, prototype, review, QA, and handoff.

## 1. Purpose

This SOP turns recurring UX/UI working patterns into a reusable operating system.

It is designed for work such as:

- UX/UI review and improvement
- Figma inspection and implementation
- Search & Filter improvement
- information architecture and hierarchy review
- complex form and workflow design
- dashboard and data-heavy UI
- state and exception-path design
- prototype flow
- design system compliance
- UX writing review
- design QA
- developer handoff
- old vs new comparison
- evidence-based review
- motion graphic / UI storytelling video
- Old vs New motion comparison
- Figma UI to video / JavaScript motion

The objective is not to produce more screens. The objective is to make the user journey clearer, the interaction safer, the UI more consistent, and the final implementation verifiable.

## 2. Core operating principles

1. **Inspect before deciding.**
2. **Understand context before changing UI.**
3. **Fix the user problem, not only the appearance.**
4. **Reuse before creating.**
5. **Preserve existing Design System unless change is explicitly required.**
6. **Design states, not only default screens.**
7. **Separate UX finding from UI execution.**
8. **Keep scope controlled.**
9. **Verify every material change.**
10. **No PASS without evidence.**

Repository-level design-agent rules remain authoritative. See:

- `AGENTS.md`
- `docs/figma-sop.md`
- `knowledge/ux/README.md`

## 3. Bank default workflow

```text
REQUEST
→ CONTEXT
→ INSPECT
→ AUDIT
→ DEFINE PROBLEM
→ PRIORITIZE
→ DESIGN DIRECTION
→ IMPLEMENT
→ PROTOTYPE / STATES
→ MOTION GRAPHIC WHEN NEEDED
→ VERIFY
→ DESIGN QA
→ FIX LOOP
→ HANDOFF / EVIDENCE
→ COMPLETE
```

Do not jump from request directly to final UI.

## 4. Task modes

### INSPECT
Read-only understanding of the current screen, flow, component, or product area.

Output:
- structure
- IA
- hierarchy
- interaction
- states
- design-system usage
- content
- risks
- unknowns

### AUDIT
Evaluate current UX/UI and classify findings.

Output:
- finding
- impact
- severity
- evidence
- recommendation
- acceptance criteria

### IMPROVE
Create a solution to validated findings while preserving relevant constraints.

Output:
- proposed direction
- rationale
- affected scope
- states
- old vs new delta

### IMPLEMENT
Apply approved changes in Figma or implementation target.

Output:
- changed areas
- preserved areas
- state coverage
- verification evidence

### REVIEW
Evaluate a proposed design without mutating it unless explicitly authorized.

### QA
Check whether implementation satisfies design intent, system rules, states, accessibility, and acceptance criteria.

### MOTION
Turn approved UX/UI into a storyboarded motion graphic or UI storytelling video.

Output:
- motion brief
- storyboard
- scene-to-Figma mapping
- motion system
- render
- motion QA evidence

## 5. UX reasoning stack

Use this order:

1. Strategy — why this exists
2. Scope — what the user must achieve
3. Structure — journey, IA, navigation, sequence
4. Skeleton — layout, control placement, hierarchy
5. Surface — visual styling and polish

If a problem exists at Structure, do not solve it only at Surface.

## 6. Audit dimensions

Every meaningful review should consider:

| Dimension | Key question |
|---|---|
| User goal | Can the user complete the intended task? |
| IA | Is information grouped and ordered correctly? |
| Hierarchy | Is the most important content visually dominant? |
| Navigation | Does the user know where they are and where to go next? |
| Search | Can users find known items efficiently? |
| Filter | Can users narrow results predictably? |
| Interaction | Are controls, states, and feedback clear? |
| Content | Are labels, descriptions, errors, and CTAs understandable? |
| Design System | Are approved components/tokens reused correctly? |
| Accessibility | Can more users operate and understand the interface? |
| Responsive | Does the solution survive viewport/device differences? |
| Error handling | Can the user recover from failure? |
| Data states | Are loading, empty, error, no-result, and partial states covered? |
| Visual quality | Is spacing, alignment, typography, and density coherent? |

## 7. Severity model

### P0 — Blocking
User cannot complete a critical task, severe data/action risk, broken state, inaccessible core flow, or wrong design/reference authority.

### P1 — Major
High-friction task, misleading behavior, missing important state, major hierarchy or consistency issue.

### P2 — Moderate
Noticeable usability or consistency issue with workaround.

### P3 — Polish
Low-risk visual/content refinement.

Fix order: P0 → P1 → P2 → P3.

## 8. Definition of done

A design task is complete only when:

- user goal is understood
- target/context inspected
- major UX risks resolved
- IA and hierarchy are coherent
- all required states are defined
- interaction is testable
- approved Design System is respected
- responsive/accessibility risks are addressed
- content is reviewed
- material changes are verified
- P0/P1 findings are resolved or explicitly blocked
- evidence exists
- handoff/acceptance criteria are clear

## 9. SOP modules

1. [Intake & Context](./01-intake-and-context.md)
2. [Inspect & Audit](./02-inspect-and-audit.md)
3. [Design & Improve](./03-design-and-improve.md)
4. [Figma Implementation](./04-figma-implementation.md)
5. [Prototype, States & Edge Cases](./05-prototype-and-states.md)
6. [Design QA & Dev Handoff](./06-design-qa-and-handoff.md)
7. [Templates & Checklists](./07-templates-and-checklists.md)
8. [Command Playbook](./08-command-playbook.md)
9. [Motion Graphic / UI Storytelling Video](./09-motion-graphic.md)

## 10. Standard completion result

Use one final status:

- **PASS** — required outcome and QA are satisfied.
- **FAIL** — implementation exists but does not meet required quality.
- **BLOCKED** — required evidence, authority, dependency, permission, or decision is unavailable.

Do not use visual confidence alone as completion evidence.


## 11. Agent integration

The SOP is registered as an executable DS-AH layer:

- Workflow: `agent/workflows/bank-sop.md`
- Router: `agent/bank-sop-router.json`
- Task schema: `schemas/bank-sop-task.schema.json`

Reusable templates:

- `templates/bank-ux-audit.md`
- `templates/bank-design-decision.md`
- `templates/bank-old-new-compare.md`
- `templates/bank-state-matrix.md`
- `templates/bank-design-handoff.md`
- `templates/bank-motion-storyboard.md`

Use these templates to keep findings, decisions, comparisons, states, QA, and handoff consistent across projects.

## 12. Relationship to DS-AH

```text
Bank working language
→ Bank SOP Router
→ Bank SOP Workflow
→ UX Knowledge
→ DS-AH Control / Reference / Scope
→ Figma capability when authorized
→ QA / Regression
→ Evidence
```

The Bank SOP never creates an alternate source of truth. Existing DS-AH authority and Figma controls remain mandatory.
