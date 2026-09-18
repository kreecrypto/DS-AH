# Decision — Reuse vs Create

Before creating anything reusable, answer:

1. Does exact target-product identity already exist?
2. Does canonical Core DS provide the semantic primitive?
3. Does a domain pattern already compose it?
4. Is the request actually screen-only?
5. Is the proposed API semantic?
6. Are responsive/state requirements known?
7. Is ownership clear?

If any ownership/semantic question is unresolved, choose `REVIEW_REQUIRED`, not create.

## Creation threshold

Create a reusable asset only when:
- reuse search is complete
- semantics are stable
- expected reuse is more than one composition, or it represents a durable business entity
- canonical API can be named without placeholders
