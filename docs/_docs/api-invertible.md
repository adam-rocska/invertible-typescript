---
title: API: invertible
description: Reference for core types and functions from @adam-rocska/invertible.
order: 6
---

## `MaybePromise<T>`

```ts
type MaybePromise<T> = T | PromiseLike<T>;
```

Allows both sync and async return types.

## `Proverse<Input, Output>`

```ts
type Proverse<Input = any, Output = Input> = (input: Input) => MaybePromise<Output>;
```

### `Proverse(fn)`

Wraps a function without changing behavior. Keeps the typing consistent.

```ts
import { Proverse } from "@adam-rocska/invertible";

const toUpper = Proverse((value: string) => value.toUpperCase());
```

## `Invertible<Input, Output>`

```ts
type Invertible<Input = any, Output = Input> = Proverse<Input, Output> & {
  readonly inverse: Invertible<Output, Input>
};
```

### `Invertible(proverse, inverse)`

Creates a bidirectional pair and links the inverse in both directions.

```ts
import { Invertible } from "@adam-rocska/invertible";

const increment = Invertible(
  (n: number) => n + 1,
  (n: number) => n - 1
);

await increment(1); // 2
await increment.inverse(2); // 1
```

## `Inverse<Function>`

```ts
type Inverse<Function extends Proverse> = Proverse<OutputOf<Function>, InputOf<Function>>;
```

### `Inverse(fn)`

Wraps an inverse function with the flipped types.

```ts
import { Inverse } from "@adam-rocska/invertible";

type Encoder = (value: string) => Uint8Array;
const decode = Inverse<Encoder>((bytes) => new TextDecoder().decode(bytes));
```

## `InputOf<Function>` and `OutputOf<Function>`

```ts
type InputOf<F extends Proverse> = Parameters<F>[0];
type OutputOf<F extends Proverse> = Awaited<ReturnType<F>>;
```

## `isInvertible(fn)`

Runtime type guard to check if a function is invertible.

```ts
import { isInvertible } from "@adam-rocska/invertible";

if (isInvertible(increment)) {
  await increment.inverse(2);
}
```

### Notes

- `isInvertible` checks the `.inverse` property, that it is a function, and that the inverse points back.
- `Invertible` accepts sync or async functions.
