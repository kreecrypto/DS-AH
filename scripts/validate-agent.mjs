import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
let failed=false;
const fail=(...x)=>{console.error(...x);failed=true;};
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const json=p=>JSON.parse(read(p));

const required=[
  'AGENTS.md','agent/SYSTEM.md','agent/runtime.json','agent/manifest.json','agent/state-machine.json',
  'agent/reference-router.json','agent/reference/reference-lock.json','agent/reference/reference-lock.schema.json',
  'agent/controller/control-contract.md','agent/controller/change-scope.schema.json',
  'agent/planner/design-decision.schema.json','agent/planner/visual-grammar.schema.json','agent/planner/design-system-mapping.schema.json',
  'agent/permissions/write-permission.json','agent/gates/quality-gates.json','agent/router/intent.json',
  'agent/product-router.json','agent/skill-router.json',
  'agent/flow/design-agent-flow.json','agent/flow/reference-reproduce.json','agent/flow/mutation-recovery.json',
  'agent/flow/reentry-resume.json','agent/flow/specialized-subflows.json',
  'agent/workflows/inspect.md','agent/workflows/create-screen.md','agent/workflows/modify-screen.md',
  'agent/workflows/review.md','agent/workflows/qa.md','agent/workflows/component.md','agent/workflows/handoff.md',
  'agent/output/execution.schema.json','agent/output/decision-log.schema.json','agent/output/qa-result.schema.json',
  'agent/output/review-result.schema.json','agent/output/evidence-matrix.schema.json',
  'agent/output/baseline-fingerprint.schema.json','agent/output/resume-checkpoint.schema.json',
  'agent/evals/cases.json','agent/evals/reference-cases.json','agent/evals/skill-cases.json',
  'agent/evals/control-cases.json','agent/evals/skill-depth-cases.json','agent/evals/deep-flow-cases.json',
  'scripts/run-agent-evals.mjs','scripts/run-fidelity-evals.mjs','scripts/run-control-evals.mjs',
  'scripts/run-skill-depth-evals.mjs','scripts/run-deep-flow-evals.mjs',
  'skills/SKILL-CONTRACT.md','skills/README.md','docs/figma-sop.md','docs/design-agent-flow.md',
  'docs/figma-specialized-subflows.md','docs/reference-fidelity-hardening.md',
  'policies/source-priority.md','policies/write-permission.md','policies/scope-control.md'
];

for(const p of required){
  if(!fs.existsSync(path.join(root,p))) fail('MISSING REQUIRED FILE',p);
}

for(const p of required.filter(x=>x.endsWith('.json'))){
  try{json(p);console.log('OK JSON',p);}catch(e){fail('INVALID JSON',p,e.message);}
}

const runtime=json('agent/runtime.json');
const manifest=json('agent/manifest.json');
const state=json('agent/state-machine.json');
const permission=json('agent/permissions/write-permission.json');
const gates=json('agent/gates/quality-gates.json');
const flow=json('agent/flow/design-agent-flow.json');
const refRouter=json('agent/reference-router.json');
const refLock=json('agent/reference/reference-lock.json');
const reproduce=json('agent/flow/reference-reproduce.json');
const recovery=json('agent/flow/mutation-recovery.json');
const resume=json('agent/flow/reentry-resume.json');
const specialized=json('agent/flow/specialized-subflows.json');
const qa=json('agent/output/qa-result.schema.json');
const evidence=json('agent/output/evidence-matrix.schema.json');
const designDecision=json('agent/planner/design-decision.schema.json');
const execution=json('agent/output/execution.schema.json');
const pkg=json('package.json');
const skills=json('agent/skill-router.json');
const intents=json('agent/router/intent.json');
const depth=json('agent/evals/skill-depth-cases.json');

if(runtime.agentVersion!=='2.4.0'||runtime.schemaVersion!=='2.4.0') fail('RUNTIME MUST BE 2.4.0');
if(manifest?.agent?.version!=='2.4.0') fail('MANIFEST AGENT MUST BE 2.4.0');
if(manifest?.schemaVersion!=='3.4.0') fail('MANIFEST SCHEMA MUST BE 3.4.0');
if(pkg.version!=='2.4.0') fail('PACKAGE MUST BE 2.4.0');

if(runtime?.architecture?.chat!=='agent_runtime_and_decision_maker') fail('RUNTIME CHAT ROLE INVALID');
if(runtime?.architecture?.github!=='brain_knowledge_and_operating_contract') fail('RUNTIME GITHUB ROLE INVALID');
if(runtime?.architecture?.figma!=='workspace_inspect_write_verify') fail('RUNTIME FIGMA ROLE INVALID');

