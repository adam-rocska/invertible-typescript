---
title: Concepts
description: Learn the core ideas behind invertible functions and pipelines.
order: 2
---

## Proverse

A **proverse** is any function that maps an input to an output. It can be sync or async.

```ts
import { Proverse } from "@adam-rocska/invertible";

const toUpper = Proverse((value: string) => value.toUpperCase());
const length = Proverse(async (value: string) => value.length);
```

The `Proverse` helper wraps a function without changing behavior. It exists to keep the type system consistent and ergonomic.

## Inverse

Given a function `F`, its **inverse** maps the output back to the input. Invertible pairs need not be perfect mathematical inverses, but they should be consistent for your domain.

```ts
import { Inverse } from "@adam-rocska/invertible";

type Encoder = (value: string) => Uint8Array;

const decode = Inverse<Encoder>((bytes) => new TextDecoder().decode(bytes));
```

`Inverse` flips the input and output types of a `Proverse`.

## Invertible

`Invertible` links a proverse function and its inverse. The return value exposes an `.inverse` property that points to the paired function.

```ts
import { Invertible } from "@adam-rocska/invertible";

const trim = Invertible(
  (value: string) => value.trim(),
  (value: string) => value
);

await trim("  ok  "); // "ok"
await trim.inverse("ok"); // "ok"
```

## Pipelines

A pipeline is a sequence of tasks where each output is the next input. The types enforce that chain at compile time.

```ts
import { pipe } from "@adam-rocska/invertible/pipe";

const pipeline = pipe(
  (n: number) => n + 1,
  (n: number) => `#${n}`,
  (value: string) => value.toUpperCase()
);
```

If every task is invertible, the pipeline itself is invertible and gains an `.inverse` property.

## Sync + async composition

The library treats sync and async functions the same by using `PromiseLike` and `await` internally. That means:

- A pipeline can mix sync and async tasks.
- `Invertible` can be created from sync or async functions.
- The returned pipeline is always `Promise`-based.

## Type plumbing

A few small types hold everything together:

- `InputOf<T>` pulls the input type from a function.
- `OutputOf<T>` pulls the resolved output type.
- `MaybePromise<T>` allows both sync and async functions.

Those types show up in the API reference if you want to drill deeper.
