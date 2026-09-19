---
id: reference-source-resolution
version: 2.2.0
scope: core
category: authority-resolution
---

# Reference / Source Resolution Skill

## Mission
Resolve which design source has authority for the current task, what Build Mode applies, and whether design work may proceed without source ambiguity.

This skill controls design authority. It does not grant Figma write permission.

## Activate when
Mandatory for CREATE_SCREEN and MODIFY_SCREEN.
Use for QA whenever fidelity/system correctness depends on a reference.
Use for REVIEW when source authority is disputed or affects findings.
Use for COMPONENT when ownership/canonical source is uncertain.

## Required inputs
- user request
- product/domain
- target file/node
- live Figma inspection evidence
- reference router
- source-priority policy
- master/domain/Core registries

## Source classes
Classify each candidate as exactly one primary class:
1. EXACT_USER_APPROVED_REFERENCE
2. CURRENT_PRODUCT_MASTER
3. APPROVED_DOMAIN_PATTERN
4. CORE_DESIGN_SYSTEM
5. CURRENT_EXISTING_TARGET
6. LEGACY
7. ARCHIVE
8. REFERENCE_ONLY
9. EXPERIMENTAL
10. UNKNOWN

A source may be visually useful without having authority.

## Authority order
Unless a product policy explicitly overrides it:
1. exact user-approved reference
2. approved/current Product Master
3. approved domain pattern
4. Core DS component/foundation
5. existing target for preservation evidence
6. legacy/archive/reference-only for historical context only

Visual similarity never overrides authority.

## Build Mode resolution

### REPRODUCE
Use when:
- a matching approved reference exists
- user asks to build/create the known screen/pattern
- no bounded change is requested

### ADAPT
Use when:
- approved baseline exists
- user requests a bounded change
- surrounding design should remain stable

### EXPLORE
Use only when:
- user explicitly requests concept/new direction/from scratch
- or source policy explicitly permits exploration

"New file", "new page", "test agent", "make dashboard" do not imply EXPLORE.

## Candidate-resolution procedure
1. Parse explicit reference mentions.
2. Resolve target product/domain.
3. Build a candidate list from exact references, Masters, domain registry, Core DS, and existing target.
4. Inspect exact candidates live when needed.
5. Classify each candidate.
6. Eliminate candidates that are archive/legacy/reference-only from primary authority.
7. Check whether multiple current/approved candidates satisfy the same task.
8. Resolve Build Mode.
9. Select authority or declare ambiguity.
10. Record why rejected candidates were not chosen.

## Reference Gate

### PASS
Use when:
- one authoritative source is resolved
- file/node identity is known
- source classification is acceptable
- no equal-authority ambiguity remains

### EXPLORE_EXPLICIT
Use when:
- user explicitly authorizes exploration
- exploration scope is understood
- existing DS/foundation constraints remain known

### BLOCKED_REFERENCE_AMBIGUOUS
Use when:
- two or more plausible approved/current references remain
- choosing one would materially affect layout, behavior, or fidelity
- user/source policy has not resolved the conflict

### BLOCKED_REFERENCE_MISSING
Use when:
- reference-based work is requested
- no approved source can be verified
- exploration is not explicitly authorized

## Conflict rules
When sources disagree:
- exact approved user reference beats generic Master only for the current task
- current Master beats legacy
- domain pattern beats a visually similar unrelated product pattern
- Core DS defines primitives; Product Master defines composition/context
- existing target is preservation evidence, not automatically canonical

## Forbidden resolution shortcuts
- mixing modules from different Masters to avoid ambiguity
- using screenshot similarity as authority
- using the newest-looking file without approval evidence
- treating current target as source of truth because it already exists
- treating component name as ownership proof
- inventing a reference node from memory

## Block conditions
Block mutation when:
- gate is ambiguous/missing
- target is unresolved
- exact source cannot be inspected when inspection is necessary
- reference classification conflicts with registry and cannot be reconciled

## Required evidence
- Build Mode
- Reference Gate
- selected source: fileKey/nodeId/name/classification
- source authority reason
- candidate list
- rejected candidates + reason
- conflicts
- unresolved gaps

## Downstream handoff
Pass:
- Build Mode
- Reference Gate
- exact authority
- preservation baseline if ADAPT
- approved design grammar constraints

to Planner, Scope Control, IA, Interaction, DS Compliance, Execution, QA, and Regression.
