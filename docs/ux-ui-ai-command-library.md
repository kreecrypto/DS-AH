# UX/UI + Figma AI Command Library

Version: 1.0  
Repository role: GitHub = Brain / Knowledge  
Execution role: Figma = Workspace

## Core rule

**INSPECT → UNDERSTAND → ANALYZE → RESOLVE REFERENCE → DECIDE → PLAN → WRITE → VERIFY → QA → FIX → EVIDENCE → COMPLETE**

Commands are user-facing shortcuts. They do not bypass DS-AH permissions, Reference Lock, Change Scope, Mutation Budget, QA gates, or evidence requirements.

## Permission rule

- Read-only commands never grant Figma mutation.
- Write-oriented commands produce WRITE_PENDING unless the current request explicitly authorizes Figma mutation and all existing write gates pass.
- Existing Production Skills remain the execution layer. These commands are routing/prompt interfaces, not duplicate skills.

---

## 1. `/inspect`

**Purpose:** Deep inspect a selected Figma frame, component, page, or flow.  
**Canonical route:** INSPECT → `figma-inspect`

Prompt:
```text
@Figma Inspect the selected target deeply before making changes.

Analyze screen purpose, hierarchy, layout, Auto Layout, grid, spacing,
typography, colors, components, variants, variables/tokens, constraints,
responsive behavior, interactions, existing patterns, UX risks,
UI inconsistencies, DS violations, missing states, and edge cases.

Do not modify the design.

Output:
Current Structure → UX Findings → UI Findings → DS Findings → Risks → Next Action
```

## 2. `/understand`

**Purpose:** Build the UX model before proposing a solution.  
**Canonical route:** INSPECT/REVIEW

Prompt:
```text
Understand the selected screen/flow.

Resolve:
User → User Goal → Business Goal → Primary Task → Secondary Task
→ Entry → Main Action → Decision Points → System Feedback
→ Success → Failure → Recovery → Exit.

Separate verified evidence from assumptions. Do not redesign yet.
```

## 3. `/ux-review`

**Purpose:** Complete UX audit.  
**Canonical route:** REVIEW → `ux-review` + supporting skills

Prompt:
```text
Perform a complete UX review.

Check goal clarity, navigation, discoverability, cognitive load,
information architecture, task efficiency, feedback, error prevention,
error recovery, empty/loading/permission states, edge cases,
accessibility, and UX writing.

For each issue:
Issue → Evidence → User Impact → Severity → Recommendation.

Use P0 Critical / P1 High / P2 Medium / P3 Improvement.
Do not modify the design unless the current request separately authorizes a fix.
```

## 4. `/ui-review`

**Purpose:** Visual/UI quality review.  
**Canonical route:** REVIEW → `visual-quality` + `design-system-compliance`

Prompt:
```text
Review visual hierarchy, alignment, spacing rhythm, typography, density,
contrast, component consistency, icon consistency, borders/radius,
elevation, color usage, whitespace, balance, scanability, CTA prominence,
and content grouping.

Identify exact visual problems and observable fixes.
Do not replace product visual authority with personal taste.
```

## 5. `/design-system`

**Purpose:** Resolve and enforce the existing Design System.  
**Canonical route:** COMPONENT/REVIEW → `design-system-compliance`

Prompt:
```text
Inspect the current Design System first.

Resolve existing components, variants, variables, tokens, typography,
color, spacing, radius, icons, and patterns.

REUSE before CREATE.
Do not create a new component/style/token when an approved equivalent exists.
Do not modify the Design System itself unless explicitly scoped.
Flag missing capability before inventing a local replacement.
```

## 6. `/explore-3`

**Purpose:** Generate three meaningfully different UX directions.  
**Canonical route:** REVIEW/CREATE_SCREEN planning

Prompt:
```text
Create 3 substantially different UX solutions.

A — Conservative: minimal change, familiar model, low implementation risk.
B — Balanced: reduce friction while preserving the product mental model.
C — Progressive: challenge the current structure where evidence supports it.

For each:
Concept → User Flow → Key Interaction → Benefits → Risks
→ Edge Cases → Implementation Impact.

Do not produce three cosmetic variants.
Do not write to Figma unless explicitly authorized.
```

## 7. `/design-screen`

**Purpose:** Create a screen through the controlled creation workflow.  
**Canonical route:** CREATE_SCREEN

Prompt:
```text
Design the approved screen.

Before writing:
Inspect target/reference → resolve Visual Authority → inspect DS
→ resolve screen archetype/composition → build reuse map → define Change Scope
→ build Write Plan.

Build structure first, then component composition, content/state,
and visual polish. Use existing DS components/tokens and Auto Layout.

After implementation run Design QA and evidence capture.
```

