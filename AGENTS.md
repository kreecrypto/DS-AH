# DS-AH — Design Control Agent Entry Point v2.4 + Write Fidelity Extension

## Architecture
Chat = Agent  
GitHub = Brain / Knowledge  
Figma = Workspace

## Core operating principle
**RETRIEVE before DESIGN → REUSE before CREATE → COMPOSE before DRAW → VERIFY before COMPLETE.**

## Start sequence

1. Read `agent/SYSTEM.md`.
2. Read `agent/runtime.json`.
3. Read `agent/flow/design-agent-flow.json`.
4. For CREATE/MODIFY/FIX, also read `agent/flow/write-fidelity-v2.json`.
5. Read `agent/reference/reference-lock.json` and `agent/reference/reference-resolver.json`.
6. Route intent/product.
7. Load required Skill contracts.
8. Read `docs/figma-sop.md` before live Figma work.
9. Inspect target/reference and capture baseline.
10. Retrieve reference candidates from exact user ref, approved current screens, domain patterns, templates and Core DS evidence.
11. Score/rank candidates; never mix multiple visual authorities without an explicit lane decision.
12. Resolve authority lanes and lock the Primary Visual Authority.
13. Extract Visual Grammar.
14. Map DS assets to visual roles.
15. Resolve Screen Archetype from `agent/archetypes/screen-archetypes.json`.
16. Resolve Composition Knowledge and existing product examples.
17. Build a Reuse Map: Instance → Variant → Override → Existing Pattern → Existing Layout → Create only if approved.
18. Create Design Decision and Change Scope.
19. Apply Mutation Budget from `policies/mutation-budget.md`.
20. Evaluate write permission.
21. Pre-write revalidate target and locked reference.
22. Build a machine-readable Write Plan using `agent/write/write-plan.schema.json`.
23. Execute Structure Pass.
24. For REPRODUCE, pass the skeleton checkpoint before detail.
25. Execute Component Composition Pass.
26. Execute Content + State Pass.
27. Execute Visual Polish Pass without expanding scope.
28. Verify structure, component identity, variables/tokens, states and visuals.
29. Generate Visual Delta records using `agent/qa/visual-delta.schema.json`.
30. QA-01A Reference Authority.
31. QA-01B Visual Fidelity.
32. QA-02..09.
33. QA-10 Visual Regression.
34. Patch P0/P1 deltas only inside authorized scope/mutation budget.
35. Re-run Verification → affected QA → QA-10.
36. Evidence.
37. Complete PASS / FAIL / BLOCKED.

## Hard rules

- Exact current-task user visual/Figma ref outranks Product Master for Visual Authority.
- Missing requested prior ref = BLOCKED_REFERENCE_MISSING; no Master fallback.
- Existing approved product screen outranks generic design knowledge when solving the same screen family.
- Reference retrieval/ranking never overrides an explicit locked reference.
- Reference Lock before Design Decision.
- DS mapping cannot replace locked composition.
- Resolve Screen Archetype before composing a new screen unless the user explicitly requests EXPLORE.
- Do not create a custom node when an approved Instance/Variant/Override/Pattern can satisfy the role.
- REPRODUCE skeleton must pass side-by-side comparison before detailed build.
- Structure-first: layout and region geometry before content polish.
- Mutation Budget protects unaffected areas; visual polish is not permission to redesign them.
- Visual Delta findings authorize targeted patches, not a full redraft.
- Metadata-only evidence cannot PASS visual fidelity.
- No PASS without evidence.
