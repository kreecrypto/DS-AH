---
id: ux-writing-content
version: 2.2.0
scope: core
category: content-design
---

# UX Writing / Content Skill

## Mission
Make interface language clear, consistent, actionable, state-aware, and faithful to approved business meaning.

Content must help users understand:
- where they are
- what something means
- what action will happen
- what went wrong
- how to recover
- what happened next

## Activate when
Use for CREATE/MODIFY/REVIEW/QA involving any user-facing text:
- headings
- labels
- CTA
- tabs
- field labels
- placeholders
- helper text
- errors
- empty states
- loading/success
- confirmation
- status
- table columns
- filter/search
- modal/drawer content

For REPRODUCE, default to preserving approved copy unless the task explicitly changes content.

## Required inputs
- user/task goal
- approved terminology/domain vocabulary
- current copy
- known business meaning/rules
- interaction states
- Change Scope for MODIFY

## Content hierarchy
Classify copy:
- Orientation: page/section title, breadcrumb
- Instruction: helper, explanation
- Input: label, placeholder, unit
- Action: button/link/menu
- Status: badge/state/value label
- Feedback: validation/error/success/loading
- System: empty/no-result/permission message
- Confirmation: consequence + action

Each text element should have one primary job.

## Procedure
1. Inventory all in-scope text.
2. Identify approved terminology.
3. Map copy to user task and interaction state.
4. Check page/section hierarchy.
5. Check labels and CTA.
6. Check form content.
7. Check status terminology.
8. Check errors/recovery.
9. Check empty/loading/success/confirmation.
10. Check consistency, capitalization, punctuation, tense.
11. Check realistic wrapping/truncation.
12. Check content-state pairing with Interaction Design.
13. Flag unknown business meaning rather than inventing it.
14. In ADAPT, do not rewrite unrelated copy.

## CTA rules
CTA should describe an action or outcome.

Prefer:
- Save changes
- Apply filters
- Create case
- Retry

Avoid vague labels unless approved convention requires them:
- OK
- Submit
- Go
- Continue when destination/outcome is unclear

Primary and secondary actions must not use indistinguishable wording.

## Form rules
- persistent field label
- placeholder is example/hint, not sole label
- helper text adds useful information
- required/optional convention must be consistent
- units/formats should be explicit when needed
- validation copy should identify problem
- recovery should be actionable when known

Do not invent format restrictions or backend limits.

## Error message pattern
Where evidence allows:
1. What happened
2. What user can do
3. Preserve relevant context/input

Avoid:
- Error 400
- Something went wrong with no recovery
- blame language
- technical implementation details irrelevant to user

If root cause is unknown, write only what can be truthfully guaranteed.

## Empty state types
Distinguish:
- first use
- no data
- no search results
- no filtered results
- permission/access restriction
- failed loading

Do not use the same generic empty state for all.

## Status/content consistency
One concept should use one approved term.
Flag:
- customer/client/person used interchangeably
- active/enabled/live representing same state inconsistently
- abbreviations without established meaning
- mismatched capitalization of the same object

## Numbers and structured data
Check when relevant:
- date format
- currency
- percentage
- units
- decimal precision
- negative values
- large numbers
- zero/null/unknown representation

Do not invent formatting policy; use product evidence.

## Content length resilience
Test mentally/visually for:
- short
- typical
- long realistic
- localization expansion when product requires it

Check:
- button width
- tabs
- table headers
- status badges
- helper text
- error text
- card title
- modal title/body

Do not hard-code arbitrary character limits unless source evidence exists.

## Content QA Gate

### PASS
- terminology consistent
- actions clear
- states have appropriate copy
- error/recovery useful
- no placeholder-only label
- no material truncation/wrapping defect
- business meaning preserved

### FAIL
Examples:
- ambiguous action
- conflicting terminology
- misleading status
- missing required error/success content
- copy changes business meaning
- hidden essential label
- legacy typo propagated as approved content

### BLOCKED
Use when copy depends on unknown legal, policy, business, financial, or operational meaning.

## Severity guidance
P0:
- content could cause destructive/financial/legal misunderstanding
- wrong action meaning on critical control

P1:
- ambiguous CTA
- contradictory terminology
- missing recovery instruction
- essential text clipped/truncated

P2:
- minor grammar/style inconsistency
- non-blocking punctuation/capitalization polish

## Anti-patterns
- rewriting for tone when task is visual-only
- marketing language in operational enterprise UI without direction
- shortening copy by changing meaning
- using tooltip to compensate for unclear label
- placeholder as label
- inventing legal/policy wording
- forcing all copy to one line

## Required evidence
- terminology decisions
- CTA/label review
- form content review
- state content coverage
- error/recovery review
- empty/loading/success coverage
- structured-data formatting observations
- wrapping/truncation result
- unresolved content questions
- content gate result

## Downstream handoff
Pass final approved/in-scope copy requirements to Visual Quality, Responsive, Execution, QA, Handoff, and Evidence.
