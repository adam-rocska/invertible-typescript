import {Invertible, Proverse} from '@21gram-consulting/invertible';
import {pipe} from '@21gram-consulting/invertible/pipe';

describe(`pipe`, () => {

  const add = (x: number) => Proverse<number>(async (y) => x + y);
  const subtract = (x: number) => Proverse<number>(async (y) => y - x);
  const multiply = (x: number) => Proverse<number>(async (y) => x * y);
  const divide = (x: number) => Proverse<number>(async (y) => y / x);

  const increment = Invertible<number, number>(add(1), subtract(1));
  const double = Invertible<number, number>(multiply(2), divide(2));

  const toString = Proverse<number, string>(async (x) => x.toString());
  const toUpperCase = Proverse<string, string>(async (x) => x.toUpperCase());
  const toLowerCase = Proverse<string, string>(async (x) => x.toLowerCase());
  const toNumber = Proverse<string, number>(async (x) => Number(x));

  describe(`spread API`, () => {
    it(`should compose the expected function of the single task given.`, async () => {
      const pipeline = pipe(increment);
      expect(await pipeline.call(1)).toBe(2);
      expect(await pipeline(1)).toBe(2);
    });

    it(`should compose the expected function when multiple tasks given.`, async () => {
      const pipeline = pipe(increment, double);
      expect(await pipeline.call(1)).toBe(4);
      expect(await pipeline(1)).toBe(4);
    });

    it(`should compose an invertible function when all tasks are invertible.`, async () => {
      const pipeline = pipe(increment, double);
      expect(await pipeline.call(1)).toBe(4);
      expect(await pipeline(1)).toBe(4);
      expect(await pipeline.inverse(4)).toBe(1);
    });

    it(`should compose a function when pipes are nested.`, async () => {
      const pipeline = pipe(pipe(increment, double), pipe(double, increment));
      expect(await pipeline.call(1)).toBe(9);
      expect(await pipeline(1)).toBe(9);
      expect(await pipeline.inverse(9)).toBe(1);
    });
  });

  describe(`chain  API`, () => {
    it(`should compose the expected function of the single task given.`, async () => {
      const pipeline = pipe(increment);
      expect(await pipeline.call(1)).toBe(2);
      expect(await pipeline(1)).toBe(2);
    });

    it(`should compose the expected function when multiple tasks given.`, async () => {
      const pipeline = pipe(increment).pipe(double);
      expect(await pipeline.call(1)).toBe(4);
      expect(await pipeline(1)).toBe(4);
    });

    it(`should compose an invertible function when all tasks are invertible.`, async () => {
      const pipeline = pipe(increment).pipe(double);
      expect(await pipeline.call(1)).toBe(4);
      expect(await pipeline(1)).toBe(4);
      expect(await pipeline.inverse(4)).toBe(1);
    });

    it(`should compose a function when pipes are nested.`, async () => {
      const pipeline = pipe(
        pipe(increment)
          .pipe(double)
      )
        .pipe(
          pipe(double)
            .pipe(increment)
        );
      expect(await pipeline.call(1)).toBe(9);
      expect(await pipeline(1)).toBe(9);
      expect(await pipeline.inverse(9)).toBe(1);
    });
  });

  describe(`Pipeline with different input and output types`, () => {
    it(`should pipe tasks with different input and output types`, async () => {
      const pipeline = pipe(
        toString,
        toUpperCase,
        async (x: string) => x.split(``).reverse().join(``),
        async (x: string) => x.length
      );
      expect(await pipeline.call(123)).toBe(3);
      expect(await pipeline(123)).toBe(3);
    });

    it(`should pipe tasks with different input and output types`, async () => {
      const pipeline = pipe(
        Invertible(toString, toNumber),
        Invertible(toUpperCase, toLowerCase),
        Invertible(
          async (x: string) => x.split(``).reverse().join(``),
          async (x: string) => x.split(``).reverse().join(``)
        ),
        Invertible(
          async (x: string) => x.length,
          async (x: number) => Array(x).fill(`x`).map((_, i) => i + 1).join(``)
        )
      );
      expect(await pipeline.call(123)).toBe(3);
      expect(await pipeline(123)).toBe(3);
      expect(await pipeline.inverse(3)).toBe(321);
    });

  });

});