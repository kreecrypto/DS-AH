import Link from "next/link";
import { navigation } from "@/lib/system";
import { SearchPalette } from "./SearchPalette";

export function DocsShell({children}:{children:React.ReactNode}) {
  return <div className="site-shell">
    <header className="topbar">
      <Link className="brand" href="/" aria-label="AH Design System home">
        <span className="brand-mark">AH</span>
        <span><strong>Design System</strong><small>2.0 portal</small></span>
      </Link>
      <SearchPalette />
      <a className="github-link" href="https://github.com/kreecrypto/DS-AH">GitHub ↗</a>
    </header>
    <aside className="sidebar" aria-label="Documentation">
      <div className="side-label">Documentation</div>
      <nav>{navigation.map((item)=><Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
      <div className="source-note"><strong>Source of Truth</strong><span>GitHub knowledge + audited Figma Core DS</span></div>
    </aside>
    <main className="content">{children}</main>
  </div>;
}
