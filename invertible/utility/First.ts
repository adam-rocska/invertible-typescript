import {NonEmptyOf} from "./NonEmpty";

export type First<Tuple extends NonEmptyOf<any>> = Tuple[0];
export const First = <Tuple extends NonEmptyOf<any>>(tuple: Tuple): First<Tuple> => tuple[0];

export type FirstOr<
  Tuple extends any[],
  DefaultIfEmpty
> = Tuple extends [infer First, ...infer _] ? First
  : Tuple extends [infer Only] ? Only
  : DefaultIfEmpty;

export const FirstOr = <
  Tuple extends any[],
  DefaultIfEmpty
>(
  tuple: Tuple,
  defaultIfEmpty: DefaultIfEmpty
): FirstOr<Tuple, DefaultIfEmpty> => {
  return tuple[0] ?? defaultIfEmpty;
}
