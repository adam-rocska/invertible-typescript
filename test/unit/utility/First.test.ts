import {Tuple, First, FirstOr} from "@21gram-consulting/invertible";

describe('First', () => {
  it('returns the first element of a tuple', () => {
    expect(First(Tuple('a', 123, true))).toBe('a');
  });
});

describe('.FirstOr', () => {
  it('returns the first element of a tuple', () => {
    expect(FirstOr(Tuple('a', 123, true), undefined)).toBe('a');
  });

  it('returns the first element of an array', () => {
    const array: string[] = ['a', 'b', 'c'];
    expect(FirstOr(array, undefined)).toBe('a');
  });

  it('returns the default value if the tuple is empty', () => {
    expect(FirstOr([], 'default')).toBe('default');
  });

  it('returns the first element of a tuple', () => {
    const tuple: [string, number, boolean] = ['hello', 42, true];
    expect(FirstOr(tuple, undefined)).toBe('hello');
  });

  it('returns the first element if default value is undefined', () => {
    const obj = {a: 'hello', b: 'world'};
    expect(FirstOr([obj], undefined)).toBe(obj);
  });
});