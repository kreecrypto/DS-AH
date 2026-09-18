# P0 — Design System Gap Matrix

Status: Repository baseline complete; Figma migration intentionally not executed.

## Confirmed architecture

- Core components/foundations already exist in the remote DS library.
- Target Master Screens file has no local variable collections.
- Local feature pages contain many valid domain patterns plus naming/API debt.
- The correct strategy is reuse + normalization registry, not rebuilding the system locally.

## Decision matrix

| Area | Decision | Repo action |
|---|---|---|
| Remote Core DS | KEEP / PRIMARY | Registered in `registry/libraries.json` |
| Color variables | REUSE REMOTE | Registered in `registry/foundations.json` |
| Spacing variables | REUSE REMOTE | gap/padding collections registered |
| Radius variables | REUSE REMOTE | shape/radius collection registered |
| Typography variables | REUSE REMOTE + REVIEW FAMILY AUTHORITY | font-size evidence registered |
| Core components | REUSE | APIs in `registry/core-components.json` |
| Local domain components | KEEP / NORMALIZE / MERGE CASE-BY-CASE | `registry/domain-patterns.json` |
| Legacy names | DO NOT PROPAGATE | `registry/aliases.json` |
| Archived/reference screens | BLOCK FOR IMPLEMENTATION | `registry/figma-sources.json` |
| Templates | COMPOSITION CANDIDATES | `registry/templates.json` |
| Figma migration | NOT IN SCOPE | no Figma writes performed |

## High-priority debt

- generic Property/Variant/Stage names
- mixed device axes
- typos used in reusable APIs
- duplicate local component sets
- local component sets with Figma property-definition errors
- ambiguous states with no semantic meaning

## Exit criteria

- [x] All top-level pages inventoried
- [x] Primary Core library identified
- [x] Core component APIs sampled and registered
- [x] Remote foundation collections discovered
- [x] Local domain patterns sampled and registered
- [x] Source authority registry created
- [x] Legacy alias normalization created
- [x] Agent router/workflows created
- [x] Read-only default policy created
- [x] Repository validation script added
- [ ] Exact remote variable values/modes fully extracted
- [ ] Ambiguous local variant meanings resolved with product evidence
- [ ] Explicit product approval statuses recorded where needed

P0 repository system is usable despite the remaining evidence gaps above because unresolved meanings are explicitly blocked from guessing.
