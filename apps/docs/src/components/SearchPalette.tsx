"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { componentDocs, navigation, patterns } from "@/lib/system";

const index = [
  ...navigation.map((item)=>({label:item.label,href:item.href,type:"Section"})),
  ...componentDocs.map((item)=>({label:item.name,href:`/components/${item.slug}`,type:"Component"})),
  ...patterns.map((item)=>({label:item.name,href:`/patterns/${item.slug}`,type:"Pattern"}))
];

export function SearchPalette() {
  const [query,setQuery] = useState("");
  const results = useMemo(()=>{
    const value=query.trim().toLowerCase();
    if(!value) return [];
    return index.filter((item)=>item.label.toLowerCase().includes(value)).slice(0,8);
  },[query]);

  return <div className="search-wrap">
    <label className="sr-only" htmlFor="ahds-search">Search AH Design System</label>
    <input id="ahds-search" className="search-input" value={query}
      onChange={(event)=>setQuery(event.target.value)}
      placeholder="Search components, patterns, guidance…" />
    {query && <div className="search-results" role="listbox" aria-label="Search results">
      {results.length ? results.map((item)=>
        <Link key={item.href+item.label} href={item.href} className="search-result" onClick={()=>setQuery("")}>
          <span>{item.label}</span><small>{item.type}</small>
        </Link>
      ) : <div className="search-empty">No matching documentation.</div>}
    </div>}
  </div>;
}