## 8. `/match-reference`

**Purpose:** Reproduce/adapt a locked reference with high fidelity.  
**Canonical route:** CREATE_SCREEN or MODIFY_SCREEN + `reference-fidelity`

Prompt:
```text
Treat the provided reference as Primary Visual Authority.

Extract composition, grid, geometry, section structure, density,
typography roles, spacing, alignment, repeated anatomy, states,
and interaction patterns.

Map approved DS assets to those visual roles without replacing
the locked composition.

For REPRODUCE: pass the skeleton checkpoint before detail.
Then compare Reference vs Result and fix verified deltas.
```

## 9. `/improve`

**Purpose:** Bounded improvement of an existing screen.  
**Canonical route:** MODIFY_SCREEN

Prompt:
```text
Improve the selected screen while preserving business logic,
existing product patterns, and unaffected areas.

Focus on clarity, hierarchy, efficiency, readability,
discoverability, error prevention, and visual quality.

Use the smallest authorized change that produces meaningful improvement.
Do not silently expand scope.
```

## 10. `/simplify`

**Purpose:** Reduce UX complexity.  
**Canonical route:** REVIEW → MODIFY_SCREEN when authorized

Prompt:
```text
Simplify the selected experience.

For each element decide:
KEEP / MERGE / MOVE / PROGRESSIVE-DISCLOSURE / REMOVE.

Prioritize:
Primary Task → Required Information → Supporting Information → Optional Information.

Reduce cognitive load, competing decisions, redundant content,
and visual noise without removing required functionality.
```

## 11. `/flow`

**Purpose:** Define complete task flow.  
**Canonical route:** REVIEW → `interaction-design`

Prompt:
```text
Create the complete user flow.

Entry → Trigger → Action → System Response → Decision → Next Action → Success.

Also cover:
Cancel / Validation / Error / Empty / Loading / Permission
/ Timeout / Retry / Back / Abandon / Resume / Recovery.

Do not document only the happy path.
```

## 12. `/journey`

**Purpose:** Map user journey and intervention opportunities.  
**Canonical route:** REVIEW

Prompt:
```text
Create a user journey.

For each stage:
User Goal → User Action → User Thought → System Response
→ Pain Point → Risk → Opportunity.

Cover Entry → Discovery → Decision → Action → Feedback → Completion → Follow-up.
```

## 13. `/edge-cases`

**Purpose:** Discover failure, scale, permission, and recovery cases.  
**Canonical route:** REVIEW → `interaction-design`

Prompt:
```text
Generate edge cases across:
Data, User, System, Interaction, Session, Permission, Network, Device, and Concurrency.

Include no/partial/large/duplicate/invalid/outdated data,
slow connection, timeout, API failure, expired session,
double action, refresh, retry, abandon/resume, concurrent update,
small/large viewport, mobile/tablet/desktop.

Define expected UX behavior for each case.
```

## 14. `/states`

**Purpose:** Resolve screen/component interaction states.  
**Canonical route:** COMPONENT/MODIFY_SCREEN → `interaction-design`

Prompt:
```text
Define all applicable states:
Default, Hover, Focus, Pressed, Active, Selected, Disabled, Read-only,
Loading, Skeleton, Empty, Error, Warning, Success, Completed, Partial, Expired.

Reuse existing variants where available.
State differences must be perceivable and accessible.
```

## 15. `/prototype`

**Purpose:** Define/connect end-to-end interaction flow.  
**Canonical route:** MODIFY_SCREEN / CREATE_SCREEN when write-authorized

Prompt:
```text
Create the approved prototype flow.

Connect:
Entry → Main Action → Decision → Confirmation → Processing → Success.

Include Error / Validation / Cancel / Back / Retry / Recovery.
Avoid dead ends. Verify every connected path after mutation.
```

## 16. `/ux-writing`

**Purpose:** Review and improve interface copy.  
**Canonical route:** REVIEW → `ux-writing-content`

Prompt:
```text
Review page titles, section titles, labels, buttons, helper text,
placeholders, validation, errors, warnings, confirmation,
empty states, and success messages.

Improve clarity, brevity, consistency, actionability,
user language, and recovery guidance.
Preserve required legal/business terminology.
```

## 17. `/accessibility`

**Purpose:** Accessibility + responsive review.  
**Canonical route:** REVIEW/QA → `responsive-accessibility`

Prompt:
```text
Review contrast, text readability, touch targets, focus visibility/order,
form labels, errors, icon meaning, non-color status communication,
content hierarchy, keyboard behavior, and responsive/zoom behavior.

For every defect:
Issue → Evidence → User Impact → Required Fix.
```

## 18. `/componentize`

**Purpose:** Resolve reusable component architecture.  
**Canonical route:** COMPONENT

