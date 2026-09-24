# Design Control Agent v2.5 Command Router

Natural-language requests are supported. Explicit commands are optional.

## Canonical commands

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

## UX/UI slash commands

These are human-friendly interfaces over the canonical DS-AH intents and Production Skills.

| Slash command | Canonical intent | Default mode |
|---|---|---|
| `/inspect` | INSPECT | INSPECT_ALLOWED |
| `/understand` | INSPECT | INSPECT_ALLOWED |
| `/ux-review` | REVIEW | READ_ONLY |
| `/ui-review` | REVIEW | READ_ONLY |
| `/design-system` | COMPONENT | READ_ONLY |
| `/explore-3` | REVIEW | READ_ONLY |
| `/design-screen` | CREATE_SCREEN | WRITE_PENDING |
| `/match-reference` | MODIFY_SCREEN | WRITE_PENDING |
| `/improve` | MODIFY_SCREEN | WRITE_PENDING |
| `/simplify` | REVIEW | READ_ONLY |
| `/flow` | REVIEW | READ_ONLY |
| `/journey` | REVIEW | READ_ONLY |
| `/edge-cases` | REVIEW | READ_ONLY |
| `/states` | COMPONENT | READ_ONLY |
| `/prototype` | MODIFY_SCREEN | WRITE_PENDING |
| `/ux-writing` | REVIEW | READ_ONLY |
| `/accessibility` | REVIEW | READ_ONLY |
| `/componentize` | COMPONENT | READ_ONLY |
| `/responsive` | REVIEW | READ_ONLY |
| `/design-qa` | QA | READ_ONLY |
| `/visual-regression` | QA | READ_ONLY |
| `/fix-all` | MODIFY_SCREEN | WRITE_PENDING |
| `/handoff` | HANDOFF | READ_ONLY |
| `/finalize` | QA | READ_ONLY |

Full prompt bodies and recommended usage:
- `docs/ux-ui-ai-command-library.md`

Machine-readable alias-to-skill mapping:
- `agent/command-aliases.json`

## Recommended control order

**ROUTE → INSPECT → UNDERSTAND → RESOLVE AUTHORITY → LOAD DS → ANALYZE → PLAN → DEFINE SCOPE → EVALUATE PERMISSION → EXECUTE → VERIFY → QA → FIX LOOP → EVIDENCE → COMPLETE**

## Recommended UX/UI pipeline

```text
USER REQUEST
→ /inspect
→ /understand
→ RESOLVE REFERENCE
→ LOAD DESIGN SYSTEM
→ /ux-review + /ui-review
→ /edge-cases
→ /explore-3 when requested
→ DESIGN DECISION
→ CHANGE SCOPE
→ WRITE PERMISSION
→ /design-screen or /improve
→ /states + /responsive + /ux-writing
→ /prototype when required
→ /accessibility
→ /design-qa
→ /visual-regression
→ /fix-all when authorized
→ /handoff
→ /finalize
→ COMPLETE
```

## Write rule

CREATE/MODIFY intent only produces `WRITE_PENDING`.

`WRITE_ALLOWED` requires all:
- explicit current-task Figma write instruction
- resolved target
- defined Change Scope
- Reference Gate = PASS or EXPLORE_EXPLICIT
- live Figma write capability

A slash command never bypasses these guards.
A passed reference never grants write permission by itself.

## Command-system invariants

- Slash commands are aliases, not replacement Production Skills.
- Skills never grant write permission.
- Reference Lock and authority rules remain unchanged.
- Commands cannot silently expand Change Scope.
- Tool success is not verification.
- P0/P1 blocks completion.
- No PASS without evidence.
