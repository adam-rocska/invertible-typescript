import {InputOf, OutputOf, Proverse} from "#main";
import {NonEmptyOf} from "#utility";

export type AreConsecutive<
  Tasks extends NonEmptyOf<Proverse>
> = Tasks extends [infer _] ? true
  : Tasks extends [
    infer From extends Proverse,
    infer To extends Proverse
  ] ? OutputOf<From> extends InputOf<To> ? true : false
  : Tasks extends [
    infer From extends Proverse,
    infer To extends Proverse,
    ...infer Tail extends Proverse[]
  ] ? OutputOf<From> extends InputOf<To> ? AreConsecutive<[To, ...Tail]> : false
  : true;
