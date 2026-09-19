# Workflow — MODIFY SCREEN / FIX v2.4

## Flow

Inspect Target → Preservation Baseline → Resolve Authority Lanes → Reference Lock → Visual Grammar → DS Mapping → Design Decision → Change Scope → Permission → Pre-write Revalidation → Smallest Mutation → Verification → QA-01A → QA-01B → QA-02..09 → QA-10 → Final QA → Fix Loop → Evidence.

## Rules
- Locked user visual reference owns visual composition for the scoped change.
- Existing target owns preservation of unaffected regions.
- Product Master may supply verified content/domain behavior but cannot silently replace the visual reference.
- DS mapping must preserve locked visual roles.
- STALE_REFERENCE returns to Resolve Reference.
- Tool error does not prove zero write.

## Fix Loop
Any reference/fidelity fix must re-run QA-01A/QA-01B and QA-10 as applicable.

## Completion
PASS / FAIL / BLOCKED with evidence from original locked reference and original preservation baseline.
