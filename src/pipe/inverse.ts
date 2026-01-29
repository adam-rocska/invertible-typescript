import {InputOf, Invertible, OutputOf} from "../invertible";
import {First, IsNonEmptyOf, Last, NonEmptyOf} from "../utility";
import {Consecutive} from "./Consecutive";

export default async function inverse<
  Tasks extends Consecutive<NonEmptyOf<Invertible>>
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