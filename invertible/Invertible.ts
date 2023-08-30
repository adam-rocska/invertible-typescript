import {Proverse} from "#Proverse";
import {Inverse} from "#Inverse";

export type Invertible<
  Input = any,
  Output = Input
> = Proverse<Input, Output> & {
  readonly inverse: Invertible<Output, Input>
};

export const Invertible = <Input, Output = Input>(
  proverse: Proverse<Input, Output>,
  inverse: Proverse<Output, Input>
): Invertible<Input, Output> => {
  proverse = Proverse(proverse);
  inverse = Inverse(inverse);

  let proverseInvertible: Invertible<Input, Output>;
  let inverseInvertible: Invertible<Output, Input>;

  proverseInvertible = Object.defineProperty(
    proverse,
    'inverse',
    {get: () => inverseInvertible}
  );

  inverseInvertible = Object.defineProperty(
    inverse,
    'inverse',
    {get: () => proverseInvertible}
  );

  return proverseInvertible;
}

export type IsInvertible<
  Function extends Proverse
> = Function extends Invertible<Function> ? true : false;
export const isInvertible = <
  Input = any,
  Output = Input
>(
  fn: Proverse<Input, Output>
): fn is Invertible<Input, Output> => {
  if (typeof fn !== "function") return false;
  if (!("inverse" in fn)) return false;
  if (typeof fn.inverse !== "function") return false;
  if (!("inverse" in fn.inverse)) return false;
  if (fn.inverse.inverse !== fn) return false;
  return true;
};
