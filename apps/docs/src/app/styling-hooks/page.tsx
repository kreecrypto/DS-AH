import type { Metadata } from "next";
import { stylingHooks } from "@/lib/system";
export const metadata:Metadata={title:"Styling hooks"};

export default function StylingHooksPage(){
  return <article>
    <header className="page-header"><div className="eyebrow">STYLING API</div><h1>Global styling hooks</h1><p>AH semantic hooks separate component structure from appearance. Components consume intent-based variables instead of raw design values.</p></header>
    <div className="hook-diagram"><div>Foundation value</div><span>→</span><div>AH global hook</div><span>→</span><div>Component</div><span>→</span><div>Experience</div></div>
    <section className="section"><div className="table-wrap"><table><thead><tr><th>Hook</th><th>Resolved value</th><th>Audited source</th></tr></thead><tbody>
      {stylingHooks.map(([hook,value,source])=><tr key={hook}><td><code>{hook}</code></td><td>{value}</td><td><small>{source}</small></td></tr>)}
    </tbody></table></div></section>
    <aside className="callout"><strong>Rule</strong><p>New documentation demos must use <code>--ah-g-*</code> semantic hooks. Raw visual values belong only in the hook/foundation definition layer.</p></aside>
  </article>;
}
