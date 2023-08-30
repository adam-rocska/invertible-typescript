export type Coalesce<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? Head extends undefined
  ? Coalesce<Tail>
  : Head
  : T;