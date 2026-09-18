# Workflow — INSPECT

Purpose: understand Figma without changing it.

## Steps

1. Parse file key and node ID.
2. Read the target node/page metadata.
3. Identify sections: Master, Components, Desktop, Tablet, Mobile, Archived, reference.
4. Count and classify component sets, components, instances, frames, and text.
5. Extract component-set property definitions and variant names.
6. For high-use instances, resolve the main component and whether it is remote.
7. Search the DS library for matching component/variable names.
8. Record naming debt, duplicates, component-set errors, and missing states.
9. Compare findings with the repo registry.
10. Produce:
   - current structure
   - Source of Truth recommendation
   - reuse candidates
   - conflicts/gaps
   - no-change confirmation

## Guardrails

- Read-only only.
- Do not rename or clean Figma during inspection.
- Do not treat frequency as approval.
- Do not treat a component-set error as a reason to rebuild without further evidence.
