# Policy — Component Ownership

## Core layer

Owned by the existing remote DS library. Examples from the audit:
- button
- button icon
- input-text
- menu
- icons
- badge
- divider
- tab/chip
- checkbox
- radio
- breadcrumb

Agents should reuse these before creating local equivalents.

## Domain layer

Owned by approved feature/Master Screen patterns. Examples:
- case dashboard
- case status badge
- campaign cards
- performance dashboard sections
- compensation tables/summary
- live chat message/flow patterns
- memo drawer

## Screen layer

Screen-specific composition and content. Do not promote automatically.

## Ownership test

If a component can be named without any feature/business noun and is reused cross-domain, it is likely Core.

If it encodes business entities, statuses, calculations, or feature-specific hierarchy, it is likely Domain.

If it only arranges a single page flow, it is likely Screen/Template.
