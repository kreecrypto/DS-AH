export const navigation = [
  { label: "Get started", href: "/" },
  { label: "Foundations", href: "/foundations" },
  { label: "Styling hooks", href: "/styling-hooks" },
  { label: "Components", href: "/components" },
  { label: "Patterns", href: "/patterns" },
  { label: "Figma mapping", href: "/figma" },
  { label: "Agent", href: "/agent" },
  { label: "QA", href: "/qa" }
] as const;

export const foundationTokens = {
  color: [
    ["Background / base", "#FFFFFF", "bg/base/base"],
    ["Interaction / primary", "#00008F", "bg/interaction/primary/default"],
    ["Interaction / primary hover", "#0000F7", "bg/interaction/primary/hover"],
    ["Interaction / strong", "#E3000A", "bg/interaction/strong/default"],
    ["Text / primary", "#1A1D21", "text/primary"],
    ["Text / secondary", "#434956", "text/secondary"],
    ["Stroke / regular", "#E5E5E5", "stroke/regular"],
    ["Focus / default", "#00008F", "focus/default"]
  ],
  spacing: [0,2,4,8,12,16,20,24,32,40,48,56,64,80],
  radius: [["None",0],["XS",2],["SM",4],["MD",8],["LG",12],["XL",16],["Button",64],["Full",9999]]
} as const;

export const stylingHooks = [
  ["--ah-g-color-surface-default","#FFFFFF","bg/base/base"],
  ["--ah-g-color-text-primary","#1A1D21","text/primary"],
  ["--ah-g-color-text-secondary","#434956","text/secondary"],
  ["--ah-g-color-border-default","#E5E5E5","stroke/regular"],
  ["--ah-g-color-action-primary","#00008F","bg/interaction/primary/default"],
  ["--ah-g-color-action-primary-hover","#0000F7","bg/interaction/primary/hover"],
  ["--ah-g-color-action-primary-active","#0000D2","bg/interaction/primary/active"],
  ["--ah-g-color-action-strong","#E3000A","bg/interaction/strong/default"],
  ["--ah-g-color-focus","#00008F","focus/default"],
  ["--ah-g-radius-control","8px","shape/forms/input"],
  ["--ah-g-radius-action","64px","shape/button/default"],
  ["--ah-g-space-4","16px","spacing/padding/xl"]
] as const;

export type ComponentDoc = {
  slug:string; name:string; summary:string; sourceNode:string;
  variants:string[]; states:string[]; usage:string[]; agentRules:string[];
};

export const componentDocs: ComponentDoc[] = [
  {
    slug:"button", name:"Button",
    summary:"Triggers a clear user action. Reuse the audited Core Button before creating any new action control.",
    sourceNode:"70:20",
    variants:["Primary","Secondary","Tertiary","Strong / destructive"],
    states:["Default","Hover","Active","Focus","Disabled","Loading"],
    usage:["Use one primary action per decision area.","Use semantic action hooks; never raw visual values.","Preserve the Core component identity for existing instances."],
    agentRules:["Search Core Button first.","Resolve intent before appearance.","Do not detach an approved instance.","Verify focus and disabled states."]
  },
  {
    slug:"input", name:"Input",
    summary:"Captures structured text data with label, helper, validation and state semantics.",
    sourceNode:"167:1541",
    variants:["Text","With leading icon","With trailing action"],
    states:["Default","Hover","Focus","Filled","Disabled","Error"],
    usage:["Always pair with a persistent label.","Error text must explain recovery.","Use the audited field stroke and surface semantics."],
    agentRules:["Search Core Input first.","Resolve required/read-only/error behavior.","Keep label and validation attached to the field."]
  },
  {
    slug:"card", name:"Card",
    summary:"A documentation-level composition primitive for grouped content. Product cards must resolve to approved domain patterns before reuse.",
    sourceNode:"derived-from-approved-domain-patterns",
    variants:["Base","Interactive","Metric","Section"],
    states:["Default","Hover when interactive","Selected when applicable"],
    usage:["Use for a coherent information group, not as decoration.","Prefer spacing and surface hooks over one-off styling.","Domain card composition is governed by approved patterns."],
    agentRules:["Check domain pattern registry before composing.","Do not invent a new card when an approved product pattern exists.","Keep hierarchy and density consistent with the locked reference."]
  }
];

export const patterns = [{
  slug:"search-filter",
  name:"Search + Filter",
  summary:"A reusable list-discovery pattern composed from search, filter trigger, active criteria, result metadata and result content.",
  anatomy:["Search field","Filter trigger","Active filter chips","Result count","Sort","Result area","Pagination"],
  rules:["Search and filters must reflect the same result scope.","Expose active criteria and a clear reset path.","Use domain-specific filters only after pattern resolution."]
}] as const;

export const figmaSource = {
  fileKey:"5ZFIRJWtmEIvuq95Rhyo6I",
  url:"https://www.figma.com/design/5ZFIRJWtmEIvuq95Rhyo6I/-DS--Agency-Portal---Design-System--Copy-?node-id=0-1",
  role:"Canonical Core Design System source",
  audited:"2026-09-18",
  collections:[
    ["Color","VariableCollectionId:2:55762","264"],
    ["Text","VariableCollectionId:9:55789","45"],
    ["Spacing","VariableCollectionId:54:2","28"],
    ["Shape","VariableCollectionId:70:23","14"]
  ]
} as const;

export const agentFlow = [
  "Resolve intent","Load Agent Skills","Figma inspect","Resolve reference","Reference lock",
  "Extract visual grammar","Resolve Design System assets","Design decision","Change scope",
  "Write permission","Execution plan","Mutation","Verification","Design QA","Visual regression",
  "Fix loop","Evidence","Complete"
] as const;
