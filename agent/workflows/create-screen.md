# Workflow — CREATE SCREEN v2.4

## Flow

Inspect → Baseline → Resolve Authority Lanes → Reference Lock → Visual Grammar → DS Mapping → Design Decision → Scope → Permission → Pre-write Revalidation → Plan → REPRODUCE Skeleton Checkpoint when applicable → Mutation → Verification → QA-01A → QA-01B → QA-02..09 → QA-10 → Final QA → Fix Loop → Evidence.

## Exact user reference
If a current-task reference is explicitly supplied for matching, lock it as Primary Visual Authority. Do not use target content to choose a different Product Master.

## REPRODUCE
Apply `agent/flow/reference-reproduce.json`.

Build skeleton first:
- canvas/aspect ratio
- major regions
- grid
- repeated-card bounds/order
- major spacing
- hierarchy

Capture side-by-side evidence. P0/P1 skeleton mismatch blocks detail build.

## Execution
After skeleton PASS, execute detail batches using DS Mapping. System assets must preserve visual roles.

## QA
QA-01A verifies source authority.  
QA-01B verifies visual fidelity.  
Then QA-02..09 and QA-10.

## Completion
PASS / FAIL / BLOCKED only after final aggregation and evidence.
