# Workflow — CREATE SCREEN

Use only when the user explicitly asks to create/build a Figma screen.

## Mandatory Reference Preflight

1. Resolve product/domain.
2. Resolve Build Mode using `agent/reference-router.json`.
3. Resolve an exact approved/current reference.
4. Run `agent/decisions/reference-resolution.md`.
5. **Do not enter Build phase unless Reference Gate = PASS or EXPLORE_EXPLICIT.**

### Important

"New File" means create the output in a new file. It does **not** authorize original layout design.

If the request is generic and multiple approved Masters exist, stop at `BLOCKED_REFERENCE_AMBIGUOUS`.

Example:
- "สร้างหน้า Dashboard" → do not invent KPI/chart/table modules.
- "สร้าง Team Performance Dashboard" → inspect and reproduce the Team Performance Master.
- "สร้าง Dashboard concept ใหม่ ไม่ใช้ของเดิม" → EXPLORE may be used.

## Inspect before build

For REPRODUCE/ADAPT:

1. Inspect the exact Master Screen node/section.
2. Capture or obtain visual context of the reference.
3. Record:
   - frame size / device
   - shell/navigation/header structure
   - major section order
   - key widths/heights
   - Auto Layout behavior
   - component instances/keys
   - spacing/radius/token usage
   - visible state/content patterns
4. Load relevant domain-pattern registry.
5. Search Core DS for required primitives.
6. List intended reused components.
7. Identify responsive targets/states.

## Build order — REPRODUCE

1. Reproduce page shell from approved Master.
2. Reproduce major layout geometry and section order.
3. Reuse approved domain patterns/components.
4. Reuse Core components for primitives.
5. Bind existing DS variables/styles.
6. Substitute only the requested/mock content.
7. Do not add modules absent from the reference.

## Build order — ADAPT

1. Reproduce unchanged structure first.
2. Apply only the requested change.
3. Preserve all unrelated modules and geometry.

## Build order — EXPLORE

Only when explicitly authorized:
1. still reuse Core DS
2. use product patterns where appropriate
3. new composition is allowed
4. clearly label output as exploratory, not Master-equivalent

## New reusable asset rule

A new reusable component requires evidence that:
- no Core equivalent exists
- no approved local equivalent exists
- the need repeats or represents a stable semantic unit
- the proposed API has semantic variant names

## Mandatory post-build fidelity QA

For REPRODUCE/ADAPT:
1. capture result visual context
2. compare against approved reference
3. verify shell, hierarchy, geometry, section order, component family, states and responsive behavior
4. any material divergence outside requested scope = FAIL
5. fix before completion

## Completion evidence

Document:
- Build Mode
- Reference Gate
- exact reference file/node
- reused library assets
- reused local patterns
- newly created assets, if any
- responsive/state coverage
- visual fidelity result
- unresolved gaps
