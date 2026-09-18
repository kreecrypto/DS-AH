# Workflow — QA

## Required checks

### Source
- Correct approved source used?
- Archived/reference content excluded?

### Reuse
- Core DS searched?
- Existing pattern reused?
- Any duplicate component introduced?

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
- hierarchy matches approved source

### Content
- labels/terminology consistent
- no accidental legacy typo copied into new work

## QA result format

`PASS`, `PASS_WITH_GAPS`, or `FAIL`.

List every gap explicitly.
