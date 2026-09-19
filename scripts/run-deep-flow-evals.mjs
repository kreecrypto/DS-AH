import fs from 'node:fs';

const flow=JSON.parse(fs.readFileSync('agent/flow/design-agent-flow.json','utf8'));
const recovery=JSON.parse(fs.readFileSync('agent/flow/mutation-recovery.json','utf8'));
const resume=JSON.parse(fs.readFileSync('agent/flow/reentry-resume.json','utf8'));
const specialized=JSON.parse(fs.readFileSync('agent/flow/specialized-subflows.json','utf8'));
const reproduce=JSON.parse(fs.readFileSync('agent/flow/reference-reproduce.json','utf8'));
const refRouter=JSON.parse(fs.readFileSync('agent/reference-router.json','utf8'));
const refLock=JSON.parse(fs.readFileSync('agent/reference/reference-lock.json','utf8'));
const gates=JSON.parse(fs.readFileSync('agent/gates/quality-gates.json','utf8'));
const state=JSON.parse(fs.readFileSync('agent/state-machine.json','utf8'));
const cases=JSON.parse(fs.readFileSync('agent/evals/deep-flow-cases.json','utf8'));

let failed=0;
const check=(id,ok,detail)=>{
  console.log(ok?'PASS':'FAIL',id,detail||'');
  if(!ok) failed++;
};
const idx=id=>flow.canonicalOrder.indexOf(id);

check('DF01_QA_ORDER',
  idx('QA_PRE_REGRESSION')<idx('VISUAL_REGRESSION') &&
  idx('VISUAL_REGRESSION')<idx('FINAL_QA_AGGREGATION') &&
  gates.gates.find(x=>x.id==='QA-10')?.phase==='REGRESSION',
  'Pre-regression -> QA-10 -> Final Aggregation');

check('DF02_COMPONENT_PATH',
  Array.isArray(flow.commandStageRules.COMPONENT) &&
  specialized.subflows.COMPONENT.defaultMode==='READ_ONLY' &&
  specialized.subflows.COMPONENT.mutationRule.includes('MODIFY_SCREEN'),
  'COMPONENT machine path + read-only default');

check('DF03_MUTATION_RECOVERY',
  ['NO_WRITE','PARTIAL_WRITE','UNKNOWN_WRITE','RECOVERED'].every(x=>recovery.writeStateClassification[x]) &&
  flow.canonicalOrder.includes('MUTATION_RECOVERY') &&
  state.states.includes('RECOVERING'),
  'explicit canvas write-state classification');

check('DF04_RESUME_REENTRY',
  resume.checkpointRequired.includes('resumeStage') &&
  resume.mappings.BLOCKED_REFERENCE_AMBIGUOUS?.resumeStage==='RESOLVE_REFERENCE' &&
  resume.mappings.REFERENCE_LOCK_INVALID?.resumeStage==='REFERENCE_LOCK' &&
  resume.mappings.VISUAL_GRAMMAR_INCOMPLETE?.resumeStage==='VISUAL_GRAMMAR_EXTRACTION' &&
  state.states.includes('RESUMING'),
  'deterministic resume mapping');

const writeCmds=['CREATE_SCREEN','MODIFY_SCREEN','FIX'];
check('DF05_STALE_BASELINE',
  writeCmds.every(c=>flow.commandStageRules[c].includes('PRE_WRITE_REVALIDATION')) &&
  flow.stages.find(x=>x.id==='PRE_WRITE_REVALIDATION')?.staleRoute==='FIGMA_INSPECT' &&
  state.invariants.includes('stale_baseline_returns_to_inspection'),
  'stale canvas protection');

check('DF06_SPECIALIZED_SUBFLOWS',
  ['COMPONENT','PROTOTYPE','MULTI_PAGE','RESPONSIVE'].every(x=>specialized.subflows[x]) &&
  specialized.globalRule.includes('may never bypass'),
  'all four specialized subflows');

const fix=flow.stages.find(x=>x.id==='FIX_LOOP');
check('DF07_FINAL_QA_AFTER_FIX',
  JSON.stringify(fix?.mandatoryReturnPath)===JSON.stringify(['VERIFICATION','QA_PRE_REGRESSION','VISUAL_REGRESSION','FINAL_QA_AGGREGATION']) &&
  state.transitions.some(x=>x.from==='FIXING'&&x.to==='VERIFYING') &&
  !state.transitions.some(x=>x.from==='FIXING'&&['QA_FINAL','EVIDENCE','COMPLETE'].includes(x.to)),
  'fix must re-enter verification + full QA');

check('DF08_USER_REF_PRIORITY',
  refRouter.resolutionOrder[0]==='exact_current_user_visual_reference' &&
  refRouter.resolutionOrder[1]==='exact_current_user_figma_reference' &&
  refRouter.resolutionOrder.indexOf('recover_explicit_prior_user_reference_or_block') <
    refRouter.resolutionOrder.indexOf('exact_named_approved_master') &&
  refLock.forbiddenSubstitutions.includes('locked_user_visual_ref -> product_master'),
  'user ref precedes Product Master');

check('DF09_REFERENCE_LOCK_ORDER',
  idx('RESOLVE_REFERENCE') < idx('REFERENCE_LOCK') &&
  idx('REFERENCE_LOCK') < idx('VISUAL_GRAMMAR_EXTRACTION') &&
  idx('REFERENCE_LOCK') < idx('DESIGN_DECISION') &&
  state.states.includes('REFERENCE_LOCKED'),
  'Reference Lock before grammar/decision');

check('DF10_VISUAL_GRAMMAR_DS_MAPPING',
  idx('VISUAL_GRAMMAR_EXTRACTION') < idx('DESIGN_SYSTEM_MAPPING') &&
  idx('DESIGN_SYSTEM_MAPPING') < idx('DESIGN_DECISION') &&
  flow.stages.find(x=>x.id==='DESIGN_SYSTEM_MAPPING')?.rule?.includes('preserves locked visual roles'),
  'grammar -> DS mapping -> decision');

const pre=gates.phases.find(x=>x.id==='PRE_REGRESSION')?.gates||[];
check('DF11_SPLIT_REFERENCE_QA',
  pre.includes('QA-01A') &&
  pre.includes('QA-01B') &&
  gates.gates.find(x=>x.id==='QA-01A')?.name==='Reference Authority' &&
  gates.gates.find(x=>x.id==='QA-01B')?.name==='Visual Fidelity',
  'split Reference Authority / Visual Fidelity');

check('DF12_REPRODUCE_SKELETON',
  reproduce.steps.indexOf('MUTATE_SKELETON') <
    reproduce.steps.indexOf('MUTATE_DETAIL_INCREMENTALLY') &&
  reproduce.steps.includes('COMPARE_SKELETON_SIDE_BY_SIDE') &&
  reproduce.checkpointRule.includes('Do not proceed'),
  'skeleton-first side-by-side checkpoint');

check('CASE_COUNT',cases.cases.length===12,'twelve deep-flow cases');

if(failed){
  console.error('Deep flow eval FAIL',failed);
  process.exit(1);
}
console.log('Deep flow eval PASS');
