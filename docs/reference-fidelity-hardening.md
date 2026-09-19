# Reference Fidelity Hardening v2.4

## Architecture

Chat = Agent  
GitHub = Brain / Knowledge  
Figma = Workspace

## Failure class this hardening prevents

A target can contain product/domain clues that point to a valid Product Master while the user has supplied a different visual reference. Product/domain clues must not silently replace the user’s exact visual reference.

## Authority lanes

### Visual Authority
Controls composition, grid, hierarchy, density, card anatomy, visual rhythm, chart geometry and spatial relationships.

### System Authority
Controls component identity, variables/tokens, typography foundations, icon families and component APIs.

### Content Authority
Controls verified product/domain copy, values and business behavior.

### Preservation Authority
Controls what must remain unchanged in an existing target.

A single source does not automatically own every lane.

## Current-task user reference rule

When the user says “เหมือน Ref นี้”, “ตามรูปนี้”, “ใช้แบบนี้”, “match this reference”, or equivalent and a current-task visual/Figma reference is available:

1. classify it as EXACT_CURRENT_USER_VISUAL_REFERENCE or EXACT_CURRENT_USER_FIGMA_REFERENCE
2. make it Primary Visual Authority
3. establish Reference Lock
4. use Product Master only as allowed supporting source
5. use Design System only for system authority
6. block if the exact requested prior reference cannot be recovered

Never infer a replacement visual authority from target content.

## Reference Lock

Reference Lock records:
- primary visual authority
- Build Mode
- visual/system/content/preservation authority lanes
- allowed supporting sources
- forbidden substitutions
- lock evidence
- unresolved gaps

The lock must exist before Visual Grammar Extraction and Design Decision for reference-based write work.

## Visual Grammar Extraction

Extract before design:
- canvas/aspect ratio/background
- grid/columns/rows/gaps/margins
- hierarchy
- repeated pattern count/anatomy/order
- typography roles
- surface/radius/stroke/elevation
- semantic color roles
- iconography
- chart grammar
- states
- responsive behavior
- fidelity anchors
- unknowns

Unknown material geometry is not silently invented in REPRODUCE.

## Design System Mapping

Map each visual role to approved component/token/style assets while preserving the locked visual role.

Design System compliance may change implementation identity, but may not silently change:
- grid
- card count/order
- composition
- visual hierarchy
- density
- chart geometry

If the DS cannot express the locked visual role without a material visual change, record a conflict instead of substituting a different Master composition.

## REPRODUCE skeleton checkpoint

Build skeleton first:
1. canvas
2. major regions
3. grid
4. repeated-card bounds
5. major spacing
6. hierarchy blocks

Then compare side-by-side with the locked reference.

P0/P1 mismatch → Fix Skeleton.  
Only PASS proceeds to detail batches.

## QA split

### QA-01A Reference Authority
Checks:
- correct locked reference
- correct authority lane assignment
- no forbidden substitution
- Build Mode consistent with request

Wrong source/master is P0.

### QA-01B Visual Fidelity
Checks result against Visual Grammar:
- frame ratio
- grid
- anatomy/order
- hierarchy
- spacing/density
- typography roles
- surfaces
- chart/badge geometry
- states
- responsive fidelity

Missing comparable evidence is BLOCKED, not PASS.

## Visual Regression

For REPRODUCE, side-by-side evidence is mandatory at:
- skeleton checkpoint
- final result

Metadata-only verification cannot produce Visual Fidelity PASS.
