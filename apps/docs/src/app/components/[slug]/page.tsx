import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { componentDocs } from "@/lib/system";

export function generateStaticParams(){return componentDocs.map((item)=>({slug:item.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const item=componentDocs.find((entry)=>entry.slug===slug);
  return {title:item?.name??"Component"};
}
function Preview({slug}:{slug:string}){
  if(slug==="button") return <div className="preview-stage"><button className="demo-button">Continue</button></div>;
  if(slug==="input") return <div className="preview-stage"><label className="demo-field">Policy number<input placeholder="Enter policy number"/></label></div>;
  return <div className="preview-stage"><div className="demo-card"><small>Performance</small><strong>82%</strong><span>Target achievement</span></div></div>;
}
export default async function ComponentPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const item=componentDocs.find((entry)=>entry.slug===slug); if(!item) notFound();
  return <article>
    <header className="page-header"><div className="eyebrow">COMPONENT / {item.name.toUpperCase()}</div><h1>{item.name}</h1><p>{item.summary}</p><div className="status-line"><span>● Stable documentation</span><code>Figma node {item.sourceNode}</code></div></header>
    <section className="section"><div className="section-heading"><span>Preview</span><h2>Component example</h2></div><Preview slug={item.slug}/></section>
    <section className="section two-col">
      <div><div className="section-heading"><span>Variants</span><h2>Supported intent</h2></div><ul className="clean-list">{item.variants.map((v)=><li key={v}>{v}</li>)}</ul></div>
      <div><div className="section-heading"><span>States</span><h2>Interaction coverage</h2></div><ul className="clean-list">{item.states.map((v)=><li key={v}>{v}</li>)}</ul></div>
    </section>
    <section className="section two-col">
      <div><div className="section-heading"><span>Usage</span><h2>Design guidance</h2></div><ol className="number-list">{item.usage.map((v)=><li key={v}>{v}</li>)}</ol></div>
      <div><div className="section-heading"><span>Agent</span><h2>Machine rules</h2></div><ol className="number-list">{item.agentRules.map((v)=><li key={v}>{v}</li>)}</ol></div>
    </section>
  </article>;
}
