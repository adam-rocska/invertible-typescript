import {InputOf} from "./InputOf";
import {OutputOf} from "./OutputOf";
import {Proverse} from "./Proverse";

export const Inverse = <
  Function extends Proverse
>(
  inverse: Proverse<OutputOf<Function>, InputOf<Function>>
): typeof inverse => output => inverse(output);
