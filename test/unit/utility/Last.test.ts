import {Last, LastOr, isLastOf} from "@21gram-consulting/invertible/utility";

describe('.Last', () => {
  it('returns the last element of a tuple', () => {
    expect(Last(['a', 123, true])).toBe(true);
  });
});

describe('.isLastOf', () => {
  it('returns true if the element is the last of the tuple', () => {
    expect(isLastOf(true, ['a', 123, true])).toBe(true);
  });

  it('returns false if the element is not the last of the tuple', () => {
    expect(isLastOf(123, ['a', 123, true])).toBe(false);
  });
});

describe('.LastOr', () => {
  it('returns the last element of a tuple', () => {
    expect(LastOr(['a', 123, true], undefined)).toBe(true);
  });

  it('returns the last element of an array', () => {
    const array: string[] = ['a', 'b', 'c'];
    expect(LastOr(array, undefined)).toBe('c');
  });

  it('returns the default value if the tuple is empty', () => {
    expect(LastOr([], 'default')).toBe('default');
  });
});