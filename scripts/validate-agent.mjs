import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();

const required=[
  'AGENTS.md',
  'agent/SYSTEM.md',
  'agent/runtime.json',
  'agent/product-router.json',
  'agent/router/intent.json',
  'agent/reference-router.json',
  'agent/skill-router.json',
  'agent/workflows/create-screen.md',
  'agent/workflows/modify-screen.md',
  'agent/workflows/review.md',
  'agent/workflows/qa.md',
  'agent/output/execution.schema.json',
  'agent/output/decision-log.schema.json',
  'agent/output/qa-result.schema.json',
  'agent/output/evidence-matrix.schema.json',
  'agent/evals/cases.json',
  'agent/evals/reference-cases.json',
  'agent/evals/skill-cases.json',
  'skills/README.md',
  'skills/core/figma-inspect/SKILL.md',
  'skills/core/reference-source-resolution/SKILL.md',
  'skills/core/information-architecture/SKILL.md',
  'skills/core/interaction-design/SKILL.md',
  'skills/core/design-system-compliance/SKILL.md',
  'skills/core/ux-writing-content/SKILL.md',
  'skills/core/visual-quality/SKILL.md',
  'skills/core/responsive-accessibility/SKILL.md',
  'skills/core/figma-execution/SKILL.md',
  'skills/core/design-qa/SKILL.md',
  'skills/core/reference-fidelity/SKILL.md',
  'skills/core/visual-regression/SKILL.md',
  'skills/core/fix-loop/SKILL.md',
  'skills/core/ux-review/SKILL.md',
  'skills/core/developer-handoff/SKILL.md',
  'skills/core/evidence/SKILL.md'
];

let failed=false;
const fail=(...args)=>{ console.error(...args); failed=true; };

for(const rel of required){
  if(!fs.existsSync(path.join(root,rel))) fail('MISSING REQUIRED FILE',rel);
}

const jsonPaths=required.filter(x=>x.endsWith('.json'));
const parsed={};
for(const rel of jsonPaths){
  try{
    parsed[rel]=JSON.parse(fs.readFileSync(path.join(root,rel),'utf8'));
    console.log('OK JSON',rel);
  }catch(e){
    fail('INVALID JSON',rel,e.message);
  }
}

const runtime=parsed['agent/runtime.json'];
if(runtime?.defaultWriteMode!=='read-only') fail('DEFAULT WRITE MODE MUST BE read-only');

const products=parsed['agent/product-router.json']?.products||{};
for(const name of ['core','agency','admin']){
  if(!products[name]?.fileKey) fail('MISSING PRODUCT FILE KEY',name);
  for(const rel of products[name]?.registries||[]){
    if(!fs.existsSync(path.join(root,rel))) fail('PRODUCT ROUTER REFERENCES MISSING FILE',name,rel);
  }
}

const intents=parsed['agent/router/intent.json']?.commands||{};
for(const name of ['INSPECT','REVIEW','QA','HANDOFF','COMPONENT','CREATE_SCREEN','MODIFY_SCREEN']){
  if(!intents[name]) fail('MISSING INTENT',name);
}

const referenceRouter=parsed['agent/reference-router.json'];
if(!referenceRouter?.families?.agencyDashboard) fail('MISSING AGENCY DASHBOARD REFERENCE FAMILY');
if(referenceRouter?.families?.agencyDashboard?.genericResolution!=='BLOCKED_REFERENCE_AMBIGUOUS'){
  fail('GENERIC DASHBOARD MUST BE REFERENCE-AMBIGUOUS');
}

const skillRouter=parsed['agent/skill-router.json'];
for(const [skill,rel] of Object.entries(skillRouter?.skills||{})){
  if(!fs.existsSync(path.join(root,rel))) fail('SKILL ROUTER REFERENCES MISSING FILE',skill,rel);
}

const expectedPipelines={
  CREATE_SCREEN:[
    'figma-inspect','reference-source-resolution','information-architecture','interaction-design',
    'design-system-compliance','ux-writing-content','visual-quality','responsive-accessibility',
    'figma-execution','design-qa','reference-fidelity','visual-regression','fix-loop','evidence'
  ],
  MODIFY_SCREEN:[
    'figma-inspect','reference-source-resolution','information-architecture','interaction-design',
    'design-system-compliance','ux-writing-content','visual-quality','responsive-accessibility',
    'figma-execution','design-qa','reference-fidelity','visual-regression','fix-loop','evidence'
  ],
  REVIEW:[
    'figma-inspect','ux-review','information-architecture','interaction-design','ux-writing-content',
    'responsive-accessibility','visual-quality','design-system-compliance','evidence'
  ],
  QA:[
    'figma-inspect','reference-source-resolution','reference-fidelity','design-system-compliance',
    'interaction-design','responsive-accessibility','ux-writing-content','visual-quality','design-qa','evidence'
  ]
};

