---
title: Type utilities
description: Tuple helpers that keep pipelines strongly typed.
---

The utility types live in `@adam-rocska/invertible/utility`.

```ts
import { First, Last, NonEmptyOf } from "@adam-rocska/invertible/utility";
```

## NonEmptyOf

```ts
type TaskList = NonEmptyOf<() => void>;
```

## First and Last

```ts
type Head = First<[1, 2, 3]>; // 1
type Tail = Last<[1, 2, 3]>; // 3
```

## Tail and Init

```ts
type Rest = Tail<[1, 2, 3]>; // [2, 3]
```

## Tuple

```ts
import { Tuple } from "@adam-rocska/invertible/utility";

const tuple = Tuple(1, 2, 3);
// type is [1, 2, 3]
```

## Coalesce

```ts
import { Coalesce } from "@adam-rocska/invertible/utility";

const value = Coalesce(undefined, undefined, "ok"); // "ok"
```

## IsEvery

```ts
import { IsEvery } from "@adam-rocska/invertible/utility";

const allStrings = IsEvery(["a", "b"], (v): v is string => typeof v === "string");
```
