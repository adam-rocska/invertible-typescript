import {Proverse} from "#main";
import {NonEmptyOf} from "#utility";
import {Composition} from "./Composition";
import {Pipe} from "./Pipe";

export type Pipeline<
  Tasks extends NonEmptyOf<Proverse>
> = Composition<Tasks> & {
  pipe: Pipe<Tasks>,
  call: Composition<Tasks>
};
