import { navGroups } from './catalog.js';

export const routes=navGroups.flatMap(([group,items])=>items.map(([id,label])=>({id,label:label==='Overview'?group:label,group})));
const allowed=new Set(routes.map(x=>x.id));
export const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function parseLocation(hash='') {
  if(!hash || hash==='#main') return {id:'overview',section:''};
  try {
    const [path,query='']=hash.replace(/^#\//,'').split('?');
    const id=decodeURIComponent(path);
    const section=new URLSearchParams(query).get('section')||'';
    return {id:allowed.has(id)?id:'not-found',section:/^[a-z][a-z0-9-]*$/.test(section)?section:''};
  } catch { return {id:'not-found',section:''}; }
}
export function figmaLink(file,node='0:1') {
  if(!/^[a-zA-Z0-9]+$/.test(file||'') || !/^\d+:\d+$/.test(node)) return '';
  return `https://www.figma.com/design/${file}/?node-id=${node.replace(':','-')}`;
}
export function componentRecords(data,label) { return data.components.components.filter(x=>x.page===label); }
export function catalogMatches(item,query,category) { return (!category || category==='All' || item.category===category) && item.text.toLowerCase().includes(query.trim().toLowerCase()); }
export function validateData(data) {
  return !!(data && Array.isArray(data.components?.components) && data.foundations?.collections && Array.isArray(data.patterns?.patterns) && Array.isArray(data.templates?.templates) && Array.isArray(data.figma?.pages) && Array.isArray(data.runtime?.sequence) && Array.isArray(data.qa?.gates) && Array.isArray(data.tokens) && Array.isArray(data.releases));
}
export async function loadSiteData(fetcher=fetch) {
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),12000);
  try {
    const response=await fetcher('./data/site.json',{signal:controller.signal});
    if(!response.ok) throw new Error('Registry request failed');
    const data=await response.json();
    if(!validateData(data)) throw new Error('Registry is incomplete');
    return data;
  } finally {clearTimeout(timer);}
}
export function textFromHtml(html) {return html.replace(/<[^>]*>/g,' ').replace(/&[^;]+;/g,' ').replace(/\s+/g,' ').trim();}
