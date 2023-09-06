import {InputOf} from "./InputOf";
import {OutputOf} from "./OutputOf";
import {Proverse} from "./Proverse";

export type Inverse<Function extends Proverse> = Proverse<
  OutputOf<Function>,
  InputOf<Function>
>;

export const Inverse = <
  Function extends Proverse
>(
  inverse: Inverse<Function>
): Inverse<Function> => output => inverse(output);
