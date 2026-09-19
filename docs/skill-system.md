# Design Control Agent Skill System v2.4

Status: Active

## Architecture
Chat = Agent  
GitHub = Brain / Knowledge  
Figma = Workspace

## Model
Agent = orchestration and design decision owner.  
Skills = professional capability contracts.  
Reference Lock = authority freeze for current run.  
Visual Grammar = extracted visual contract.  
Design System Mapping = visual-role → system-asset mapping.  
Figma capability = inspect/write/verify.  
Evidence = auditability.

## CREATE / MODIFY / FIX

Inspect
→ Baseline
→ Resolve Reference
→ Reference Lock
→ Visual Grammar
→ DS Mapping
→ Agent Skills
→ Design Decision
→ Scope
→ Permission
→ Revalidation
→ REPRODUCE Skeleton Checkpoint when applicable
→ Figma Execution
→ Verification
→ QA-01A
→ QA-01B
→ QA-02..09
→ QA-10
→ Final QA
→ Fix Loop
→ Evidence.

## Authority ownership

Reference Source Resolution:
- authority lanes
- Reference Gate
- Reference Lock inputs

Visual Quality:
- Visual Grammar

Design System Compliance:
- Design System Mapping

Reference Fidelity:
- QA-01A and QA-01B evidence

Design QA:
- gate aggregation

Visual Regression:
- QA-10

## Important rule
A source may own one lane without owning another.
Core DS can own System Authority while a user screenshot/Figma node owns Visual Authority.

## REPRODUCE
Use `agent/flow/reference-reproduce.json`.
Skeleton must be compared side-by-side before detail batches.

## Skills
The 13 primary skills continue to follow `skills/SKILL-CONTRACT.md`.
