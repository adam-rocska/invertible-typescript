import {OutputOf} from "#main";
import {Consecutive} from "#pipe";
import {Inverted, Last} from "#utility";
import NativePromise from "./NativePromise";

export default
  class Promise<Tasks extends Consecutive>
  extends NativePromise<OutputOf<Last<Tasks>>>
{

  invert(): Promise<Inverted<Tasks>> {
    throw new Error("Method not implemented.");
  }

}