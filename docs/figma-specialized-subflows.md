# Figma Specialized Subflows v2.3

These are nested execution patterns inside the canonical Design Agent Flow. They never grant permission or bypass source/scope/verification/QA.

## 1. COMPONENT

### Use when
Component identity, ownership, API, property/variant design, duplication, or normalization is the core task.

### Read-only path
Inspect → Baseline → Reference → Component Identity → Ownership → API/Variant Audit → State/Responsive Audit → QA → Evidence.

### Decision outputs
REUSE / EXTEND / WRAP / CREATE_DOMAIN / CREATE_CORE / SCREEN_ONLY / REVIEW_REQUIRED.

### Mutation
If actual component change is required, reroute to MODIFY/FIX. Component intent by itself remains READ_ONLY.

## 2. PROTOTYPE

### Inputs
- source node
- destination/overlay node
- trigger
- action
- expected outcome
- back/close/dismiss behavior
- Change Scope

### Flow
Inspect current reactions → Interaction Decision → Scope → Permission → Pre-write Revalidation of source/destination → Add/update interaction → Verify reaction + destination → QA-04 → QA-05 when relevant → QA-09 → QA-10 if visual state changed.

### Block
Unresolved destination, invented business transition, or missing recovery semantics when required.

## 3. MULTI_PAGE

### Discovery
One read-only discovery step gets page IDs and targets.

### Execution
Split into page-scoped batches. Each Figma execution call switches page at most once.

Each page must have:
- target
- scope
- baseline
- operation plan
- affected IDs
- verification

### Aggregation
Cross-page work is not assumed atomic. One failed/unknown page prevents global PASS. Recovery is page-scoped, then global QA/evidence is recomputed.

## 4. RESPONSIVE

### Inputs
Supported viewports from approved evidence, content priority, responsive patterns.

### Matrix
For each viewport/state record:
- reference/target
- fixed/fluid behavior
- reflow
- stack/wrap
- collapse/hide
- scroll
- substitute pattern
- unknowns

### Flow
Baseline each viewport → Decision → Scope → execute only needed viewport changes → verify each → QA-05 → QA-07 → QA-08 → QA-09 → QA-10 per comparable viewport.

### Rule
Do not invent breakpoints or hide Primary information to make layout fit.
