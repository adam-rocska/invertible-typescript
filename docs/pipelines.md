---
title: Pipelines
description: Compose tasks, keep types aligned, and preserve invertibility.
---

## Spread API and chain API

```ts
import { pipe } from "@adam-rocska/invertible/pipe";

const spread = pipe(
  (n: number) => n + 1,
  (n: number) => n * 2
);

const chained = pipe((n: number) => n + 1)
  .pipe((n: number) => n * 2);
```

Both return a pipeline that is callable like a function.

```ts
await spread(1); // 4
await chained(1); // 4
```

## Invertible pipelines

If every task is invertible, the pipeline is invertible.

```ts
import { Invertible } from "@adam-rocska/invertible";

const inc = Invertible(
  (n: number) => n + 1,
  (n: number) => n - 1
);

const twice = Invertible(
  (n: number) => n * 2,
  (n: number) => n / 2
);

const pipeline = pipe(inc, twice);

await pipeline(2); // 6
await pipeline.inverse(6); // 2
```

## Nesting pipelines

Pipelines are functions, so you can compose them.

```ts
const pipeline = pipe(
  pipe(inc, twice),
  pipe(twice, inc)
);

await pipeline(1); // 9
await pipeline.inverse(9); // 1
```

## Type alignment errors

`Consecutive` ensures output types match next input types.

```ts
const bad = pipe(
  (n: number) => n + 1,
  (value: string) => value.toUpperCase()
);
// Type error: number is not assignable to string
```

## Mixed sync + async

```ts
const task1 = (n: number) => n + 1;
const task2 = async (n: number) => n * 2;
const task3 = (n: number) => n - 3;

const pipeline = pipe(task1, task2, task3);
await pipeline(1); // 1
```
