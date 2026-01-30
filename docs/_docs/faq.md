---
title: FAQ
description: Common questions about typing, inverses, and runtime behavior.
order: 9
---

## Why is my pipeline not invertible?

A pipeline is invertible only if **all** tasks are invertible. If you include a plain function, the pipeline becomes a `Proverse` and `.inverse` disappears.

## Why does TypeScript say tasks are not consecutive?

The `Consecutive` type ensures outputs and inputs line up. Double-check that the output of each task matches the input of the next one.

## Can I pass a pipeline into another pipeline?

Yes. Pipelines are functions, so they can be nested or composed just like any other task.

## Do sync tasks return a promise?

Yes. The pipeline always returns a promise because it `await`s each task. This keeps sync and async tasks consistent.

## Is `isInvertible` safe at runtime?

It checks for `.inverse` and verifies the inverse points back. It does not validate that the functions are true mathematical inverses.

## Does `Invertible` enforce purity?

No. It is a type-level contract and runtime link. You decide how pure or side-effect-free your tasks are.
