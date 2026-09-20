import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const sources = {
  foundations: 'registry/core-ds-foundations.json',
  components: 'registry/core-ds-components.json',
  patterns: 'registry/domain-patterns.json',
  templates: 'registry/templates.json',
  figma: 'registry/figma-sources.json',
  preferred: 'registry/core-ds-preferred.json',
  runtime: 'agent/runtime.json',
  qa: 'agent/gates/quality-gates.json',
};

export const hookName = name => '--ah-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/,'');

export async function createSiteData(root) {
  const read = async path => JSON.parse(await readFile(join(root, path), 'utf8'));
  const data = Object.fromEntries(await Promise.all(Object.entries(sources).map(async ([key, path]) => [key, await read(path)])));
  const index = await read('registry/core-ds-tokens/index.json');
  data.tokens = [];
  // The hook index requires the complete token inventory; values remain registry-owned.
  for (const entry of [...index.colorChunks.map(x=>({...x,collection:'color'})), ...Object.entries(index.collectionFiles).map(([collection,x])=>({...x,collection}))]) {
    const chunk = await read(entry.file);
    for (const variable of chunk.variables) {
      const values = variable.values || { 'Mode 1': variable.value.hex };
      data.tokens.push({name:variable.name, hook:hookName(variable.name), collection:entry.collection, key:variable.key, values, source:entry.file});
    }
  }
  const duplicate = data.tokens.find((t,i,a)=>a.findIndex(x=>x.hook===t.hook)!==i);
  if (duplicate) throw new Error('Token hook collision: '+duplicate.hook);
  if(data.tokens.length!==index.totals.variables) throw new Error('Incomplete token inventory');
  data.tokenTotals=index.totals;
  data.sources=sources;
  data.releases=await read('website/releases.json');
  return data;
}

export function tokenCSS(data) {
  const format=(token,value)=>{
    if(typeof value==='number') return `${value}${token.name==='typography/screensize'?'':'px'}`;
    if(token.name.startsWith('font/weight')) return String({'55 Regular':400,'35 Thin':200,'45 Li':300,'75 Bd':700,'85 Blk':900}[value] || 400);
    return String(value).startsWith('#') ? value : JSON.stringify(value);
  };
  const declarations=data.tokens.map(t=>`  ${t.hook}: ${format(t,t.values.Desktop ?? Object.values(t.values)[0])};`).join('\n');
  const mobile=data.tokens.filter(t=>t.values.Mobile!==undefined).map(t=>`  ${t.hook}: ${format(t,t.values.Mobile)};`).join('\n');
  return `/* Generated from Core DS registry; do not edit. Weight names mapped for CSS. */\n:root {\n${declarations}\n}\n/* Mode is explicit: registry does not approve a breakpoint. */\n[data-text-mode="mobile"] {\n${mobile}\n}\n`;
}
