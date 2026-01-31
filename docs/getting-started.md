---
title: Getting started
description: Install, write your first invertible function, and compose a pipeline.
---

<div class="search-bar">
  <input type="search" placeholder="Search docs..." data-search-input />
</div>
<div class="search-results" data-search-results></div>

## Install

```bash
pnpm add @adam-rocska/invertible
```

```bash
npm install @adam-rocska/invertible
```

## First invertible

An invertible function is a forward function paired with an inverse.

```ts
import { Invertible } from "@adam-rocska/invertible";

const increment = Invertible(
  (n: number) => n + 1,
  (n: number) => n - 1
);

await increment(1); // 2
await increment.inverse(2); // 1
```

## Compose a pipeline

Use `pipe` to chain tasks. If all tasks are invertible, the pipeline is invertible too.

```ts
import { pipe } from "@adam-rocska/invertible/pipe";

const double = Invertible(
  (n: number) => n * 2,
  (n: number) => n / 2
);

const pipeline = pipe(increment).pipe(double).pipe(increment);

await pipeline(2); // 6
await pipeline.inverse(6); // 2
```

## Sync + async together

Every task can be sync or async. The pipeline always returns a promise.

```ts
const add = (n: number) => n + 1;
const multiply = async (n: number) => n * 3;

const mixed = pipe(add).pipe(multiply);
await mixed(2); // 9
```
