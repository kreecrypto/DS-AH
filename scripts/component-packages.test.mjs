import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {loadComponentPackages,readiness,requiredSections} from './component-packages.mjs';
import {createStructure} from '../website/structure.js';
import {renderPage} from '../website/structure-view.js';
const root=new URL('../',import.meta.url).pathname;
const read=async p=>JSON.parse(await readFile(root+p,'utf8'));
const {packages}=await loadComponentPackages(root);
const structure=createStructure(await read('website/reference-navigation.json'),await read('website/reference-pages.json'),packages);
test('all 19 upstream source packages retain identity and seven enrichment sections',()=>{
 assert.equal(packages.length,19);assert.equal(packages.reduce((n,p)=>n+p.components.length,0),45);
 assert.equal(packages.reduce((n,p)=>n+p.enrichment.examples.owners.reduce((n,o)=>n+o.variants.length,0),0),295);
 for(const p of packages)for(const key of requiredSections)assert.ok(p.enrichment[key].status);
 assert.equal(packages.find(p=>p.id==='evalution').status,'BLOCKED_EMPTY_FIGMA_SOURCE');
});
test('every generated package page resolves, renders and has valid internal links',()=>{
 for(const p of packages){const id=p.website.route.slice(1);assert.equal(structure.resolve('#/'+id).id,id);const html=renderPage(id,structure);assert.equal((html.match(/<h1>/g)||[]).length,1);for(const label of ['Anatomy','Usage','Accessibility','Token Dependencies','Examples','Visual Baseline','Related Components'])assert.ok(html.includes('<h2>'+label+'</h2>'));for(const m of html.matchAll(/href="#\/([^"?]+)"/g))assert.ok(m[1]==='overview'||structure.pages.has(m[1]),m[1]);}
});
test('source routes and packages do not alter captured SFDS2 navigation',()=>{assert.equal(structure.nodes.length,459);assert.equal(structure.navigation.length,9);assert.equal(structure.pages.size,479);});
test('every baseline file exists and contains a complete exported SVG',async()=>{
 let count=0;for(const p of packages)for(const a of p.enrichment.visualReference.artifacts){assert.match(a.path,/^assets\/figma\/[a-z0-9-]+\.svg$/);await access(root+'website/'+a.path);const text=await readFile(root+'website/'+a.path,'utf8');assert.ok(text.trimEnd().endsWith('</svg>'));assert.ok(!/<script|onload=|javascript:/i.test(text));count++;}assert.equal(count,23);
});
test('readiness rejects incomplete data and cannot be passed by relabeling status alone',()=>{
 for(const p of packages)assert.equal(readiness(p).eligible,false);
 const forged=structuredClone(packages.find(p=>p.id==='button'));for(const s of Object.values(forged.enrichment))s.status='VERIFIED';for(const g of Object.values(forged.webValidation)){g.status='PASS';g.evidence=['fake'];}assert.equal(readiness(forged).eligible,false);
});
test('unknown dependency identity is preserved, never matched by display name',()=>{
 const ownerKeys=new Map(packages.flatMap(p=>p.components.map(c=>[c.componentKey,p.id])));
 for(const p of packages)for(const d of p.enrichment.relatedComponents.items)if(d.packageId)assert.equal(ownerKeys.get(d.key),d.packageId);
});
