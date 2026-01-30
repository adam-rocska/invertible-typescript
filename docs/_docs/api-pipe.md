---
title: API: pipe
description: Reference for pipelines, composition, and consecutive task typing.
order: 7
---

Import everything from the `pipe` entry:

```ts
import { pipe, Pipeline, Composition, Consecutive } from "@adam-rocska/invertible/pipe";
```

## `pipe(...tasks)`

Creates a pipeline from tasks. Accepts both plain functions and invertible tasks.

```ts
const pipeline = pipe(
  (n: number) => n + 1,
  (n: number) => n * 2
);
```

### `pipeline.pipe(...more)`

Chain additional tasks onto an existing pipeline.

```ts
const pipeline = pipe((n: number) => n + 1)
  .pipe((n: number) => n * 2)
  .pipe((n: number) => n - 3);
```

### `pipeline.call(input)`

Explicit call signature. Same behavior as calling the pipeline directly.

```ts
await pipeline.call(1);
```

## `Pipeline<Tasks>`

```ts
type Pipeline<Tasks extends Consecutive> = Composition<Tasks> & {
  pipe: Pipe<Tasks>,
  call: Composition<Tasks>
};
```

Pipelines are both callable and extendable.

## `Composition<Tasks>`

```ts
type Composition<Tasks extends NonEmptyOf<Proverse>> =
  IsEvery<Tasks, Invertible> extends true
    ? Invertible<InputOf<First<Tasks>>, OutputOf<Last<Tasks>>>
    : Proverse<InputOf<First<Tasks>>, OutputOf<Last<Tasks>>>;
```

If every task is invertible, the whole composition is invertible.

## `Consecutive<Tasks>` and `AreConsecutive<Tasks>`

```ts
type Consecutive<Tasks extends NonEmptyOf<Proverse>> = // ensures alignment
```

`Consecutive` ensures each task output matches the next task input.

`AreConsecutive<Tasks>` returns `true` if types line up, otherwise `false`.

### Example: Type alignment error

```ts
const bad = pipe(
  (n: number) => n + 1,
  (value: string) => value.toUpperCase()
);
```

The second task expects a string, but the first task returns a number, so TypeScript flags it.
