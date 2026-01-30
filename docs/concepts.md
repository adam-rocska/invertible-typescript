---
title: Concepts
description: The core vocabulary behind invertible functions and pipelines.
---

## Proverse

A **proverse** is any function from input to output. It can be sync or async.

```ts
import { Proverse } from "@adam-rocska/invertible";

const toUpper = Proverse((value: string) => value.toUpperCase());
const length = Proverse(async (value: string) => value.length);
```

## Inverse

An **inverse** goes the other way: output back to input.

```ts
import { Inverse } from "@adam-rocska/invertible";

type Encoder = (value: string) => Uint8Array;
const decode = Inverse<Encoder>((bytes) => new TextDecoder().decode(bytes));
```

## Invertible

An **invertible** links a proverse and its inverse, and keeps them connected.

```ts
import { Invertible } from "@adam-rocska/invertible";

const trim = Invertible(
  (value: string) => value.trim(),
  (value: string) => value
);
```

## Pipelines

A pipeline is a sequence of tasks where each output becomes the next input. Types guarantee alignment.

```ts
import { pipe } from "@adam-rocska/invertible/pipe";

const pipeline = pipe(
  (n: number) => n + 1,
  (n: number) => `#${n}`,
  (value: string) => value.toUpperCase()
);
```

If every task is invertible, the pipeline is invertible too.
