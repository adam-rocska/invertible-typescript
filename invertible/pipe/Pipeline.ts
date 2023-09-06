import {Composition} from "./Composition";
import {Consecutive} from "./Consecutive";
import {Pipe} from "./Pipe";

export type Pipeline<
  Tasks extends Consecutive
> = Composition<Tasks> & {
  pipe: Pipe<Tasks>,
  call: Composition<Tasks>
};
