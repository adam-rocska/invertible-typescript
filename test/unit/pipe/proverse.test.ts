import {Proverse} from '#main';
import proverse from '#pipe/proverse';

describe('proverse', () => {
  it('should return the output of the task if alone.', async () => {
    const task = async (input: number) => input + 1;
    expect(await proverse([task], 0)).toBe(1);
  });

  it('should return the output of the last task if multiple.', async () => {
    const task1 = async (input: number) => input + 1;
    const task2 = async (input: number) => input + 1;
    expect(await proverse([task1, task2], 0)).toBe(2);
  });

  it('should return the output of the last task if multiple.', async () => {
    const task1 = async (input: number) => input + 1;
    const task2 = async (input: number) => input + 1;
    expect(await proverse([task1, task2], 0)).toBe(2);
  });

  it('should handle a pipeline with multiple types', async () => {
    const task1 = Proverse<number, number>(async v => v + 1);
    const toString = Proverse<number, string>(async v => v.toString());
    const append = (expression: string) => Proverse<string, string>(async (to: string) => to + expression);
    const isInLimits = (
      minimum: number = Number.NEGATIVE_INFINITY,
      maximum: number = Number.POSITIVE_INFINITY
    ) => Proverse<string, boolean>(async i => i.length > minimum && i.length < maximum);
    const task2 = Proverse<string, string>(async i => i.toUpperCase());
    const task3 = Proverse<boolean, boolean>(async input => !input);
    const input = 0;
    const expectedOutput = true;
    const output = await proverse([
      task1,
      toString,
      append(' as a result.'),
      task2,
      isInLimits(0, 2),
      task3
    ], input);
    expect(output).toBe(expectedOutput);
  });

});