Prompt:
```text
Analyze repeated UI and resolve:
Existing Instance → Variant → Override → Existing Pattern
→ Existing Layout → Create only if approved.

Identify legitimate Component / Variant / Property / Nested Component / Slot needs.
Avoid over-componentization and identity assumptions based on visible names.
```

## 19. `/responsive`

**Purpose:** Define adaptive behavior.  
**Canonical route:** REVIEW/MODIFY_SCREEN → `responsive-accessibility`

Prompt:
```text
Define responsive behavior for desktop, tablet, and mobile.

Resolve container, columns, reflow, stacking, navigation,
table/list adaptation, modal behavior, overflow, sticky elements,
content priority, and collapsible/hidden content.

Do not merely shrink the desktop layout.
```

## 20. `/design-qa`

**Purpose:** Run evidence-based design QA.  
**Canonical route:** QA → `design-qa`

Prompt:
```text
Run final Design QA.

Check requirement, reference authority, DS compliance, layout,
spacing, typography, components, variables/tokens, responsive behavior,
content, interactions, states, accessibility, prototype behavior,
Auto Layout, overflow, and visual consistency.

Return PASS / FAIL / BLOCKED.
P0/P1 are blocking. No PASS without evidence.
```

## 21. `/visual-regression`

**Purpose:** Compare implementation against approved baseline/reference.  
**Canonical route:** QA → `visual-regression`

Prompt:
```text
Compare the current result against the locked reference/baseline.

Check geometry, position, alignment, spacing, component identity,
typography roles, icon size, color roles, radius, border,
density, hierarchy, and repeated anatomy.

Record:
Reference → Current → Delta → Severity → Required Patch.

Do not authorize unrelated redesign.
```

## 22. `/fix-all`

**Purpose:** Patch all verified blocking defects inside scope.  
**Canonical route:** MODIFY_SCREEN + `fix-loop`

Prompt:
```text
Fix all verified defects from the latest review/QA.

Priority:
P0 → P1 → P2 → P3.

For each:
Inspect defect → Root Cause → Patch within Change Scope/Mutation Budget
→ Verify → Re-run affected QA → Visual Regression.

Continue until no P0/P1 remains or return BLOCKED with evidence.
Do not make unrelated changes.
```

## 23. `/handoff`

**Purpose:** Developer-ready handoff.  
**Canonical route:** HANDOFF → `developer-handoff`

Prompt:
```text
Prepare developer handoff.

Document screen purpose, user flow, component mapping, variants/states,
interaction behavior, validation/error/recovery, responsive rules,
tokens, spacing, typography, icons, data behavior, edge cases,
loading/permission behavior, and acceptance criteria.

Explicitly flag anything developers must not infer.
```

## 24. `/finalize`

**Purpose:** Final quality gate and evidence package.  
**Canonical route:** QA; if authorized defects exist, enter MODIFY_SCREEN Fix Loop

Prompt:
```text
Finalize the UX/UI task.

Run:
Requirement Check → Reference Check → UX Review → UI Review
→ DS Compliance → Interaction/State Check → Accessibility
→ Design QA → Visual Regression → Evidence.

If write is authorized, patch confirmed P0/P1 defects and re-run affected gates.

Complete only as PASS / FAIL / BLOCKED with:
Requirement → Implemented/Reviewed Result → Key Decisions
→ Edge Cases Covered → QA Result → Remaining Limitations → Evidence.
```

---

# Recommended Agent Pipeline

```text
USER REQUEST
→ RESOLVE INTENT
→ /inspect
→ /understand
→ RESOLVE REFERENCE
→ LOAD DESIGN SYSTEM
→ /ux-review + /ui-review
→ /edge-cases
→ /explore-3 when exploration is requested
→ DESIGN DECISION
→ CHANGE SCOPE
→ WRITE PERMISSION
→ /design-screen or /improve
→ /states + /responsive + /ux-writing
→ /prototype when required
→ /accessibility
→ /design-qa
→ /visual-regression
→ /fix-all when authorized
→ /handoff
→ /finalize
→ COMPLETE
```

# Master Command

```text
@Figma Execute the complete DS-AH UX/UI workflow for the selected task.

Resolve intent and evidence.
Inspect before design.
Resolve and lock references before decisions.
Reuse approved Design System assets before creating anything.
Define Change Scope and evaluate write permission before mutation.
Build structure first, then composition, content/states, and polish.
Verify the result with Design QA and Visual Regression.
Patch only verified defects inside authorized scope.
Capture evidence.
Return PASS / FAIL / BLOCKED.

Never jump directly from User Request → UI Creation.
Never treat tool success as verification.
Never mark COMPLETE without evidence.
```