for(const inv of [
  'exact_current_user_visual_ref_has_visual_authority_priority',
  'missing_requested_prior_ref_blocks_instead_of_master_fallback',
  'reference_lock_before_visual_grammar',
  'visual_grammar_before_design_decision',
  'system_mapping_preserves_locked_visual_role',
  'reproduce_skeleton_before_detail',
  'side_by_side_visual_evidence_for_reference_fidelity',
  'qa_01a_and_01b_separate',
  'no_pass_without_evidence'
]){
  if(!(runtime.invariants||[]).includes(inv)) fail('MISSING RUNTIME INVARIANT',inv);
}

const expectedStages=[
  'USER_REQUEST','RESOLVE_INTENT','LOAD_AGENT_SKILLS','FIGMA_INSPECT','CAPTURE_BASELINE',
  'RESOLVE_REFERENCE','REFERENCE_LOCK','VISUAL_GRAMMAR_EXTRACTION','DESIGN_SYSTEM_MAPPING',
  'DESIGN_DECISION','CHANGE_SCOPE','WRITE_PERMISSION','PRE_WRITE_REVALIDATION',
  'FIGMA_EXECUTION_PLAN','MUTATION','MUTATION_RECOVERY','VERIFICATION',
  'QA_PRE_REGRESSION','VISUAL_REGRESSION','FINAL_QA_AGGREGATION','FIX_LOOP','EVIDENCE','COMPLETE'
];
if(JSON.stringify(flow.canonicalOrder)!==JSON.stringify(expectedStages)) fail('DEEP FLOW ORDER INVALID');

const idx=id=>flow.canonicalOrder.indexOf(id);
if(!(idx('RESOLVE_REFERENCE')<idx('REFERENCE_LOCK')&&idx('REFERENCE_LOCK')<idx('VISUAL_GRAMMAR_EXTRACTION')&&idx('VISUAL_GRAMMAR_EXTRACTION')<idx('DESIGN_SYSTEM_MAPPING')&&idx('DESIGN_SYSTEM_MAPPING')<idx('DESIGN_DECISION'))){
  fail('REFERENCE/GRAMMAR/MAPPING ORDER INVALID');
}
for(const cmd of ['CREATE_SCREEN','MODIFY_SCREEN','FIX']){
  for(const stage of ['REFERENCE_LOCK','VISUAL_GRAMMAR_EXTRACTION','DESIGN_SYSTEM_MAPPING','PRE_WRITE_REVALIDATION']){
    if(!flow.commandStageRules?.[cmd]?.includes(stage)) fail('WRITE FLOW MISSING STAGE',cmd,stage);
  }
}

const stateRequired=['REFERENCE_LOCKED','GRAMMAR_EXTRACTED','SYSTEM_MAPPED','REVALIDATING','RECOVERING','QA_PRE_REGRESSION','REGRESSION','QA_FINAL'];
for(const s of stateRequired) if(!(state.states||[]).includes(s)) fail('MISSING STATE',s);
if(!state.transitions.some(x=>x.from==='REFERENCE_RESOLVED'&&x.to==='REFERENCE_LOCKED')) fail('MISSING REFERENCE LOCK TRANSITION');
if(!state.transitions.some(x=>x.from==='REFERENCE_LOCKED'&&x.to==='GRAMMAR_EXTRACTED')) fail('MISSING GRAMMAR TRANSITION');
if(!state.transitions.some(x=>x.from==='GRAMMAR_EXTRACTED'&&x.to==='SYSTEM_MAPPED')) fail('MISSING SYSTEM MAPPING TRANSITION');
if(!state.transitions.some(x=>x.from==='REVALIDATING'&&x.to==='REFERENCE_RESOLVED'&&(x.requires||[]).includes('revalidation_STALE_REFERENCE'))) fail('STALE REFERENCE MUST RERESOLVE');
if(!state.transitions.some(x=>x.from==='FIXING'&&x.to==='VERIFYING')) fail('FIXING MUST RETURN TO VERIFYING');

if(refRouter.resolutionOrder?.[0]!=='exact_current_user_visual_reference') fail('USER VISUAL REF MUST BE FIRST');
if(refRouter.resolutionOrder?.[1]!=='exact_current_user_figma_reference') fail('USER FIGMA REF MUST BE SECOND');
if(refRouter.resolutionOrder.indexOf('recover_explicit_prior_user_reference_or_block')>=refRouter.resolutionOrder.indexOf('exact_named_approved_master')) fail('PRIOR USER REF RECOVERY MUST PRECEDE MASTER');
if(!String(refRouter.substitutionRule||'').includes('cannot be replaced')) fail('ROUTER MUST FORBID LOCKED REF SUBSTITUTION');

