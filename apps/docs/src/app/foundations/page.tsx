import type { Metadata } from "next";
import { foundationTokens } from "@/lib/system";
export const metadata:Metadata={title:"Foundations"};

export default function FoundationsPage(){
  return <article>
    <header className="page-header"><div className="eyebrow">FOUNDATIONS</div><h1>Visual foundations</h1><p>Values below come from the audited AH Core Design System registry. This portal documents them; it does not redefine Figma.</p></header>
    <section className="section">
      <div className="section-heading"><span>Color</span><h2>Semantic-ready source values</h2></div>
      <div className="swatch-grid">{foundationTokens.color.map(([label,value,source])=>
        <div className="swatch-card" key={source}><div className="swatch" style={{background:value}}/><div><strong>{label}</strong><code>{value}</code><small>{source}</small></div></div>)}</div>
    </section>
    <section className="section two-col">
      <div><div className="section-heading"><span>Spacing</span><h2>Spacing scale</h2></div><div className="scale-list">
        {foundationTokens.spacing.map((value)=><div key={value}><code>{value}px</code><span style={{width:Math.max(value,2)}}/></div>)}
      </div></div>
      <div><div className="section-heading"><span>Shape</span><h2>Radius scale</h2></div><div className="radius-grid">
        {foundationTokens.radius.slice(0,6).map(([name,value])=><div key={name}><span style={{borderRadius:value}}/><strong>{name}</strong><code>{value}px</code></div>)}
      </div></div>
    </section>
    <aside className="callout"><strong>Typography source</strong><p>DB Helvethaica X is the audited product font family. The documentation website intentionally uses system UI fonts unless licensed webfont assets are explicitly supplied.</p></aside>
  </article>;
}
