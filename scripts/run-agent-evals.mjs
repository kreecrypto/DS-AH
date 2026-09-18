import fs from 'node:fs';

const intents=JSON.parse(fs.readFileSync('agent/router/intent.json','utf8'));
const products=JSON.parse(fs.readFileSync('agent/product-router.json','utf8'));
const cases=JSON.parse(fs.readFileSync('agent/evals/cases.json','utf8')).cases;

const norm=s=>s.toLowerCase();

function resolveCommand(prompt){
  const p=norm(prompt);
  for(const [name,cfg] of Object.entries(intents.commands)){
    for(const alias of cfg.aliases||[]){
      if(p.startsWith(alias.toLowerCase())) return name;
    }
  }
  for(const name of intents.precedence){
    const cfg=intents.commands[name];
    if((cfg.signals||[]).some(x=>p.includes(x.toLowerCase()))) return name;
  }
  return 'UNKNOWN';
}

function resolveProduct(prompt){
  const p=norm(prompt);
  for(const [name,cfg] of Object.entries(products.products)){
    if(p.includes(cfg.fileKey.toLowerCase())) return name;
  }
  const ordered=['admin','agency','core'];
  for(const name of ordered){
    const cfg=products.products[name];
    if((cfg.signals||[]).some(x=>p.includes(x.toLowerCase()))) return name;
  }
  return 'unknown';
}

let failed=0;
for(const c of cases){
  const actual={command:resolveCommand(c.prompt),product:resolveProduct(c.prompt)};
  const ok=actual.command===c.expected.command && actual.product===c.expected.product;
  console.log(ok?'PASS':'FAIL',c.id,JSON.stringify(actual),'-',c.prompt);
  if(!ok) failed++;
}

if(failed){
  console.error('Design Agent routing eval FAIL',failed,'/',cases.length);
  process.exit(1);
}
console.log('Design Agent routing eval PASS',cases.length,'cases');
