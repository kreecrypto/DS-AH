import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
let failed=false;
const fail=(...x)=>{console.error(...x);failed=true;};
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const json=p=>JSON.parse(read(p));

const required=[
  'AGENTS.md',
  'agent/SYSTEM.md',
  'agent/runtime.json',
  'agent/manifest.json',
  'agent/state-machine.json',
  'agent/controller/control-contract.md',
  'agent/controller/change-scope.schema.json',
  'agent/planner/design-decision.schema.json',
  'agent/permissions/write-permission.json',
  'agent/gates/quality-gates.json',
  'agent/router/intent.json',
  'agent/product-router.json',
  'agent/reference-router.json',
  'agent/skill-router.json',
  'agent/workflows/inspect.md',
  'agent/workflows/create-screen.md',
  'agent/workflows/modify-screen.md',
  'agent/workflows/review.md',
  'agent/workflows/qa.md',
  'agent/workflows/component.md',
  'agent/workflows/handoff.md',
  'agent/output/execution.schema.json',
  'agent/output/decision-log.schema.json',
  'agent/output/qa-result.schema.json',
  'agent/output/review-result.schema.json',
  'agent/output/evidence-matrix.schema.json',
  'agent/evals/cases.json',
  'agent/evals/reference-cases.json',
  'agent/evals/skill-cases.json',
  'agent/evals/control-cases.json',
  'agent/evals/skill-depth-cases.json',
  'scripts/run-agent-evals.mjs',
  'scripts/run-fidelity-evals.mjs',
  'scripts/run-control-evals.mjs',
  'scripts/run-skill-depth-evals.mjs',
  'skills/SKILL-CONTRACT.md',
  'skills/README.md',
  'docs/figma-sop.md',
  'docs/design-agent-flow.md',
  'agent/flow/design-agent-flow.json',
  'policies/write-permission.md',
  'policies/scope-control.md'
];

for(const p of required){
  if(!fs.existsSync(path.join(root,p))) fail('MISSING REQUIRED FILE',p);
}

for(const p of required.filter(x=>x.endsWith('.json'))){
  try{json(p); console.log('OK JSON',p);}
  catch(e){fail('INVALID JSON',p,e.message);}
}

const runtime=json('agent/runtime.json');
const manifest=json('agent/manifest.json');
const state=json('agent/state-machine.json');
const permission=json('agent/permissions/write-permission.json');
const gates=json('agent/gates/quality-gates.json');
const skills=json('agent/skill-router.json');
const intents=json('agent/router/intent.json');
const qa=json('agent/output/qa-result.schema.json');
const evidence=json('agent/output/evidence-matrix.schema.json');
const review=json('agent/output/review-result.schema.json');
const depth=json('agent/evals/skill-depth-cases.json');

if(runtime.agentVersion!=='2.2.0' || runtime.name!=='Design Control Agent') fail('RUNTIME MUST BE DESIGN CONTROL AGENT 2.2.0');
if(runtime.schemaVersion!=='2.2.0') fail('RUNTIME SCHEMA MUST BE 2.2.0');
if(manifest?.agent?.version!=='2.2.0' || manifest?.agent?.name!=='Design Control Agent') fail('MANIFEST AGENT VERSION/NAME MISMATCH');
if(manifest?.skillSystem?.contract!=='skills/SKILL-CONTRACT.md') fail('MANIFEST MUST DECLARE SKILL CONTRACT');
if(manifest?.evals?.skillDepth!=='agent/evals/skill-depth-cases.json') fail('MANIFEST MUST DECLARE SKILL DEPTH EVAL');
if(manifest?.agent?.stateMachine!=='agent/state-machine.json') fail('MANIFEST MISSING STATE MACHINE');
if(manifest?.agent?.writePermission!=='agent/permissions/write-permission.json') fail('MANIFEST MISSING WRITE PERMISSION');
if(runtime.defaultWriteMode!=='read-only') fail('DEFAULT WRITE MODE MUST BE read-only');

