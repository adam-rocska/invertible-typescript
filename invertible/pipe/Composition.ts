import {InputOf, Invertible, OutputOf, Proverse} from "#main";
import {First, IsEvery, Last, NonEmptyOf} from "#utility";

export type Composition<
  Tasks extends NonEmptyOf<Proverse>
> = IsEvery<Tasks, Invertible> extends true
  ? Invertible<
    InputOf<First<Tasks>>,
    OutputOf<Last<Tasks>>
  >
  : Proverse<
    InputOf<First<Tasks>>,
    OutputOf<Last<Tasks>>
  >;