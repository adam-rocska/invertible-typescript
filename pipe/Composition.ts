import type {InputOf, Invertible, OutputOf, Proverse} from "@21gram-consulting/invertible";
import {First, IsEvery, Last, NonEmptyOf} from "@21gram-consulting/invertible/utility";

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