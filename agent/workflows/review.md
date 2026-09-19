# Workflow — REVIEW v2

Review is read-only unless the user separately authorizes fixes.

## Flow

**Figma Inspect → UX Review → Information Architecture → Interaction Review → UX Writing Review → Responsive & Accessibility → Visual Quality → Design System Compliance → Findings + Acceptance Criteria → Evidence**

## Review dimensions

### UX Review
- task clarity
- discoverability
- efficiency
- error prevention/recovery
- consistency

### Information Architecture
- hierarchy
- grouping
- ordering
- navigation/findability
- taxonomy

### Interaction Review
- state completeness
- transitions/outcomes
- validation/recovery
- cancel/back/close
- destructive/async behavior

### UX Writing Review
- terminology
- labels/CTA
- helper/error/empty/loading/success
- truncation/wrapping

### Responsive & Accessibility
- supported viewport behavior
- focus/state distinction
- contrast sanity
- meaning beyond color/icon

### Visual Quality
- hierarchy
- composition
- spacing/alignment
- typography/color
- density/polish

### Design System Compliance
- source authority
- component reuse
- token/variable use
- pattern ownership

## Finding contract
Every finding must include:
- findingId
- Severity: High / Medium / Low
- exact node/screen/region
- Observation
- Impact
- Evidence
- Proposed solution
- Acceptance criteria
- related skill/gate
- whether a Figma write is required

Separate observed fact from hypothesis.

## Output
Return findings grouped by severity/dependency plus Evidence record.
Do not modify Figma as part of REVIEW without separate explicit write authorization.
