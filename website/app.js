const FIGMA_URL = "https://www.figma.com/design/5ZFIRJWtmEIvuq95Rhyo6I/-DS--Agency-Portal---Design-System--Copy-?node-id=0-1";

const foundations = [
  ["accessibility", "Accessibility", "Inclusive interaction, focus, contrast, and motion."],
  ["borders-radius", "Borders & radius", "Shape roles for controls, surfaces, and overlays."],
  ["color", "Color", "Semantic color roles from the audited color collection."],
  ["density", "Display density", "Comfortable information density for AdvisorHub work."],
  ["shadows", "Shadows", "Elevation and separation without visual noise."],
  ["spacing-sizing", "Spacing & sizing", "A consistent rhythm based on 28 spacing variables."],
  ["typography", "Typography", "DB Helvethaica X scales for desktop and mobile."],
  ["responsive", "Responsive", "Layouts and type modes across viewport sizes."],
];

const components = [
  ["avatar", "Avatar", "Identity", "Represents a person, team, or organization."],
  ["button", "Button", "Actions", "Starts an action or advances a workflow."],
  ["badge", "Badge", "Feedback", "Shows a concise status or classification."],
  ["background", "Background", "Layout", "Creates semantic page and section surfaces."],
  ["bottom-sheet", "Bottom sheet", "Overlay", "Presents contextual actions on compact screens."],
  ["breadcrumb", "Breadcrumb", "Navigation", "Shows hierarchy and provides a route back."],
  ["container", "Container", "Layout", "Constrains and groups related content."],
  ["checkbox", "Check box", "Forms", "Selects one or more independent options."],
  ["date-picker", "Date picker", "Forms", "Selects a single date or date range."],
  ["divider", "Divider", "Layout", "Separates related regions with low emphasis."],
  ["input", "Input", "Forms", "Collects a short, single-line value."],
  ["evaluation", "Evaluation", "Feedback", "Captures a score or qualitative assessment."],
  ["list", "List", "Data display", "Organizes repeated items and their actions."],
  ["tab", "Tab", "Navigation", "Switches among related content views."],
  ["toggle", "Toggle", "Forms", "Changes a setting immediately between two states."],
  ["tooltip", "Tooltips", "Feedback", "Adds brief supporting information on demand."],
  ["radio", "Radio", "Forms", "Selects exactly one option from a set."],
  ["navbar", "Navbar", "Navigation", "Provides persistent product-level navigation."],
  ["scrollbar", "Scrollbar", "Navigation", "Communicates scroll position in constrained content."],
];

const hooks = [
  ["hook-index", "Styling hook index", "Find the semantic interface for a design decision."],
  ["global-hooks", "Global styling hooks", "System-wide roles shared by every component."],
  ["component-hooks", "Component-level hooks", "Controlled component-specific customization."],
  ["utility-classes", "Utility classes", "Small composable layout and alignment helpers."],
  ["themes", "Themes", "Apply an approved visual context without forking components."],
  ["color-modes", "Color modes", "Prepare semantic roles for alternate environments."],
];

const patterns = [
  ["search-filter", "Search & filter", "Find and refine large information sets."],
  ["list-detail", "List to detail", "Move from a result set into focused context."],
  ["form-workflow", "Form workflow", "Complete validated, multi-step business input."],
  ["dashboard", "Dashboard", "Scan performance, priorities, and next actions."],
  ["status-feedback", "Status & feedback", "Communicate progress and outcomes consistently."],
  ["agentic", "Agentic workflow", "Make AI-supported work transparent and controllable."],
];

