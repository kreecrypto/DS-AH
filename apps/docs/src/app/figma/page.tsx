import type { Metadata } from "next";
import { componentDocs, figmaSource } from "@/lib/system";
export const metadata:Metadata={title:"Figma mapping"};

export default function FigmaPage(){
  return <article>
    <header className="page-header"><div className="eyebrow">FIGMA</div><h1>Source mapping</h1><p>The portal points back to audited Figma evidence. It never silently replaces Core component identity.</p><a className="button primary" href={figmaSource.url}>Open Core DS in Figma ↗</a></header>
    <section className="section two-col">
      <div className="info-panel"><small>Canonical source</small><h2>{figmaSource.role}</h2><dl><dt>File key</dt><dd><code>{figmaSource.fileKey}</code></dd><dt>Audit date</dt><dd>{figmaSource.audited}</dd></dl></div>
      <div className="info-panel"><small>Collections</small><h2>Audited variables</h2>{figmaSource.collections.map(([name,id,count])=><div className="mapping-row" key={id}><strong>{name}</strong><span>{count} variables</span><code>{id}</code></div>)}</div>
    </section>
    <section className="section"><div className="section-heading"><span>Components</span><h2>Portal → Figma</h2></div>
      <div className="table-wrap"><table><thead><tr><th>Documentation</th><th>Figma node</th><th>Authority</th></tr></thead><tbody>
        {componentDocs.map((c)=><tr key={c.slug}><td>{c.name}</td><td><code>{c.sourceNode}</code></td><td>{c.slug==="card"?"Domain pattern resolution":"Core DS audited component"}</td></tr>)}
      </tbody></table></div>
    </section>
  </article>;
}
