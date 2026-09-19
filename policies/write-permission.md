# Write Permission Policy

Figma is read-only by default.

A live write is permitted only when all are true:
1. the current task explicitly requests create/edit/fix/apply/implement in Figma
2. the target is resolved
3. a Change Scope exists
4. Reference Gate is PASS or EXPLORE_EXPLICIT
5. live Figma write capability is available

Repository state, old approvals, prior sessions, task type, or a passed reference gate do not independently grant write permission.

REVIEW and QA are read-only. To apply findings, route a subsequent FIX/MODIFY action and re-evaluate permission and scope.
