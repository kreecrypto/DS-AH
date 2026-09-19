import type { Metadata } from "next";
import { agentFlow } from "@/lib/system";
export const metadata:Metadata={title:"Agent"};

export default function AgentPage(){
  return <article>
    <header className="page-header"><div className="eyebrow">DESIGN AGENT</div><h1>Agent-readable design system</h1><p>AHDS exposes design guidance as deterministic decision steps. GitHub is the Brain, ChatGPT is the Agent runtime and Figma is the Workspace.</p></header>
    <section className="section"><div className="agent-flow">{agentFlow.map((step,index)=><div key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></div>)}</div></section>
    <aside className="callout"><strong>Hard rule</strong><p>Existing approved reference, template, pattern and component authority must be resolved before creating a new visual solution. No PASS without evidence.</p></aside>
  </article>;
}
