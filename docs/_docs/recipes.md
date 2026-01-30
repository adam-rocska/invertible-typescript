---
title: Recipes
description: Practical patterns for undo, data encoding, and reversible workflows.
order: 4
---

## Undo/redo for UI actions

Invertible functions are a natural fit for undo/redo stacks.

```ts
import { Invertible } from "@adam-rocska/invertible";

type State = { count: number };

const increment = Invertible<State>(
  (state) => ({ ...state, count: state.count + 1 }),
  (state) => ({ ...state, count: state.count - 1 })
);

const stack: Array<ReturnType<typeof increment>> = [];

const apply = async (state: State) => {
  const next = await increment(state);
  stack.push(increment.inverse);
  return next;
};

const undo = async (state: State) => {
  const inverse = stack.pop();
  return inverse ? inverse(state) : state;
};
```

## Bidirectional data encoding

This is adapted from the tests to show how codecs can be chained.

```ts
import { Invertible } from "@adam-rocska/invertible";
import { pipe } from "@adam-rocska/invertible/pipe";

const byteBase64 = Invertible<string, Uint8Array>(
  (s) => Uint8Array.from(atob(s), (c) => c.codePointAt(0)!),
  (a) => btoa(String.fromCharCode(...a))
);

const stringBytes = Invertible(
  (s: string) => new TextEncoder().encode(s),
  (a: Uint8Array) => new TextDecoder().decode(a)
);

const joinTuple = <T extends readonly any[]>(separator: string) => Invertible(
  (v: T) => v.join(separator),
  (s: string) => s.split(separator) as any as T
);

class User { constructor(public name: string, public age: number) {} }

type UserTuple = readonly [name: string, age: number];

const userTuple = Invertible<User, UserTuple>(
  (u) => [u.name, u.age] as const,
  ([name, age]) => new User(name, age)
);

const userCodec = pipe(userTuple)
  .pipe(joinTuple('|'))
  .pipe(stringBytes)
  .pipe(byteBase64.inverse);

const user = new User('John Doe', 42);
const message = await userCodec(user); // "Sm9obiBEb2V8NDI="
```

## Reversible pipelines in CI

Use invertible steps to create a reversible CI pipeline (good for rollbacks or local dry-runs).

```ts
import { Invertible } from "@adam-rocska/invertible";
import { pipe } from "@adam-rocska/invertible/pipe";

const migrate = Invertible(
  async () => "migrate up",
  async () => "migrate down"
);

const seed = Invertible(
  async () => "seed data",
  async () => "remove seed"
);

const pipeline = pipe(migrate, seed);

await pipeline();
await pipeline.inverse();
```

## Validate then transform

Invertible functions can also be used as guards if you make the inverse a no-op.

```ts
const parseNumber = Invertible(
  (value: string) => {
    const n = Number(value);
    if (Number.isNaN(n)) throw new Error('Not a number');
    return n;
  },
  (n: number) => String(n)
);
```

{% include callout.html kind="note" title="Tip" content="When the inverse is lossy, document that for your consumers. The type system will keep the pipeline safe, but the runtime semantics are your responsibility." %}
