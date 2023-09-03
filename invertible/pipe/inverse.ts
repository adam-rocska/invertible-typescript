import {InputOf, Invertible, OutputOf} from "#main";
import {First, IsNonEmptyOf, Last, NonEmptyOf, Tail} from "#utility";
import {AreConsecutive} from "./AreConsecutive";
import {AsConsecutive} from "./AsConsecutive";

export default async function inverse<
  Tasks extends NonEmptyOf<Invertible>
>(
  tasks: AreConsecutive<Tasks> extends true ? Tasks : never,
  output: OutputOf<Last<Tasks>>
): Promise<InputOf<First<Tasks>>> {
  const [head, ...tail] = tasks;
  const o = IsNonEmptyOf(tail)
    ? await inverse(tail as AsConsecutive<Tail<Tasks>>, output)
    : output;
  return head.inverse(o);
}