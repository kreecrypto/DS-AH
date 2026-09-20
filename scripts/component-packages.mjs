import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
export const requiredSections=['anatomy','usage','accessibility','tokenDependencySubset','examples','visualReference','relatedComponents'];
export function readiness(pkg){
  const blockers=[];
  if(!pkg.components.length)blockers.push('EMPTY_FIGMA_SOURCE');
  for(const key of requiredSections){const section=pkg.enrichment[key];if(!section||typeof section!=='object'||section.status!=='VERIFIED')blockers.push(key+':'+(section?.status||'MISSING'));
    if(section?.status==='VERIFIED'&&(!Array.isArray(section.evidence)||!section.evidence.length))blockers.push(key+':MISSING_EVIDENCE');}
  for(const gate of ['runtime','responsive','accessibility','visualRegression'])if(pkg.webValidation?.[gate]?.status!=='PASS'||!pkg.webValidation[gate].evidence?.length)blockers.push(gate+':NOT_VERIFIED');
  if(pkg.enrichment.anatomy?.coverageStatus!=='ALL_VARIANTS')blockers.push('anatomy:ALL_VARIANTS_REQUIRED');
  if(pkg.enrichment.usage?.reviewStatus!=='APPROVED')blockers.push('usage:OWNER_REVIEW_REQUIRED');
  if(pkg.enrichment.accessibility?.testStatus!=='PASS')blockers.push('accessibility:TEST_REQUIRED');
  if(pkg.enrichment.examples?.runtimeStatus!=='PASS')blockers.push('examples:EXECUTABLE_EXAMPLES_REQUIRED');
  if(pkg.enrichment.visualReference?.comparisonStatus!=='PASS')blockers.push('visualReference:COMPARISON_REQUIRED');
  if(pkg.enrichment.tokenDependencySubset?.tokens?.some(t=>t.status!=='VERIFIED_LIVE_FIGMA'))blockers.push('tokens:UNRESOLVED_DEPENDENCIES');
  return {eligible:blockers.length===0,blockers};
}
export async function loadComponentPackages(root){
  const read=async path=>JSON.parse(await readFile(join(root,path),'utf8'));
  const index=await read('source/components/index.json');
  const packages=await Promise.all(index.packages.map(p=>read(p.path)));
  if(new Set(packages.map(p=>p.id)).size!==packages.length)throw Error('Duplicate package IDs');
  for(const p of packages){if(!/^[a-z0-9-]+$/.test(p.id)||p.website.route!=='/components/'+p.id)throw Error('Invalid package route');for(const key of requiredSections)if(typeof p.enrichment[key]!=='object')throw Error('Unstructured enrichment: '+p.id+'/'+key);}
  for(const p of packages){const result=readiness(p);if(p.status==='WEB_READY'&&!result.eligible)throw Error('Invalid WEB_READY claim: '+p.id+' '+result.blockers.join(', '));if(p.status!==p.website.publishState)throw Error('Publish state mismatch: '+p.id);}
  return {schemaVersion:'2.0.0',packages,generatedFrom:'source/components/index.json'};
}
