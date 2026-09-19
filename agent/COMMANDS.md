# Design Control Agent v2.1 Command Router

Natural-language requests are supported. Explicit commands are optional.

| Command | Purpose | Default control mode | Workflow |
|---|---|---|---|
| `DS:INSPECT` | inspect Figma/source/component structure | INSPECT_ALLOWED | `workflows/inspect.md` |
| `DS:REVIEW` | UX/UI review with findings + acceptance criteria | READ_ONLY | `workflows/review.md` |
| `DS:CREATE` / `DS:CREATE-SCREEN` | controlled screen creation | WRITE_PENDING | `workflows/create-screen.md` |
| `DS:MODIFY` / `DS:MODIFY-SCREEN` | controlled bounded modification | WRITE_PENDING | `workflows/modify-screen.md` |
| `DS:FIX` | route a fix through MODIFY + QA + regression | WRITE_PENDING | `workflows/modify-screen.md` |
| `DS:COMPONENT` | component resolution/API/ownership work | READ_ONLY | `workflows/component.md` |
| `DS:QA` | evidence-based quality gate execution | READ_ONLY | `workflows/qa.md` |
| `DS:HANDOFF` | implementation-ready handoff | READ_ONLY | `workflows/handoff.md` |

## Control order

**ROUTE → INSPECT → RESOLVE AUTHORITY → PLAN → DEFINE SCOPE → EVALUATE PERMISSION → EXECUTE → QA → FIX LOOP → EVIDENCE**

## Write rule

CREATE/MODIFY intent only produces `WRITE_PENDING`.

`WRITE_ALLOWED` requires all:
- explicit current-task Figma write instruction
- resolved target
- defined Change Scope
- Reference Gate = PASS or EXPLORE_EXPLICIT
- live Figma write capability

A passed reference never grants write permission by itself.