for(const inv of ['plan_before_execute','scope_before_execute','explicit_write_signal_required','reference_pass_does_not_equal_write_permission','no_pass_without_evidence']){
  if(!(runtime.invariants||[]).includes(inv)) fail('MISSING RUNTIME INVARIANT',inv);
}

for(const s of ['RECEIVED','ROUTED','INSPECTING','REFERENCE_RESOLVED','PLANNED','READY_TO_EXECUTE','EXECUTING','QA','FIXING','EVIDENCE','COMPLETE','BLOCKED']){
  if(!(state.states||[]).includes(s)) fail('MISSING CONTROL STATE',s);
}
if(!(state.invariants||[]).includes('no_execute_without_write_permission')) fail('STATE MACHINE MUST BLOCK UNAUTHORIZED EXECUTION');

const allowedPermission=['READ_ONLY','INSPECT_ALLOWED','WRITE_PENDING','WRITE_ALLOWED','WRITE_BLOCKED'];
if(JSON.stringify(permission.states)!==JSON.stringify(allowedPermission)) fail('WRITE PERMISSION STATES MISMATCH');
if(permission.default!=='READ_ONLY') fail('PERMISSION DEFAULT MUST BE READ_ONLY');
for(const guard of ['explicit_current_task_write_signal','target_resolved','scope_defined','reference_gate_PASS_or_EXPLORE_EXPLICIT','figma_write_capability_available']){
  if(!(permission.writeAllowedRequiresAll||[]).includes(guard)) fail('MISSING WRITE GUARD',guard);
}

const requiredGateIds=['QA-01','QA-02','QA-03','QA-04','QA-05','QA-06','QA-07','QA-08','QA-09','QA-10'];
const actualGateIds=(gates.gates||[]).map(x=>x.id);
if(JSON.stringify(actualGateIds)!==JSON.stringify(requiredGateIds)) fail('QUALITY GATES MUST BE QA-01..QA-10 IN ORDER');
if(JSON.stringify(gates.finalStates)!==JSON.stringify(['PASS','FAIL','BLOCKED'])) fail('FINAL GATE STATES INVALID');

const expectedPipelines={
  CREATE_SCREEN:['figma-inspect','reference-source-resolution','information-architecture','interaction-design','design-system-compliance','ux-writing-content','visual-quality','responsive-accessibility','figma-execution','design-qa','reference-fidelity','visual-regression','fix-loop','evidence'],
  MODIFY_SCREEN:['figma-inspect','reference-source-resolution','information-architecture','interaction-design','design-system-compliance','ux-writing-content','visual-quality','responsive-accessibility','figma-execution','design-qa','reference-fidelity','visual-regression','fix-loop','evidence'],
  REVIEW:['figma-inspect','ux-review','information-architecture','interaction-design','ux-writing-content','responsive-accessibility','visual-quality','design-system-compliance','evidence'],
  QA:['figma-inspect','reference-source-resolution','reference-fidelity','design-system-compliance','information-architecture','interaction-design','responsive-accessibility','ux-writing-content','visual-quality','design-qa','visual-regression','evidence']
};
for(const [cmd,expected] of Object.entries(expectedPipelines)){
  const actual=skills.rules?.[cmd]||[];
  for(const s of expected) if(!actual.includes(s)) fail('MISSING SKILL',cmd,s);
}
for(const [id,p] of Object.entries(skills.skills||{})){
  if(!fs.existsSync(path.join(root,p))) fail('SKILL PATH MISSING',id,p);
}

for(const cmd of ['INSPECT','REVIEW','QA','HANDOFF','COMPONENT','CREATE_SCREEN','MODIFY_SCREEN']){
  if(!intents.commands?.[cmd]) fail('MISSING INTENT',cmd);
}
if(intents.commands.CREATE_SCREEN.defaultPermission!=='WRITE_PENDING') fail('CREATE MUST START WRITE_PENDING');
if(intents.commands.MODIFY_SCREEN.defaultPermission!=='WRITE_PENDING') fail('MODIFY MUST START WRITE_PENDING');
if(intents.commands.REVIEW.defaultPermission!=='READ_ONLY') fail('REVIEW MUST BE READ_ONLY');
if(intents.commands.QA.defaultPermission!=='READ_ONLY') fail('QA MUST BE READ_ONLY');
if(!(intents.explicitWriteSignals||[]).length) fail('EXPLICIT WRITE SIGNALS REQUIRED');

