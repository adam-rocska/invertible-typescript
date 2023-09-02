import {Proverse} from "#main";
import {NonEmptyOf} from "#utility";
import {AreConsecutive} from "./AreConsecutive";

export type AsConsecutive<
  Tasks extends NonEmptyOf<Proverse>
> = AreConsecutive<Tasks> extends true ? Tasks : never;
