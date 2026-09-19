import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
let failed=false;
const fail=(...x)=>{console.error(...x);failed=true;};
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const json=p=>JSON.parse(read(p));

const required=[
  'AGENTS.md','agent/SYSTEM.md','agent/runtime.json','agent/manifest.json','agent/state-machine.json',
  'agent/controller/control-contract.md','agent/controller/change-scope.schema.json','agent/planner/design-decision.schema.json',
  'agent/permissions/write-permission.json','agent/gates/quality-gates.json','agent/router/intent.json',
  'agent/product-router.json','agent/reference-router.json','agent/skill-router.json',
  'agent/flow/design-agent-flow.json','agent/flow/mutation-recovery.json','agent/flow/reentry-resume.json','agent/flow/specialized-subflows.json',
  'agent/workflows/inspect.md','agent/workflows/create-screen.md','agent/workflows/modify-screen.md','agent/workflows/review.md',
  'agent/workflows/qa.md','agent/workflows/component.md','agent/workflows/handoff.md',
  'agent/output/execution.schema.json','agent/output/decision-log.schema.json','agent/output/qa-result.schema.json',
  'agent/output/review-result.schema.json','agent/output/evidence-matrix.schema.json',
  'agent/output/baseline-fingerprint.schema.json','agent/output/resume-checkpoint.schema.json',
  'agent/evals/cases.json','agent/evals/reference-cases.json','agent/evals/skill-cases.json','agent/evals/control-cases.json',
  'agent/evals/skill-depth-cases.json','agent/evals/deep-flow-cases.json',
  'scripts/run-agent-evals.mjs','scripts/run-fidelity-evals.mjs','scripts/run-control-evals.mjs',
  'scripts/run-skill-depth-evals.mjs','scripts/run-deep-flow-evals.mjs',
  'skills/SKILL-CONTRACT.md','skills/README.md','docs/figma-sop.md','docs/design-agent-flow.md',
  'docs/figma-specialized-subflows.md','policies/write-permission.md','policies/scope-control.md'
];

