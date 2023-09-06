import {OutputOf} from "#main";
import {Consecutive} from "#pipe";
import {Inverted, Last} from "#utility";
import InvertiblePromise from "./InvertiblePromise";
import NativePromise from "./NativePromise";

export default
  class Promise<Tasks extends Consecutive>
  extends NativePromise<OutputOf<Last<Tasks>>>
  implements InvertiblePromise<Tasks> {

  invert(): InvertiblePromise<Inverted<Tasks>> {
    throw new Error("Method not implemented.");
  }

}