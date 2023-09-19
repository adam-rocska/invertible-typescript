import {NonEmptyOf} from "./NonEmpty";

export type Last<Tuple extends NonEmptyOf<any>> = [
  any, // this is the smartest idea I had in years
  ...Tuple
][Tuple[`length`]];
export const Last = <
  Tuple extends NonEmptyOf<any>
>(tuple: Tuple): Last<Tuple> => tuple[tuple.length - 1];
export type IsLastOf<
  Tuple extends NonEmptyOf<any>,
  Element
> = Element extends Last<Tuple> ? true : false;
export const isLastOf = <
  Tuple extends NonEmptyOf<any>,
  Element
>(
  element: Element,
  tuple: Tuple
): element is Last<Tuple> => {
  return tuple[tuple.length - 1] === element;
};

export type LastOr<
  Tuple,
  DefaultIfEmpty
> = Tuple extends [...infer _, infer Last] ? Last
  : Tuple extends [infer Only] ? Only
  : DefaultIfEmpty;
export const LastOr = <
  Tuple extends any[],
  DefaultIfEmpty
>(
  tuple: Tuple,
  defaultIfEmpty: DefaultIfEmpty
): LastOr<Tuple, DefaultIfEmpty> => {
  return tuple[tuple.length - 1] ?? defaultIfEmpty;
};
