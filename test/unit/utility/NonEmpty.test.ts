import {NonEmpty, NonEmptyOf, IsNonEmptyOf, Tuple} from "@21gram-consulting/invertible/utility";

describe(`.NonEmpty`, () => {
  it(`returns a non-empty tuple`, () => {
    expect(NonEmpty(`a`, `b`, `c`)).toEqual(Tuple(`a`, `b`, `c`));
  });
});

describe(`.NonEmptyOf`, () => {
  it(`returns a non-empty tuple of specific types`, () => {
    expect(NonEmptyOf<string>(`a`, `b`, `c`)).toEqual(Tuple(`a`, `b`, `c`));
  });
});

describe(`.IsNonEmptyOf`, () => {
  it(`returns true if the tuple is not empty`, () => {
    expect(IsNonEmptyOf([`a`, `b`, `c`])).toBe(true);
  });

  it(`returns false if the tuple is empty`, () => {
    expect(IsNonEmptyOf([])).toBe(false);
  });
});
