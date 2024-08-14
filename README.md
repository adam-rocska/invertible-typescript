# Invertible Functions for TS & JS

[![NPM Version](https://img.shields.io/npm/v/@adam-rocska/invertible.svg)](https://www.npmjs.com/package/@adam-rocska/invertible)
[![License](https://img.shields.io/npm/l/@adam-rocska/invertible)](https://github.com/adam-rocska/invertible-typescript/blob/master/LICENSE)

A library for creating and managing invertible functions and type-safe pipelines in TypeScript.

## Installation

To install the package, use npm or yarn:

```zsh
npm install @adam-rocska/invertible
```

or

```zsh
pnpm add @adam-rocska/invertible
```

## Usage

Simple example:

```ts
import {Invertible} from "@adam-rocska/invertible";
import {pipe} from "@adam-rocska/invertible/pipe";

test(`Simple arithmetics example`, async () => {
  const increment = Invertible(
    async (a: number) => a + 1,
    async (a: number) => a - 1
  );
  const double = Invertible(
    async (a: number) => a * 2,
    async (a: number) => a / 2
  );

  expect(await increment(1)).toBe(2);
  expect(await increment.inverse(2)).toBe(1);

  expect(await double(2)).toBe(4);
  expect(await double.inverse(4)).toBe(2);

  const pipeExample = pipe(increment)
    .pipe(double)
    .pipe(increment)
    .pipe(double);

  expect(await pipeExample(1)).toBe(10);
});
```

## Usefulness Ideas

1. Undo-able user interface actions
2. Reversible CI pipeline steps and pipelines
3. Bidirectional data coding

## Contributing

Contributions are welcome!
Please read the [contributing guidelines](./CONTRIBUTING.md)
before submitting a pull request.

## License

This project is licensed under the MIT License - see the
[LICENSE](./LICENSE) file for details.

## Author

[Ádám László Rocska](https://github.com/adam-rocska)
