# Policy — Naming

## Canonical component naming

Use readable semantic names. Avoid implementation/frame names.

## Canonical variant axes

- `Device`
- `State`
- `Style`
- `Size`
- `Role`
- `Type`
- `Expand`
- explicit domain axes such as `Tab`, `Tier`, `Actor`

## Canonical values

Use title-style values for device:
- Desktop
- Tablet
- Mobile

Use semantic state values:
- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Empty
- Error
- Retry
- Expanded
- Collapsed
- Success
- Warning

## Forbidden for new reusable assets

- Property 1 / Property 2
- VariantN
- StageN
- StyleN where N has no semantic meaning
- frame IDs/names as values
- misspellings retained only for legacy lookup

Legacy names are documented in `registry/aliases.json`; do not rename existing Figma automatically as part of unrelated work.
