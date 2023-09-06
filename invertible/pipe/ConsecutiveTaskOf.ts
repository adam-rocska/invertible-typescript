
import {OutputOf, Proverse} from "#main";
import {Last} from "#utility";
import {Consecutive} from "./Consecutive";

export type ConsecutiveTaskOf<
  Tasks extends Consecutive
> = Proverse<OutputOf<Last<Tasks>>, any>;