---
id: figma-inspect
version: 2.2.0
scope: core
category: evidence-acquisition
---

# Figma Inspect Skill

## Mission
Build a verified model of the live Figma target before any design decision, review conclusion, component decision, QA result, or mutation. Inspection converts Figma from an assumed visual reference into traceable structural evidence.

This skill is read-only. It never grants write permission.

## Activate when
Use for INSPECT, REVIEW, CREATE_SCREEN, MODIFY_SCREEN, COMPONENT, QA, HANDOFF, or whenever a Figma file/node is part of the task.

Always activate before:
- reference fidelity comparison
- component reuse/substitution
- token/variable decisions
- responsive claims
- state/prototype claims
- mutation of an existing target

## Required inputs
- task intent
- target or reference file key / node ID when available
- resolved product/domain when available
- applicable registries and approved source policy

## Optional inputs
- pre-change baseline node
- approved master/reference node
- viewport/state to inspect
- known component or token candidates

## Inspection levels

### L0 — Target resolution
Confirm:
- file
- page
- exact node
- node type
- visible name
- dimensions
- whether target is current, master, archive, library, component, or screen when evidence exists

If exact node cannot be resolved, stop claims that depend on it.

### L1 — Structural hierarchy
Inspect:
- frame/section hierarchy
- parent/child relationships
- repeated structures
- clipping
- absolute-positioned children
- hidden layers
- nested instances
- component sets
- layer naming quality

Record structural anomalies rather than silently normalizing them.

### L2 — Layout behavior
Inspect:
- Auto Layout direction
- gap and padding
- sizing modes
- min/max constraints where available
- alignment/distribution
- layout grids
- constraints
- wrapping behavior
- fixed vs hug vs fill behavior
- overflow/clipping
- absolute positioning

Do not infer responsive behavior solely from a desktop frame.

### L3 — Component identity
For every material reusable element:
1. determine whether it is an instance, component, component set, or raw frame
2. resolve main component when possible
3. distinguish local vs remote
4. record component/property/variant identity
5. check whether visible names match actual identity
6. identify detached or manually recreated lookalikes
7. compare with Core/domain registries

Same visible name is never sufficient proof of identity.

### L4 — Foundations and tokens
Inspect:
- text styles
- color/fill styles
- variables
- radius
- spacing variables where bound
- effects
- strokes
- opacity
- semantic state colors

Record raw values only as observed fallback evidence. Prefer bound semantic identities.

### L5 — Content and typography
Inspect:
- text hierarchy
- font family/style/weight
- size
- line height
- letter spacing
- paragraph behavior
- wrapping
- truncation
- content length pressure
- number/date/currency presentation when relevant

Do not correct copy during inspection.

### L6 — State and interaction evidence
Inspect available:
- variants
- component properties
- visible state frames
- prototype links
- interactions/triggers
- overlays
- navigation destinations
- modal/drawer patterns
- focus/selected/disabled/error/loading/success representations

Absence of prototype evidence means "not verified", not "no interaction".

### L7 — Responsive evidence
When multiple viewports exist, compare:
- element persistence
- reflow
- stacking
- wrapping
- collapsing
- hiding
- navigation transformation
- table behavior
- modal boundaries
- content priority

Never invent breakpoints not present in policy/evidence.

## Deterministic procedure
1. Open the exact user-supplied node first.
2. Classify the node and its likely role.
3. Inspect L1–L5 for all design tasks.
4. Add L6 for interactive work.
5. Add L7 for responsive/multi-viewport work.
6. Resolve material component identities.
7. Compare observed identities with registry/reference evidence.
8. Record facts, unresolved facts, and contradictions separately.
9. Capture the minimum evidence required by downstream skills.
10. Emit a no-change confirmation because inspection is read-only.

## Fact classification
Every material observation must be one of:
- VERIFIED_LIVE_FIGMA
- VERIFIED_REGISTRY
- VERIFIED_REFERENCE
- CONFLICT
- UNKNOWN

Do not promote UNKNOWN to a fact.

## Inspection defects
Flag:
- detached instance where approved instance exists
- ambiguous duplicate component
- placeholder property/variant naming
- raw values where semantic binding is expected
- unexpected absolute positioning
- clipping/overflow
- missing state evidence
- inconsistent repeated geometry
- unknown remote ownership
- live Figma conflicting with registry

Inspection defects are evidence, not automatic authorization to fix.

## Block conditions
Return BLOCKED_INSPECTION when a downstream decision requires evidence that cannot be obtained, including:
- inaccessible file/node
- unresolved target
- component identity needed but not retrievable
- reference/result cannot be inspected comparably
- required viewport/state absent and no approved alternative evidence exists

## Anti-patterns
- inspecting only screenshots when live node evidence is available
- searching broadly before opening the exact supplied node
- assuming instance identity by visible name
- treating frequency as approval
- treating current Figma as automatically correct
- rewriting layers while "inspecting"
- inferring mobile behavior from desktop
- claiming prototype behavior from static appearance

## Required output
- exact fileKey/nodeId
- inspected node role/classification
- hierarchy summary
- dimensions/layout behavior
- component identities and ownership
- variable/style bindings
- typography/content observations
- state/prototype evidence
- responsive evidence
- reusable assets
- conflicts
- unknowns
- block conditions, if any
- no-change confirmation

## Downstream handoff
Pass verified inspection evidence to:
- Reference Resolution
- IA
- Interaction Design
- Design System Compliance
- Responsive & Accessibility
- Figma Execution
- Design QA
- Visual Regression
- Evidence

Never pass assumptions as inspected facts.
