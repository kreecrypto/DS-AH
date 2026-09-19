---
id: design-system-compliance
version: 2.4.0
scope: core
category: system-governance
---

# Design System Compliance Skill

## Mission
Prevent design-system drift while preserving the locked visual composition.
This skill owns component identity, tokens, APIs, and ownership.
It does not silently become composition authority.

## Activate when
Mandatory for CREATE_SCREEN.
Mandatory for MODIFY_SCREEN and FIX.
Mandatory for COMPONENT.
Use for REVIEW, QA, and HANDOFF whenever reusable UI/system assets are involved.

## Required inputs
- Reference Lock
- Visual Grammar when reference-based
- approved Product/Domain/Core registries
- live Figma inspection
- component ownership policy
- source-priority policy
- Change Scope when mutating
- supported states/viewports

## Authority boundary

### Visual Authority
Controls:
- grid
- hierarchy
- composition
- density
- repeated anatomy
- spatial relationships
- chart geometry

### System Authority
Controls:
- component identity/key
- component API
- variants/properties
- variables/tokens
- typography foundations
- icons
- accessibility primitives

System Authority must preserve the locked visual role unless the user explicitly changes the visual scope.

## Design System Mapping
Before Design Decision on reference-based work:
1. read Reference Lock
2. read Visual Grammar
3. enumerate material visual roles
4. search Domain/Core assets
5. map each visual role to an asset type
6. set preserveVisualRole=true
7. record allowed deviation
8. record unmapped roles
9. record conflicts
10. emit design-system-mapping schema

A mapping may use:
- COMPONENT
- VARIABLE
- STYLE
- ICON
- TYPOGRAPHY
- PRIMITIVE
- NONE

## Reuse decision tree
For every material element:
1. Is there an exact approved compatible instance?
2. Is there an approved Domain pattern?
3. Is there an approved Core primitive?
4. Can existing properties/variants express the role?
5. Can a wrapper/composition preserve the visual role?
6. Is an extension semantically valid?
7. Is a new Domain asset justified?
8. Is a screen-only composition safer?
9. Only then consider new component creation.

## Ownership levels

### Core
Product-agnostic reusable semantics.

### Domain
Reusable semantics specific to one product/domain.

### Screen-only
One-off composition without stable reusable semantics.

Do not promote composition to reusable component solely because it appears twice on one screen.

## Component identity checks
Verify:
- published identity/key
- owner file/library
- local vs remote
- component-set membership
- variants/properties
- default values
- nested identity
- semantic purpose
- visible name vs canonical identity

Same visible name is not identity.

## Variant/property rules
Use stable semantic axes:
- Size
- State
- Type
- Intent
- Device only when system explicitly models device

Avoid:
- Property 1
- one-off visual variants
- content combinations as variants
- combinatorial explosion

## Token/variable rules
Prefer approved semantic bindings.
Verify:
- color intent
- typography
- spacing/radius/elevation where defined
- state tokens
- theme/mode correctness

Do not:
- replace token with raw value for convenience
- invent near-duplicate token
- flatten variable use without migration scope

## Locked visual conflict procedure
If DS assets cannot express a locked visual role without material change:
1. verify exact asset/API first
2. try valid property/variant
3. try wrapper/composition
4. record material conflict
5. do not swap to a different Product Master composition
6. block or request scoped decision if deviation is unavoidable

## Detach policy
Detach is a defect unless:
- migration/conversion is explicitly in scope
- no compatible API exists
- resulting ownership is documented

“Faster to edit” is not justification.

## Cross-domain reuse
Visual similarity does not authorize cross-domain reuse.
Semantic ownership/policy must explicitly permit it.

## Structural checks
Check:
- Auto Layout integrity
- nested instances remain instances
- property names semantic
- no duplicate local copy of remote component
- meaningful component boundaries
- no accidental componentization
- DS mapping preserves visual-role intent

## Compliance Gate

### PASS
- approved assets reused appropriately
- ownership correct
- semantic variables preserved
- APIs valid
- no unauthorized detach/duplication
- locked visual roles preserved

### FAIL
Examples:
- DS compliance changed locked grid/composition without approval
- parallel component created while approved one exists
- raw value replaces semantic binding
- wrong-domain component reused
- detached instance for convenience
- invalid property modeling

### BLOCKED
Use when:
- canonical identity/ownership unresolved
- DS conflict materially affects locked visual role
- required library cannot be inspected

## Anti-patterns
- “looks the same” reuse
- using Product Master as a shortcut around DS mapping
- changing card count/order to fit available components
- variants for every content combination
- unnecessary nested wrappers
- copying remote component locally
- raw overrides to force screenshot match
- treating DS as permission to redesign composition

## Required evidence
- visual role → asset mapping
- Core assets reused
- Domain assets reused
- component identities/keys
- variable/style bindings
- ownership
- unmapped roles
- conflicts
- extension/new asset decisions
- exceptions
- Compliance Gate result

## Downstream handoff
Pass:
- DS Mapping
- reuse decisions
- ownership/API constraints
- token constraints
- unresolved conflicts
to Design Decision, Execution, QA-02, Handoff, Regression, Fix Loop, and Evidence.
