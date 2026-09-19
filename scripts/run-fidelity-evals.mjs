import fs from 'node:fs';

const router=JSON.parse(fs.readFileSync('agent/reference-router.json','utf8'));
const intent=JSON.parse(fs.readFileSync('agent/router/intent.json','utf8'));
const tests=JSON.parse(fs.readFileSync('agent/evals/reference-cases.json','utf8')).cases;
const norm=s=>s.toLowerCase();

function hasAny(p,arr){return (arr||[]).some(x=>p.includes(x.toLowerCase()));}
function hasExplicitWrite(p){return hasAny(p,intent.explicitWriteSignals||[]);}

function userRefResult(ref, explicitWrite){
  return {
    buildMode:'REPRODUCE',
    referenceGate:'PASS',
    referenceId:ref.id,
    referenceNodeId:null,
    authorityClass:'EXACT_CURRENT_USER_VISUAL_REFERENCE',
    lockStatus:'LOCKED',
    masterSubstitutionAllowed:false,
    writeAllowed:explicitWrite,
    permission:explicitWrite?'WRITE_ALLOWED':'WRITE_PENDING'
  };
}

function resolve(prompt,context={}){
  const p=norm(prompt);
  const explicitWrite=hasExplicitWrite(p);
  const explicitExplore=hasAny(p,router.buildModes.EXPLORE.explicitSignals);
  const visualMatch=hasAny(p,router.currentTaskUserReference.visualMatchSignals);
  const priorRefIntent=hasAny(p,router.currentTaskUserReference.priorReferenceSignals);

  if(explicitExplore){
    return {
      buildMode:'EXPLORE',
      referenceGate:'EXPLORE_EXPLICIT',
      referenceNodeId:null,
      referenceId:null,
      authorityClass:null,
      lockStatus:'NOT_APPLICABLE',
      masterSubstitutionAllowed:true,
      writeAllowed:explicitWrite,
      permission:explicitWrite?'WRITE_ALLOWED':'WRITE_PENDING'
    };
  }

  if(visualMatch && context.currentUserVisualReference){
    return userRefResult(context.currentUserVisualReference,explicitWrite);
  }

  if(priorRefIntent){
    if(context.priorUserReference) return userRefResult(context.priorUserReference,explicitWrite);
    return {
      buildMode:'REPRODUCE',
      referenceGate:'BLOCKED_REFERENCE_MISSING',
      referenceNodeId:null,
      referenceId:null,
      authorityClass:null,
      lockStatus:'BLOCKED',
      masterSubstitutionAllowed:false,
      writeAllowed:false,
      permission:'WRITE_BLOCKED'
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
        referenceId:top.pageId,
        authorityClass:'CURRENT_PRODUCT_MASTER',
        lockStatus:'LOCKED',
        masterSubstitutionAllowed:true,
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
      referenceId:null,
      authorityClass:null,
      lockStatus:'BLOCKED',
      masterSubstitutionAllowed:false,
      writeAllowed:false,
      permission:'WRITE_BLOCKED'
    };
  }

  return {
    buildMode:'REPRODUCE',
    referenceGate:'BLOCKED_REFERENCE_MISSING',
    referenceNodeId:null,
    referenceId:null,
    authorityClass:null,
    lockStatus:'BLOCKED',
    masterSubstitutionAllowed:false,
    writeAllowed:false,
    permission:'WRITE_BLOCKED'
  };
}

let failed=0;
for(const t of tests){
  const a=resolve(t.prompt,t.context||{});
  const e=t.expected;
  const fields=['buildMode','referenceGate','referenceNodeId','referenceId','authorityClass','lockStatus','masterSubstitutionAllowed','writeAllowed','permission'];
  const ok=fields.every(k=>e[k]===undefined || a[k]===e[k]);
  console.log(ok?'PASS':'FAIL',t.id,JSON.stringify(a),'-',t.prompt);
  if(!ok) failed++;
}
if(failed){
  console.error('Reference fidelity/write eval FAIL',failed,'/',tests.length);
  process.exit(1);
}
console.log('Reference fidelity/write eval PASS',tests.length,'cases');
