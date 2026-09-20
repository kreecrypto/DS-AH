export const FIGMA_URL = "https://www.figma.com/design/5ZFIRJWtmEIvuq95Rhyo6I/-DS--Agency-Portal---Design-System--Copy-?node-id=0-1";

export const foundations = [
  ["accessibility", "Accessibility", "Inclusive interaction, focus, contrast, and motion."],
  ["borders-radius", "Borders & radius", "Shape roles for controls, surfaces, and overlays."],
  ["color", "Color", "Semantic color roles from the audited color collection."],
  ["density", "Display density", "Comfortable information density for AdvisorHub work."],
  ["shadows", "Shadows", "Elevation and separation without visual noise."],
  ["spacing-sizing", "Spacing & sizing", "A consistent rhythm based on 28 spacing variables."],
  ["typography", "Typography", "DB Helvethaica X scales for desktop and mobile."],
  ["responsive", "Responsive", "Layouts and type modes across viewport sizes."],
];

export const components = [
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

export const hooks = [
  ["hook-index", "Styling hook index", "Find the semantic interface for a design decision."],
  ["global-hooks", "Global styling hooks", "System-wide roles shared by every component."],
  ["component-hooks", "Component-level hooks", "Controlled component-specific customization."],
  ["utility-classes", "Utility classes", "Small composable layout and alignment helpers."],
  ["themes", "Themes", "Apply an approved visual context without forking components."],
  ["color-modes", "Color modes", "Prepare semantic roles for alternate environments."],
];

export const patterns = [
  ["search-filter", "Search & filter", "Find and refine large information sets."],
  ["list-detail", "List to detail", "Move from a result set into focused context."],
  ["form-workflow", "Form workflow", "Complete validated, multi-step business input."],
  ["dashboard", "Dashboard", "Scan performance, priorities, and next actions."],
  ["status-feedback", "Status & feedback", "Communicate progress and outcomes consistently."],
  ["agentic", "Agentic workflow", "Make AI-supported work transparent and controllable."],
];

export const navGroups = [
  ["Get started", [["overview", "Overview"], ["get-started", "Get started"], ["for-designers", "For designers"], ["for-developers", "For developers"], ["resources", "Resources"], ["glossary", "Glossary"], ["faqs", "FAQs"]]],
  ["Assets", [["icons", "Icons"], ["icon-usage", "Icon usage"], ["axa-badge", "AXA badge"]]],
  ["AI and AH DS", [["agent", "Design Control Agent"], ["agent-workflow", "Agent workflow"], ["skills", "Skills"], ["interaction-models", "Interaction models"]]],
  ["Visual language", foundations.map(([id, label]) => [id, label])],
  ["Styling API", hooks.map(([id, label]) => [id, label])],
  ["Components", [["components", "Overview"], ...components.map(([id, label]) => [`component/${id}`, label])]],
  ["Patterns", [["patterns", "Overview"], ...patterns.map(([id, label]) => [`pattern/${id}`, label])]],
  ["Tools", [["tools", "Overview"], ["figma", "Figma mapping"], ["qa", "QA & governance"], ["registry", "Registry"], ["release-notes", "Release notes"]]],
];
