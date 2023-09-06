import {Consecutive} from "#pipe";
import {Inverted} from "#utility";

export default interface InvertiblePromise<
  Tasks extends Consecutive
> {
  invert(): InvertiblePromise<Inverted<Tasks>>
}