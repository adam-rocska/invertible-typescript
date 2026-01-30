---
title: "API: utility"
description: Tuple and type helpers from @adam-rocska/invertible/utility.
---

```ts
import {
  Coalesce,
  First,
  FirstOr,
  Last,
  LastOr,
  Init,
  Tail,
  Tuple,
  NonEmpty,
  NonEmptyOf,
  IsNonEmptyOf,
  IsEvery
} from "@adam-rocska/invertible/utility";
```

## Coalesce

```ts
const value = Coalesce(undefined, "ok"); // "ok"
```

## First / FirstOr

```ts
type Head = First<[1, 2, 3]>; // 1
const head = First([1, 2, 3]); // 1
const safe = FirstOr([], "default"); // "default"
```

## Last / LastOr

```ts
type Tail = Last<[1, 2, 3]>; // 3
const tail = Last([1, 2, 3]); // 3
const safe = LastOr([], "default"); // "default"
```

## Tail / Init

```ts
type Rest = Tail<[1, 2, 3]>; // [2, 3]

type Start = Init<[1, 2, 3]>; // [1, 2]
```

## Tuple

```ts
const tuple = Tuple("a", 1, true);
```

## NonEmpty / NonEmptyOf

```ts
const tuple = NonEmpty(1, 2, 3);
const list = NonEmptyOf("x", "y");
```

## IsNonEmptyOf

```ts
const list: string[] = [];
if (IsNonEmptyOf(list)) {
  list[0];
}
```

## IsEvery

```ts
const list = ["a", "b"] as const;
const allStrings = IsEvery(list, (v): v is string => typeof v === "string");
```