for(const x of [
  'locked_user_visual_ref -> product_master',
  'locked_user_visual_ref -> current_target',
  'locked_user_visual_ref -> generic_dashboard_family'
]){
  if(!(refLock.forbiddenSubstitutions||[]).includes(x)) fail('REFERENCE LOCK MISSING FORBIDDEN SUBSTITUTION',x);
}
if(refLock.primaryVisualAuthorityPriority?.[0]!=='EXACT_CURRENT_USER_VISUAL_REFERENCE') fail('LOCK PRIORITY INVALID');

const pre=gates.phases?.find(x=>x.id==='PRE_REGRESSION')?.gates||[];
const expectedPre=['QA-01A','QA-01B','QA-02','QA-03','QA-04','QA-05','QA-06','QA-07','QA-08','QA-09'];
if(JSON.stringify(pre)!==JSON.stringify(expectedPre)) fail('PRE-REGRESSION GATES INVALID');
if(gates.gates?.find(x=>x.id==='QA-01A')?.name!=='Reference Authority') fail('QA-01A INVALID');
if(gates.gates?.find(x=>x.id==='QA-01B')?.name!=='Visual Fidelity') fail('QA-01B INVALID');
if(gates.gates?.find(x=>x.id==='QA-10')?.phase!=='REGRESSION') fail('QA-10 PHASE INVALID');

const qaRequired=qa.properties?.checks?.required||[];
for(const k of ['referenceAuthority','visualFidelity','designSystem','informationArchitecture','interactionStates','responsiveAccessibility','content','visualQuality','structural','scopeIntegrity','visualRegression']){
  if(!qaRequired.includes(k)) fail('QA SCHEMA MISSING CHECK',k);
}

const evidenceGateEnum=evidence.properties?.gates?.items?.properties?.gateId?.enum||[];
for(const g of ['QA-01A','QA-01B','QA-02','QA-03','QA-04','QA-05','QA-06','QA-07','QA-08','QA-09','QA-10']){
  if(!evidenceGateEnum.includes(g)) fail('EVIDENCE SCHEMA MISSING GATE',g);
}

for(const field of ['referenceLock','visualGrammar','designSystemMapping']){
  if(!(designDecision.required||[]).includes(field)) fail('DESIGN DECISION MUST REQUIRE',field);
  if(!execution.properties?.[field]) fail('EXECUTION SCHEMA MISSING',field);
}

if(!reproduce.steps?.includes('COMPARE_SKELETON_SIDE_BY_SIDE')) fail('REPRODUCE MUST COMPARE SKELETON SIDE-BY-SIDE');
if(!(reproduce.steps.indexOf('MUTATE_SKELETON')<reproduce.steps.indexOf('MUTATE_DETAIL_INCREMENTALLY'))) fail('SKELETON MUST PRECEDE DETAIL');
if(!String(reproduce.checkpointRule||'').includes('Do not proceed')) fail('REPRODUCE CHECKPOINT RULE MISSING');

for(const key of ['NO_WRITE','PARTIAL_WRITE','UNKNOWN_WRITE','RECOVERED']){
  if(!recovery.writeStateClassification?.[key]) fail('RECOVERY CLASS MISSING',key);
}
if(resume.mappings?.REFERENCE_LOCK_INVALID?.resumeStage!=='REFERENCE_LOCK') fail('REFERENCE LOCK RESUME INVALID');
if(resume.mappings?.VISUAL_GRAMMAR_INCOMPLETE?.resumeStage!=='VISUAL_GRAMMAR_EXTRACTION') fail('GRAMMAR RESUME INVALID');
if(resume.mappings?.DESIGN_SYSTEM_MAPPING_CONFLICT?.resumeStage!=='DESIGN_SYSTEM_MAPPING') fail('DS MAPPING RESUME INVALID');

if(permission.default!=='READ_ONLY') fail('PERMISSION DEFAULT MUST BE READ_ONLY');
for(const guard of [
  'explicit_current_task_write_signal','target_resolved','scope_defined',
  'reference_gate_PASS_or_EXPLORE_EXPLICIT','reference_lock_LOCKED_or_NOT_APPLICABLE',
  'figma_write_capability_available'
]){
  if(!(permission.writeAllowedRequiresAll||[]).includes(guard)) fail('MISSING WRITE GUARD',guard);
}
if(permission.rules?.FIX!=='WRITE_PENDING') fail('FIX MUST START WRITE_PENDING');

for(const sf of ['COMPONENT','PROTOTYPE','MULTI_PAGE','RESPONSIVE']){
  if(!specialized.subflows?.[sf]) fail('SPECIALIZED SUBFLOW MISSING',sf);
}

