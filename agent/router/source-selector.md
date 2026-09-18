# Router — Source Selector

## Core task

Use:
1. `registry/core-ds-source.json`
2. `registry/core-ds-foundations.json`
3. `registry/core-ds-components.json`
4. `registry/core-ds-dependencies.json`

## Agency product task

Load Core first, then:
1. `registry/figma-sources.json`
2. `registry/domain-patterns.json`
3. `registry/templates.json`

## Admin product task

Load Core authority, then:
1. `registry/admin-portal-source.json`
2. `registry/admin-portal-dependencies.json`
3. `registry/admin-portal-components.json`
4. `registry/admin-portal-scenarios.json`

Admin rule: verify exact remote primitive identity before substituting a current Core DS component with the same display name.

## Live evidence

Repo registries are known evidence, not a replacement for inspecting the current target node before a Figma write.

When live Figma and repo disagree:
- record the conflict
- prefer current live structure for factual state
- do not silently rewrite Source-of-Truth policy
