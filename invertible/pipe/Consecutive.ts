import {InputOf, OutputOf, Proverse} from "#main";
import {NonEmptyOf} from "#utility";

export type Consecutive<
  Tasks extends NonEmptyOf<Proverse>
> = Tasks extends [infer SingleTask] ? [SingleTask]
  : Tasks extends [
    infer From extends Proverse,
    infer To extends Proverse
  ] ? OutputOf<From> extends InputOf<To> ? [From, To] : never
  : Tasks extends [
    infer From extends Proverse,
    infer To extends Proverse,
    ...infer Tail extends Proverse[]
  ] ? OutputOf<From> extends InputOf<To> ? [From, ...Consecutive<[To, ...Tail]>] : never
  : never;


type Test = Consecutive<[
  Proverse<string, number>,
  Proverse<number, number>
]>;
const test: Test = [
  async i => i.length,
  async i => i + 1,
];
