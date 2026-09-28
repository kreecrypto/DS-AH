# Accessibility Knowledge

Accessibility is a requirement across Strategy, Scope, Structure, Skeleton and Surface.

## Core areas
- Perceivable: text alternatives, adaptable content, sufficient visual differentiation.
- Operable: keyboard access, focus visibility/order, adequate targets, no keyboard traps.
- Understandable: clear language, predictable behavior, instructions and recoverable errors.
- Robust: meaningful semantics and compatibility with assistive technology.

## Design checks
Do not use color alone for meaning. Define focus state. Associate labels and instructions with controls. Make error identification specific. Preserve zoom/reflow. Consider reduced motion. Ensure status changes can be conveyed non-visually.

## Agent output
For each critical pattern specify keyboard behavior, focus behavior, labels/names, status/error communication, target considerations and responsive/reflow behavior.

## Verification
Design inspection is not sufficient for implementation accessibility; final QA should include implementation-level checks and relevant assistive-technology testing.
