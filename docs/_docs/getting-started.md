---
title: Getting started
description: Install, run your first invertible function, and compose a pipeline.
order: 1
---

<div class="search-bar">
  <input type="search" placeholder="Search docs..." data-search-input />
</div>
<div class="search-results" data-search-results></div>

## Installation

```bash
npm install @adam-rocska/invertible
```

```bash
pnpm add @adam-rocska/invertible
```

## First invertible function

An invertible function is a forward function paired with its inverse. Use `Invertible` to attach the inverse and keep them linked.

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

Use `pipe` to build a pipeline. When every task is invertible, the pipeline is invertible too.

```ts
import { pipe } from "@adam-rocska/invertible/pipe";

const double = Invertible(
  (n: number) => n * 2,
  (n: number) => n / 2
);

const pipeline = pipe(increment)
  .pipe(double)
  .pipe(increment);

await pipeline(2); // 6
await pipeline.inverse(6); // 2
```

## Sync + async works together

Every task can be sync or async. The pipeline always returns a promise.

```ts
const add = (n: number) => n + 1;
const multiply = async (n: number) => n * 3;

const mixed = pipe(add).pipe(multiply);
await mixed(2); // 9
```

{% include callout.html kind="tip" title="Why `Proverse`?" content="`Proverse` is a tiny wrapper that keeps types consistent and makes it easy to treat a function as a pipeline task. You can still pass raw functions into `pipe` when you want to." %}

## Next steps

- Learn the core concepts in **Concepts**.
- Dig into **Pipelines** if you want to understand how typing and invertibility work.
- Jump straight to **API: invertible** and **API: pipe** if you prefer reference docs.
