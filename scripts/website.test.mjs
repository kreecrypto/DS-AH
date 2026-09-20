import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createStructure,escapeHTML,routeID} from '../website/structure.js';
import {renderPage,sidebar} from '../website/structure-view.js';
import {createSiteData,tokenCSS} from './site-data.mjs';
const root=new URL('../',import.meta.url).pathname;
const read=async path=>JSON.parse(await readFile(root+path,'utf8'));
const reference=await read('website/reference-navigation.json');
const captures=await read('website/reference-pages.json');
const structure=createStructure(reference,captures);
test('every captured navigation node retains exact label, source, order and nesting',()=>{
  const plain=nodes=>nodes.map(n=>({label:n.label,source:n.source,children:plain(n.children)}));
  assert.deepEqual(plain(structure.navigation),plain(reference.navigation));
  assert.equal(structure.navigation.length,9);assert.equal(structure.nodes.length,459);
  assert.equal(structure.nodes.filter(n=>n.isTab).length,312);
  assert.equal(structure.pages.size,460);
});
test('all 460 routes render without throwing and have exactly one heading',()=>{
  for(const id of ['overview',...structure.pages.keys(),'not-found']){
    const html=renderPage(id,structure);assert.equal((html.match(/<h1>/g)||[]).length,1,id);assert.ok(!html.includes('undefined'),id);
    for(const match of html.matchAll(/href="#\/([^"?]+)(?:\?[^\"]*)?"/g))assert.ok(match[1]==='overview'||structure.pages.has(match[1]),`${id}: ${match[1]}`);
  }
});
test('every source route and first tab resolve to the captured parent',()=>{
  for(const node of structure.nodes.filter(n=>n.source))assert.equal(structure.resolve('#/'+routeID(node.source)).id,node.id);
  for(const page of structure.pages.values())for(const tab of structure.tabs(page)){assert.ok(tab.label);assert.ok(tab.isTab);assert.ok(structure.pages.has(tab.id));}
});
test('malformed and untrusted fragments never enter rendered HTML',()=>{
  for(const hash of ['#/%','#/../../etc/passwd','#/<img src=x onerror=alert(1)>','#/%3Csvg%20onload=alert(1)%3E'])assert.equal(structure.resolve(hash).id,'not-found');
  assert.equal(structure.resolve('#/7733f8-button?section=%22onclick=x').section,'');
  assert.equal(escapeHTML('<>&"\''),'&lt;&gt;&amp;&quot;&#39;');
});
test('sidebar controls have unique IDs and active states',()=>{
  const html=sidebar(structure.navigation,'7733f8-button',new Set());
  const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
  assert.equal((html.match(/aria-current="page"/g)||[]).length,1);
  assert.ok(html.includes('aria-expanded="false"'));assert.ok(html.includes(' hidden>'));
});
test('all Core DS variables compile without duplicate hooks',async()=>{
  const data=await createSiteData(root);assert.equal(data.tokens.length,352);assert.equal(new Set(data.tokens.map(t=>t.hook)).size,352);const css=tokenCSS(data);for(const t of data.tokens)assert.ok(css.includes(t.hook+':'));
});
test('placeholders explicitly identify missing content and feedback is not falsely submitted',()=>{
  const html=renderPage('7733f8-button',structure);assert.ok(html.includes('Content pending'));assert.ok(html.includes('disabled aria-label="Vote yes"'));
});
