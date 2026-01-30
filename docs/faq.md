---
title: FAQ
description: Practical answers about invertibility and typing.
---

## Why is my pipeline not invertible?

A pipeline is invertible only if **every** task is invertible. If you include a plain function, the pipeline becomes a `Proverse` and `.inverse` disappears.

## Why do I get a consecutive type error?

`Consecutive` enforces that each task output matches the next task input. Fix the mismatch and the error goes away.

## Can I nest pipelines?

Yes. Pipelines are functions, so they can be nested or passed into other pipelines.

## Do sync tasks return a promise?

Yes. The pipeline always returns a promise because tasks are awaited.

## Is isInvertible safe?

It checks that `.inverse` exists, is a function, and points back. It does not validate mathematical correctness.
