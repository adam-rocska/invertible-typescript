export type NonEmptyOf<Type> =
  | [Type]
  | [Type, ...Type[]]
  | [...Type[], Type]
  | [Type, ...Type[], Type];

export type NonEmpty<T extends NonEmptyOf<any>> = T;
export const NonEmpty = <T extends NonEmptyOf<any>>(...t: T): NonEmpty<T> => t;

export const NonEmptyOf = <T>(...t: NonEmptyOf<T>): NonEmptyOf<T> => t;

export type IsNonEmpty<T extends any[]> = T extends [] ? false : true;
export const IsNonEmptyOf = <T>(candidate: T[]): candidate is NonEmptyOf<T> => candidate.length > 0;
