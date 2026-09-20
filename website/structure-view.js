import {escapeHTML as e, href} from './structure.js';
const pending = (label='เนื้อหา') => `<div class="pending"><span lang="th">รอเติม${e(label)}</span><small>Content pending</small></div>`;
const media = (label='ภาพประกอบ') => `<div class="media-slot">${pending(label)}</div>`;
export function sidebar(items, active, expanded, depth=0) {
  return `<ul>${items.map(n=>`<li><div class="nav-row" style="--depth:${depth}">${n.source ? `<a href="${href(n.id)}" ${n.id===active?'aria-current="page"':''}>${e(n.label)}</a>` : `<span>${e(n.label)}</span>`}${n.children.length?`<button type="button" data-expand="${e(n.id)}" aria-label="${e(n.label)} submenu" aria-expanded="${expanded.has(n.id)}" aria-controls="nav-${e(n.id.replaceAll('/','-'))}"><span aria-hidden="true">›</span></button>`:''}</div>${n.children.length?`<div id="nav-${e(n.id.replaceAll('/','-'))}" ${expanded.has(n.id)?'':'hidden'}>${sidebar(n.children,active,expanded,depth+1)}</div>`:''}</li>`).join('')}</ul>`;
}
function cards(nodes,columns=2) {
  return `<div class="cards columns-${columns}">${nodes.map(n=>`<a class="card" href="${href(n.id)}"><div class="card-art" aria-hidden="true"></div><div><h3>${e(n.label)}</h3><p lang="th">รอเติมคำอธิบาย</p><span aria-hidden="true">→</span></div></a>`).join('')}</div>`;
}
function actions(headings) {
  return `<div class="page-actions"><details class="contents"><summary>Page contents <span aria-hidden="true">⌄</span></summary><nav aria-label="Page contents">${headings.map((h,i)=>`<a href="#s-${i}" data-section="s-${i}">${e(h.label)}</a>`).join('') || '<span>No sections yet</span>'}</nav></details><button type="button" data-copy aria-label="Copy link to page" title="Copy link to page">↗</button><details class="md-actions"><summary aria-label="Page actions">•••</summary><div><button type="button" data-download>Download Markdown</button></div></details></div>`;
}
function footer(page,structure) {
  const ordered = [...structure.pages.values()].filter(p=>!p.isTab);
  const index = ordered.findIndex(p=>p.id===page?.id);
  const prev=ordered[index-1],next=ordered[index+1];
  return `<div class="feedback"><span>Help us improve</span><button disabled aria-label="Vote yes">Yes</button><button disabled aria-label="Vote no">No</button><small lang="th">รอเชื่อมต่อระบบรับความคิดเห็น</small></div><nav class="page-pager" aria-label="Adjacent pages">${prev?`<a href="${href(prev.id)}"><small>Previous page</small>← ${e(prev.label)}</a>`:'<span></span>'}${next?`<a href="${href(next.id)}"><small>Next page</small>${e(next.label)} →</a>`:''}</nav><footer><div>${['Terms of Service','Privacy','Responsible Disclosure','Trust','Your Privacy Choices','Legal'].map(t=>`<span>${t}</span>`).join('')}</div><p lang="th">รอเติมข้อมูลนโยบายและลิงก์ของ AH</p><small>AH Design System · AdvisorHub</small></footer>`;
}
export function renderPage(id,structure) {
  if(id==='not-found') return '<article><h1>Page not found</h1><p>This page does not exist.</p><a href="#/overview">Return home</a></article>';
  if(id==='overview') {
    const find=label=>structure.navigation.find(x=>x.label===label);
    const headings=[{label:'Welcome'},{label:'Build with AH Design System'},{label:'Get Started'},{label:'AI and SLDS 2'},{label:'Community'}];
    return `<article class="home">${actions(headings)}<header class="page-heading"><h1>AH Design System</h1><p class="subtitle" lang="th">รอเติมคำอธิบาย Design System</p></header><div class="home-banner">${pending('ภาพและข้อความ Banner')}</div><section id="s-0"><h2>Welcome</h2>${media('วิดีโอแนะนำ')}</section><section id="s-1"><h3>Build with AH Design System</h3>${pending()}${cards([find('Visual Language'),find('Components')])}</section><section id="s-2"><h3>Get Started</h3>${cards(find('Get Started').children.filter(n=>['Admins','Design','Develop'].includes(n.label)),3)}</section><section id="s-3"><h3>AI and SLDS 2</h3>${pending()}${cards(find('AI and SLDS 2').children.slice(0,2))}</section><section id="s-4"><h3>Community</h3><div class="cards columns-2">${[1,2,3,4].map(()=>`<div class="card placeholder-card">${pending('ข้อมูลและลิงก์')}</div>`).join('')}</div></section>${footer(null,structure)}</article>`;
  }
  const route=structure.pages.get(id), page=route.isTab?route.ancestors.at(-1):route;
  const tabs=structure.tabs(route), selected=route.isTab?route:tabs[0];
  const capture=structure.captures[route.id] || (!route.isTab || route===tabs[0]?structure.captures[page.id]:null);
  const headings=capture?.headings || [];
  const children=page.children.filter(x=>!x.isTab);
  const breadcrumb=page.ancestors.filter(x=>x.source);
  const tabHTML=tabs.length?`<nav class="page-tabs" aria-label="${e(page.label)} sections">${tabs.map(t=>`<a href="${href(t.id)}" ${selected?.id===t.id?'aria-current="page"':''}>${e(t.label)}</a>`).join('')}</nav>`:'';
  let body='';
  if(headings.length) body=headings.map((h,i)=>`<section id="s-${i}" class="section-level-${h.level}"><h${h.level}>${e(h.label)}</h${h.level}>${pending()}</section>`).join('');
  else body=`<section id="s-0">${pending('เนื้อหา '+(selected?.label || page.label))}${media()}</section>`;
  if(children.length && !route.isTab) body+=`<section class="category-links" aria-label="Pages in ${e(page.label)}">${cards(children.flatMap(n=>n.source?[n]:n.children))}</section>`;
  return `<article>${actions(headings)}${breadcrumb.length?`<nav class="breadcrumb" aria-label="Breadcrumb">${breadcrumb.map(n=>`<a href="${href(n.id)}">${e(n.label)}</a><span>/</span>`).join('')}<span>${e(page.label)}</span></nav>`:''}<header class="page-heading"><h1>${e(page.label)}</h1><p class="subtitle" lang="th">รอเติมคำอธิบาย</p></header>${tabHTML}<div class="page-body">${body}</div>${footer(page,structure)}</article>`;
}
