export type Proverse<
  Input = any,
  Output = Input
> = (input: Input) => Promise<Output>;

export const Proverse = <
  Input = any,
  Output = Input
>(
  fn: Proverse<Input, Output>
): Proverse<Input, Output> => input => fn(input);
