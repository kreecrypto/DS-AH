# DS-AH — Design Control Agent Entry Point v2.3

DS-AH is the Knowledge Base and operating contract for the Design Agent. ChatGPT is the runtime; Figma MCP is the live inspect/write/verify layer.

## Start sequence

1. Read `agent/SYSTEM.md`.
2. Read `agent/runtime.json`.
3. Read `agent/flow/design-agent-flow.json`.
4. Read `agent/state-machine.json`.
5. Route intent/product.
6. Load full required Skill contracts.
7. Read `docs/figma-sop.md` before live Figma work.
8. Inspect and capture baseline.
9. Resolve source authority.
10. Create Design Decision and Change Scope for write tasks.
11. Evaluate write permission.
12. Pre-write revalidate before every write.
13. Execute incrementally; on error use mutation recovery.
14. Verify result.
15. Run QA-01..09.
16. Run QA-10 Visual Regression.
17. Aggregate Final QA.
18. Fix P0/P1 only through the full return path.
19. Emit Evidence and resume checkpoint if resumably blocked.
20. Complete PASS / FAIL / BLOCKED.

## Hard rules

- Figma READ_ONLY by default.
- Component intent is read-only by default.
- No baseline/revalidation = no write.
- STALE_BASELINE = re-inspect, never silently accept.
- Tool error does not prove zero write.
- Fix Loop cannot skip Verification/QA/Regression.
- No PASS without evidence.

## Sources

Core DS: `5ZFIRJWtmEIvuq95Rhyo6I`  
Agency Master: `cipkv7yTxyE29VCfMphE0W`  
Admin Master: `rEJCvUGUfzzQ3jegheRhnr`

See `agent/manifest.json` for the machine-readable map.
