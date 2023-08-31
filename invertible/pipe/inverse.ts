import {InputOf, Invertible, OutputOf} from "#main";
import {First, IsNonEmptyOf, Last, NonEmptyOf} from "#utility";

export default async function inverse<
  Tasks extends NonEmptyOf<Invertible>
>(
  tasks: Tasks,
  output: OutputOf<Last<Tasks>>
): Promise<InputOf<First<Tasks>>> {
  const [head, ...tail] = tasks;
  const o = IsNonEmptyOf(tail)
    ? await inverse(tail, output)
    : output;
  return head.inverse(o);
}