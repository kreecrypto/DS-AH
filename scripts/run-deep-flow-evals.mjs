import fs from 'node:fs';

const flow=JSON.parse(fs.readFileSync('agent/flow/design-agent-flow.json','utf8'));
const recovery=JSON.parse(fs.readFileSync('agent/flow/mutation-recovery.json','utf8'));
const resume=JSON.parse(fs.readFileSync('agent/flow/reentry-resume.json','utf8'));
const specialized=JSON.parse(fs.readFileSync('agent/flow/specialized-subflows.json','utf8'));
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
  gates.gates.filter(x=>x.id==='QA-10').every(x=>x.phase==='REGRESSION'),
  'QA-01..09 -> QA-10 -> Final Aggregation');

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
  resume.mappings.BUSINESS_DECISION_REQUIRED?.resumeStage==='DESIGN_DECISION' &&
  resume.mappings.MUTATION_STATE_UNKNOWN?.resumeStage==='MUTATION_RECOVERY' &&
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

check('CASE_COUNT',cases.cases.length===7,'seven production hardening cases');

if(failed){
  console.error('Deep flow eval FAIL',failed);
  process.exit(1);
}
console.log('Deep flow eval PASS');
