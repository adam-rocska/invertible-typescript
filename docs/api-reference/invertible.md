---
title: "API: invertible"
description: Core types and helpers from @adam-rocska/invertible.
---

## MaybePromise

```ts
type MaybePromise<T> = T | PromiseLike<T>;
```

## Proverse

```ts
type Proverse<Input = any, Output = Input> = (input: Input) => MaybePromise<Output>;
```

```ts
import { Proverse } from "@adam-rocska/invertible";

const toUpper = Proverse((value: string) => value.toUpperCase());
```

## Invertible

```ts
type Invertible<Input = any, Output = Input> = Proverse<Input, Output> & {
  readonly inverse: Invertible<Output, Input>
};
```

```ts
import { Invertible } from "@adam-rocska/invertible";

const increment = Invertible(
  (n: number) => n + 1,
  (n: number) => n - 1
);

await increment(1); // 2
await increment.inverse(2); // 1
```

## Inverse

```ts
type Inverse<Function extends Proverse> = Proverse<OutputOf<Function>, InputOf<Function>>;
```

```ts
import { Inverse } from "@adam-rocska/invertible";

type Encoder = (value: string) => Uint8Array;
const decode = Inverse<Encoder>((bytes) => new TextDecoder().decode(bytes));
```

## InputOf / OutputOf

```ts
type InputOf<F extends Proverse> = Parameters<F>[0];
type OutputOf<F extends Proverse> = Awaited<ReturnType<F>>;
```

## isInvertible

```ts
import { isInvertible } from "@adam-rocska/invertible";

if (isInvertible(increment)) {
  await increment.inverse(2);
}
```

Notes:

- `isInvertible` checks for `.inverse`, that it is a function, and that the inverse points back.
- It does not verify mathematical correctness of your inverse.
