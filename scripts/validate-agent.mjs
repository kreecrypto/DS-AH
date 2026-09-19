import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const required=[
  'agent/SYSTEM.md',
  'agent/runtime.json',
  'agent/product-router.json',
  'agent/router/intent.json',
  'agent/router/route-task.md',
  'agent/router/source-selector.md',
  'agent/decisions/component-resolution.md',
  'agent/decisions/source-of-truth.md',
  'agent/decisions/create-vs-reuse.md',
  'agent/decisions/reference-resolution.md',
  'agent/reference-router.json',
  'agent/skill-router.json',
  'agent/output/execution.schema.json',
  'agent/output/decision-log.schema.json',
  'agent/output/qa-result.schema.json',
  'agent/evals/cases.json',
  'agent/evals/reference-cases.json',
  'agent/evals/skill-cases.json',
  'skills/README.md',
  'skills/core/figma-inspect/SKILL.md',
  'skills/core/design-system-compliance/SKILL.md',
  'skills/core/visual-quality/SKILL.md',
  'skills/core/ux-review/SKILL.md',
  'skills/core/figma-execution/SKILL.md',
  'skills/core/design-qa/SKILL.md',
  'skills/core/responsive-accessibility/SKILL.md',
  'skills/core/developer-handoff/SKILL.md'
];

let failed=false;
for(const rel of required){
  if(!fs.existsSync(path.join(root,rel))){
    console.error('MISSING AGENT FILE',rel);
    failed=true;
  }
}

const jsonFiles=required.filter(x=>x.endsWith('.json'));
const parsed={};
for(const rel of jsonFiles){
  try{
    parsed[rel]=JSON.parse(fs.readFileSync(path.join(root,rel),'utf8'));
    console.log('OK AGENT JSON',rel);
  }catch(e){
    console.error('INVALID AGENT JSON',rel,e.message);
    failed=true;
  }
}

const runtime=parsed['agent/runtime.json'];
if(runtime?.defaultWriteMode!=='read-only'){
  console.error('AGENT DEFAULT WRITE MODE MUST BE read-only');
  failed=true;
}

const products=parsed['agent/product-router.json']?.products||{};
for(const name of ['core','agency','admin']){
  if(!products[name]?.fileKey){
    console.error('MISSING PRODUCT FILE KEY',name);
    failed=true;
  }
  for(const rel of products[name]?.registries||[]){
    if(!fs.existsSync(path.join(root,rel))){
      console.error('PRODUCT ROUTER REFERENCES MISSING FILE',name,rel);
      failed=true;
    }
  }
}

const intents=parsed['agent/router/intent.json']?.commands||{};
for(const name of ['INSPECT','REVIEW','QA','HANDOFF','COMPONENT','CREATE_SCREEN','MODIFY_SCREEN']){
  if(!intents[name]){
    console.error('MISSING INTENT',name);
    failed=true;
  }
}

const referenceRouter=parsed['agent/reference-router.json'];
if(!referenceRouter?.families?.agencyDashboard){
  console.error('MISSING AGENCY DASHBOARD REFERENCE FAMILY');
  failed=true;
}
if(referenceRouter?.families?.agencyDashboard?.genericResolution!=='BLOCKED_REFERENCE_AMBIGUOUS'){
  console.error('GENERIC DASHBOARD MUST BE REFERENCE-AMBIGUOUS');
  failed=true;
}

const skillRouter=parsed['agent/skill-router.json'];
const requiredCreateSkills=['figma-inspect','design-system-compliance','visual-quality','figma-execution','design-qa'];
for(const command of ['CREATE_SCREEN','MODIFY_SCREEN']){
  const loaded=skillRouter?.rules?.[command]||[];
  for(const skill of requiredCreateSkills){
    if(!loaded.includes(skill)){
      console.error('MISSING REQUIRED SKILL ROUTE',command,skill);
      failed=true;
    }
  }
}
for(const [skill,rel] of Object.entries(skillRouter?.skills||{})){
  if(!fs.existsSync(path.join(root,rel))){
    console.error('SKILL ROUTER REFERENCES MISSING FILE',skill,rel);
    failed=true;
  }
}

const manifest=JSON.parse(fs.readFileSync(path.join(root,'agent/manifest.json'),'utf8'));
if(manifest?.architecture?.repositoryRole!=='knowledge_base_and_operating_contract'){
  console.error('GITHUB MUST REMAIN KB/OPERATING CONTRACT ONLY');
  failed=true;
}
if(manifest?.architecture?.runtimeHost!=='chatgpt' || manifest?.architecture?.figmaExecution!=='mcp_via_chatgpt'){
  console.error('RUNTIME MUST BE CHATGPT WITH FIGMA MCP EXECUTION');
  failed=true;
}
if(manifest?.architecture?.githubAgentExecution!==false){
  console.error('GITHUB AGENT EXECUTION MUST BE DISABLED');
  failed=true;
}
if(manifest?.agent?.skillRouter!=='agent/skill-router.json'){
  console.error('MANIFEST MUST DECLARE SKILL ROUTER');
  failed=true;
}

if(runtime?.invariants && !runtime.invariants.includes('reference_before_layout')){
  console.error('MISSING reference_before_layout INVARIANT');
  failed=true;
}

const visualQuality=fs.readFileSync(path.join(root,'skills/core/visual-quality/SKILL.md'),'utf8');
for(const marker of ['Visual Quality Gate','Anti-drift protocol','Hierarchy','Spacing rhythm','Edge quality']){
  if(!visualQuality.includes(marker)){
    console.error('VISUAL QUALITY SKILL MISSING',marker);
    failed=true;
  }
}

if(failed) process.exit(1);
console.log('Design Agent v1.2 validation PASS');
