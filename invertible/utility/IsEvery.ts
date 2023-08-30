import {NonEmptyOf} from "./NonEmpty";

export type IsEvery<InList extends NonEmptyOf<any>, OfType> = InList extends [infer First, ...infer Rest]
  ? Rest extends NonEmptyOf<any> ? IsEvery<Rest, OfType>
  : First extends OfType ? true : false
  : false;

// TODO: implement a runtime version of this
