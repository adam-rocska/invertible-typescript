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
    const task1 = async (input: number) => input + 1;
    const toString = async (input: number) => input.toString();
    const append = (expression: string) => async (to: string) => to + expression;
    const isInLimits = (
      minimum: number = Number.NEGATIVE_INFINITY,
      maximum: number = Number.POSITIVE_INFINITY
    ) => async (
      input: string
    ) => input.length > minimum && input.length < maximum;
    const task2 = async (input: string) => input.toUpperCase();
    const task3 = async (input: boolean) => !input;
    const pipeline = [
      task1,
      toString,
      append(' as a result.'),
      task2,
      isInLimits(0, 2),
      task3
    ];
    const input = 0;
    const expectedOutput = true;
    const output = await proverse(pipeline, input);
    expect(output).toBe(expectedOutput);
  });

});