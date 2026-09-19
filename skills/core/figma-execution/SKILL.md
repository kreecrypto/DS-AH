---
id: figma-execution
version: 2.2.0
scope: core
category: controlled-mutation
---

# Figma Execution Skill

## Mission
Translate an approved Design Decision into the smallest safe, verifiable Figma mutation while preserving source authority, Change Scope, component identity, Auto Layout, and unaffected design.

This skill executes. It does not decide whether permission should exist.

## Activate when
Use only for CREATE_SCREEN or MODIFY_SCREEN/FIX after control preconditions pass.

Never activate for REVIEW/QA-only work unless the task has been explicitly rerouted into an authorized MODIFY/FIX action.

## Required preconditions
All must be true:
- explicit current-task Figma write signal
- permission state = WRITE_ALLOWED
- target file/node resolved
- Design Decision exists
- Change Scope exists
- Build Mode resolved
- Reference Gate = PASS or EXPLORE_EXPLICIT
- required live reference/target inspected
- required skills upstream completed
- write capability available

If any required precondition is false, do not mutate.

## Required inputs
- target
- approved reference/source
- Build Mode
- Change Scope
- reuse/component decisions
- IA decisions
- interaction/state model
- content decisions
- visual constraints
- responsive/accessibility constraints

## Execution planning
Before mutation create a node-level plan:

For each intended change record:
- target node/area
- operation
- reason
- upstream decision
- expected visual/behavioral delta
- components/variables to reuse
- protected neighbors
- verification method

Prefer fewer coherent mutations over broad rebuilding.

## Operation preference order
When applicable prefer:
1. instance property/variant change
2. content/text change
3. variable/style binding
4. Auto Layout/property adjustment
5. component swap to approved identity
6. wrapper/composition change
7. new local/domain asset when justified
8. rebuild only when evidence proves existing structure cannot safely satisfy task

Do not detach/rebuild as first choice.

## REPRODUCE execution
Preserve:
- page shell
- IA
- section order
- geometry
- grid/alignment
- component family
- token usage
- content structure
- interaction states
- responsive behavior

Only destination/container mechanics may differ when required by the new file and they must not alter visible design intent.

## ADAPT execution
1. mark allowed delta
2. protect unaffected regions
3. change smallest coherent area
4. propagate only dependencies necessary to keep system consistency
5. compare protected areas against baseline after mutation

A local change may require dependent fixes, but dependency is not permission for redesign.

## EXPLORE execution
Exploration still:
- uses approved foundations/components
- follows explicit brief
- records new patterns/assets
- avoids silent Core changes
- separates exploratory composition from canonical DS unless promoted by policy

## Auto Layout rules
Preserve/establish intentional:
- direction
- gap
- padding
- alignment
- sizing
- wrapping
- nested layout boundaries

Avoid absolute positioning unless:
- source pattern uses it intentionally
- overlay/decoration requires it
- behavior is documented

## Component rules
During execution:
- preserve instance identity
- use semantic properties/variants
- avoid detached edits
- use correct domain/Core owner
- do not create duplicate component to get a one-off visual variation
- record any new reusable asset decision

## Variable/style rules
- bind approved semantic variables/styles
- preserve mode/theme logic
- do not replace variables with raw values to match screenshot
- do not invent variable IDs/names

## Layer/naming rules
Preserve meaningful:
- frame names
- component names
- state/variant semantics
- repeated layer structure

Do not spend task scope on cosmetic layer renaming unless it affects control/handoff quality.

## Content mutation rules
Only mutate content that is:
- explicitly requested
- required by approved mock data
- approved by UX Writing decision

Never fabricate business/legal/financial text.

## Interaction/prototype rules
Only create/change prototype links when:
- interaction outcome is defined
- destination exists/is resolved
- task scope includes it

Never invent destinations.

## Safety checkpoints

### Pre-write
Verify:
- permission
- target
- scope
- authority
- planned node list

### Mid-write
After a material structural mutation, check:
- target still valid
- protected area unchanged
- Auto Layout not unintentionally broken
- component identity not lost

### Post-write
Inspect/capture:
- changed nodes
- layout structure
- component identity
- variables
- visual result
- affected states/viewports

## Mutation verification
A mutation is not complete because a tool call returned success.

Verify the resulting live Figma state against:
- expected delta
- Change Scope
- reference
- upstream decisions

If verification is unavailable, report BLOCKED/UNVERIFIED rather than claiming completion.

## Execution failure conditions
FAIL execution when:
- actual change differs materially from plan
- protected area changed
- approved instance was detached without justification
- component/token identity drifted
- Auto Layout broke
- content/interaction beyond scope changed

BLOCK when:
- permission revoked/unavailable
- target becomes unresolved
- tool capability prevents safe operation
- source ambiguity appears after execution begins

## Anti-patterns
- rebuilding whole frame for one property change
- hidden redesign
- tool-call success = completion
- manual overrides replacing component API
- raw values replacing variables
- changing protected areas because they "look off"
- placeholder property names
- broad cleanup during a bounded fix

## Required output evidence
- permission state used
- target
- node-level execution plan
- nodes/areas changed
- operations performed
- reused components/variables
- new assets + ownership if any
- protected-area verification
- pre/post evidence
- mutation verification result
- unresolved execution limitations

## Downstream handoff
Pass verified post-write state to Design QA, Reference Fidelity, Visual Regression, Fix Loop, and Evidence.
