---
id: reference-source-resolution
version: 2.4.0
scope: core
category: authority-resolution
---

# Reference / Source Resolution Skill

## Mission
Resolve authoritative design sources by authority lane, determine Build Mode, produce a Reference Gate, and prepare an evidence-backed Reference Lock without silently substituting another visual reference.

This skill controls source authority. It never grants Figma write permission.

## Activate when
Mandatory for CREATE_SCREEN and MODIFY_SCREEN.
Mandatory for FIX when fidelity/source correctness is involved.
Use for QA when source correctness affects PASS.
Use for REVIEW when source authority affects findings.
Use for COMPONENT when ownership/canonical source is uncertain.
Use whenever the user says “เหมือน Ref นี้”, “ตามรูปนี้”, “ใช้แบบนี้”, “Ref ที่เคยให้ไว้”, or equivalent.

## Required inputs
- current user request
- current-task image/visual attachments
- current-task Figma links/nodes explicitly used as reference
- recoverable prior-reference evidence when explicitly requested
- product/domain
- target file/node
- live Figma inspection evidence
- reference router
- source-priority policy
- Product Master registry
- Domain Pattern registry
- Core DS registry

## Source classes
Classify each candidate as one primary class:
1. EXACT_CURRENT_USER_VISUAL_REFERENCE
2. EXACT_CURRENT_USER_FIGMA_REFERENCE
3. EXPLICIT_CURRENT_USER_NAMED_REFERENCE
4. CURRENT_PRODUCT_MASTER
5. APPROVED_DOMAIN_PATTERN
6. CORE_DESIGN_SYSTEM
7. CURRENT_EXISTING_TARGET
8. LEGACY
9. ARCHIVE
10. REFERENCE_ONLY
11. EXPERIMENTAL
12. UNKNOWN

A source may be useful without being authoritative for every lane.

## Authority lanes

### Visual Authority
Controls:
- composition
- grid
- hierarchy
- density
- repeated card/row anatomy
- spatial relationships
- chart geometry
- visual rhythm

### System Authority
Controls:
- component identity
- component API
- variants/properties
- semantic variables/tokens
- typography foundations
- icon families
- accessibility primitives

### Content Authority
Controls:
- verified copy
- values
- domain terminology
- business behavior

### Preservation Authority
Controls:
- unaffected existing-target regions
- before-state evidence in MODIFY/FIX

One source never automatically owns all four lanes.

## Current-task exact reference rule
When the user supplies or points to an exact current-task visual/Figma reference and asks to match/follow/use it:
1. classify the source as EXACT_CURRENT_USER_VISUAL_REFERENCE or EXACT_CURRENT_USER_FIGMA_REFERENCE
2. assign it Primary Visual Authority
3. do not infer another visual authority from target labels/content
4. keep Product Master as supporting Content/Domain evidence only unless explicitly promoted by the user
5. keep Core/Domain DS as System Authority
6. prepare Reference Lock with forbidden substitutions

## Prior reference recovery rule
If the user explicitly asks for a previous reference:
1. attempt evidence-backed recovery
2. verify that the recovered source is actually the requested reference
3. if recovered, treat it as exact user reference
4. if not recoverable, return BLOCKED_REFERENCE_MISSING
5. never fall back to Product Master merely because it seems related

## Build Mode resolution

### REPRODUCE
Use when:
- exact locked visual reference exists
- approved matching Master owns Visual Authority
- user requests matching/known screen
- no bounded delta is requested

Invention is not allowed for material visual structure.

### ADAPT
Use when:
- approved/locked baseline exists
- user requests bounded change
- unaffected visual grammar must remain stable

### EXPLORE
Use only when:
- user explicitly requests concept/new direction/from scratch
- or source policy explicitly permits exploration

“New file”, “new page”, “test”, “dashboard”, or domain clues do not imply EXPLORE.

## Candidate-resolution procedure
1. Parse explicit current-task reference language.
2. Inspect current-task visual/Figma references first.
3. If prior reference requested, recover it before Master lookup.
4. Resolve product/domain without using it to override exact user reference.
5. Build candidate list.
6. Classify each candidate.
7. Assign candidate authority lanes.
8. Remove legacy/archive/reference-only from primary authority unless explicitly requested.
9. Detect same-lane ambiguity.
10. Resolve Build Mode.
11. Select Primary Visual Authority.
12. Select System/Content/Preservation authorities.
13. Produce Reference Gate.
14. Record rejected candidates and reasons.
15. Hand off inputs for Reference Lock.

## Reference Gate

### PASS
Use when:
- required authority lanes are resolved
- exact source identity/evidence exists
- no same-lane ambiguity remains
- requested exact reference is available when required

### EXPLORE_EXPLICIT
Use when:
- exploration is explicitly authorized
- scope is understood
- system constraints remain known

### BLOCKED_REFERENCE_AMBIGUOUS
Use when:
- two or more plausible sources remain for the same material lane
- choosing one changes layout/behavior/fidelity
- user/policy has not resolved the conflict

### BLOCKED_REFERENCE_MISSING
Use when:
- user requested exact/current/prior reference
- it cannot be verified/recovered
- exploration is not explicitly authorized

## Reference Lock handoff
For PASS reference-based work, provide:
- Primary Visual Authority
- Visual/System/Content/Preservation authority lanes
- Build Mode
- allowed supporting sources
- forbidden substitutions
- evidence
- unresolved gaps

Reference Lock must be established before Visual Grammar Extraction and Design Decision.

## Conflict rules
- exact current user visual reference beats generic Product Master for Visual Authority
- current Product Master beats legacy when Product Master owns a lane
- Core DS owns system primitives, not locked composition
- existing target is preservation evidence, not automatic visual truth
- target content similarity cannot promote a different Master over locked visual ref
- a DS conflict must be recorded, not hidden by composition substitution

## Block conditions
Block downstream design/write when:
- requested exact/prior reference is missing
- same-lane authority remains ambiguous
- target is unresolved when target evidence is necessary
- exact source cannot be inspected when inspection is necessary
- Reference Lock cannot be safely formed
- source classification conflicts with registry and cannot be reconciled

## Anti-patterns
- selecting Team/My Performance Master because target metrics resemble it while user supplied another visual ref
- using screenshot similarity as authority without provenance
- mixing modules from different Masters to avoid ambiguity
- choosing newest-looking file without approval
- treating current target as canonical because it exists
- inventing a prior reference from memory
- treating component name as ownership proof
- letting Core DS override user-approved composition
- falling back from missing prior ref to convenient Master

## Required evidence
- Build Mode
- Reference Gate
- candidate list
- selected Primary Visual Authority
- System Authority
- Content Authority
- Preservation Authority
- exact source identifiers
- source authority rationale
- rejected candidates + reason
- conflicts
- prior-reference recovery result when applicable
- unresolved gaps

## Downstream handoff
Pass:
- Build Mode
- Reference Gate
- authority lanes
- exact source
- Reference Lock inputs
- preservation baseline needs
- approved constraints
to Reference Lock, Visual Grammar, DS Mapping, Planner, Scope Control, Execution, QA-01A, QA-01B, Regression, and Evidence.
