// Navigation is a frozen, read-only capture of the reference, not a hand-curated subset.
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const routeID = source => source.replace(/^\/2e1ef8501\/p\//, '');
export const href = id => '#/' + id;
export function createStructure(reference, captures = {}) {
  const nodes = [], pages = new Map();
  function visit(items, ancestors = []) {
    return items.map((item, index) => {
      const id = item.source ? routeID(item.source) : `group-${ancestors.map(x=>x.id).join('-')}-${index}`;
      const node = { ...item, id, ancestors, isTab: Boolean(item.source?.includes('/b/')) };
      nodes.push(node);
      if (item.source) pages.set(id, node);
      node.children = visit(item.children, [...ancestors, node]);
      return node;
    });
  }
  const navigation = visit(reference.navigation);
  for (const [id, capture] of Object.entries(captures)) {
    const parent = pages.get(id);
    if (!parent || parent.isTab) continue;
    for (const item of capture.tabs || []) {
      const tabID = routeID(item.source);
      if (!pages.has(tabID)) pages.set(tabID, {...item, id:tabID, children:[], ancestors:[...parent.ancestors,parent], isTab:true});
    }
  }
  function resolve(hash) {
    if (!hash || hash === '#main' || hash === '#/overview') return {id:'overview',section:''};
    try {
      const [path, query=''] = hash.replace(/^#\//,'').split('?');
      const id = decodeURIComponent(path);
      const section = new URLSearchParams(query).get('section') || '';
      return {id:pages.has(id) ? id : 'not-found',section:/^s-\d+$/.test(section) ? section : ''};
    } catch { return {id:'not-found',section:''}; }
  }
  function tabs(page) {
    const parent = page.isTab ? page.ancestors.at(-1) : page;
    const recorded = captures[parent.id]?.tabs;
    return recorded?.length ? recorded.map(x=>pages.get(routeID(x.source))).filter(Boolean) : parent.children.filter(x=>x.isTab);
  }
  return {navigation,nodes,pages,resolve,tabs,captures};
}
