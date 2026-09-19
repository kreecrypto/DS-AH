import fs from 'node:fs';

const spec=JSON.parse(fs.readFileSync('agent/evals/skill-depth-cases.json','utf8'));

function parseVersion(body){
  const m=body.match(/^version:\s*([0-9]+\.[0-9]+\.[0-9]+)/m);
  return m?.[1] || null;
}

function gte(a,b){
  const A=a.split('.').map(Number), B=b.split('.').map(Number);
  for(let i=0;i<3;i++){
    if(A[i]>B[i]) return true;
    if(A[i]<B[i]) return false;
  }
  return true;
}

let failed=0;

for(const s of spec.skills){
  if(!fs.existsSync(s.path)){
    console.error('FAIL',s.id,'missing file',s.path);
    failed++;
    continue;
  }

  const body=fs.readFileSync(s.path,'utf8');
  const version=parseVersion(body);
  const nonEmpty=body.split('\n').filter(x=>x.trim().length>0).length;
  const missing=(s.requiredMarkers||[]).filter(x=>!body.includes(x));

  const okVersion=version && gte(version,spec.minimumVersion);
  const okDepth=nonEmpty>=spec.minimumNonEmptyLines;
  const okMarkers=missing.length===0;
  const ok=okVersion && okDepth && okMarkers;

  console.log(ok?'PASS':'FAIL',s.id,JSON.stringify({
    version,
    nonEmptyLines:nonEmpty,
    missingMarkers:missing
  }));

  if(!ok) failed++;
}

if(failed){
  console.error('Skill depth eval FAIL',failed,'/',spec.skills.length);
  process.exit(1);
}

console.log('Skill depth eval PASS',spec.skills.length,'skills');
