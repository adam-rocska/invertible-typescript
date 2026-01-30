---
title: Recipes
description: Practical patterns for undo, codecs, and reversible workflows.
---

## Undo/redo stack

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

## Bidirectional data codec

Adapted from tests: turn a `User` into a base64 payload and back.

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
const payload = await userCodec(user); // "Sm9obiBEb2V8NDI="
```

## Reversible CI tasks

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
