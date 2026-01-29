import {Invertible, Proverse, isInvertible} from '@adam-rocska/invertible';
import {pipe} from '@adam-rocska/invertible/pipe';
// It's by design private but we gotta test it.
import proverse from '!src/pipe/proverse';
import inverse from '!src/pipe/inverse';

describe(`sync + async support`, () => {
  it(`proverse handles a single sync task`, async () => {
    const task = (input: number) => input + 1;
    expect(await proverse([task], 0)).toBe(1);
  });

  it(`proverse handles mixed sync + async tasks`, async () => {
    const task1 = (input: number) => input + 1;
    const task2 = async (input: number) => input * 2;
    const task3 = (input: number) => input - 3;
    expect(await proverse([task1, task2, task3], 1)).toBe(1);
  });

  it(`inverse handles mixed sync + async invertibles`, async () => {
    const inc = Invertible(
      (a: number) => a + 1,
      (a: number) => a - 1
    );
    const twice = Invertible(
      async (a: number) => a * 2,
      async (a: number) => a / 2
    );
    const output = await inverse([inc, twice], 10);
    expect(output).toBe(4);
  });

  it(`pipe executes sync tasks`, async () => {
    const add2 = (a: number) => a + 2;
    const square = (a: number) => a * a;
    const pipeline = pipe(add2).pipe(square).pipe(add2);
    expect(await pipeline(3)).toBe(27);
  });

  it(`pipe executes mixed sync + async tasks`, async () => {
    const add = (a: number) => a + 1;
    const mul = async (a: number) => a * 3;
    const sub = (a: number) => a - 4;
    const pipeline = pipe(add).pipe(mul).pipe(sub);
    expect(await pipeline(2)).toBe(5);
  });

  it(`Invertible accepts sync functions and remains invertible`, async () => {
    const swap = Invertible(
      (tuple: readonly [number, string]) => [tuple[0] + 1, tuple[1].toUpperCase()] as const,
      (tuple: readonly [number, string]) => [tuple[0] - 1, tuple[1].toLowerCase()] as const
    );

    expect(isInvertible(swap)).toBe(true);
    expect(await swap([1, `a`])).toEqual([2, `A`]);
    expect(await swap.inverse([2, `A`])).toEqual([1, `a`]);
  });

  it(`Proverse wrapper accepts sync functions`, async () => {
    const task = Proverse<number, string>(n => `#${n}`);
    expect(await task(5)).toBe(`#5`);
  });
});
