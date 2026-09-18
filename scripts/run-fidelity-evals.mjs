import fs from 'node:fs';

const router=JSON.parse(fs.readFileSync('agent/reference-router.json','utf8'));
const tests=JSON.parse(fs.readFileSync('agent/evals/reference-cases.json','utf8')).cases;
const norm=s=>s.toLowerCase();

function hasAny(p,arr){return arr.some(x=>p.includes(x.toLowerCase()));}

function resolve(prompt){
  const p=norm(prompt);
  const explicitExplore=hasAny(p,router.buildModes.EXPLORE.explicitSignals);
  if(explicitExplore) return {buildMode:'EXPLORE',referenceGate:'EXPLORE_EXPLICIT',referenceNodeId:null,writeAllowed:true};

  const family=router.families.agencyDashboard;
  const exact=[];
  for(const c of family.candidates){
    if(hasAny(p,[c.name,...(c.aliases||[])])) exact.push(c);
  }
  // Prefer the longest matching named candidate to avoid "Performance Dashboard"
  // swallowing "Team Performance Dashboard".
  exact.sort((a,b)=>b.name.length-a.name.length);
  if(exact.length){
    const top=exact[0];
    const tied=exact.filter(x=>x.name.length===top.name.length);
    if(tied.length===1 && !top.blockedAsDefault){
      const adapt=/ปรับ|แก้|modify|fix|compact/.test(p);
      return {buildMode:adapt?'ADAPT':'REPRODUCE',referenceGate:'PASS',referenceNodeId:top.pageId,writeAllowed:true};
    }
  }

  if(hasAny(p,family.genericSignals) || p.includes('performance dashboard')){
    return {buildMode:'REPRODUCE',referenceGate:'BLOCKED_REFERENCE_AMBIGUOUS',referenceNodeId:null,writeAllowed:false};
  }
  return {buildMode:'REPRODUCE',referenceGate:'BLOCKED_REFERENCE_MISSING',referenceNodeId:null,writeAllowed:false};
}

let failed=0;
for(const t of tests){
  const a=resolve(t.prompt);
  const e=t.expected;
  const ok=a.buildMode===e.buildMode && a.referenceGate===e.referenceGate && a.writeAllowed===e.writeAllowed && (e.referenceNodeId===undefined || a.referenceNodeId===e.referenceNodeId);
  console.log(ok?'PASS':'FAIL',t.id,JSON.stringify(a),'-',t.prompt);
  if(!ok) failed++;
}
if(failed){console.error('Reference fidelity eval FAIL',failed,'/',tests.length);process.exit(1);}
console.log('Reference fidelity eval PASS',tests.length,'cases');