if(manifest?.controlSystem?.referenceLockPolicy!=='agent/reference/reference-lock.json') fail('MANIFEST REFERENCE LOCK POINTER INVALID');
if(manifest?.controlSystem?.referenceReproduce!=='agent/flow/reference-reproduce.json') fail('MANIFEST REPRODUCE POINTER INVALID');
if(manifest?.outputSchemas?.referenceLock!=='agent/reference/reference-lock.schema.json') fail('MANIFEST REFERENCE LOCK SCHEMA INVALID');
if(manifest?.outputSchemas?.visualGrammar!=='agent/planner/visual-grammar.schema.json') fail('MANIFEST VISUAL GRAMMAR SCHEMA INVALID');
if(manifest?.outputSchemas?.designSystemMapping!=='agent/planner/design-system-mapping.schema.json') fail('MANIFEST DS MAPPING SCHEMA INVALID');

const requiredFinal=manifest.requiredFinalEvidence||[];
for(const e of ['reference_lock','visual_grammar','design_system_mapping','qa_01a_reference_authority','qa_01b_visual_fidelity','reproduce_skeleton_comparison_when_applicable']){
  if(!requiredFinal.includes(e)) fail('MANIFEST FINAL EVIDENCE MISSING',e);
}

const expectedPipelines={
  CREATE_SCREEN:['figma-inspect','reference-source-resolution','information-architecture','interaction-design','design-system-compliance','ux-writing-content','visual-quality','responsive-accessibility','figma-execution','design-qa','reference-fidelity','visual-regression','fix-loop','evidence'],
  MODIFY_SCREEN:['figma-inspect','reference-source-resolution','information-architecture','interaction-design','design-system-compliance','ux-writing-content','visual-quality','responsive-accessibility','figma-execution','design-qa','reference-fidelity','visual-regression','fix-loop','evidence'],
  QA:['figma-inspect','reference-source-resolution','reference-fidelity','design-system-compliance','information-architecture','interaction-design','responsive-accessibility','ux-writing-content','visual-quality','design-qa','visual-regression','evidence']
};
for(const [cmd,expected] of Object.entries(expectedPipelines)){
  const actual=skills.rules?.[cmd]||[];
  for(const s of expected) if(!actual.includes(s)) fail('MISSING SKILL',cmd,s);
}

if(intents.commands?.REVIEW?.defaultPermission!=='READ_ONLY'||intents.commands?.QA?.defaultPermission!=='READ_ONLY') fail('REVIEW/QA MUST REMAIN READ_ONLY');

const parseVersion=body=>body.match(/^version:\s*([0-9]+\.[0-9]+\.[0-9]+)/m)?.[1]||null;
const gte=(a,b)=>{
  const A=a.split('.').map(Number),B=b.split('.').map(Number);
  for(let i=0;i<3;i++){if(A[i]>B[i])return true;if(A[i]<B[i])return false;}
  return true;
};
for(const spec of depth.skills||[]){
  if(!fs.existsSync(path.join(root,spec.path))){fail('DEPTH SKILL MISSING',spec.id);continue;}
  const body=read(spec.path),v=parseVersion(body);
  const nonEmpty=body.split('\n').filter(x=>x.trim()).length;
  if(!v||!gte(v,depth.minimumVersion)) fail('SKILL VERSION TOO OLD',spec.id,v);
  if(nonEmpty<depth.minimumNonEmptyLines) fail('SKILL TOO SHALLOW',spec.id,nonEmpty);
  for(const marker of spec.requiredMarkers||[]) if(!body.includes(marker)) fail('SKILL MARKER MISSING',spec.id,marker);
}

for(const marker of [
  'Exact user reference first',
  'Reference Lock',
  'QA-01A Reference Authority',
  'QA-01B Visual Fidelity'
]){
  if(!read('agent/SYSTEM.md').includes(marker)) fail('SYSTEM MISSING MARKER',marker);
}
for(const marker of [
  '## 33. SOP-25 — Exact user reference priority',
  '## 34. SOP-26 — Reference Lock',
  '## 35. SOP-27 — Visual Grammar Extraction',
  '## 36. SOP-28 — Design System Mapping',
  '## 37. SOP-29 — REPRODUCE skeleton checkpoint',
  '## 38. SOP-30 — Reference QA split'
]){
  if(!read('docs/figma-sop.md').includes(marker)) fail('FIGMA SOP MISSING MARKER',marker);
}
if(!read('docs/reference-fidelity-hardening.md').includes('## QA split')) fail('REFERENCE HARDENING DOC INCOMPLETE');

if(manifest?.architecture?.repositoryRole!=='knowledge_base_and_operating_contract') fail('GITHUB ROLE MUST REMAIN KB/CONTRACT');
if(manifest?.architecture?.runtimeHost!=='chatgpt'||manifest?.architecture?.figmaExecution!=='mcp_via_chatgpt') fail('RUNTIME ARCHITECTURE MISMATCH');
if(manifest?.architecture?.githubAgentExecution!==false) fail('GITHUB AGENT EXECUTION MUST REMAIN DISABLED');

if(failed) process.exit(1);
console.log('Design Control Agent v2.4 validation PASS');