const navGroups = [
  ["Get started", [["overview", "Overview"], ["get-started", "Get started"], ["for-designers", "For designers"], ["for-developers", "For developers"], ["resources", "Resources"], ["glossary", "Glossary"], ["faqs", "FAQs"]]],
  ["Assets", [["icons", "Icons"], ["icon-usage", "Icon usage"], ["axa-badge", "AXA badge"]]],
  ["AI and AH DS", [["agent", "Design Control Agent"], ["agent-workflow", "Agent workflow"], ["skills", "Skills"], ["interaction-models", "Interaction models"]]],
  ["Visual language", foundations.map(([id, label]) => [id, label])],
  ["Styling API", hooks.map(([id, label]) => [id, label])],
  ["Components", [["components", "Overview"], ...components.map(([id, label]) => [`component/${id}`, label])]],
  ["Patterns", [["patterns", "Overview"], ...patterns.map(([id, label]) => [`pattern/${id}`, label])]],
  ["Tools", [["tools", "Overview"], ["figma", "Figma mapping"], ["qa", "QA & governance"], ["registry", "Registry"], ["release-notes", "Release notes"]]],
];

const datasets = {};
const dataFiles = {
  foundations: "registry/core-ds-foundations.json",
  components: "registry/core-ds-components.json",
  patterns: "registry/domain-patterns.json",
  sources: "registry/figma-sources.json",
  runtime: "agent/runtime.json",
  qa: "agent/gates/quality-gates.json",
};

async function loadData() {
  await Promise.all(Object.entries(dataFiles).map(async ([key, path]) => {
    try { datasets[key] = await fetch(`./data/${path}`).then((response) => response.json()); }
    catch { datasets[key] = {}; }
  }));
}

