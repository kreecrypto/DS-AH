# Agent Command Router

Human prompts do not need to use exact command syntax. Route natural-language requests to the closest workflow.

| Command | Typical trigger | Workflow |
|---|---|---|
| `DS:INSPECT` | inspect, ดูโครงสร้าง, ตรวจ Figma, inventory | `workflows/inspect.md` |
| `DS:CREATE-SCREEN` | create screen, ออกแบบหน้าใหม่, build screen | `workflows/create-screen.md` |
| `DS:MODIFY-SCREEN` | แก้หน้า, ปรับ screen, extend existing flow | `workflows/modify-screen.md` |
| `DS:REVIEW` | UX/UI review, audit, critique, review states | `workflows/review.md` |
| `DS:COMPONENT` | create/normalize/merge component, variant audit | `workflows/component.md` |
| `DS:QA` | QA, check design, compare, responsive check | `workflows/qa.md` |
| `DS:HANDOFF` | developer handoff, spec, implementation notes | `workflows/handoff.md` |

## Router rules

1. If a request contains a Figma URL, parse file key and node ID first.
2. If the request asks only to inspect/review, stay read-only.
3. If the request asks to create/edit in Figma, inspect first, then follow the relevant write workflow.
4. If the request asks for a new component, run `DS:COMPONENT` before creating it.
5. If the request asks for a new screen, first run the component/library lookup steps from `DS:CREATE-SCREEN`.
6. If multiple workflows apply, order them:
   `INSPECT → COMPONENT (if needed) → CREATE/MODIFY → QA → HANDOFF`.

## Short invocation examples

- `DS:INSPECT <figma-url>`
- `DS:REVIEW <figma-url> focus=responsive,states`
- `DS:CREATE-SCREEN feature=case-history device=all`
- `DS:MODIFY-SCREEN <figma-url> change=filter interaction`
- `DS:COMPONENT name=badge-status-type action=normalize`
- `DS:QA <figma-url> compare=approved-master`
