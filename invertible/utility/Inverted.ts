import {IsNonEmptyOf, NonEmptyOf} from "./NonEmpty";

export type Inverted<
  Tuple extends NonEmptyOf<any>
> = Tuple extends readonly [infer Head, ...infer Tail]
  ? Tail extends NonEmptyOf<any>
  ? [...Inverted<Tail>, Head]
  : [Head]
  : [];

export const Inverted = <Tuple extends NonEmptyOf<any>>(
  tuple: Tuple
): Inverted<Tuple> => {
  const [head, ...tail] = tuple;
  return (IsNonEmptyOf(tail)
    ? [...Inverted(tail), head]
    : [head]) as Inverted<Tuple>; // TODO: find a way to remove this idiot amateur type casting
}