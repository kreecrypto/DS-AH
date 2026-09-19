---
id: information-architecture
version: 2.2.0
scope: core
category: ux-structure
---

# Information Architecture Skill

## Mission
Make information, actions, navigation, and disclosure reflect the user's task model while preserving approved product structure and scope.

IA decides what belongs together, what comes first, what is discoverable, and how users move through information. It is not a visual-spacing skill.

## Activate when
Use for CREATE/MODIFY/REVIEW/QA involving:
- dashboards
- forms
- search/filter
- tables/lists
- detail pages
- navigation
- multi-step flows
- grouped settings
- content-heavy screens
- progressive disclosure

For REPRODUCE, use primarily as a preservation/verification skill.

## Required inputs
- primary user/task goal
- approved reference or EXPLORE brief
- content/data inventory
- current navigation/context
- product/domain pattern evidence
- Change Scope for MODIFY

## IA model

### Task layer
Identify:
- primary task
- secondary tasks
- decision user must make
- information required before that decision
- action required after the decision

### Content layer
Classify information:
- Primary: required to complete/understand core task
- Secondary: supports decision
- Tertiary: optional/detail/reference
- System: status, validation, metadata
- Action: controls/navigation

### Structure layer
Evaluate:
- grouping
- ordering
- hierarchy
- navigation
- filtering/search/sort
- disclosure
- return path
- cross-reference

## Procedure
1. State the primary task in one sentence.
2. Inventory content/actions without redesigning them.
3. Mark each item Primary/Secondary/Tertiary/System/Action.
4. Identify natural semantic groups.
5. Compare groups with approved reference/domain patterns.
6. Order groups according to task dependency and frequency.
7. Check whether navigation supports entry, continuation, return, and recovery.
8. Check search/filter/sort against frequency and decision needs.
9. Check progressive disclosure: what is always visible vs conditional.
10. Check taxonomy/terminology consistency with UX Writing.
11. Check duplication and stranded content.
12. In ADAPT, map every proposed IA change to Change Scope.
13. In REPRODUCE, flag divergence instead of "improving" approved IA.

## Grouping rules
Prefer grouping by:
- task relationship
- semantic meaning
- workflow stage
- shared object/entity
- frequency/context

Avoid grouping only because items look visually similar.

## Ordering rules
Prefer:
1. identity/context
2. primary status/decision information
3. task-driving controls
4. supporting detail
5. low-frequency metadata

Override only with approved product evidence.

## Navigation checks
Verify:
- user knows where they are
- primary destination is discoverable
- return/back path is predictable
- current section/state is identifiable
- deep navigation does not hide essential context
- labels match destination meaning

## Search/filter checks
Verify:
- search and filters are placed near controlled content
- common filters are more accessible than rare filters
- active filters are visible
- reset/clear behavior is discoverable
- zero-result state supports recovery
- sort is distinct from filter
- filter labels use user/domain language

## Progressive disclosure rules
Hide/collapse only when:
- content is secondary/conditional
- trigger is discoverable
- state is clear
- hiding does not block core task

Do not solve density by hiding Primary information.

## IA Gate

### PASS
- primary task is structurally obvious
- groups are coherent
- order supports task dependency
- required content is discoverable
- navigation/return path is clear where relevant
- taxonomy is consistent
- no material duplicate/stranded information
- ADAPT stays within scope

### FAIL
Examples:
- primary action separated from required context
- essential content buried behind unclear disclosure
- conflicting navigation labels
- duplicate concepts causing uncertainty
- filters/actions associated with wrong content
- out-of-scope structural reorganization

### BLOCKED
Use when required business/content relationships are unknown and cannot be safely inferred.

## Anti-patterns
- cardifying every group
- adding tabs just to reduce vertical length
- hiding information to "clean up" the screen
- creating new navigation levels without evidence
- rearranging a REPRODUCE screen for personal preference
- mixing taxonomy from multiple product domains
- using visual prominence as a substitute for semantic structure

## Required evidence
- primary task
- content/action inventory
- classification
- group model
- section order
- navigation/findability result
- search/filter/disclosure result
- taxonomy issues
- scope impact
- IA gate result
- unresolved business questions

## Downstream handoff
Pass structure decisions to Interaction, UX Writing, Visual Quality, Responsive, Execution, and QA.
