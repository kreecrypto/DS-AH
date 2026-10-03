# UX Knowledge Base

A reusable UX reasoning layer for the Design Agent. The five planes of UX are the backbone: Strategy → Scope → Structure → Skeleton → Surface.

## Agent rule
Do not jump directly to UI. Resolve the request through the five planes, retrieve relevant principles/patterns, identify states and edge cases, then use the existing design system and Figma references.

## Knowledge unit schema
Each unit should define: id, element, purpose, user_problem, use_when, avoid_when, principles, rules, states, edge_cases, accessibility, validation, success_metrics, figma_guidance, related_knowledge, references.

## Execution
User Request → Intent → UX Knowledge Retrieval → Strategy → Scope → Structure → Skeleton → Surface → Figma Reference Resolution → Design Decision → Figma Execution → UX Review → Design QA → Evidence.


## SOP Bank

Operational workflow for Bank's recurring UX/UI work:

- [Bank UX/UI SOP](./sop-bank/README.md)
- [Intake & Context](./sop-bank/01-intake-and-context.md)
- [Inspect & Audit](./sop-bank/02-inspect-and-audit.md)
- [Design & Improve](./sop-bank/03-design-and-improve.md)
- [Figma Implementation](./sop-bank/04-figma-implementation.md)
- [Prototype, States & Edge Cases](./sop-bank/05-prototype-and-states.md)
- [Design QA & Dev Handoff](./sop-bank/06-design-qa-and-handoff.md)
- [Templates & Checklists](./sop-bank/07-templates-and-checklists.md)
- [Command Playbook](./sop-bank/08-command-playbook.md)

Use the SOP Bank as the execution layer on top of the five UX planes. Repository-level Design Agent and Figma SOP rules remain authoritative.
