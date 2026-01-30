---
title: Invertible functions for TypeScript
description: Compose forward + inverse logic into pipelines with type-safe guarantees.
---

# Invertible functions for TypeScript

Build pipelines where every step knows its inverse. Compose transformations, undo actions, and reversible workflows without losing type safety.

```ts
import { Invertible } from "@adam-rocska/invertible";
import { pipe } from "@adam-rocska/invertible/pipe";

const inc = Invertible(
  (n: number) => n + 1,
  (n: number) => n - 1
);

const twice = Invertible(
  (n: number) => n * 2,
  (n: number) => n / 2
);

const pipeline = pipe(inc).pipe(twice).pipe(inc);

await pipeline(2); // 6
await pipeline.inverse(6); // 2
```

## Why it feels good

- **Bidirectional by design**: Each step carries its inverse.
- **Type-safe composition**: Outputs align with next inputs.
- **Sync + async together**: Mix both without ceremony.
- **Zero config**: Just functions, plus strong typings.

## Where it shines

- Undo/redo for UI actions
- Reversible data transforms
- Safe encode/decode pipelines
- Rollbackable workflows

Next: head to **Getting started** or jump straight into **Pipelines**.
