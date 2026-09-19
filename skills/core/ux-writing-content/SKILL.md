---
id: ux-writing-content
version: 1.0.0
scope: core
---

# UX Writing / Content Skill

## Purpose
Make interface language clear, consistent, actionable and state-aware without changing product meaning.

## Trigger
Mandatory for CREATE/MODIFY/REVIEW/QA when labels, CTA, helper text, errors, empty states, confirmation, placeholders, status text, table headings or content hierarchy are present.

## Required inputs
- approved terminology/product vocabulary
- target user task
- current UI copy
- known business meaning

## Procedure
1. Identify every user-facing label and message in scope.
2. Preserve approved domain terminology.
3. Make CTA text describe the action/outcome.
4. Make labels distinct and scannable.
5. Keep helper text supplemental rather than duplicating labels.
6. Write error messages with problem + recovery where known.
7. Check empty/loading/success/confirmation copy.
8. Check placeholder usage; never use placeholder as the only persistent label.
9. Check tense, capitalization, punctuation and terminology consistency.
10. Check truncation/wrapping risk in realistic content lengths.
11. Flag unknown business meaning instead of rewriting it.

## Content QA Gate
FAIL when:
- CTA meaning is ambiguous
- conflicting terms describe the same concept
- error has no actionable recovery when recovery is known
- required state has missing or misleading content
- essential label disappears on interaction
- copied legacy typo would become new approved content

## Hard rules
- Do not invent legal, policy, financial or business claims.
- Do not change data meaning to shorten copy.
- Do not introduce marketing tone into operational enterprise UI without explicit direction.
- In REPRODUCE, preserve approved copy except user-requested/mock content substitutions.

## Evidence
- terminology check
- CTA/label check
- error/empty/loading/success check
- truncation/wrapping check
- unresolved content questions
- content gate result
