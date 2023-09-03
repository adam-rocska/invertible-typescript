import {Invertible, pipe} from '@21gram-consulting/invertible';

describe('pipe', () => {

  const add = (x: number) => async (y: number) => x + y;
  const subtract = (x: number) => async (y: number) => x - y;
  const multiply = (x: number) => async (y: number) => x * y;
  const divide = (x: number) => async (y: number) => x / y;

  const increment = Invertible<number, number>(add(1), subtract(1));
  const double = Invertible<number, number>(multiply(2), divide(2));

  const toString = async (x: number) => x.toString();
  const toUpperCase = async (x: string) => x.toUpperCase();
  const toLowerCase = async (x: string) => x.toLowerCase();
  const toNumber = async (x: string) => Number(x);

  describe('spread API', () => {
    it('should compose the expected function of the single task given.', async () => {
      const pipeline = pipe(increment);
      expect(await pipeline.call(1)).toBe(2);
      expect(await pipeline(1)).toBe(2);
    });

    it('should compose the expected function when multiple tasks given.', async () => {
      const pipeline = pipe(increment, double);
      expect(await pipeline.call(1)).toBe(4);
      expect(await pipeline(1)).toBe(4);
    });

    it('should compose an invertible function when all tasks are invertible.', async () => {
      const pipeline = pipe(increment, double);
      expect(await pipeline.call(1)).toBe(4);
      expect(await pipeline(1)).toBe(4);
      expect(await pipeline.inverse(4)).toBe(1);
    });

    it('should compose a function when pipes are nested.', async () => {
      const pipeline = pipe(pipe(increment, double), pipe(double, increment));
      expect(await pipeline.call(1)).toBe(6);
      expect(await pipeline(1)).toBe(6);
      expect(await pipeline.inverse(6)).toBe(1);
    });
  });

  describe('chain  API', () => {
    it('should compose the expected function of the single task given.', async () => {
      const pipeline = pipe(increment);
      expect(await pipeline.call(1)).toBe(2);
      expect(await pipeline(1)).toBe(2);
    });

    it('should compose the expected function when multiple tasks given.', async () => {
      const pipeline = pipe(increment).pipe(double);
      expect(await pipeline.call(1)).toBe(4);
      expect(await pipeline(1)).toBe(4);
    });

    it('should compose an invertible function when all tasks are invertible.', async () => {
      const pipeline = pipe(increment).pipe(double);
      expect(await pipeline.call(1)).toBe(4);
      expect(await pipeline(1)).toBe(4);
      expect(await pipeline.inverse(4)).toBe(1);
    });

    it('should compose a function when pipes are nested.', async () => {
      const pipeline = pipe(
        pipe(increment)
          .pipe(double)
      )
        .pipe(
          pipe(double)
            .pipe(increment)
        );
      expect(await pipeline.call(1)).toBe(6);
      expect(await pipeline(1)).toBe(6);
      expect(await pipeline.inverse(6)).toBe(1);
    });
  });

  describe("Pipeline with different input and output types", () => {
    it("should pipe tasks with different input and output types", async () => {
      const pipeline = pipe(
        toString,
        toUpperCase,
        async (x: string) => x.split("").reverse().join(""),
        async (x: string) => x.length
      );
      expect(await pipeline.call(123)).toBe(3);
      expect(await pipeline(123)).toBe(3);
    });

    it("should pipe tasks with different input and output types", async () => {
      const pipeline = pipe(
        Invertible(toString, toNumber),
        Invertible(toUpperCase, toLowerCase),
        Invertible(
          async (x: string) => x.split("").reverse().join(""),
          async (x: string) => x.split("").reverse().join("")
        ),
        Invertible(
          async (x: string) => x.length,
          async (x: number) => Array(x).fill("x").map((_, i) => i).join("")
        )
      );
      expect(await pipeline.call(123)).toBe(3);
      expect(await pipeline(123)).toBe(3);
      expect(await pipeline.inverse(3)).toBe("321");
    });

  });

});