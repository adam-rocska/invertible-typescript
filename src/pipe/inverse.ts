import {InputOf, Invertible, OutputOf} from "@21gram-consulting/invertible";
import {First, IsNonEmptyOf, Last, NonEmptyOf} from "@21gram-consulting/invertible/utility";
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