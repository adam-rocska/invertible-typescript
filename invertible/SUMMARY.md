## Summary

A TypeScript library to allow you to implement strict,
strongly typed,invertible (a.k.a. reversible) functions and
pipelines (a.k.a. compositions) of pure functions.

## Common Use Cases

- **Transalation**: Commit-Rollback-style translating
  between two different types of objects, e.g. between a
  database model and a domain model.
- **Undo/Redo GUI Features**
- **Serialization/Deserialization**: e.g. JSON <-> TypeScript
  objects
- **Encryption/Decryption**
- **CLI Programs**: Typically you want both pipelines and
  invertible functions in CLI programs. Pipelines are useful
  for composing together a series of pure functions to
  implement the program's logic. Invertible functions are
  useful for implementing CLI flags that can be used to
  modify the program's behavior.

## Terminology

- **Proverse**: A function that takes a value of type `A` and
  returns a value of type `B`.
- **Inverse**: A function defined with its Proverse pair in
  context, that takes a value of type `B` and returns a
  value of type `A`. Therefore, all Inverse functions are
  also Proverse functions, but not all Proverse functions
  are Inverse functions.
- **Invertible**: A function that has both its Proverse and
  Inverse defined.
- **Pipeline**: A composition of Proverse functions.

## Potentially Unfamiliar Conventions
- **Static & Runtime Parity**: We at 21Gram always aim to
  implement runtime aspects of pure types with the same name
  and same or similar API that represent the very same mental
  model concepts. For example, you may have an `IsNonEmpty`
  type and an `IsNonEmpty` function for runtime use.
  The type resolves a `true` or `false` type to make
  conditional typing easier, while the function returns an
  `item is NonEmpty` boolean value at runtime.

## Examples

For now, please see the [tests](./test) for examples.
We have full 100% coverage and this whole show is for free.