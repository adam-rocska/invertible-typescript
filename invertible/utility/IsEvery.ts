import {IsNonEmptyOf, NonEmptyOf} from "./NonEmpty";

export type IsEvery<
  InList extends NonEmptyOf<any>,
  OfType
> = InList extends [infer First, ...infer Rest]
  ? Rest extends NonEmptyOf<any> ? IsEvery<Rest, OfType>
  : First extends OfType ? true : false
  : false;

export const IsEvery = <
  InList extends NonEmptyOf<Element>,
  OfType extends Element,
  Element
>(
  inList: InList,
  isType: (element: Element) => element is OfType
): IsEvery<InList, OfType> => {
  const [first, ...rest] = inList;
  if (!isType(first)) return false as IsEvery<InList, OfType>;
  if (IsNonEmptyOf(rest)) return IsEvery(rest, isType) as IsEvery<InList, OfType>;
  return true as IsEvery<InList, OfType>;
};