const escapeHtml = (value) => String(value ?? "").replace(/[&<>\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
const route = () => decodeURIComponent((location.hash.match(/^#\/(.+)$/) || [])[1] || "overview").split("?")[0];
const routeLabel = (id) => navGroups.flatMap(([, items]) => items).find(([path]) => path === id)?.[1] || "AH Design System";
const icon = (text) => `<span class="icon-tile" aria-hidden="true">${text}</span>`;
const card = (href, symbol, title, copy, meta = "View guidance →") => `<a class="doc-card" href="#/${href}">${icon(symbol)}<h3>${title}</h3><p>${copy}</p><span class="meta">${meta}</span></a>`;

function pageHeader(section, title, lede, badge = "") {
  return `<div class="breadcrumbs"><a href="#/overview">AH Design System</a><span>/</span><span>${section}</span></div>
    <div class="page-heading-row"><div><div class="eyebrow">${section}</div><h1>${title}</h1></div>${badge ? `<span class="page-badge">${badge}</span>` : ""}</div>
    <p class="lede">${lede}</p>`;
}

function pageToc(items) {
  return `<aside class="page-toc" aria-label="On this page"><strong>On this page</strong>${items.map(([id, label]) => `<a href="#/${route()}?section=${id}">${label}</a>`).join("")}</aside>`;
}

function pageFooter(next = ["overview", "Overview"]) {
  return `<section class="page-feedback" aria-label="Page feedback"><div><strong>Was this page helpful?</strong><span>Help us improve AH Design System.</span></div><div><button type="button">Yes</button><button type="button">No</button></div></section>
    <a class="next-page" href="#/${next[0]}"><span>Next page</span><strong>${next[1]} <span aria-hidden="true">→</span></strong></a>
    <footer class="doc-footer"><span>AH Design System · AdvisorHub</span><span>GitHub source · Figma audited · v2.4</span></footer>`;
}

function shell(body, toc, next) {
  return `<article class="docs-article"><div class="article-main">${body}${pageFooter(next)}</div>${pageToc(toc)}</article>`;
}

function overviewPage() {
  const body = `${pageHeader("Get started", "Build consistent AdvisorHub experiences", "A shared system for designers, developers, and agents—implemented from the audited Agency Portal Design System.", "Version 2.4")}
    <div class="release-line"><span>Updated 19 September 2026</span><a href="#/release-notes">Read release notes →</a></div>
    <section id="start"><h2>Start with your role</h2><div class="feature-grid">
      ${card("for-designers", "D", "Design", "Use canonical foundations, components, and Figma sources.")}
      ${card("for-developers", "{ }", "Develop", "Build against stable semantic hooks and documented behavior.")}
      ${card("agent", "AI", "Work with the agent", "Inspect, resolve, reuse, and verify with controlled authority.")}
    </div></section>
    <section id="system"><h2>Explore the system</h2><div class="category-grid">
      ${card("color", "◐", "Visual language", "Color, type, space, shape, responsive behavior, and accessibility.")}
      ${card("hook-index", "#", "Styling API", "Semantic interfaces that connect Figma decisions to code.")}
      ${card("components", "▦", "Components", "Nineteen audited, reusable UI families from the Core DS.")}
      ${card("patterns", "⌘", "Patterns", "Compositions for common AdvisorHub tasks and workflows.")}
      ${card("tools", "⌁", "Tools", "Figma mapping, registry evidence, QA gates, and release history.")}
      ${card("resources", "↗", "Resources", "Source files, implementation guidance, and team references.")}
    </div></section>
    <section id="architecture"><h2>Source-of-truth architecture</h2><p class="body-copy">Each system has one job. Chat controls decisions, GitHub stores durable knowledge, and Figma provides inspected visual authority.</p><div class="architecture-strip"><div><b>Chat</b><span>Decide & govern</span></div><i>→</i><div><b>GitHub</b><span>Store & version</span></div><i>→</i><div><b>Figma</b><span>Inspect & design</span></div></div></section>
    <section id="release"><h2>What’s in this release</h2><div class="rule-grid"><div><strong>352</strong><span>Variables across five collections</span></div><div><strong>19</strong><span>Audited component families</span></div><div><strong>10</strong><span>Evidence-based QA gates</span></div></div></section>`;
  return shell(body, [["start", "Start with your role"], ["system", "Explore the system"], ["architecture", "Architecture"], ["release", "Release"]], ["get-started", "Get started"]);
}

const guideContent = {
  "get-started": ["Get started", "Use the system confidently from the first decision to verified delivery.", ["Confirm the approved source", "Choose the correct layer", "Reuse before creating", "Verify with evidence"]],
  "for-designers": ["For designers", "Resolve approved Figma assets before composing product experiences.", ["Open the canonical library", "Use semantic variables", "Document exceptions", "Review states and responsive behavior"]],
  "for-developers": ["For developers", "Translate the system through stable roles instead of copying raw visual values.", ["Consume semantic hooks", "Preserve component behavior", "Cover keyboard and screen reader use", "Validate against audited Figma"]],
  resources: ["Resources", "The source files and references that keep design and implementation aligned.", ["Agency Portal Figma DS", "GitHub registry", "Component documentation", "QA evidence"]],
  glossary: ["Glossary", "A common language for layers, assets, authority, and delivery.", ["Foundation — a primitive visual decision", "Core component — a cross-domain UI asset", "Pattern — a reusable business structure", "Template — a repeatable page composition"]],
  faqs: ["Frequently asked questions", "Answers to common questions about ownership, reuse, and exceptions.", ["Which Figma file is canonical?", "When may a new component be created?", "Where do implementation tokens live?", "What evidence is required to pass QA?"]],
  icons: ["Icons", "A consistent visual vocabulary for actions, objects, and status.", ["Action icons", "Navigation icons", "Object icons", "Status icons"]],
  "icon-usage": ["Icon usage", "Use icons to reinforce meaning—never as unexplained decoration.", ["Pair unfamiliar icons with labels", "Use the semantic color role", "Keep a consistent optical size", "Provide accessible names"]],
  "axa-badge": ["AXA badge", "Use the approved brand badge only in governed identity contexts.", ["Preserve clear space", "Never redraw the mark", "Use approved contrast", "Reference the source asset"]],
  "agent-workflow": ["Agent workflow", "A controlled path from intent to inspected and verified output.", ["Route intent", "Inspect live sources", "Lock reference", "Execute and verify"]],
  skills: ["Skills", "Focused operating instructions make repeatable design-system work safer.", ["Inspect a Figma source", "Map a component", "Verify fidelity", "Publish evidence"]],
  "interaction-models": ["Interaction models", "Make AI-supported experiences understandable, interruptible, and reversible.", ["Explain the proposed action", "Ask only when a decision is material", "Show progress and evidence", "Keep the user in control"]],
};

function guidePage(id) {
  const [title, lede, items] = guideContent[id];
  const body = `${pageHeader(navGroups.find(([, links]) => links.some(([path]) => path === id))?.[0] || "Guide", title, lede)}
    <section id="principle"><h2>Core principle</h2><div class="callout"><strong>Inspect → resolve → reuse → verify</strong><p>Raw screen values are evidence, not canonical foundations. Resolve the approved system asset before creating something new.</p></div></section>
    <section id="workflow"><h2>Recommended workflow</h2><ol class="steps">${items.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${item}</strong><p>Record the decision and keep the implementation traceable to its approved source.</p></div></li>`).join("")}</ol></section>
    <section id="resources"><h2>Related resources</h2><div class="link-list"><a href="${FIGMA_URL}" target="_blank" rel="noreferrer">Open Agency Portal Design System <span>↗</span></a><a href="#/qa">Review QA & governance <span>→</span></a><a href="#/components">Browse components <span>→</span></a></div></section>`;
  return shell(body, [["principle", "Core principle"], ["workflow", "Workflow"], ["resources", "Resources"]], ["color", "Visual language"]);
}

function visualPage(id) {
  const item = foundations.find(([path]) => path === id);
  const [,, description] = item;
  let specimen = `<div class="generic-specimen"><span></span><span></span><span></span><span></span></div>`;
  if (id === "color") specimen = `<div class="token-swatches">${[["#00008F", "Primary"], ["#0000F7", "Hover"], ["#0000D2", "Active"], ["#1A1D21", "Text"], ["#606776", "Muted"], ["#E3000A", "Error"]].map(([hex, name]) => `<div><i style="background:${hex}"></i><strong>${name}</strong><code>${hex}</code></div>`).join("")}</div>`;
  if (id === "typography") specimen = `<div class="type-spec"><span>Display / 48</span><strong>ออกแบบประสบการณ์ที่ชัดเจน</strong><p>Body / 20 — DB Helvethaica X keeps Thai and English content comfortable to scan.</p></div>`;
  const body = `${pageHeader("Visual language", item[1], description, "Foundation")}
    <section id="overview"><h2>Overview</h2><p class="body-copy">This foundation is defined once, named by purpose, and consumed through semantic roles. Components should not bind directly to incidental values.</p>${specimen}</section>
    <section id="guidelines"><h2>Guidelines</h2><div class="do-dont"><div><h3>Do</h3><ul><li>Use the approved semantic role.</li><li>Test across states and viewports.</li><li>Keep decisions traceable to Figma.</li></ul></div><div><h3>Don’t</h3><ul><li>Copy values from a single screen.</li><li>Create near-duplicate local styles.</li><li>Use visual differences without meaning.</li></ul></div></div></section>
    <section id="implementation"><h2>Implementation</h2><pre class="code-block"><code>/* semantic role, not a raw screen value */
color: var(--ah-${id}-primary);
gap: var(--ah-spacing-md);</code></pre></section>`;
  return shell(body, [["overview", "Overview"], ["guidelines", "Guidelines"], ["implementation", "Implementation"]], ["hook-index", "Styling API"]);
}

function stylingPage(id) {
  const item = hooks.find(([path]) => path === id);
  const body = `${pageHeader("Styling API", item[1], item[2], "API")}
    <section id="overview"><h2>Semantic interface</h2><p class="body-copy">Hooks protect components from raw values and make approved changes predictable across products.</p><pre class="code-block"><code>:root {
  --ah-bg-interaction-primary-default: #00008f;
  --ah-bg-interaction-primary-hover: #0000f7;
  --ah-text-primary: #1a1d21;
  --ah-stroke-strong: #cccccc;
  --ah-radius-button-default: 64px;
  --ah-radius-form-input: 8px;
}</code></pre></section>
    <section id="rules"><h2>Usage rules</h2><div class="rule-grid"><div><strong>1</strong><span>Prefer semantic names</span></div><div><strong>2</strong><span>Keep component contracts stable</span></div><div><strong>3</strong><span>Review every new public hook</span></div></div></section>
    <section id="relationship"><h2>System relationship</h2><div class="architecture-strip"><div><b>Foundation</b><span>Defines intent</span></div><i>→</i><div><b>Hook</b><span>Exposes role</span></div><i>→</i><div><b>Component</b><span>Consumes API</span></div></div></section>`;
  return shell(body, [["overview", "Semantic interface"], ["rules", "Usage rules"], ["relationship", "Relationship"]], ["components", "Components"]);
}

function componentsIndex() {
  const body = `${pageHeader("Components", "Components", "Reusable building blocks resolved from the audited Agency Portal Core Design System.", "19 families")}
    <section id="catalog"><div class="inventory-toolbar"><div class="chip-row"><button class="chip selected" data-category="All">All</button>${[...new Set(components.map(([, , category]) => category))].map((name) => `<button class="chip" data-category="${name}">${name}</button>`).join("")}</div><input id="inventoryFilter" class="filter-input" placeholder="Filter components" aria-label="Filter components"></div>
    <div class="component-catalog" id="componentCatalog">${components.map(([id, name, category, copy]) => `<a class="component-card" data-category="${category}" href="#/component/${id}"><span class="component-preview">${componentPreview(id)}</span><span><b>${name}</b><small>${category}</small><p>${copy}</p></span><i>→</i></a>`).join("")}</div></section>`;
  return shell(body, [["catalog", "Component catalog"]], ["component/avatar", "Avatar"]);
}

function componentPreview(id) {
  if (id === "button") return `<button class="ah-button" tabindex="-1">Action</button>`;
  if (id === "input") return `<span class="mini-input">Value</span>`;
  if (["checkbox", "radio", "toggle"].includes(id)) return `<span class="mini-control ${id}"></span>`;
  if (id === "badge") return `<span class="tag">Status</span>`;
  return `<span class="preview-glyph">${id.slice(0, 2).toUpperCase()}</span>`;
}

function componentPage(id) {
  const item = components.find(([path]) => path === id) || components[0];
  const [, name, category, description] = item;
  const demo = id === "button" ? `<div class="demo-stage"><button class="ah-button">Primary action</button><button class="ah-button secondary">Secondary</button><button class="ah-button ghost">Ghost</button><button class="ah-button" disabled>Disabled</button></div>` : id === "input" ? `<div class="demo-stage input-spec"><label>Policy number <span>Optional</span><input class="ah-input" value="TH-2026-0184"><small>Use the number shown on the policy document.</small></label></div>` : `<div class="demo-stage generic-component-demo">${componentPreview(id)}<span>${name} default presentation</span></div>`;
  const body = `${pageHeader("Components", name, description, category)}
    <nav class="section-tabs" aria-label="Component sections"><a href="#/component/${id}?section=overview">Overview</a><a href="#/component/${id}?section=anatomy">Anatomy</a><a href="#/component/${id}?section=variants">Variants</a><a href="#/component/${id}?section=usage">Usage</a><a href="#/component/${id}?section=accessibility">Accessibility</a><a href="#/component/${id}?section=code">Code</a></nav>
    <section id="overview"><h2>Overview</h2><p class="body-copy">${description} Use the canonical component and preserve its documented states before extending it.</p>${demo}</section>
    <section id="anatomy"><h2>Anatomy</h2><ol class="anatomy-list"><li><b>1</b><span><strong>Container</strong> defines shape, state, and interaction boundary.</span></li><li><b>2</b><span><strong>Content</strong> communicates the action or value clearly.</span></li><li><b>3</b><span><strong>Support</strong> adds an icon, hint, status, or validation only when needed.</span></li></ol></section>
    <section id="variants"><h2>Variants and states</h2><div class="table-wrap"><table><thead><tr><th>Variant</th><th>Use when</th><th>Required states</th></tr></thead><tbody><tr><td>Primary</td><td>The action has highest priority.</td><td>Default, hover, focus, active, disabled</td></tr><tr><td>Secondary</td><td>An alternative action remains available.</td><td>Default, hover, focus, active, disabled</td></tr><tr><td>Contextual</td><td>The control supports nearby content.</td><td>Default, focus, disabled</td></tr></tbody></table></div></section>
    <section id="usage"><h2>Usage</h2><div class="do-dont"><div><h3>Do</h3><ul><li>Use clear, task-oriented language.</li><li>Keep priority consistent within the view.</li><li>Use the component’s existing states.</li></ul></div><div><h3>Don’t</h3><ul><li>Create a local look-alike.</li><li>Use color as the only state signal.</li><li>Remove focus indication.</li></ul></div></div></section>
    <section id="accessibility"><h2>Accessibility</h2><ul class="check-list"><li>Keyboard operation follows the native interaction model.</li><li>Focus is visible against every supported surface.</li><li>Name, role, value, and state are programmatically available.</li><li>Touch targets and text contrast meet the approved baseline.</li></ul></section>
    <section id="code"><h2>Code</h2><pre class="code-block"><code>&lt;${id === "button" ? "button" : "div"} class="ah-${id}"&gt;
  ${name}
&lt;/${id === "button" ? "button" : "div"}&gt;</code></pre><a class="source-link" href="${FIGMA_URL}" target="_blank" rel="noreferrer">Open the audited Figma source ↗</a></section>`;
  const index = components.findIndex(([path]) => path === id);
  const next = components[(index + 1) % components.length];
  return shell(body, [["overview", "Overview"], ["anatomy", "Anatomy"], ["variants", "Variants"], ["usage", "Usage"], ["accessibility", "Accessibility"], ["code", "Code"]], [`component/${next[0]}`, next[1]]);
}

function patternsIndex() {
  const body = `${pageHeader("Patterns", "Patterns", "Reusable structures for recurring AdvisorHub tasks. Patterns compose Core components without redefining them.")}
    <section id="catalog"><div class="category-grid">${patterns.map(([id, name, copy], index) => card(`pattern/${id}`, String(index + 1).padStart(2, "0"), name, copy, "View pattern →")).join("")}</div></section>
    <section id="principle"><h2>Pattern principle</h2><div class="callout"><strong>Business-aware, system-aligned</strong><p>A pattern owns structure and workflow meaning. Components continue to own their appearance, states, and accessible behavior.</p></div></section>`;
  return shell(body, [["catalog", "Pattern catalog"], ["principle", "Principle"]], ["pattern/search-filter", "Search & filter"]);
}

function patternPage(id) {
  const item = patterns.find(([path]) => path === id) || patterns[0];
  const [, name, description] = item;
  const body = `${pageHeader("Patterns", name, description, "Pattern")}
    <section id="structure"><h2>Structure</h2><div class="flow-row"><div><b>1</b><span>Orient</span></div><i>→</i><div><b>2</b><span>Act</span></div><i>→</i><div><b>3</b><span>Confirm</span></div></div></section>
    <section id="guidance"><h2>Guidance</h2><p class="body-copy">Keep the user’s context visible, make the primary next action obvious, and preserve entered information when the state changes.</p><div class="do-dont"><div><h3>Use this pattern when</h3><ul><li>The task repeats across more than one feature.</li><li>The same sequence and semantics apply.</li><li>Core components cover the required controls.</li></ul></div><div><h3>Create a local flow when</h3><ul><li>The business rule is unique to one feature.</li><li>Reuse would obscure rather than clarify.</li><li>The exception is documented and reviewed.</li></ul></div></div></section>
    <section id="qa"><h2>Verification</h2><ul class="check-list"><li>Reference authority is recorded.</li><li>Responsive and empty states are covered.</li><li>Loading, error, success, and recovery are explicit.</li><li>Keyboard order follows the visual workflow.</li></ul></section>`;
  return shell(body, [["structure", "Structure"], ["guidance", "Guidance"], ["qa", "Verification"]], ["tools", "Tools"]);
}

function agentPage() {
  const body = `${pageHeader("AI and AH DS", "Design Control Agent", "Chat makes controlled decisions, GitHub stores knowledge, and Figma remains the inspected execution workspace.", "v2.4")}
    <section id="model"><h2>Operating model</h2><div class="architecture-strip"><div><b>Chat</b><span>Intent & authority</span></div><i>→</i><div><b>GitHub</b><span>Rules & registry</span></div><i>→</i><div><b>Figma</b><span>Visual evidence</span></div></div></section>
    <section id="sequence"><h2>Execution sequence</h2><ol class="steps">${["Route intent", "Inspect live Figma", "Lock reference", "Extract visual grammar", "Map system roles", "Execute mutation", "Verify result", "Complete with evidence"].map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${item}</strong><p>Complete the stage before authority passes to the next one.</p></div></li>`).join("")}</ol></section>
    <section id="guardrails"><h2>Guardrails</h2><ul class="check-list"><li>Default mode is read-only.</li><li>Write authority must be explicit and scoped.</li><li>A visually polished but incorrect result cannot pass.</li><li>Every completion includes traceable evidence.</li></ul></section>`;
  return shell(body, [["model", "Operating model"], ["sequence", "Sequence"], ["guardrails", "Guardrails"]], ["agent-workflow", "Agent workflow"]);
}

function toolsPage(id) {
  const titles = { tools: ["Tools", "Use source mapping, registries, and QA evidence to keep the system healthy."], figma: ["Figma mapping", "Trace every documented concept to approved Figma files, libraries, and nodes."], qa: ["QA & governance", "Separate authority, fidelity, compliance, and regression checks."], registry: ["Registry", "Machine-readable records connect source assets to implementation decisions."], "release-notes": ["Release notes", "A concise history of meaningful AH Design System changes."] };
  const [title, lede] = titles[id];
  const body = `${pageHeader("Tools", title, lede)}
    <section id="overview"><h2>System toolchain</h2><div class="category-grid">${card("figma", "F", "Figma mapping", "Canonical file, library, and node references.")}${card("registry", "R", "Registry", "Structured component, foundation, and source records.")}${card("qa", "✓", "QA & governance", "Ten evidence-driven quality gates.")}${card("release-notes", "N", "Release notes", "Versioned changes and migration context.")}</div></section>
    <section id="evidence"><h2>Evidence standard</h2><div class="callout"><strong>No pass without evidence</strong><p>Each applicable gate resolves with inspection, comparison, or verified output. Assumptions are never silently promoted to system truth.</p></div><div class="table-wrap"><table><thead><tr><th>Layer</th><th>Authority</th><th>Evidence</th></tr></thead><tbody><tr><td>Foundation</td><td>Core Figma variables</td><td>Collection and mode mapping</td></tr><tr><td>Component</td><td>Core component set</td><td>Variants, states, and anatomy</td></tr><tr><td>Pattern</td><td>Approved domain registry</td><td>Workflow and ownership record</td></tr><tr><td>Implementation</td><td>GitHub source</td><td>Build, accessibility, and visual QA</td></tr></tbody></table></div></section>`;
  return shell(body, [["overview", "Toolchain"], ["evidence", "Evidence standard"]], ["overview", "Back to overview"]);
}

function renderPage(id) {
  if (id === "overview") return overviewPage();
  if (guideContent[id]) return guidePage(id);
  if (foundations.some(([path]) => path === id)) return visualPage(id);
  if (hooks.some(([path]) => path === id)) return stylingPage(id);
  if (id === "components") return componentsIndex();
  if (id.startsWith("component/")) return componentPage(id.split("/")[1]);
  if (id === "patterns") return patternsIndex();
  if (id.startsWith("pattern/")) return patternPage(id.split("/")[1]);
  if (id === "agent") return agentPage();
  if (["tools", "figma", "qa", "registry", "release-notes"].includes(id)) return toolsPage(id);
  return overviewPage();
}

function renderNav() {
  document.querySelector("#primaryNav").innerHTML = navGroups.map(([group, items], index) => `<details class="nav-group" ${index < 2 ? "open" : ""}><summary>${group}<span>⌄</span></summary><div>${items.map(([path, label]) => `<a class="nav-item" data-route="${path}" href="#/${path}">${label}</a>`).join("")}</div></details>`).join("");
}

function bindPage() {
  const input = document.querySelector("#inventoryFilter");
  const filter = () => {
    const query = (input?.value || "").toLowerCase();
    const category = document.querySelector(".chip.selected")?.dataset.category || "All";
    document.querySelectorAll(".component-card").forEach((item) => { item.hidden = !(item.textContent.toLowerCase().includes(query) && (category === "All" || item.dataset.category === category)); });
  };
  input?.addEventListener("input", filter);
  document.querySelectorAll(".chip[data-category]").forEach((chip) => chip.addEventListener("click", () => {
    document.querySelectorAll(".chip[data-category]").forEach((item) => item.classList.remove("selected"));
    chip.classList.add("selected"); filter();
  }));
}

function render() {
  const id = route();
  document.querySelectorAll(".nav-item").forEach((item) => {
    const active = item.dataset.route === id;
    item.classList.toggle("active", active);
    if (active) item.closest("details").open = true;
  });
  document.querySelector("#main").innerHTML = renderPage(id);
  document.title = `${routeLabel(id)} · AH Design System`;
  document.querySelector("#sidebar").classList.remove("open");
  document.querySelector("#mobileMenu").setAttribute("aria-expanded", "false");
  const section = new URLSearchParams(location.hash.split("?")[1] || "").get("section");
  if (section) requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  else window.scrollTo(0, 0);
  bindPage();
}

const searchEntries = navGroups.flatMap(([group, items]) => items.map(([path, label]) => ({ path, label, group })));
function renderSearch(query = "") {
  const matches = searchEntries.filter((item) => `${item.label} ${item.group}`.toLowerCase().includes(query.toLowerCase()));
  document.querySelector("#searchResults").innerHTML = matches.map((item) => `<a class="search-result" href="#/${item.path}"><strong>${item.label}</strong><span>${item.group}</span></a>`).join("") || `<div class="empty">No results. Try a component, foundation, or tool.</div>`;
  document.querySelectorAll(".search-result").forEach((item) => item.addEventListener("click", () => document.querySelector("#searchDialog").close()));
}

function showSearch() {
  const dialog = document.querySelector("#searchDialog");
  dialog.showModal(); renderSearch();
  const input = document.querySelector("#searchInput"); input.value = ""; setTimeout(() => input.focus(), 20);
}

renderNav();
await loadData();
render();
window.addEventListener("hashchange", render);
document.querySelector("#searchTrigger").addEventListener("click", showSearch);
document.querySelector("#searchInput").addEventListener("input", (event) => renderSearch(event.target.value));
document.querySelector("#mobileMenu").addEventListener("click", (event) => { const sidebar = document.querySelector("#sidebar"); sidebar.classList.toggle("open"); event.currentTarget.setAttribute("aria-expanded", String(sidebar.classList.contains("open"))); });
window.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); showSearch(); } });
