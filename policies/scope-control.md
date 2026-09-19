# Scope Control Policy

Every CREATE/MODIFY plan must define:
- allowed changes
- protected areas
- out-of-scope areas
- affected states
- affected viewports

ADAPT preserves everything outside the requested change. REPRODUCE preserves approved design grammar. EXPLORE may change composition but still follows the brief and system constraints.

QA fixes may change only the root cause and dependent areas needed to restore a passed gate. Visual polish never justifies scope expansion.

Changing a protected area without an approved scope update is a Scope Integrity failure.
