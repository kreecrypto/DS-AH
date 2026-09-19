import { notFound } from "next/navigation";
import { patterns } from "@/lib/system";
export function generateStaticParams(){return patterns.map((item)=>({slug:item.slug}));}

export default async function PatternPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const pattern=patterns.find((entry)=>entry.slug===slug); if(!pattern) notFound();
  return <article>
    <header className="page-header"><div className="eyebrow">PATTERN</div><h1>{pattern.name}</h1><p>{pattern.summary}</p></header>
    <section className="section"><div className="section-heading"><span>Preview</span><h2>Reference anatomy</h2></div>
      <div className="pattern-preview"><div className="search-demo">Search customers…</div><button className="filter-demo">Filter</button><div className="chip-demo">Status: Active ×</div><div className="result-demo"><strong>25 results</strong><span>Sort: Latest</span></div><div className="rows-demo"><span/><span/><span/></div></div>
    </section>
    <section className="section two-col">
      <div><div className="section-heading"><span>Anatomy</span><h2>Required parts</h2></div><ol className="number-list">{pattern.anatomy.map((part)=><li key={part}>{part}</li>)}</ol></div>
      <div><div className="section-heading"><span>Rules</span><h2>Behavior</h2></div><ol className="number-list">{pattern.rules.map((rule)=><li key={rule}>{rule}</li>)}</ol></div>
    </section>
  </article>;
}
