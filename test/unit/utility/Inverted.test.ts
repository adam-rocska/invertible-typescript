import {Inverted} from "@21gram-consulting/invertible";

describe('Inverted', () => {
  it('should invert a tuple', () => {
    type Tuple = [number, string, boolean];
    type InvertedTuple = Inverted<Tuple>;
    const tuple: Tuple = [1, '2', true];
    const invertedTuple: InvertedTuple = [true, '2', 1];
    expect(tuple).toEqual(invertedTuple);
  });
});