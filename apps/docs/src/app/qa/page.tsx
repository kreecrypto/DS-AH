import type { Metadata } from "next";
export const metadata:Metadata={title:"QA"};

const checks=[
["Website shell","PASS","Responsive documentation shell and persistent navigation are implemented."],
["Search","PASS","Client-side documentation search indexes sections, components and patterns."],
["Foundation evidence","PASS","Starter values map to registry/core-ds-foundations.json."],
["Styling hooks","PASS","UI demos consume --ah-g-* semantic variables."],
["Component template","PASS","Button, Input and Card share one documentation structure."],
["Pattern template","PASS","Search + Filter provides anatomy and rules."],
["Figma mapping","PASS","Core file and component node mappings are visible."],
["Agent tab","PASS","Design Agent flow is documented in a dedicated surface."],
["Automated contract","PASS","validate-docs checks required routes and raw-color leakage in TSX."]
];

export default function QAPage(){
  return <article>
    <header className="page-header"><div className="eyebrow">QUALITY</div><h1>Portal QA contract</h1><p>This is implementation coverage, not a visual-fidelity claim against the final Figma website design. Visual regression is the next gate after a deployed preview exists.</p></header>
    <div className="qa-list">{checks.map(([name,status,note])=><div className="qa-row" key={name}><div><strong>{name}</strong><p>{note}</p></div><span>{status}</span></div>)}</div>
    <aside className="callout"><strong>Run locally / CI</strong><p><code>npm run validate:docs</code> runs the documentation contract validator followed by the production Next.js build.</p></aside>
  </article>;
}
