---
title: Pipelines
description: Compose tasks, keep types aligned, and preserve invertibility.
order: 3
---

## Two APIs: spread and chain

`pipe` works both as a variadic function and as a chainable builder.

```ts
import { pipe } from "@adam-rocska/invertible/pipe";

const spread = pipe(
  (n: number) => n + 1,
  (n: number) => n * 2
);

const chained = pipe((n: number) => n + 1)
  .pipe((n: number) => n * 2);
```

Both return a **pipeline** that is callable like a function.

```ts
await spread(1); // 4
await chained(1); // 4
```

## `call` is always the same function

`pipeline.call` exists as an explicit entry point if you prefer a named method.

```ts
await chained.call(1); // 4
```

## Invertible pipelines

If every task is invertible, the pipeline is invertible as well.

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

Pipelines can be composed by feeding one pipeline into another.

```ts
const pipeline = pipe(
  pipe(inc, twice),
  pipe(twice, inc)
);

await pipeline(1); // 9
await pipeline.inverse(9); // 1
```

## Type alignment (`Consecutive`)

The `Consecutive` type ensures output types and input types line up. If you see a type error, it usually means the output of task A does not match the input of task B.

```ts
const good = pipe(
  (n: number) => `${n}`,
  (value: string) => value.toUpperCase()
);
```

```ts
const bad = pipe(
  (n: number) => n + 1,
  (value: string) => value.toUpperCase()
);
//              ^ Type error: number is not assignable to string
```

## Mixing sync + async tasks

```ts
const task1 = (n: number) => n + 1;
const task2 = async (n: number) => n * 2;
const task3 = (n: number) => n - 3;

const pipeline = pipe(task1, task2, task3);
await pipeline(1); // 1
```

## When does a pipeline lose invertibility?

A pipeline is only invertible if **every** task is invertible. If even one task lacks an `.inverse`, the pipeline becomes a normal `Proverse`.

{% include callout.html kind="warning" title="Important" content="If you mix `Invertible` tasks with plain functions, the pipeline still works but you will not get `pipeline.inverse`." %}
