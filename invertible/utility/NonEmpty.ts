export type NonEmptyOf<Type = any> = Array<Type> & {readonly 0: Type;};

export type NonEmpty<Tuple extends NonEmptyOf<any>> = Tuple;
export const NonEmpty = <
  Tuple extends Array<any>
>(
  ...tuple: Tuple
): Tuple => tuple;

export const NonEmptyOf = <T>(...t: NonEmptyOf<T>): NonEmptyOf<T> => t;
export const IsNonEmptyOf = <T>(candidate: Array<T>): candidate is NonEmptyOf<T> => candidate.length > 0;

export type IsNonEmpty<T extends Array<any>> = T extends []
  ? false
  : true;
