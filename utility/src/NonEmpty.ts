// export type NonEmptyOf<Type = any> = ReadonlyArray<Type> & {readonly 0: Type;};
export type NonEmptyOf<Type = any> = [Type, ...Type[]];

export type NonEmpty<Tuple extends NonEmptyOf<any>> = Tuple;
export const NonEmpty = <
  Tuple extends ReadonlyArray<any>
>(
  ...tuple: Tuple
): Tuple => tuple;

export const NonEmptyOf = <T>(...t: NonEmptyOf<T>): NonEmptyOf<T> => t;
export const IsNonEmptyOf = <T>(candidate: ReadonlyArray<T>): candidate is NonEmptyOf<T> => candidate.length > 0;

export type IsNonEmpty<T extends ReadonlyArray<any>> = T extends []
  ? false
  : true;