if(JSON.stringify(qa.properties?.result?.enum)!==JSON.stringify(['PASS','FAIL','BLOCKED'])) fail('QA FINAL RESULTS INVALID');
if(qa.properties?.evidenceMatrix?.$ref!=='evidence-matrix.schema.json') fail('QA MUST REFERENCE EVIDENCE MATRIX SCHEMA');
const gateEnum=evidence.properties?.gates?.items?.properties?.gateId?.enum||[];
if(JSON.stringify(gateEnum)!==JSON.stringify(requiredGateIds)) fail('EVIDENCE MATRIX GATE IDS INVALID');

const findingReq=review.properties?.findings?.items?.required||[];
for(const f of ['findingId','severity','location','observation','impact','evidence','proposedSolution','acceptanceCriteria']){
  if(!findingReq.includes(f)) fail('REVIEW RESULT MISSING REQUIRED FIELD',f);
}

const products=json('agent/product-router.json').products||{};
for(const name of ['core','agency','admin']){
  if(!products[name]?.fileKey) fail('MISSING PRODUCT FILE KEY',name);
  for(const p of products[name]?.registries||[]){
    if(!fs.existsSync(path.join(root,p))) fail('PRODUCT REGISTRY PATH MISSING',name,p);
  }
}

const referenceRouter=json('agent/reference-router.json');
if(referenceRouter?.families?.agencyDashboard?.genericResolution!=='BLOCKED_REFERENCE_AMBIGUOUS') fail('GENERIC DASHBOARD MUST REMAIN AMBIGUOUS');

const parseVersion=body=>{
  const m=body.match(/^version:\s*([0-9]+\.[0-9]+\.[0-9]+)/m);
  return m?.[1] || null;
};
const gte=(a,b)=>{
  const A=a.split('.').map(Number), B=b.split('.').map(Number);
  for(let i=0;i<3;i++){
    if(A[i]>B[i]) return true;
    if(A[i]<B[i]) return false;
  }
  return true;
};

if((depth.skills||[]).length!==13) fail('SKILL DEPTH SPEC MUST COVER 13 PRIMARY SKILLS');

for(const spec of depth.skills||[]){
  if(!fs.existsSync(path.join(root,spec.path))){
    fail('DEPTH SKILL FILE MISSING',spec.id,spec.path);
    continue;
  }
  const body=read(spec.path);
  const version=parseVersion(body);
  if(!version || !gte(version,depth.minimumVersion)) fail('SKILL VERSION TOO OLD',spec.id,version,depth.minimumVersion);
  const nonEmpty=body.split('\n').filter(x=>x.trim().length>0).length;
  if(nonEmpty<depth.minimumNonEmptyLines) fail('SKILL TOO SHALLOW',spec.id,nonEmpty,depth.minimumNonEmptyLines);
  for(const marker of spec.requiredMarkers||[]){
    if(!body.includes(marker)) fail('SKILL CONTRACT MARKER MISSING',spec.id,marker);
  }
  for(const forbidden of ['PASS_WITH_GAPS','PASS_WITH_P2']){
    if(body.includes(forbidden)) fail('DEPRECATED RESULT STATE IN SKILL',spec.id,forbidden);
  }
}

const skillContract=read('skills/SKILL-CONTRACT.md');
for(const marker of ['Mission','Activate when','Required inputs','Anti-patterns','Required evidence','Downstream handoff']){
  if(!skillContract.includes(marker)) fail('SKILL CONTRACT MISSING PRINCIPLE',marker);
}

for(const p of ['agent/SYSTEM.md','AGENTS.md','agent/COMMANDS.md','agent/workflows/create-screen.md','agent/workflows/modify-screen.md','agent/workflows/qa.md','skills/README.md']){
  const body=read(p);
  if(body.includes('PASS_WITH_GAPS')) fail('DEPRECATED FINAL STATE',p);
  if(body.includes('Design Agent v1')) fail('STALE V1 CONTRACT',p);
}