for(const [command,expected] of Object.entries(expectedPipelines)){
  const actual=skillRouter?.rules?.[command]||[];
  for(const skill of expected){
    if(!actual.includes(skill)) fail('MISSING REQUIRED SKILL ROUTE',command,skill);
  }
}

const skillCases=parsed['agent/evals/skill-cases.json']?.cases||[];
for(const c of skillCases){
  const actual=skillRouter?.rules?.[c.command]||[];
  for(const skill of c.mustInclude||[]){
    if(!actual.includes(skill)) fail('SKILL EVAL FAILED',c.id,c.command,skill);
  }
}

const manifest=JSON.parse(fs.readFileSync(path.join(root,'agent/manifest.json'),'utf8'));
if(manifest?.architecture?.repositoryRole!=='knowledge_base_and_operating_contract'){
  fail('GITHUB MUST REMAIN KB/OPERATING CONTRACT ONLY');
}
if(manifest?.architecture?.runtimeHost!=='chatgpt' || manifest?.architecture?.figmaExecution!=='mcp_via_chatgpt'){
  fail('RUNTIME MUST BE CHATGPT WITH FIGMA MCP EXECUTION');
}
if(manifest?.architecture?.githubAgentExecution!==false){
  fail('GITHUB AGENT EXECUTION MUST BE DISABLED');
}
if(manifest?.agent?.skillRouter!=='agent/skill-router.json'){
  fail('MANIFEST MUST DECLARE SKILL ROUTER');
}

const allowedFinal=['PASS','FAIL','BLOCKED'];
const manifestStates=manifest?.agent?.finalQaStates||[];
if(JSON.stringify(manifestStates)!==JSON.stringify(allowedFinal)){
  fail('FINAL QA STATES MUST BE EXACTLY PASS/FAIL/BLOCKED');
}

const qaSchema=parsed['agent/output/qa-result.schema.json'];
const qaEnums=qaSchema?.properties?.result?.enum||[];
if(JSON.stringify(qaEnums)!==JSON.stringify(allowedFinal)){
  fail('QA RESULT SCHEMA MUST USE PASS/FAIL/BLOCKED');
}

const evidenceSchema=parsed['agent/output/evidence-matrix.schema.json'];
const evEnums=evidenceSchema?.properties?.finalResult?.enum||[];
if(JSON.stringify(evEnums)!==JSON.stringify(allowedFinal)){
  fail('EVIDENCE MATRIX MUST USE PASS/FAIL/BLOCKED');
}

for(const rel of [
  'agent/SYSTEM.md',
  'agent/workflows/create-screen.md',
  'agent/workflows/modify-screen.md',
  'agent/workflows/review.md',
  'agent/workflows/qa.md',
  'skills/README.md',
  'skills/core/design-qa/SKILL.md',
  'skills/core/evidence/SKILL.md'
]){
  const body=fs.readFileSync(path.join(root,rel),'utf8');
  if(body.includes('PASS_WITH_GAPS')) fail('DEPRECATED QA STATE FOUND',rel,'PASS_WITH_GAPS');
}

const visual=fs.readFileSync(path.join(root,'skills/core/visual-quality/SKILL.md'),'utf8');
for(const marker of ['Visual Quality Gate','Anti-drift protocol','Hierarchy','Spacing rhythm','Edge quality']){
  if(!visual.includes(marker)) fail('VISUAL QUALITY SKILL MISSING',marker);
}

const evidence=fs.readFileSync(path.join(root,'skills/core/evidence/SKILL.md'),'utf8');
for(const marker of ['Evidence Matrix','loadedSkills','No PASS without evidence']){
  if(!evidence.includes(marker)) fail('EVIDENCE SKILL MISSING',marker);
}

const fix=fs.readFileSync(path.join(root,'skills/core/fix-loop/SKILL.md'),'utf8');
for(const marker of ['Re-run the failed gate','Re-run dependent gates','BLOCKED']){
  if(!fix.includes(marker)) fail('FIX LOOP SKILL MISSING',marker);
}

if(runtime?.invariants && !runtime.invariants.includes('reference_before_layout')){
  fail('MISSING reference_before_layout INVARIANT');
}

if(failed) process.exit(1);
console.log('Design Agent v2.0 validation PASS');
