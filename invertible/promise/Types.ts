import {Invertible, OutputOf} from "#main";
import {Consecutive} from "#pipe";
import {Inverted, IsEvery, Last} from "#utility";

export type Promise<Tasks extends Consecutive> =
  // MARK: Invertibility treatment
  IsEvery<Tasks, Invertible> extends true
  ? {invert(value: OutputOf<Last<Tasks>>): Promise<Inverted<Tasks>>}
  : {}
  // MARK: Common stuff
  & {

  };

export type PromiseConstructor =
  new <T>(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void
    ) => void
  ) => PromiseLike<T>;;