# Workflow — QA

## Required checks

### Reference Fidelity
For CREATE/MODIFY:
- Build Mode recorded?
- Reference Gate passed?
- Exact approved reference file/node recorded?
- Reference inspected before write?
- Result visually compared after write?
- Major hierarchy matches approved source?
- Page shell/navigation/header matches?
- Section order matches?
- Major geometry/spacing matches?
- Any new module absent from reference?
- Any unrelated redesign introduced?

For REPRODUCE, any material unexplained divergence = **FAIL**.

### Source
- Correct approved source used?
- Archived/reference-only content excluded as implementation authority?
- If multiple primary candidates existed, was ambiguity resolved before write?

### Reuse
- Core DS searched?
- Existing product/domain pattern reused?
- Any duplicate component introduced?
- Same-name component identity verified by key?

### API
- Semantic component/variant names?
- No placeholder property/state names?

### Responsive
- Desktop checked?
- Tablet checked where supported?
- Mobile checked where supported?
- Collapse/expand behavior checked?

### States
- Default
- Disabled where applicable
- Loading where applicable
- Empty/no-data where applicable
- Error/retry where applicable
- Hover/focus/active for interactive Core elements where applicable

### Visual
- No clipping/overlap
- Stable auto-layout
- consistent spacing/radius/token use
- hierarchy matches approved reference

### Content
- labels/terminology consistent
- no accidental legacy typo copied into new work

## QA result format

`PASS`, `PASS_WITH_GAPS`, or `FAIL`.

A REPRODUCE/ADAPT write without reference visual comparison cannot be PASS.

List every gap explicitly.
