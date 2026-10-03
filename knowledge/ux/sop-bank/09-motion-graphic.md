# SOP-09 — Motion Graphic / UI Storytelling Video

## Goal

Turn approved UX/UI work into a clear motion story that explains the user problem, the design change, and the resulting experience without turning the output into a slide presentation.

Use this SOP for:

- UI motion graphic
- Old vs New comparison video
- feature walkthrough
- product storytelling
- UX improvement explanation
- prototype-to-video
- Figma UI demo video
- JavaScript-rendered motion
- social/demo cutdowns

## 1. Motion starts from approved design

Motion must not invent a new product design.

Required inputs:

- approved Figma/source
- validated flow
- final or reviewable UI states
- story objective
- target audience
- output duration/aspect ratio
- visual authority

If the source is not final, clearly label the video as concept/prototype.

## 2. Story structure

Default Bank structure:

```text
HOOK
→ USER PROBLEM
→ CURRENT EXPERIENCE
→ FRICTION
→ DESIGN CHANGE
→ NEW EXPERIENCE
→ KEY BENEFIT
→ FINAL STATE / CTA
```

For Old vs New:

```text
OLD
→ PROBLEM HIGHLIGHT
→ TRANSITION
→ NEW
→ WHAT CHANGED
→ WHY IT IS BETTER FOR THE TASK
```

Do not show feature changes without explaining the user meaning.

## 3. Storyboard

Build a scene plan before animation.

Each scene defines:

- purpose
- duration
- source screen / frame
- camera/framing
- UI action
- motion behavior
- annotation/copy
- transition
- audio cue when applicable

Use `templates/bank-motion-storyboard.md`.

## 4. UI fidelity

When using real Figma UI:

- use approved source screens
- preserve typography, color, spacing, iconography, and component identity
- do not redraw UI unless required for animation preparation
- do not alter business content for visual convenience
- keep screenshots/renders sharp enough for final output
- use consistent viewport and scale

UI fidelity takes priority over decorative effects.

## 5. Motion language

Motion should communicate hierarchy and cause/effect.

Preferred behaviors:

- camera pan / crop
- focus zoom
- masked reveal
- cursor/tap guidance
- highlight
- component state transition
- list/card stagger
- modal/drawer transition
- search/filter result transition
- chart/data emphasis
- before/after morph when valid
- smooth scene transition

Avoid:

- random movement
- excessive bounce
- unnecessary 3D
- motion that hides interaction logic
- too many simultaneous focal points

## 6. Timing

Default timing principles:

- one primary idea per shot
- readable text must stay on screen long enough to scan
- interaction should precede system response
- pauses should appear at decision points
- transitions should support continuity, not reset attention

For short-form output, remove low-value pauses before speeding up meaningful interactions.

## 7. Motion implementation path

Choose the smallest suitable pipeline.

### UI Motion / Product Demo
```text
Figma UI
→ asset extraction
→ storyboard
→ JavaScript / timeline composition
→ render
→ video QA
→ MP4
```

### 3D-enhanced UI
```text
Figma UI / assets
→ storyboard
→ Three.js or equivalent 3D layer
→ JavaScript composition
→ render
→ video QA
```

### Prototype capture
Use only when prototype behavior is already sufficient. Do not substitute a raw screen recording when the request requires editorial storytelling.

## 8. Motion system

Define before animation:

- easing
- duration scale
- transition family
- camera behavior
- cursor/tap style
- text annotation style
- highlight style
- depth rules
- background treatment
- audio policy

Keep one coherent motion grammar across the video.

## 9. Old vs New motion compare

Recommended sequence:

1. show the same task context
2. demonstrate old friction
3. freeze/highlight the exact issue
4. transition through the design change
5. demonstrate the new interaction
6. explain the improvement
7. end with direct task outcome

Avoid comparing two unrelated states or different data unless clearly disclosed.

## 10. Motion QA

Check:

- Figma fidelity
- correct screen sequence
- interaction logic
- readable text
- no cropped critical UI
- no accidental pointer mismatch
- transition continuity
- timing
- frame pacing
- motion consistency
- audio sync when used
- no flicker/jump
- final dimensions
- final duration
- export playback

## 11. Motion fix loop

```text
Finding
→ identify scene
→ patch smallest timing/layout/motion issue
→ re-render affected segment
→ full continuity check
→ final render
```

## 12. Deliverables

Depending on scope:

- storyboard
- motion brief
- source composition/code
- preview render
- final MP4
- optional GIF/short cut
- evidence of source UI
- scene-to-Figma mapping

## 13. Definition of done

Motion is complete when:

- story communicates the intended UX change
- UI matches approved source
- interaction order is correct
- text is readable
- motion grammar is consistent
- no critical visual defects remain
- full render plays successfully
- required final format is exported

Final status:

PASS / FAIL / BLOCKED
