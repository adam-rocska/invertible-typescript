import {Inverse, OutputOf} from "#main";
import {Consecutive} from "#pipe";
import {ConsecutiveTaskOf} from "#pipe/ConsecutiveTaskOf";
import {Inverted, Last} from "#utility";
import NativePromise from "./NativePromise";

export default
  class Promise<Tasks extends Consecutive>
  extends NativePromise<OutputOf<Last<Tasks>>>
{

  public invert(): Promise<Inverted<Tasks>> {
    throw new Error("Method not implemented.");
  }

  public override then<
    PrimaryTask extends ConsecutiveTaskOf<Tasks>,
    RecoveryTask extends Inverse<PrimaryTask>
  >(
    onFulfilled: PrimaryTask,
    onRejected: never
  ): Promise<Consecutive<[...Tasks, PrimaryTask]>> {
    throw new Error("Method not implemented.");
  }
}