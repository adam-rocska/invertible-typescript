import {InputOf, OutputOf, Proverse} from "../invertible";
import {NonEmptyOf} from "../utility";

export type Consecutive<
  Tasks extends NonEmptyOf<Proverse> = NonEmptyOf<Proverse>
> = Tasks extends [
  infer From extends Proverse,
  infer To extends Proverse,
  ...infer Tail extends Proverse[]
] ? [
    Proverse<InputOf<From>, OutputOf<From> & InputOf<To>>,
    ...Consecutive<[
      Proverse<OutputOf<From> & InputOf<To>, OutputOf<To>>,
      ...Tail
    ]>
  ]
  : Tasks extends [
    infer From extends Proverse,
    infer To extends Proverse
  ] ? [
    Proverse<InputOf<From>, OutputOf<From> & InputOf<To>>,
    Proverse<OutputOf<From> & InputOf<To>, OutputOf<To>>
  ]
  : Tasks;

export const Consecutive = <
  Tasks extends Consecutive = Consecutive
>(
  ...tasks: Tasks
): Tasks => tasks;

export type AreConsecutive<
  Tasks extends NonEmptyOf<Proverse>
> = Tasks extends Consecutive<Tasks> ? true : false;