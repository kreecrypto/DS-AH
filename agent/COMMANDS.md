# Design Agent v1 Command Router

Natural-language requests are supported. Explicit commands are optional.

| Command | Purpose | Workflow |
|---|---|---|
| `DS:INSPECT` | structure/source/component inspection | `workflows/inspect.md` |
| `DS:REVIEW` | UX/UI and DS review | `workflows/review.md` |
| `DS:CREATE` / `DS:CREATE-SCREEN` | new screen composition | `workflows/create-screen.md` |
| `DS:MODIFY` / `DS:MODIFY-SCREEN` | modify existing screen | `workflows/modify-screen.md` |
| `DS:FIX` | alias of MODIFY + QA | `workflows/modify-screen.md` |
| `DS:COMPONENT` | component resolution/normalization | `workflows/component.md` |
| `DS:QA` | source/reuse/state/responsive/visual QA | `workflows/qa.md` |
| `DS:HANDOFF` | developer handoff/spec | `workflows/handoff.md` |

## Routing order

`ROUTE → RESOLVE PRODUCT → INSPECT → RESOLVE SOURCE → RESOLVE REUSE → EXECUTE IF AUTHORIZED → QA → EVIDENCE`

Machine-readable routing lives in:
- `agent/router/intent.json`
- `agent/product-router.json`
