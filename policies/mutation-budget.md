# Policy — Mutation Budget and Scope Preservation

## Purpose
Prevent a small user request from becoming an unsolicited redesign.

## Budget classes

### MICRO
One text/icon/property/state/visibility/spacing value.
Protected: all siblings and parent composition unless dependency requires adjustment.

### LOCAL
One component or compact group.
Examples: filter control, card state, one field group.

### REGIONAL
One section/toolbar/card cluster/table region.
May change internal composition; surrounding page geometry remains protected.

### STRUCTURAL
Major page composition, navigation region, grid, responsive rearrangement.
Requires explicit structural intent or documented root-cause necessity.

### FULL
Explicit full redesign, full reproduce, or new concept.
Only explicit user authorization or EXPLORE/FULL task may enter this class.

## Rules
- Default to the smallest budget that satisfies the request.
- Protected areas are immutable unless a dependency rule is documented.
- Visual polish cannot escalate the budget.
- A QA defect outside authorized scope must be reported; it does not automatically authorize a fix.
- Dependency expansion must name the dependent nodes and reason.
- Any escalation from MICRO/LOCAL/REGIONAL to STRUCTURAL/FULL requires explicit evidence.

## Required mutation-budget record
- class
- allowed regions/node IDs
- protected regions/node IDs
- allowed operation types
- forbidden operation types
- dependency-expansion rule
- maximum acceptable visual movement
- verification targets
