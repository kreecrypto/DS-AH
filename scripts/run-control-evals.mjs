import fs from 'node:fs';

const tests=JSON.parse(fs.readFileSync('agent/evals/control-cases.json','utf8')).cases;

function permission(t){
  if(['REVIEW','QA','HANDOFF','COMPONENT'].includes(t.command)) return 'READ_ONLY';
  if(t.command==='INSPECT') return 'INSPECT_ALLOWED';
  if(!['CREATE_SCREEN','MODIFY_SCREEN','FIX'].includes(t.command)) return 'READ_ONLY';

  const blockedGate=['BLOCKED_REFERENCE_AMBIGUOUS','BLOCKED_REFERENCE_MISSING'].includes(t.referenceGate);
  if(
    blockedGate ||
    !t.targetResolved ||
    !t.scopeDefined ||
    !t.referenceLockEligible ||
    !t.figmaWriteCapability
  ) return 'WRITE_BLOCKED';

  if(!t.explicitWrite) return 'WRITE_PENDING';
  if(['PASS','EXPLORE_EXPLICIT'].includes(t.referenceGate)) return 'WRITE_ALLOWED';
  return 'WRITE_BLOCKED';
}

let failed=0;
for(const t of tests){
  const actual=permission(t);
  const ok=actual===t.expected;
  console.log(ok?'PASS':'FAIL',t.id,actual);
  if(!ok) failed++;
}
if(failed){
  console.error('Design Control eval FAIL',failed,'/',tests.length);
  process.exit(1);
}
console.log('Design Control eval PASS',tests.length,'cases');
