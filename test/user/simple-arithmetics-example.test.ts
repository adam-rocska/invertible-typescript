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