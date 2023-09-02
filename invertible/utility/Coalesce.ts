export type Coalesce<T extends any[]> =
  | undefined
  | (T extends [infer Head, ...infer Tail]
    ? Head extends undefined
    ? Coalesce<Tail>
    : Head
    : T
  );

export const Coalesce = <T extends any[]>(...args: T): Coalesce<T> => {
  if (args.length === 0) return undefined;
  const [head, ...tail] = args;
  return head === undefined ? Coalesce(...tail) : head;
}