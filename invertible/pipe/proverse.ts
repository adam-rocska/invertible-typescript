import {InputOf, OutputOf, Proverse} from "#main";
import {First, IsNonEmptyOf, Last, NonEmptyOf} from "#utility";
import {Consecutive} from "./Consecutive";

export default async function proverse<
  Tasks extends Consecutive<NonEmptyOf<Proverse>>
>(
  tasks: Tasks,
  input: InputOf<First<Tasks>>
): Promise<OutputOf<Last<Tasks>>> {
  const [head, ...tail] = tasks;
  const output = await head(input);
  if (IsNonEmptyOf(tail)) return proverse(tail, output);
  return output;
}