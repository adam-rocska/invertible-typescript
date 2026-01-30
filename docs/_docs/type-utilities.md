---
title: Type utilities
description: Small helpers that power consecutive pipelines and tuple manipulation.
order: 5
---

The library ships a small set of tuple and type utilities. You can import them from `@adam-rocska/invertible/utility`.

```ts
import { First, Last, NonEmptyOf } from "@adam-rocska/invertible/utility";
```

## NonEmpty + NonEmptyOf

`NonEmptyOf<T>` is a tuple type with at least one element.

```ts
type TaskList = NonEmptyOf<() => void>;
```

`IsNonEmptyOf` is a runtime guard.

```ts
import { IsNonEmptyOf } from "@adam-rocska/invertible/utility";

const value: Array<number> = [1, 2];
if (IsNonEmptyOf(value)) {
  value[0]; // ok
}
```

## First and Last

`First<T>` and `Last<T>` extract the first and last element of a tuple.

```ts
type Head = First<[1, 2, 3]>; // 1
type Tail = Last<[1, 2, 3]>; // 3
```

## Tail and Init

`Tail<T>` removes the first element. `Init<T>` removes the last element.

```ts
type Rest = Tail<[1, 2, 3]>; // [2, 3]
```

## Tuple

`Tuple` is a convenience helper that preserves tuple types at runtime.

```ts
import { Tuple } from "@adam-rocska/invertible/utility";

const tuple = Tuple(1, 2, 3);
//    ^ type is [1, 2, 3]
```

## Coalesce

`Coalesce` returns the first value that is not `undefined`.

```ts
import { Coalesce } from "@adam-rocska/invertible/utility";

const value = Coalesce(undefined, undefined, "ok"); // "ok"
```

## IsEvery

`IsEvery` is a type-level predicate plus a runtime helper to check if every element of a tuple matches a type guard.

```ts
import { IsEvery } from "@adam-rocska/invertible/utility";

const allStrings = IsEvery(["a", "b"], (v): v is string => typeof v === "string");
```
