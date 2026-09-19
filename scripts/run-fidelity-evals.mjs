import fs from 'node:fs';

const router=JSON.parse(fs.readFileSync('agent/reference-router.json','utf8'));
const intent=JSON.parse(fs.readFileSync('agent/router/intent.json','utf8'));
const tests=JSON.parse(fs.readFileSync('agent/evals/reference-cases.json','utf8')).cases;
const norm=s=>s.toLowerCase();

function hasAny(p,arr){return (arr||[]).some(x=>p.includes(x.toLowerCase()));}
function hasExplicitWrite(p){return hasAny(p,intent.explicitWriteSignals||[]);}

function resolve(prompt){
  const p=norm(prompt);
  const explicitWrite=hasExplicitWrite(p);
  const explicitExplore=hasAny(p,router.buildModes.EXPLORE.explicitSignals);
  if(explicitExplore){
    return {
      buildMode:'EXPLORE',
      referenceGate:'EXPLORE_EXPLICIT',
      referenceNodeId:null,
      writeAllowed:explicitWrite,
      permission:explicitWrite?'WRITE_ALLOWED':'WRITE_PENDING'
    };
  }

  const family=router.families.agencyDashboard;
  const exact=[];
  for(const c of family.candidates){
    if(hasAny(p,[c.name,...(c.aliases||[])])) exact.push(c);
  }
  exact.sort((a,b)=>b.name.length-a.name.length);
  if(exact.length){
    const top=exact[0];
    const tied=exact.filter(x=>x.name.length===top.name.length);
    if(tied.length===1 && !top.blockedAsDefault){
      const adapt=/ปรับ|แก้|modify|fix|compact/.test(p);
      return {
        buildMode:adapt?'ADAPT':'REPRODUCE',
        referenceGate:'PASS',
        referenceNodeId:top.pageId,
        writeAllowed:explicitWrite,
        permission:explicitWrite?'WRITE_ALLOWED':'WRITE_PENDING'
      };
    }
  }

  if(hasAny(p,family.genericSignals) || p.includes('performance dashboard')){
    return {
      buildMode:'REPRODUCE',
      referenceGate:'BLOCKED_REFERENCE_AMBIGUOUS',
      referenceNodeId:null,
      writeAllowed:false,
      permission:'WRITE_BLOCKED'
    };
  }
  return {
    buildMode:'REPRODUCE',
    referenceGate:'BLOCKED_REFERENCE_MISSING',
    referenceNodeId:null,
    writeAllowed:false,
    permission:'WRITE_BLOCKED'
  };
}

let failed=0;
for(const t of tests){
  const a=resolve(t.prompt);
  const e=t.expected;
  const ok=
    a.buildMode===e.buildMode &&
    a.referenceGate===e.referenceGate &&
    a.writeAllowed===e.writeAllowed &&
    (e.permission===undefined || a.permission===e.permission) &&
    (e.referenceNodeId===undefined || a.referenceNodeId===e.referenceNodeId);
  console.log(ok?'PASS':'FAIL',t.id,JSON.stringify(a),'-',t.prompt);
  if(!ok) failed++;
}
if(failed){
  console.error('Reference fidelity/write eval FAIL',failed,'/',tests.length);
  process.exit(1);
}
console.log('Reference fidelity/write eval PASS',tests.length,'cases');
