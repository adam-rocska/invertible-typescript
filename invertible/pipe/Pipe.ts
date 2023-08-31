import {InputOf, Invertible, OutputOf, Proverse, isInvertible} from "#main";
import {First, IsNonEmptyOf, Last, NonEmpty, tuple} from "#utility";
import {Composition} from "./Composition";
import {ConsecutiveTaskOf} from "./ConsecutiveTaskOf";
import {Pipeline} from "./Pipeline";
import inverse from "./inverse";
import proverse from "./proverse";

export type Pipe<Tasks extends Proverse[]> = <
  Task extends ConsecutiveTaskOf<Tasks>
>(task: Task) => Pipeline<[...Tasks, Task]>;

export const compose = <
  Tasks extends Proverse[]
>(
  tasks: Tasks
): Pipe<Tasks> => <
  Task extends ConsecutiveTaskOf<Tasks>
>(task: Task): Pipeline<[...Tasks, Task]> => {
    type Pipeline = NonEmpty<[...Tasks, Task]>;
    type Input = InputOf<First<Pipeline>>;
    type Output = OutputOf<Last<Pipeline>>;

    const pipeline: Pipeline = tuple(...tasks, task);
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
      pipe: {value: compose(pipeline)},
      call: {value: composition}
    });
  };

export const pipe = compose<[]>([]);