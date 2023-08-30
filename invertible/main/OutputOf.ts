import {Proverse} from "./Proverse";

export type OutputOf<Function extends Proverse> = Awaited<ReturnType<Function>>;
