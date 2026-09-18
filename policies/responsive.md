# Policy — Responsive

## Canonical device model

Use:
- `Device=Desktop`
- `Device=Tablet`
- `Device=Mobile`

Do not create new axes named:
- responsive / Responsive
- .device / device
- Size when Size actually means device

## Existing-source compatibility

Legacy components may use `responsive`, `Responsive`, `.device`, `device`, or `Size` for viewport behavior. Resolve them through the registry; do not copy the inconsistency into new components.

## Behavior

Responsive variants should exist only when structure/behavior differs meaningfully. Do not create a device variant solely to change a value already handled by auto-layout/content sizing.

For every screen change, inspect supported device versions in the approved source rather than assuming all three exist.
