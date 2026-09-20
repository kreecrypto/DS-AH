import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createSiteData, tokenCSS } from './site-data.mjs';
import { loadComponentPackages } from './component-packages.mjs';

const root = new URL("..", import.meta.url).pathname;
const output = join(root, "dist");
await rm(output, { recursive: true, force: true });
await mkdir(join(output, "assets"), { recursive: true });
await mkdir(join(output, "data", "registry", "core-ds-tokens"), { recursive: true });

for (const file of ["index.html", "styles.css", "app.js", "structure.js", "structure-view.js", "component-view.js", "reference-navigation.json", "reference-pages.json"]) {
  await cp(join(root, "website", file), join(output, file));
}

const dataFiles = [
  "registry/core-ds-foundations.json",
  "registry/core-ds-components.json",
  "registry/domain-patterns.json",
  "registry/templates.json",
  "registry/figma-sources.json",
  "registry/core-ds-coverage.json",
  "registry/state-flows.json",
  "agent/runtime.json",
  "agent/gates/quality-gates.json"
];
dataFiles.push('registry/core-ds-preferred.json');

for (const file of dataFiles) {
  const target = join(output, "data", file);
  await mkdir(dirname(target), { recursive: true });
  await cp(join(root, file), target);
}

await cp(join(root, "registry", "core-ds-tokens"), join(output, "data", "registry", "core-ds-tokens"), { recursive: true });
const data = await createSiteData(root);
const componentPackages = await loadComponentPackages(root);
await mkdir(join(output,'data','components'),{recursive:true});
for(const pkg of componentPackages.packages) await writeFile(join(output,'data','components',pkg.id+'.json'),JSON.stringify(pkg));
await writeFile(join(output,'data','component-packages.json'),JSON.stringify(componentPackages));
await cp(join(root,'website','assets','figma'),join(output,'assets','figma'),{recursive:true});
await writeFile(join(output, 'data', 'site.json'), JSON.stringify(data));
await writeFile(join(output, 'tokens.css'), tokenCSS(data));
console.log(`AH Design System website built at ${output}`);
