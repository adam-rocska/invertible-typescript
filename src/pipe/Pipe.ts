import {
  type InputOf,
  type OutputOf,
  Invertible,
  Proverse,
  isInvertible
} from "@21gram-consulting/invertible";
import {First, IsNonEmptyOf, Last, NonEmptyOf, Tuple} from "@21gram-consulting/invertible/utility";
import {Composition} from "./Composition";
import {AreConsecutive, Consecutive} from "./Consecutive";
import {Pipeline} from "./Pipeline";
import inverse from "./inverse";
import proverse from "./proverse";

export type PreliminaryTasks =
  | Consecutive<NonEmptyOf<Proverse>>
  | [];

export type Pipe<To extends PreliminaryTasks = []> = <
  Tasks extends Consecutive
>(
  ...tasks: AreConsecutive<[...To, ...Tasks]> extends true
    ? Tasks
    : never
) => Pipeline<[...To, ...Tasks]>;

const compose = <To extends PreliminaryTasks = []>(
  ...to: To
): Pipe<To> => <Tasks extends Consecutive>(
  ...tasks: AreConsecutive<[...To, ...Tasks]> extends true
    ? Tasks
    : never
): Pipeline<[...To, ...Tasks]> => {
    type Pipeline = [...To, ...Tasks];
    type Input = InputOf<First<Pipeline>>;
    type Output = OutputOf<Last<Pipeline>>;

    const pipeline: Pipeline = Tuple(...to, ...tasks);
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
