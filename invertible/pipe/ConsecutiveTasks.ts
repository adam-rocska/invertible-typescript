import {InputOf, OutputOf, Proverse} from "#main";
import {First, NonEmpty, NonEmptyOf, Tuple} from "#utility";
import {ArePiped} from "./ArePiped";
;
type AsConsecutive<
  Tasks extends NonEmptyOf<Proverse>
> = ArePiped<Tasks> extends true ? Tasks : never;

function pipe<Tasks extends NonEmptyOf<Proverse>>(
  ...tasks: AsConsecutive<Tasks>
) {
  throw "Not implemented";
}

pipe(
  Proverse<string, number>(async input => input.length),
  Proverse<number, string>(async input => input.toString()),
  Proverse<string, number>(async input => input.length),
);

type debug1 = ArePiped<Tuple<[
  Proverse<string, number>,
  Proverse<number, string>,
]>>;
type debug2 = NonEmpty<[
  Proverse<string, number>,
  Proverse<number, string>,
]>;
type debug3 = InputOf<First<debug2>>;