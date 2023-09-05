import {InputOf, Invertible, OutputOf, Proverse, isInvertible} from "#main";
import {First, IsNonEmptyOf, Last, NonEmptyOf, Tuple} from "#utility";
import {Composition} from "./Composition";
import {Consecutive} from "./Consecutive";
import {Pipeline} from "./Pipeline";
import inverse from "./inverse";
import proverse from "./proverse";

export type Pipe<ToTasks extends ReadonlyArray<Proverse>> = <
  Tasks extends Consecutive<NonEmptyOf<Proverse>>
>(
  ...tasks: Consecutive<[...ToTasks, Tasks]>
) => Pipeline<[...ToTasks, ...Tasks]>;

const compose = <
  ToTasks extends ReadonlyArray<Proverse>
>(
  ...toTasks: ToTasks
): Pipe<ToTasks> => <
  Tasks extends Consecutive<NonEmptyOf<Proverse>>
>(
  ...tasks: Tasks
): Pipeline<[...ToTasks, ...Tasks]> => {
    type Pipeline = [...ToTasks, ...Tasks];
    type Input = InputOf<First<Pipeline>>;
    type Output = OutputOf<Last<Pipeline>>;

    const pipeline: Pipeline = Tuple(...toTasks, ...tasks);
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
