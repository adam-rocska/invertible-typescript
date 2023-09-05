import {InputOf, OutputOf, Proverse} from "#main";
import {NonEmptyOf} from "#utility";

export type Consecutive<
  Tasks extends NonEmptyOf<Proverse>
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
