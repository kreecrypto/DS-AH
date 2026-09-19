import Link from "next/link";

const pillars=[
["Foundations","Audited color, typography, spacing and shape primitives.","/foundations"],
["Styling hooks","Semantic interface between visual foundations and reusable UI.","/styling-hooks"],
["Components","Documented Core primitives with usage, states and agent rules.","/components"],
["Patterns","Approved compositions that keep product screens consistent.","/patterns"]
];

export default function HomePage(){
  return <>
    <section className="hero">
      <div className="eyebrow">AH DESIGN SYSTEM 2</div>
      <h1>One design language.<br/>One source of truth.</h1>
      <p>Documentation portal for designers, developers and Design Agents. Built from the audited AH Core Design System rather than a blank-canvas component library.</p>
      <div className="hero-actions">
        <Link className="button primary" href="/foundations">Explore foundations</Link>
        <Link className="button secondary" href="/components">Browse components</Link>
      </div>
    </section>
    <section className="section">
      <div className="section-heading"><span>System architecture</span><h2>From evidence to reusable experience</h2></div>
      <div className="architecture-flow">
        {["Figma Core DS","GitHub knowledge","AHDS portal","Product + Agent"].map((item,index)=>
          <div className="flow-item" key={item}><small>0{index+1}</small><strong>{item}</strong></div>)}
      </div>
    </section>
    <section className="section">
      <div className="section-heading"><span>Explore</span><h2>System layers</h2></div>
      <div className="card-grid">{pillars.map(([title,copy,href])=>
        <Link className="doc-card" href={href} key={href}>
          <div className="card-icon">{title.slice(0,1)}</div><h3>{title}</h3><p>{copy}</p><span>Open documentation →</span>
        </Link>)}</div>
    </section>
  </>;
}
