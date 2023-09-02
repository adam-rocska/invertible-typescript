import {InputOf, OutputOf, Proverse} from "#main";
import {First, IsNonEmpty, NonEmpty, NonEmptyOf, Tuple} from "#utility";
import {AreConsecutive} from "./AreConsecutive";

export type Pipe<ToTasks extends Proverse[]> = <
  Tasks extends NonEmptyOf<Proverse>
>(
  ...tasks: AreConsecutive<[...ToTasks, ...Tasks]> extends true ? Tasks : never
) => Pipeline<[...Tasks, Task]>;

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

type debug1 = AreConsecutive<Tuple<[
  Proverse<string, number>,
  Proverse<number, string>,
]>>;
type debug2 = NonEmpty<[
  Proverse<string, number>,
  Proverse<number, string>,
]>;
type debug3 = InputOf<First<debug2>>;