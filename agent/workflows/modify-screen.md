# Workflow — MODIFY SCREEN / FIX v2.3

## Control flow

Inspect Target → Capture Preservation Baseline → Resolve Authority → Design Decision → Change Scope → Permission → **Pre-write Revalidation** → Execution Plan → Smallest Mutation → Recovery if needed → Verification → QA-01..09 → QA-10 → Final QA → Fix Loop → Evidence.

## Baseline
Capture pre-change fingerprint and visual evidence for:
- target
- protected areas
- affected states/viewports
- approved authority

Build Mode defaults to ADAPT unless evidence says otherwise.

## Stale protection
Immediately before mutation compare a fresh fingerprint with the captured baseline.
- CURRENT → continue.
- STALE_BASELINE → no write; re-inspect and revalidate Reference, Decision, Scope, Permission, Plan.
- BLOCKED → Evidence/Blocked.

## Mutation
Prefer property/variant/token/Auto Layout edits over detach/rebuild.
Small change never authorizes surrounding redesign.
All changed node IDs must be returned.

## Recovery
Tool error does not prove zero write. Classify NO_WRITE / PARTIAL_WRITE / UNKNOWN_WRITE. Partial/unknown canvas state freezes further batches until inspected/recovered.

## QA
Verification → QA-01..09 → QA-10 → Final QA Aggregation.

Protected-area drift is QA-09 FAIL. Unexplained visual drift is QA-10 FAIL.

## Fix Loop
Fix root cause only inside valid scope. Every fix returns to Verification, then all affected QA-01..09, QA-10, and Final QA.

## Completion
PASS | FAIL | BLOCKED with evidence and comparison to original preservation baseline.
