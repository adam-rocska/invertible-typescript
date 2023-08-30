import {NonEmptyOf} from "./NonEmpty";

export type Tuple<Tuple extends NonEmptyOf<any>> = Tuple;
export const tuple = <Tuple extends NonEmptyOf<any>>(...tuple: Tuple): Tuple => tuple;

// TODO: if/when an isTuple will be handy, I've got a neato type-strict idea for it