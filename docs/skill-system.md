# Design Control Agent Skill System v2.3

Status: Active

## Model

Agent = orchestration and control.  
Skill = professional design capability.  
Figma capability = inspect/write/verify.  
Registry/reference = truth.  
Flow = sequencing/branching.  
Evidence = auditability.

## CREATE / MODIFY / FIX

Inspect
→ Baseline
→ Reference
→ Agent Skills (IA / Interaction / DS / Content / Visual / Responsive)
→ Design Decision
→ Scope
→ Permission
→ Pre-write Revalidation
→ Figma Execution
→ Recovery when needed
→ Verification
→ QA-01..09
→ QA-10
→ Final QA
→ Fix Loop
→ Evidence.

## QA ownership

Design QA owns QA-01..09 evaluation and Final QA Aggregation.
Visual Regression owns QA-10.
This separation prevents QA-10 from passing before comparison is actually performed.

## Specialized subflows

Component, Prototype, Multi-page, and Responsive are nested flow contracts, not separate agents and not permission bypasses.

## Recovery / Resume

Mutation Recovery handles uncertain canvas write state.
Resume/Re-entry handles a new run after a resolvable BLOCKED state.

## Skills

The 13 primary skills continue to follow `skills/SKILL-CONTRACT.md`. Skill behavior remains professional-domain logic; flow hardening stays in the Agent/controller layer.
