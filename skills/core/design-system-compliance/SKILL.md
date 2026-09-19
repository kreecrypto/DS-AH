---
id: design-system-compliance
version: 2.2.0
scope: core
category: system-governance
---

# Design System Compliance Skill

## Mission
Prevent design drift by ensuring every visual/interactive building block is sourced, composed, extended, or created at the correct ownership level.

This skill protects identity, tokens, APIs, and ownership. It does not decide business behavior by itself.

## Activate when
Mandatory for CREATE_SCREEN, MODIFY_SCREEN, COMPONENT, REVIEW, QA, and HANDOFF when reusable UI is involved.

## Required inputs
- approved reference/source
- live Figma inspection
- Core DS registry
- domain pattern/component registry
- component ownership policy
- Change Scope when mutating

## Source order
1. exact approved user reference
2. approved/current Product Master
3. approved domain component/pattern
4. Core DS component
5. Core foundations/tokens
6. new domain asset only when justified
7. screen-only composition when reuse is not appropriate

## Ownership levels

### Core
Use when component semantics are product-agnostic and broadly reusable.
Examples: button, input, checkbox, generic dropdown, badge primitive.

### Domain
Use when reusable semantics are specific to one product/domain.
Examples: policy status summary, advisor performance card, case-status pattern.

### Screen-only
Use when structure is one-off composition without stable reusable semantics.

Do not promote a one-off grouping to a component solely because it appears twice in one screen.

## Reuse decision tree
For every material element:
1. Is this already an approved instance?
2. Is there an approved domain pattern?
3. Is there an approved Core primitive?
4. Can the need be satisfied through existing properties/variants?
5. Can composition/wrapper solve it without new component API?
6. Is extension semantically valid for the existing owner?
7. Only then evaluate new component creation.

## Component identity checks
Verify:
- published identity/key when available
- owner file/library
- local vs remote
- component-set membership
- variant/property axes
- default values
- nested component identity
- whether visible name differs from canonical identity

Name similarity alone is insufficient.

## Variant/property rules
Good variant/property axes describe stable semantic dimensions such as:
- Size
- State
- Type
- Intent
- Device when the system genuinely models device variants

Avoid:
- Property 1
- Variant2
- one-off visual tweaks encoded as variants
- content-specific variants that should be instance content
- combinatorial explosion

Before adding a variant:
1. prove semantic reuse
2. prove it belongs to the same component
3. check existing property can represent it
4. check downstream impact
5. document owner

## Token/variable rules
Prefer semantic bindings over raw values.

Verify:
- color intent
- typography style
- spacing/radius/elevation tokens where defined
- state token usage
- alias relationship when relevant
- mode/theme correctness where present

Do not:
- replace bound token with raw value for convenience
- create near-duplicate semantic token
- invent token names not present in source
- flatten variable usage without migration scope

## Detach policy
Detaching an approved instance is a compliance defect unless:
- explicit migration/conversion is in scope
- no compatible component API exists
- the resulting ownership is documented

"Faster to edit" is not justification.

## Extension policy
EXTEND only when:
- current component owns the semantics
- extension is likely reusable
- API remains understandable
- existing instances remain valid or migration is planned
- owner is authorized

Otherwise choose wrapper/domain/screen-only composition.

## Cross-domain reuse
Visual similarity does not authorize cross-domain reuse.
Use a component from another domain only when semantic ownership/policy explicitly permits it.

## Structural checks
Check:
- Auto Layout remains intact
- nested components remain instances
- property names are semantic
- no duplicate local copy of a remote component
- component boundaries are meaningful
- no accidental componentization of layout fragments

## Compliance Gate

### PASS
- approved assets reused where appropriate
- new/extended assets are justified
- ownership is correct
- variables/tokens preserve semantic bindings
- component APIs remain understandable
- no unauthorized detach/duplication

### FAIL
Examples:
- parallel component created while approved one exists
- raw color/spacing replaces approved semantic binding
- wrong-domain component reused
- detached instance used for minor visual change
- new variant has unclear semantics
- component owner level is wrong
- repeated manual frames recreate a reusable approved pattern

### BLOCKED
Use when canonical identity, ownership, or source library cannot be resolved and the decision materially affects implementation.

## Severity guidance
P0:
- wrong design-system family/source causing material mismatch
- destructive Core mutation outside authorization

P1:
- duplicate component/pattern
- detached instance
- invalid property/variant modeling
- semantic token drift

P2:
- naming hygiene that does not change semantics
- minor layer organization issues

## Anti-patterns
- "looks the same" reuse
- component creation by visual grouping alone
- variants for every content combination
- unnecessary nested wrappers
- copying a component from another file to avoid library use
- rebuilding a Core primitive in product file
- using raw values to make screenshot matching easier

## Required evidence
- Core assets reused
- domain assets reused
- component identities
- variable/style bindings
- extension decisions
- new asset decisions + justification
- ownership
- exceptions/migration notes
- compliance gate result

## Downstream handoff
Pass reuse/ownership/API constraints to Execution, QA, Handoff, Regression, and Evidence.
