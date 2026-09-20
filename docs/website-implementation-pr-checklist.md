# Website Implementation PR Checklist

## Scope
- [ ] Target route(s) listed
- [ ] Files in scope listed
- [ ] Out-of-scope areas listed
- [ ] Exact Figma/reference authority linked or recorded

## Design System mapping
- [ ] Core component roles mapped by componentKey
- [ ] Semantic token families recorded
- [ ] Existing website primitives reused where valid
- [ ] No same-name component identity substitution
- [ ] No unauthorized new Core primitive
- [ ] Container used before proposing a Core Card
- [ ] Deprecated Responsive/screensize token not used

## Implementation
- [ ] Existing architecture inspected before changes
- [ ] Route follows current router convention
- [ ] Shared shell/template reused
- [ ] Required states implemented
- [ ] Placeholder content is explicitly marked
- [ ] No invented API/data behavior

## Static validation
- [ ] Lint
- [ ] Typecheck
- [ ] Tests
- [ ] Build
- [ ] DS-AH registry validation if mapping/registry changed

## Runtime
- [ ] Direct route load
- [ ] Client navigation
- [ ] Refresh/deep-link
- [ ] No runtime errors
- [ ] Navigation active state
- [ ] Search/keyboard behavior where affected

## Responsive
- [ ] Desktop
- [ ] Tablet if applicable
- [ ] Mobile
- [ ] Overflow/wrapping checked
- [ ] Touch targets checked

## Accessibility
- [ ] Landmarks/headings
- [ ] Accessible names/labels
- [ ] Keyboard
- [ ] Visible focus
- [ ] Dialog focus when applicable
- [ ] Contrast
- [ ] Icon labels

## Visual / regression
- [ ] Reference/result captures at matched viewport when applicable
- [ ] Shell/grid/hierarchy compared
- [ ] Typography/spacing/state/surface compared
- [ ] Preserved regions show no unintended drift

## Evidence
- [ ] Changed routes
- [ ] Changed files
- [ ] Figma nodes/componentKeys
- [ ] Token groups
- [ ] Validation results
- [ ] Runtime evidence
- [ ] Responsive evidence
- [ ] Accessibility evidence
- [ ] Visual evidence
- [ ] Open gaps
- [ ] Final status PASS / FAIL / BLOCKED
