import Link from "next/link";
import type { Metadata } from "next";
import { componentDocs } from "@/lib/system";
export const metadata:Metadata={title:"Components"};

export default function ComponentsPage(){
  return <article>
    <header className="page-header"><div className="eyebrow">COMPONENTS</div><h1>Core components</h1><p>The first documentation set covers Button, Input and Card. Core component identity and approved product patterns remain authoritative.</p></header>
    <div className="component-list">{componentDocs.map((item)=>
      <Link className="component-row" href={`/components/${item.slug}`} key={item.slug}>
        <div><small>Stable / mapped</small><h2>{item.name}</h2><p>{item.summary}</p></div><span>→</span>
      </Link>)}</div>
  </article>;
}
