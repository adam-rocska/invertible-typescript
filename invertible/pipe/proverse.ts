import {InputOf, OutputOf} from "#main";
import {First, IsNonEmptyOf, Last} from "#utility";
import {Consecutive} from "./Consecutive";

export default async function proverse<
  Tasks extends Consecutive
>(
  tasks: Tasks,
  input: InputOf<First<Tasks>>
): Promise<OutputOf<Last<Tasks>>> {
  const [head, ...tail] = tasks;
  const output = await head(input);
  if (IsNonEmptyOf(tail)) return proverse(tail, output);
  return output;
}