if(!read('agent/SYSTEM.md').includes('Production Skill Contract')) fail('SYSTEM MUST DECLARE PRODUCTION SKILL CONTRACT');
if(!read('AGENTS.md').includes('Skill loading quality')) fail('AGENTS ENTRYPOINT MUST DECLARE FULL SKILL LOADING');



const deepFlow=json('agent/flow/design-agent-flow.json');
const expectedDeepStages=['USER_REQUEST','RESOLVE_INTENT','LOAD_AGENT_SKILLS','FIGMA_INSPECT','RESOLVE_REFERENCE','DESIGN_DECISION','CHANGE_SCOPE','WRITE_PERMISSION','FIGMA_EXECUTION_PLAN','MUTATION','VERIFICATION','DESIGN_QA','VISUAL_REGRESSION','FIX_LOOP','EVIDENCE','COMPLETE'];
if(JSON.stringify(deepFlow?.canonicalOrder)!==JSON.stringify(expectedDeepStages)) fail('DEEP FLOW STAGE ORDER INVALID');
for(const stage of expectedDeepStages){
  if(!(deepFlow?.stages||[]).some(x=>x.id===stage)) fail('DEEP FLOW MISSING STAGE',stage);
}
for(const cmd of ['INSPECT','REVIEW','CREATE_SCREEN','MODIFY_SCREEN','QA','HANDOFF']){
  if(!deepFlow?.commandStageRules?.[cmd]) fail('DEEP FLOW MISSING COMMAND STAGE RULE',cmd);
}
for(const inv of ['no_mutation_before_inspection','no_mutation_before_design_decision','no_mutation_before_scope','no_mutation_without_write_allowed','tool_success_is_not_verification','no_pass_without_evidence']){
  if(!(deepFlow?.invariants||[]).includes(inv)) fail('DEEP FLOW MISSING INVARIANT',inv);
}
if(manifest?.controlSystem?.deepFlow!=='agent/flow/design-agent-flow.json') fail('MANIFEST MUST DECLARE MACHINE-READABLE DEEP FLOW');
if(manifest?.workflows?.deepFlow!=='docs/design-agent-flow.md') fail('MANIFEST MUST DECLARE DEEP FLOW DOC');
if(!read('agent/SYSTEM.md').includes('docs/design-agent-flow.md')) fail('SYSTEM MUST REFERENCE DEEP FLOW');
if(!read('docs/figma-sop.md').includes('docs/design-agent-flow.md')) fail('FIGMA SOP MUST REFERENCE DEEP FLOW');

if(manifest?.figma?.sop!=='docs/figma-sop.md') fail('MANIFEST MUST DECLARE FIGMA SOP');
const figmaSop=read('docs/figma-sop.md');
for(const marker of ['## 3. Mandatory operating flow','## 5. SOP-01 — Inspect first','## 8. SOP-04 — Work incrementally','## 14. SOP-10 — Return affected node IDs','## 15. SOP-11 — Verify every material mutation','## 23. Hard prohibitions']){
  if(!figmaSop.includes(marker)) fail('FIGMA SOP MISSING REQUIRED SECTION',marker);
}
if(!read('agent/SYSTEM.md').includes('docs/figma-sop.md')) fail('SYSTEM MUST REFERENCE FIGMA SOP');
if(!read('AGENTS.md').includes('docs/figma-sop.md')) fail('AGENTS ENTRYPOINT MUST REFERENCE FIGMA SOP');

if(manifest?.architecture?.repositoryRole!=='knowledge_base_and_operating_contract') fail('GITHUB ROLE MUST REMAIN KB/CONTRACT');
if(manifest?.architecture?.runtimeHost!=='chatgpt' || manifest?.architecture?.figmaExecution!=='mcp_via_chatgpt') fail('RUNTIME ARCHITECTURE MISMATCH');
if(manifest?.architecture?.githubAgentExecution!==false) fail('GITHUB AGENT EXECUTION MUST REMAIN DISABLED');

if(failed) process.exit(1);
console.log('Design Control Agent v2.2 validation PASS');
