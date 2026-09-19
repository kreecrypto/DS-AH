import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const required = [
  "src/app/page.tsx",
  "src/app/foundations/page.tsx",
  "src/app/styling-hooks/page.tsx",
  "src/app/components/page.tsx",
  "src/app/components/[slug]/page.tsx",
  "src/app/patterns/page.tsx",
  "src/app/patterns/[slug]/page.tsx",
  "src/app/figma/page.tsx",
  "src/app/agent/page.tsx",
  "src/app/qa/page.tsx"
];

const errors = [];
for (const file of required) if (!existsSync(join(root,file))) errors.push(`Missing required route: ${file}`);

function walk(dir){
  return readdirSync(dir).flatMap((name)=>{
    const path=join(dir,name);
    return statSync(path).isDirectory()?walk(path):[path];
  });
}

const rawHex=/#[0-9a-fA-F]{3,8}\b/g;
for(const file of walk(join(root,"src")).filter((file)=>file.endsWith(".tsx"))){
  const matches=readFileSync(file,"utf8").match(rawHex)??[];
  if(matches.length) errors.push(`Raw color in ${relative(root,file)}: ${matches.join(", ")}`);
}

const css=readFileSync(join(root,"src/app/globals.css"),"utf8");
for(const hook of ["--ah-g-color-action-primary","--ah-g-color-text-primary","--ah-g-color-border-default","--ah-g-radius-action"]){
  if(!css.includes(hook)) errors.push(`Missing semantic hook: ${hook}`);
}

if(errors.length){
  console.error("AHDS docs validation failed:\n"+errors.map((e)=>"- "+e).join("\n"));
  process.exit(1);
}
console.log("AHDS docs validation PASS");
