
import {OutputOf, Proverse} from "@21gram-consulting/invertible";
import {Last} from "@21gram-consulting/invertible/utility";
import {Consecutive} from "./Consecutive";

export type ConsecutiveTaskOf<
  Tasks extends Consecutive
> = Proverse<OutputOf<Last<Tasks>>, any>;