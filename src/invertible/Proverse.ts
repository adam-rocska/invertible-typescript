export type MaybePromise<T> = T | PromiseLike<T>;

export type Proverse<
  Input = any,
  Output = Input
> = (input: Input) => MaybePromise<Output>;

export const Proverse = <
  Input = any,
  Output = Input
>(
  fn: Proverse<Input, Output>
): Proverse<Input, Output> => input => fn(input);
