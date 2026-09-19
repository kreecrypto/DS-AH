# Policy — Source Priority v2.4

## Principle

Source priority is **lane-specific**, not one global ordering.

A source can own visual composition without owning component identity; another source can own tokens/components without owning layout.

## Visual Authority priority

1. Exact current-task user visual reference
2. Exact current-task user Figma reference
3. Explicit current-task user named approved reference
4. Approved/current Product Master
5. Approved Domain Pattern
6. Existing target for preservation only

When the user says “เหมือน Ref นี้”, “ตามรูปนี้”, “ใช้แบบนี้”, “match this reference”, or equivalent and the exact current-task reference is available, that reference becomes the Primary Visual Authority.

If the user asks for a prior reference and it cannot be recovered with evidence, use BLOCKED_REFERENCE_MISSING. **Do not fall back to a Product Master.**

## System Authority priority

1. Core Design System
2. Approved Domain Component Library
3. Approved Product Master usage evidence

System Authority controls:
- component identity/API
- semantic variables/tokens
- typography foundations
- icon families
- accessibility primitives

It does **not** silently override a locked visual composition.

## Content Authority priority

1. Exact user-provided content/current task requirement
2. Approved/current Product Master
3. Approved Domain Pattern
4. Verified current target

Do not invent financial/business/legal values or behavior.

## Preservation Authority

For MODIFY/FIX, the pre-change target is the baseline for unaffected areas.

Existing target content or labels must never be used to infer a different visual authority when a user visual reference is locked.

## Reference Lock

Reference-based work must record:
- Primary Visual Authority
- Build Mode
- visual/system/content/preservation lanes
- allowed supporting sources
- forbidden substitutions
- evidence

Reference Lock is immutable during the run unless the user explicitly changes the reference or new evidence invalidates it.

## Conflicts

If the locked Visual Authority conflicts with System Authority:
1. preserve the user-approved visual role where possible
2. map to approved components/tokens
3. record any material conflict
4. do not substitute a different Product Master composition
5. block/seek a scoped decision when compliance would materially change the reference

## Remote tokens

Absence of local variables does not mean the product has no tokens. Search approved remote DS sources before proposing raw values.
