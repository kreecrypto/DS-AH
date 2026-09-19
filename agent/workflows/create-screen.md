# Workflow — CREATE SCREEN v2.3

## Control flow

Inspect → Capture Baseline → Resolve Authority → Design Decision → Change Scope → Permission → **Pre-write Revalidation** → Execution Plan → Mutation → Recovery if needed → Verification → QA-01..09 → QA-10 → Final QA → Fix Loop → Evidence.

## Preflight
1. Resolve product/domain/target.
2. Inspect exact destination and reference candidates.
3. Capture a baseline fingerprint for destination/reference evidence.
4. Resolve Build Mode and Reference Gate.
5. Create Design Decision and observable acceptance criteria.
6. Define allowed/protected/out-of-scope areas, affected states/viewports.
7. Evaluate Write Permission.
8. Immediately before execution, re-read material target/reference evidence and compare with baseline.
9. If STALE_BASELINE, return to Inspect and revalidate downstream decisions before writing.

## Execution
Build a node-level plan. Prefer property/variant/token/Auto Layout changes before new raw nodes. Execute in small batches. Every batch returns all affected node IDs.

Any error/incomplete result enters Mutation Recovery. Do not continue another batch while canvas state is UNKNOWN_WRITE.

## Post-write
1. Verification: structural + visual + scope.
2. QA-01..QA-09.
3. QA-10 Visual Regression when applicable.
4. Final QA Aggregation.
5. Fixable P0/P1 → Fix Loop.
6. After every fix: Verification → affected QA-01..09 → QA-10 → Final QA.
7. Evidence.

## Completion
PASS | FAIL | BLOCKED only after final aggregation and evidence.
