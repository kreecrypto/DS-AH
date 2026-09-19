import Link from "next/link";
import type { Metadata } from "next";
import { patterns } from "@/lib/system";
export const metadata:Metadata={title:"Patterns"};

export default function PatternsPage(){
  return <article>
    <header className="page-header"><div className="eyebrow">PATTERNS</div><h1>Reusable compositions</h1><p>Patterns define how Core components work together to solve recurring product tasks. Pattern authority sits above one-off screen composition.</p></header>
    <div className="component-list">{patterns.map((item)=>
      <Link className="component-row" href={`/patterns/${item.slug}`} key={item.slug}>
        <div><small>Template v1</small><h2>{item.name}</h2><p>{item.summary}</p></div><span>→</span>
      </Link>)}</div>
  </article>;
}
