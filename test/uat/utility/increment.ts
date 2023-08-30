import Invertible from "@21gram-consulting/invertible";
import {ConditionalPick} from "type-fest";

export default <
  Object extends ConditionalPick<object, number>,
  Key extends keyof Object
>(
  field: Key,
  by: number
) => Invertible<Object>(
  async o => ({...o, [field]: o[field] + by}),
  async o => ({...o, [field]: o[field] - by})
);