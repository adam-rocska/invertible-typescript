import {InputOf, OutputOf, Proverse} from "#main";
import {First, IsNonEmptyOf, Last, NonEmptyOf} from "#utility";
import {AreConsecutive} from "./AreConsecutive";

export default async function proverse<
  Tasks extends NonEmptyOf<Proverse>
>(
  tasks: AreConsecutive<Tasks> extends true ? Tasks : never,
  input: InputOf<First<Tasks>>
): Promise<OutputOf<Last<Tasks>>> {
  const [head, ...tail] = tasks;
  const output = await head(input);
  if (IsNonEmptyOf(tail)) return proverse(tail, output);
  return output;
}