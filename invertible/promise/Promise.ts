import {Inverse, OutputOf, Proverse} from "#main";
import {Consecutive} from "#pipe";
import {ConsecutiveTaskOf} from "#pipe/ConsecutiveTaskOf";
import {Inverted, Last} from "#utility";
import {Init} from "#utility/Init";
import NativePromise from "./NativePromise";

export default
  class Promise<Tasks extends Consecutive>
  extends NativePromise<OutputOf<Last<Tasks>>> {

  private readonly task: Last<Tasks>;
  private readonly previous: Init<Tasks> extends Consecutive
    ? Promise<Init<Tasks>>
    : null;

  public constructor(
    task: Last<Tasks>,
    previous: Init<Tasks> extends Consecutive
      ? Promise<Init<Tasks>>
      : null
  ) {
    super();

    this.task = task;
    this.previous = previous;
  }

  public override then<
    Task extends ConsecutiveTaskOf<Tasks>
  >(
    onFulfilled?: Task | null,
    onRejected?: Proverse<any, OutputOf<Task>> | null
  ): Promise<Consecutive<[...Tasks, Task]>> {
    throw new Error("Method not implemented.");
  }

}