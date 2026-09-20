# Figma → GitHub → Website Content Publishing Workflow v1.0

## Canonical flow
Figma Source → Inspect → Extract Evidence → Register Machine Truth → Build/Update Source Package → Normalize API/Authority → Resolve Dependencies → Documentation Enrichment → Accessibility → Visual Evidence → Coverage Gate → WEB_READY → Website Renderer → Runtime QA → Publish.

## C0 — Resolve authority
Classify content as CORE_FIGMA, DOMAIN_MASTER, GITHUB_OPERATING_CONTRACT, WEBSITE_COMPOSITION, or BLOCKED_UNRESOLVED.

## C1 — Extract
Capture page/node/componentKey/variables/styles/API/states/assets only from live evidence. No mutation is required for extraction.

## C2 — Registry
Write machine facts and governance decisions under registry/. Preserve exact source identity and legacy spellings where required for lookup.

## C3 — Source package
Build the matching package under source/. A package references registry truth; it does not become a competing token/API authority.

## C4 — Enrich documentation
Add anatomy, usage, do/don't, accessibility, examples, related content, pattern composition and route metadata only when supported by evidence or approved documentation. Unknown fields remain UNRESOLVED.

## C5 — Visual
Attach current approved visual baseline or explicit live Figma reference where visual regression applies.

## C6 — Readiness
Evaluate SOURCE_READY → DOC_READY → VISUAL_READY → WEB_READY. Blocking authority or semantic gaps prevent WEB_READY.

## C7 — Website
Website navigation is generated from source/site/routes.json. Page template is selected by packageType. Website must not inspect Figma live in normal rendering.

## C8 — QA
Run static/source validation, route/runtime, responsive, accessibility, design-system compliance and visual regression where applicable.

## C9 — Publish
Mark PUBLISHED only after WEB_READY content is rendered and applicable website gates pass.

## Hard rules
- componentKey beats display name.
- Registry values beat website hardcoding.
- Container before a new Card primitive.
- No deprecated Responsive/screensize usage.
- No inferred transition edges.
- No invented content for empty Figma pages.
- No Code Connect parity claim while BLOCKED_EXTERNAL.