for(const p of required) if(!fs.existsSync(path.join(root,p))) fail('MISSING REQUIRED FILE',p);
for(const p of required.filter(x=>x.endsWith('.json'))){
  try{json(p);console.log('OK JSON',p);}catch(e){fail('INVALID JSON',p,e.message);}
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
const flow=json('agent/flow/design-agent-flow.json');
const recovery=json('agent/flow/mutation-recovery.json');
const resume=json('agent/flow/reentry-resume.json');
const specialized=json('agent/flow/specialized-subflows.json');
const pkg=json('package.json');

if(runtime.agentVersion!=='2.3.0'||runtime.schemaVersion!=='2.3.0'||runtime.name!=='Design Control Agent') fail('RUNTIME MUST BE DESIGN CONTROL AGENT 2.3.0');
if(manifest?.agent?.version!=='2.3.0'||manifest?.agent?.name!=='Design Control Agent') fail('MANIFEST AGENT VERSION/NAME MISMATCH');
if(manifest?.schemaVersion!=='3.3.0') fail('MANIFEST SCHEMA MUST BE 3.3.0');
if(pkg.version!=='2.3.0') fail('PACKAGE VERSION MUST BE 2.3.0');
if(pkg.scripts?.['test:deep-flow']!=='node scripts/run-deep-flow-evals.mjs') fail('PACKAGE MUST RUN DEEP FLOW EVAL');
if(!(pkg.scripts?.validate||'').includes('test:deep-flow')) fail('VALIDATE MUST INCLUDE DEEP FLOW EVAL');

if(runtime.defaultWriteMode!=='read-only') fail('DEFAULT WRITE MODE MUST BE read-only');
for(const inv of [
  'baseline_before_write','pre_write_revalidation_required','stale_baseline_forces_reinspection',
  'mutation_error_requires_recovery_classification','qa_01_09_before_qa_10','final_qa_after_qa_10',
  'fix_loop_returns_through_verification_and_qa','blocked_resumable_run_emits_checkpoint',
  'component_default_read_only','specialized_subflows_cannot_bypass_parent_guards','no_pass_without_evidence'
]){
  if(!(runtime.invariants||[]).includes(inv)) fail('MISSING RUNTIME INVARIANT',inv);
}

const stateRequired=[
  'RECEIVED','RESUMING','ROUTED','INSPECTING','BASELINED','REFERENCE_RESOLVED','PLANNED',
  'READY_TO_EXECUTE','REVALIDATING','EXECUTING','RECOVERING','VERIFYING',
  'QA_PRE_REGRESSION','REGRESSION','QA_FINAL','FIXING','EVIDENCE','COMPLETE','BLOCKED'
];
for(const s of stateRequired) if(!(state.states||[]).includes(s)) fail('MISSING CONTROL STATE',s);
for(const inv of [
  'no_execute_without_write_permission','no_write_before_pre_write_revalidation','stale_baseline_returns_to_inspection',
  'mutation_error_cannot_skip_recovery_classification','qa_01_09_must_resolve_before_qa_10',
  'qa_10_must_resolve_or_be_not_applicable_before_final_qa',
  'fix_loop_returns_to_verification_not_directly_to_qa_or_complete','blocked_resumable_run_emits_resume_checkpoint',
  'no_complete_without_evidence'
]){
  if(!(state.invariants||[]).includes(inv)) fail('MISSING STATE INVARIANT',inv);
}
if(!state.transitions.some(x=>x.from==='FIXING'&&x.to==='VERIFYING')) fail('FIXING MUST RETURN TO VERIFYING');
if(state.transitions.some(x=>x.from==='FIXING'&&['QA_FINAL','EVIDENCE','COMPLETE'].includes(x.to))) fail('FIXING MUST NOT BYPASS VERIFICATION');
if(!state.transitions.some(x=>x.from==='REVALIDATING'&&x.to==='INSPECTING'&&(x.requires||[]).includes('revalidation_STALE_BASELINE'))) fail('STALE BASELINE MUST RETURN TO INSPECTION');
if(!state.transitions.some(x=>x.from==='EXECUTING'&&x.to==='RECOVERING')) fail('MUTATION ERRORS MUST ENTER RECOVERY');

const allowedPermission=['READ_ONLY','INSPECT_ALLOWED','WRITE_PENDING','WRITE_ALLOWED','WRITE_BLOCKED'];
if(JSON.stringify(permission.states)!==JSON.stringify(allowedPermission)) fail('WRITE PERMISSION STATES MISMATCH');
if(permission.default!=='READ_ONLY') fail('PERMISSION DEFAULT MUST BE READ_ONLY');
for(const guard of ['explicit_current_task_write_signal','target_resolved','scope_defined','reference_gate_PASS_or_EXPLORE_EXPLICIT','figma_write_capability_available']){
  if(!(permission.writeAllowedRequiresAll||[]).includes(guard)) fail('MISSING WRITE GUARD',guard);
}

const gateIds=['QA-01','QA-02','QA-03','QA-04','QA-05','QA-06','QA-07','QA-08','QA-09','QA-10'];
if(JSON.stringify((gates.gates||[]).map(x=>x.id))!==JSON.stringify(gateIds)) fail('QUALITY GATES MUST BE QA-01..QA-10');
if(!gates.gates.filter(x=>x.id!=='QA-10').every(x=>x.phase==='PRE_REGRESSION')) fail('QA-01..09 MUST BE PRE_REGRESSION');
if(gates.gates.find(x=>x.id==='QA-10')?.phase!=='REGRESSION') fail('QA-10 MUST BE REGRESSION PHASE');
if(JSON.stringify(gates.finalStates)!==JSON.stringify(['PASS','FAIL','BLOCKED'])) fail('FINAL GATE STATES INVALID');

const expectedPipelines={
  CREATE_SCREEN:['figma-inspect','reference-source-resolution','information-architecture','interaction-design','design-system-compliance','ux-writing-content','visual-quality','responsive-accessibility','figma-execution','design-qa','reference-fidelity','visual-regression','fix-loop','evidence'],
  MODIFY_SCREEN:['figma-inspect','reference-source-resolution','information-architecture','interaction-design','design-system-compliance','ux-writing-content','visual-quality','responsive-accessibility','figma-execution','design-qa','reference-fidelity','visual-regression','fix-loop','evidence'],
  REVIEW:['figma-inspect','ux-review','information-architecture','interaction-design','ux-writing-content','responsive-accessibility','visual-quality','design-system-compliance','evidence'],
  QA:['figma-inspect','reference-source-resolution','reference-fidelity','design-system-compliance','information-architecture','interaction-design','responsive-accessibility','ux-writing-content','visual-quality','design-qa','visual-regression','evidence'],
  COMPONENT:['figma-inspect','reference-source-resolution','design-system-compliance','interaction-design','ux-writing-content','visual-quality','responsive-accessibility','design-qa','evidence']
};
for(const [cmd,expected] of Object.entries(expectedPipelines)){
  const actual=skills.rules?.[cmd]||[];
  for(const s of expected) if(!actual.includes(s)) fail('MISSING SKILL',cmd,s);
}
for(const [id,p] of Object.entries(skills.skills||{})) if(!fs.existsSync(path.join(root,p))) fail('SKILL PATH MISSING',id,p);

for(const cmd of ['INSPECT','REVIEW','QA','HANDOFF','COMPONENT','CREATE_SCREEN','MODIFY_SCREEN']) if(!intents.commands?.[cmd]) fail('MISSING INTENT',cmd);
if(intents.commands.COMPONENT.defaultPermission!=='READ_ONLY') fail('COMPONENT MUST DEFAULT READ_ONLY');
if(intents.commands.CREATE_SCREEN.defaultPermission!=='WRITE_PENDING') fail('CREATE MUST START WRITE_PENDING');
if(intents.commands.MODIFY_SCREEN.defaultPermission!=='WRITE_PENDING') fail('MODIFY MUST START WRITE_PENDING');
if(intents.commands.REVIEW.defaultPermission!=='READ_ONLY'||intents.commands.QA.defaultPermission!=='READ_ONLY') fail('REVIEW/QA MUST BE READ_ONLY');

if(JSON.stringify(qa.properties?.result?.enum)!==JSON.stringify(['PASS','FAIL','BLOCKED'])) fail('QA FINAL RESULTS INVALID');
for(const phase of ['preRegression','visualRegression','finalAggregation']) if(!qa.properties?.phases?.properties?.[phase]) fail('QA RESULT MISSING PHASE',phase);
if(qa.properties?.evidenceMatrix?.$ref!=='evidence-matrix.schema.json') fail('QA MUST REFERENCE EVIDENCE MATRIX');
if(!(evidence.required||[]).includes('qaPhases')) fail('EVIDENCE MATRIX MUST REQUIRE QA PHASES');
const gateEnum=evidence.properties?.gates?.items?.properties?.gateId?.enum||[];
if(JSON.stringify(gateEnum)!==JSON.stringify(gateIds)) fail('EVIDENCE MATRIX GATE IDS INVALID');
if(!(evidence.properties?.gates?.items?.required||[]).includes('phase')) fail('EVIDENCE GATE MUST RECORD PHASE');

const findingReq=review.properties?.findings?.items?.required||[];
for(const f of ['findingId','severity','location','observation','impact','evidence','proposedSolution','acceptanceCriteria']) if(!findingReq.includes(f)) fail('REVIEW RESULT MISSING FIELD',f);

const products=json('agent/product-router.json').products||{};
for(const name of ['core','agency','admin']){
  if(!products[name]?.fileKey) fail('MISSING PRODUCT FILE KEY',name);
  for(const p of products[name]?.registries||[]) if(!fs.existsSync(path.join(root,p))) fail('PRODUCT REGISTRY PATH MISSING',name,p);
}
if(json('agent/reference-router.json')?.families?.agencyDashboard?.genericResolution!=='BLOCKED_REFERENCE_AMBIGUOUS') fail('GENERIC DASHBOARD MUST REMAIN AMBIGUOUS');

const parseVersion=body=>body.match(/^version:\s*([0-9]+\.[0-9]+\.[0-9]+)/m)?.[1]||null;
const gte=(a,b)=>{
  const A=a.split('.').map(Number),B=b.split('.').map(Number);
  for(let i=0;i<3;i++){if(A[i]>B[i])return true;if(A[i]<B[i])return false;}
  return true;
};
if((depth.skills||[]).length!==13) fail('SKILL DEPTH MUST COVER 13 PRIMARY SKILLS');
for(const spec of depth.skills||[]){
  if(!fs.existsSync(path.join(root,spec.path))){fail('DEPTH SKILL MISSING',spec.id);continue;}
  const body=read(spec.path),v=parseVersion(body);
  if(!v||!gte(v,depth.minimumVersion)) fail('SKILL VERSION TOO OLD',spec.id,v);
  const nonEmpty=body.split('\n').filter(x=>x.trim()).length;
  if(nonEmpty<depth.minimumNonEmptyLines) fail('SKILL TOO SHALLOW',spec.id,nonEmpty);
  for(const marker of spec.requiredMarkers||[]) if(!body.includes(marker)) fail('SKILL MARKER MISSING',spec.id,marker);
}

const deepStages=[
  'USER_REQUEST','RESOLVE_INTENT','LOAD_AGENT_SKILLS','FIGMA_INSPECT','CAPTURE_BASELINE','RESOLVE_REFERENCE',
  'DESIGN_DECISION','CHANGE_SCOPE','WRITE_PERMISSION','PRE_WRITE_REVALIDATION','FIGMA_EXECUTION_PLAN',
  'MUTATION','MUTATION_RECOVERY','VERIFICATION','QA_PRE_REGRESSION','VISUAL_REGRESSION',
  'FINAL_QA_AGGREGATION','FIX_LOOP','EVIDENCE','COMPLETE'
];
if(JSON.stringify(flow.canonicalOrder)!==JSON.stringify(deepStages)) fail('DEEP FLOW STAGE ORDER INVALID');
for(const s of deepStages) if(!(flow.stages||[]).some(x=>x.id===s)) fail('DEEP FLOW MISSING STAGE',s);
for(const cmd of ['INSPECT','REVIEW','CREATE_SCREEN','MODIFY_SCREEN','FIX','QA','HANDOFF','COMPONENT']) if(!flow.commandStageRules?.[cmd]) fail('DEEP FLOW MISSING COMMAND',cmd);

const index=id=>flow.canonicalOrder.indexOf(id);
if(!(index('QA_PRE_REGRESSION')<index('VISUAL_REGRESSION')&&index('VISUAL_REGRESSION')<index('FINAL_QA_AGGREGATION'))) fail('QA PHASE ORDER INVALID');
for(const cmd of ['CREATE_SCREEN','MODIFY_SCREEN','FIX']) if(!flow.commandStageRules[cmd].includes('PRE_WRITE_REVALIDATION')) fail('WRITE FLOW MISSING PRE-WRITE REVALIDATION',cmd);
if(flow.stages.find(x=>x.id==='PRE_WRITE_REVALIDATION')?.staleRoute!=='FIGMA_INSPECT') fail('STALE BASELINE ROUTE INVALID');
const fix=flow.stages.find(x=>x.id==='FIX_LOOP');
if(JSON.stringify(fix?.mandatoryReturnPath)!==JSON.stringify(['VERIFICATION','QA_PRE_REGRESSION','VISUAL_REGRESSION','FINAL_QA_AGGREGATION'])) fail('FIX LOOP RETURN PATH INVALID');

for(const key of ['NO_WRITE','PARTIAL_WRITE','UNKNOWN_WRITE','RECOVERED']) if(!recovery.writeStateClassification?.[key]) fail('RECOVERY CLASS MISSING',key);
if(!resume.checkpointRequired?.includes('resumeStage')) fail('RESUME CHECKPOINT MISSING resumeStage');
if(resume.mappings?.BLOCKED_REFERENCE_AMBIGUOUS?.resumeStage!=='RESOLVE_REFERENCE') fail('REFERENCE RESUME ROUTE INVALID');
if(resume.mappings?.STALE_BASELINE?.resumeStage!=='FIGMA_INSPECT') fail('STALE RESUME ROUTE INVALID');
for(const sf of ['COMPONENT','PROTOTYPE','MULTI_PAGE','RESPONSIVE']) if(!specialized.subflows?.[sf]) fail('SPECIALIZED SUBFLOW MISSING',sf);
if(!specialized.globalRule?.includes('may never bypass')) fail('SPECIALIZED SUBFLOWS MUST NOT BYPASS PARENT GUARDS');

if(manifest?.controlSystem?.deepFlow!=='agent/flow/design-agent-flow.json') fail('MANIFEST DEEP FLOW POINTER INVALID');
if(manifest?.controlSystem?.recoveryPolicy!=='agent/flow/mutation-recovery.json') fail('MANIFEST RECOVERY POINTER INVALID');
if(manifest?.controlSystem?.resumePolicy!=='agent/flow/reentry-resume.json') fail('MANIFEST RESUME POINTER INVALID');
if(manifest?.controlSystem?.specializedSubflows!=='agent/flow/specialized-subflows.json') fail('MANIFEST SUBFLOW POINTER INVALID');
if(manifest?.outputSchemas?.baselineFingerprint!=='agent/output/baseline-fingerprint.schema.json') fail('MANIFEST BASELINE SCHEMA POINTER INVALID');
if(manifest?.outputSchemas?.resumeCheckpoint!=='agent/output/resume-checkpoint.schema.json') fail('MANIFEST RESUME SCHEMA POINTER INVALID');
if(manifest?.evals?.deepFlow!=='agent/evals/deep-flow-cases.json') fail('MANIFEST DEEP FLOW EVAL POINTER INVALID');

for(const p of ['agent/SYSTEM.md','AGENTS.md','agent/COMMANDS.md','agent/workflows/create-screen.md','agent/workflows/modify-screen.md','agent/workflows/qa.md','skills/README.md']){
  const body=read(p);
  if(body.includes('PASS_WITH_GAPS')) fail('DEPRECATED FINAL STATE',p);
  if(body.includes('Design Agent v1')) fail('STALE V1 CONTRACT',p);
}
for(const marker of ['Pre-write Revalidation','Mutation Recovery','Final QA Aggregation']) if(!read('agent/SYSTEM.md').includes(marker)) fail('SYSTEM MISSING HARDENING RULE',marker);
for(const marker of ['## 26. SOP-19 — Capture baseline before write','## 27. SOP-20 — Pre-write revalidation','## 28. SOP-21 — Mutation recovery','## 29. SOP-22 — Resume / re-entry','## 30. SOP-23 — Specialized subflows','## 31. SOP-24 — Phased QA and final aggregation']) if(!read('docs/figma-sop.md').includes(marker)) fail('FIGMA SOP MISSING HARDENING SECTION',marker);
if(!read('docs/design-agent-flow.md').includes('Stage 17 — Final QA Aggregation')) fail('DEEP FLOW DOC MISSING FINAL QA');
if(!read('docs/figma-specialized-subflows.md').includes('## 4. RESPONSIVE')) fail('SPECIALIZED SUBFLOW DOC INCOMPLETE');

if(manifest?.architecture?.repositoryRole!=='knowledge_base_and_operating_contract') fail('GITHUB ROLE MUST REMAIN KB/CONTRACT');
if(manifest?.architecture?.runtimeHost!=='chatgpt'||manifest?.architecture?.figmaExecution!=='mcp_via_chatgpt') fail('RUNTIME ARCHITECTURE MISMATCH');
if(manifest?.architecture?.githubAgentExecution!==false) fail('GITHUB AGENT EXECUTION MUST REMAIN DISABLED');

if(failed) process.exit(1);
console.log('Design Control Agent v2.3 validation PASS');
