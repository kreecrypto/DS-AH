# Router — Route Task

## Inputs

- user request
- optional Figma URL
- current task context
- product router
- intent router

## Algorithm

1. Check explicit command prefix such as `DS:REVIEW`.
2. Otherwise classify natural-language intent using `agent/router/intent.json`.
3. Parse any Figma file key and node ID.
4. Resolve product using `agent/product-router.json`.
5. Determine write mode.
6. Produce an execution envelope before tool use.

## Execution envelope

```json
{
  "command": "REVIEW",
  "product": "admin",
  "fileKey": "rEJCvUGUfzzQ3jegheRhnr",
  "nodeId": "optional",
  "writeMode": "read-only",
  "workflow": "agent/workflows/review.md",
  "registries": []
}
```

## Ambiguity

If command is known but product is unknown, the agent may inspect an explicitly supplied Figma URL to resolve product.

If neither product nor target is resolvable, do not invent a source.
