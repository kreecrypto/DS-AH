import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const output = join(root, "dist");
await rm(output, { recursive: true, force: true });
await mkdir(join(output, "assets"), { recursive: true });
await mkdir(join(output, "data", "registry", "core-ds-tokens"), { recursive: true });

for (const file of ["index.html", "styles.css", "app.js"]) {
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

for (const file of dataFiles) {
  const target = join(output, "data", file);
  await mkdir(dirname(target), { recursive: true });
  await cp(join(root, file), target);
}

await cp(join(root, "registry", "core-ds-tokens"), join(output, "data", "registry", "core-ds-tokens"), { recursive: true });
console.log(`AH Design System website built at ${output}`);
