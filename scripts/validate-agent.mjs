import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const required=[
  '.github/agents/design-agent.agent.md',
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
  'agent/output/execution.schema.json',
  'agent/output/decision-log.schema.json',
  'agent/output/qa-result.schema.json',
  'agent/evals/cases.json',
  'agent/evals/reference-cases.json'
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
if(runtime?.invariants && !runtime.invariants.includes('reference_before_layout')){
  console.error('MISSING reference_before_layout INVARIANT');
  failed=true;
}


const githubAgentPath=path.join(root,'.github/agents/design-agent.agent.md');
const githubAgent=fs.readFileSync(githubAgentPath,'utf8');
for(const requiredText of [
  'name: design-agent',
  'description:',
  'target: github-copilot',
  'agent/SYSTEM.md',
  'agent/reference-router.json',
  'Reference Fidelity Gate',
  'BLOCKED_REFERENCE_AMBIGUOUS',
  'Master before invention'
]){
  if(!githubAgent.includes(requiredText)){
    console.error('INVALID GITHUB DESIGN AGENT PROFILE: missing',requiredText);
    failed=true;
  }
}

if(failed) process.exit(1);
console.log('Design Agent v1 validation PASS');
