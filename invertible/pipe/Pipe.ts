import {InputOf, Invertible, OutputOf, Proverse, isInvertible} from "#main";
import {First, IsNonEmptyOf, Last, NonEmpty, NonEmptyOf, Tuple, tuple} from "#utility";
import {AreConsecutive} from "./AreConsecutive";
import {Composition} from "./Composition";
import {Pipeline} from "./Pipeline";
import inverse from "./inverse";
import proverse from "./proverse";

// TODO: investigate if we could utilize the native javascript #bind method instead of this poor man's currying.

export type Pipe<ToTasks extends Proverse[]> = <
  Tasks extends NonEmptyOf<Proverse>
>(
  ...tasks: AreConsecutive<[...ToTasks, ...Tasks]> extends true ? Tasks : never
) => Pipeline<[...ToTasks, ...Tasks]>;

export const compose = <
  ToTasks extends Proverse[]
>(
  ...toTasks: ToTasks
): Pipe<ToTasks> => <
  Tasks extends NonEmptyOf<Proverse>
>(
  ...tasks: AreConsecutive<[...ToTasks, ...Tasks]> extends true ? Tasks : never
): Pipeline<[...ToTasks, ...Tasks]> => {
    type Pipeline = NonEmpty<[...ToTasks, ...Tasks]>;
    type Input = InputOf<First<Pipeline>>;
    type Output = OutputOf<Last<Pipeline>>;

    const pipeline: Pipeline = tuple(...toTasks, ...tasks);
    let composition: Composition<Pipeline>;

    if (pipeline.every(isInvertible) && IsNonEmptyOf(pipeline)) {
      composition = Invertible<Input, Output>(
        input => proverse(pipeline, input),
        output => inverse(pipeline, output)
      );
    } else {
      composition = Proverse<Input, Output>(input => proverse(pipeline, input));
    }

    return Object.defineProperties(composition, {
      pipe: {value: compose(...pipeline)},
      call: {value: composition}
    });
  };

export const pipe = compose();

pipe(
  Proverse<string, number>(async input => input.length),
  Proverse<number, string>(async input => input.toString()),
  Proverse<string, number>(async input => input.length),
).pipe(
  Proverse<number, string>(async input => input.toString()),
  Proverse<string, number>(async input => input.length),
  Proverse<number, string>(async input => input.toString()),
  pipe(
    Proverse<string, number>(async input => input.length),
  ),
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