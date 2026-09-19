---
id: responsive-accessibility
version: 2.2.0
scope: core
category: adaptive-inclusive-design
---

# Responsive & Accessibility Skill

## Mission
Keep the design usable and semantically understandable across supported viewports, input modes, and accessibility states without inventing unsupported device behavior.

Responsive design is not uniform shrinking.
Accessibility is not a post-design checklist.

## Activate when
Use for:
- responsive/multi-viewport screens
- forms
- public-facing flows
- navigation
- tables
- modal/drawer
- interactive states
- touch interfaces
- QA
- any design where content can wrap/reflow

## Required inputs
- approved responsive policy/evidence
- supported viewport/device context
- inspected layout constraints
- IA/content priority
- interaction states
- DS responsive patterns
- Change Scope

## Responsive model
Classify each material region/property as:
- FIXED
- FLUID
- FILL
- HUG
- WRAP
- STACK
- COLLAPSE
- HIDE
- SCROLL
- SUBSTITUTE_PATTERN
- UNKNOWN

Do not invent a breakpoint solely to make the layout fit.

## Responsive procedure
1. Identify supported viewports from evidence.
2. Determine content priority.
3. Inspect parent/child sizing behavior.
4. Classify each major region.
5. Identify breakpoint/pattern transformations that actually exist.
6. Check text expansion.
7. Check control wrapping.
8. Check navigation transformation.
9. Check table/list behavior.
10. Check modal/drawer bounds.
11. Check fixed/sticky regions.
12. Verify no clipping/overlap/lost primary action.
13. Record unsupported widths as NOT_VERIFIED/BLOCKED rather than guessing.

## Responsive principles
Prefer:
- reflow over shrinking
- stack over unreadably compressed row
- horizontal scroll for dense data only when approved
- priority-preserving collapse
- stable primary action access
- content-driven height

Avoid:
- scaling the entire desktop screen
- hiding primary information
- shrinking touch targets
- forcing text to one line
- arbitrary breakpoint creation

## Table/list behavior
Check:
- minimum readable columns
- column priority
- wrap vs truncate
- horizontal scroll
- card/substitute pattern if approved
- sticky header/action behavior
- bulk actions
- pagination/filter/search placement

Do not convert a table to cards without evidence.

## Modal/drawer behavior
Check:
- max width/height
- safe viewport margins
- internal scrolling
- sticky header/footer if approved
- keyboard/input visibility on mobile where relevant
- close/action access

## Accessibility dimensions

### Perceivable
Check:
- text readability
- contrast sanity
- state distinction
- non-color cues
- icon + text where meaning otherwise unclear
- visible error association

### Operable
Check design evidence for:
- visible focus
- logical tab sequence for handoff
- adequate target size per product/platform policy
- no hover-only critical action
- close/dismiss availability
- keyboard interaction requirements for custom controls

### Understandable
Check:
- persistent labels
- predictable navigation
- consistent terminology
- clear errors/recovery
- destructive action clarity
- selected/current state clarity

### Robust handoff
Record semantic implementation intent:
- control role
- label
- state
- order
- error association
- dynamic feedback expectations

Do not claim implementation accessibility from Figma alone.

## Formal compliance rule
Never claim WCAG conformance unless:
- target criterion/version is specified
- required evidence/test was actually performed
- result is documented

Otherwise report design-level accessibility checks only.

## Accessibility state checks
Verify relevant:
- focus
- selected
- current
- disabled
- error
- warning
- success
- expanded/collapsed
- loading

State meaning must not rely on color alone.

## Gate

### PASS
- supported viewports preserve primary task/content
- no material clipping/overlap
- reflow behavior is coherent
- critical interaction remains accessible
- relevant states are distinguishable
- labels/errors/focus expectations are clear

### FAIL
Examples:
- primary CTA disappears
- content overlaps/clips
- desktop-only hover blocks task
- essential state encoded only by color
- focus not visually represented where required
- error has no persistent association
- target becomes too small under supported responsive behavior

### BLOCKED
Use when viewport/accessibility policy is required but absent and cannot be safely inferred.

## Severity
P0:
- primary task inaccessible at supported viewport
- critical text/control unreadable/unreachable

P1:
- broken layout reflow
- focus/state ambiguity
- color-only essential state
- table/navigation unusable at supported width

P2:
- minor wrap/rhythm improvements
- non-blocking target spacing polish

## Anti-patterns
- responsive = scale
- accessibility = contrast only
- inventing mobile design from desktop
- hiding difficult content instead of designing reflow
- using tooltip for required information
- using disabled state without explanation
- claiming screen-reader compliance from visuals

## Required evidence
- supported viewports
- responsive classification
- transformation rules
- content priority
- table/modal/navigation behavior
- state coverage
- accessibility risks
- implementation notes
- unsupported assumptions
- gate result

## Downstream handoff
Pass viewport/state constraints to Execution, QA, Regression, Handoff, and Evidence.
