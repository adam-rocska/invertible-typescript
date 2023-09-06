import {Invertible, OutputOf} from "#main";
import {Consecutive} from "#pipe";
import {Inverted, Last, NonEmptyOf} from "#utility";
import Promise from "./Promise";

export default
  class InvertiblePromise<
    Tasks extends Consecutive<
      NonEmptyOf<Invertible>
    >
  >
  extends Promise<Tasks> {
  public invert(
    value: OutputOf<Last<Tasks>>
  ): InvertiblePromise<Inverted<Tasks>> {
    throw new Error("Method not implemented.");
  }
}