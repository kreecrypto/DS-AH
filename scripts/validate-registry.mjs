import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredJson = [
  'agent/manifest.json',
  'registry/figma-sources.json',
  'registry/libraries.json',
  'registry/core-components.json',
  'registry/domain-patterns.json',
  'registry/foundations.json',
  'registry/aliases.json',
  'registry/core-ds-dependencies.json',
  'registry/core-ds-components.json',
  'registry/core-ds-foundations.json',
  'registry/core-ds-source.json',
  'schemas/agent-task.schema.json',
  'schemas/registry-entry.schema.json'
];

let failed = false;
const parsed = {};

for (const rel of requiredJson) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    console.error('MISSING', rel);
    failed = true;
    continue;
  }
  try {
    parsed[rel] = JSON.parse(fs.readFileSync(file, 'utf8'));
    console.log('OK JSON', rel);
  } catch (error) {
    console.error('INVALID JSON', rel, error.message);
    failed = true;
  }
}

const sources = parsed['registry/figma-sources.json'];
if (sources?.pages) {
  const ids = sources.pages.map(p => p.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) {
    console.error('DUPLICATE SOURCE IDS', [...new Set(dupes)]);
    failed = true;
  }
}

const core = parsed['registry/core-components.json'];
if (core?.components) {
  const names = core.components.map(c => c.canonicalName);
  const dupes = names.filter((n, i) => names.indexOf(n) !== i);
  if (dupes.length) {
    console.error('DUPLICATE CORE CANONICAL NAMES', [...new Set(dupes)]);
    failed = true;
  }
}

function scanCanonical(value, trail = '') {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    const next = trail ? trail + '.' + key : key;
    if (/^Property [12]$|^Variant\d+$|^Stage\d+$/.test(key)) {
      console.error('PLACEHOLDER NAME IN CANONICAL API', next);
      failed = true;
    }
    scanCanonical(child, next);
  }
}

for (const c of core?.components || []) scanCanonical(c.canonicalApi, 'core.' + c.canonicalName);
for (const p of parsed['registry/domain-patterns.json']?.patterns || []) scanCanonical(p.canonicalApi, 'pattern.' + p.domain + '.' + p.figmaName);


const coreDs = parsed['registry/core-ds-components.json'];
if (coreDs?.components) {
  const keys = coreDs.components.map(c => c.componentKey).filter(Boolean);
  const dupes = keys.filter((k, i) => keys.indexOf(k) !== i);
  if (dupes.length) {
    console.error('DUPLICATE CORE DS COMPONENT KEYS', [...new Set(dupes)]);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Registry validation PASS');
