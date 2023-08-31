import {OutputOf, Proverse} from "#main";
import {Last, NonEmptyOf} from "#utility";

export type ConsecutiveTaskOf<Tasks extends Proverse[]> = Tasks extends NonEmptyOf<Proverse>
  ? Proverse<OutputOf<Last<Tasks>>>
  : Proverse;