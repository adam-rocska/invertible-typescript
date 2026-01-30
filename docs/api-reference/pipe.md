---
title: "API: pipe"
description: Pipelines, composition, and consecutive typing.
---

## pipe

```ts
import { pipe } from "@adam-rocska/invertible/pipe";

const pipeline = pipe(
  (n: number) => n + 1,
  (n: number) => n * 2
);
```

## pipeline.pipe

```ts
const pipeline = pipe((n: number) => n + 1)
  .pipe((n: number) => n * 2)
  .pipe((n: number) => n - 3);
```

## pipeline.call

```ts
await pipeline.call(1);
```

## Pipeline

```ts
type Pipeline<Tasks extends Consecutive> = Composition<Tasks> & {
  pipe: Pipe<Tasks>,
  call: Composition<Tasks>
};
```

## Composition

```ts
type Composition<Tasks extends NonEmptyOf<Proverse>> =
  IsEvery<Tasks, Invertible> extends true
    ? Invertible<InputOf<First<Tasks>>, OutputOf<Last<Tasks>>>
    : Proverse<InputOf<First<Tasks>>, OutputOf<Last<Tasks>>>;
```

## Consecutive / AreConsecutive

`Consecutive` ensures output types match next input types.

```ts
const bad = pipe(
  (n: number) => n + 1,
  (value: string) => value.toUpperCase()
);
```
