# Mandatory Agent Rules

## 1. Inspect first

Every Figma task starts with read-only inspection. Do not infer the current canvas from memory.

## 2. Reuse before creation

Search the existing Core Design System library before creating:
- components
- variables
- icons
- common interaction patterns

Then inspect approved local patterns.

## 3. Figma is read-only unless explicitly requested

A review, audit, plan, recommendation, inventory, or documentation task is not permission to modify Figma.

## 4. Preserve source authority

Allowed implementation sources:
- Core DS library
- Approved Master Screen
- Approved local component set
- Current domain pattern

Blocked by default:
- Archived
- Deprecated
- Legacy
- screenshot/PDF references
- UT explorations
- drafts with no approval signal

## 5. Never perpetuate placeholder naming

Do not create new reusable assets using:
- Property 1 / Property 2
- Variant4 / Variant6
- Stage6 / Stage7
- raw frame names
- numeric state names with no semantic meaning

## 6. Use canonical axes

Preferred reusable axes:
- `Device`
- `State`
- `Style`
- `Size`
- `Role`
- `Type`
- `Expand`
- documented domain axes

## 7. Do not detach for convenience

Do not detach a library instance just to change appearance. First determine whether:
- a variant already exists
- a property can represent the need
- a local wrapper/pattern is appropriate
- the source component genuinely requires extension

## 8. Separate system layers

Core component must not encode domain business content.  
Domain pattern may encode business structure but should reuse Core components.  
Screen composes patterns and components; a screen is not automatically reusable.

## 9. Use the existing DS foundation first

The audited Core library already exposes color, spacing, radius, and text variables. Search those before proposing new tokens.

## 10. Normalize without losing lookup ability

Legacy Figma names remain searchable through `registry/aliases.json`. New documentation and new work use canonical names.

## 11. Responsive is explicit

Do not assume desktop behavior applies to tablet/mobile. Check available device variants or approved responsive screens.

## 12. Report evidence gaps

Do not guess the meaning of ambiguous states such as `type4`, `Variant6`, `Style8`, or raw frame-name variants. Mark them `REVIEW_REQUIRED`.

## 13. QA is mandatory

Before completion, run:
- source check
- reuse check
- naming check
- responsive check
- state check
- visual structure check
- content check
- accessibility sanity check
