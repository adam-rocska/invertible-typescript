import inverse from '#pipe/inverse';
import {Invertible} from '@21gram-consulting/invertible';

describe('inverse', () => {
  it('should return the inverse output of the task if alone.', async () => {
    const task = Invertible(
      async (input: number) => input + 1,
      async (output: number) => output - 1
    );
    expect(await inverse([task], 1)).toBe(0);
  });

  it('should return the inverse output of the last task if multiple.', async () => {
    const task1 = Invertible(
      async (input: number) => input + 1,
      async (output: number) => output - 1
    );
    const task2 = Invertible(
      async (input: number) => input + 1,
      async (output: number) => output - 1
    );
    expect(await inverse([task1, task2], 2)).toBe(0);
  });

  it('should return the inverse output of the last task if multiple.', async () => {
    const task1 = Invertible(
      async (input: number) => input + 1,
      async (output: number) => output - 1
    );
    const task2 = Invertible(
      async (input: number) => input + 1,
      async (output: number) => output - 1
    );
    expect(await inverse([task1, task2], 2)).toBe(0);
  });

  it('should return the inverse output of the last task if multiple and mapping different types', async () => {
    const task1 = Invertible(
      async (input: number) => input + 1,
      async (output: number) => output - 1
    );
    const task2 = Invertible(
      async (input: number) => input.toString(),
      async (output: string) => parseInt(output)
    );
    expect(await inverse([task1, task2], '2')).toBe(1);
  });

});