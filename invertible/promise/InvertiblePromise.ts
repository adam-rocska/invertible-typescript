import {Invertible} from "#main";

export default class InvertiblePromise<Input, Output> extends Promise<Output> {

  public constructor(execute: Invertible<Input, Output>) {
    super(() => {});
  }

  public invert(output: Output): InvertiblePromise<Output, Input> {
    throw 123;
  }

}
