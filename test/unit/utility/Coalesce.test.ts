import {Coalesce} from '@adam-rocska/invertible/utility';

describe(`Coalesce`, () => {
  it(`should return undefined with no parameters provided.`, () => {
    expect(Coalesce()).toBeUndefined();
  });

  it(`should return the first defined item when it has some items defined`, () => {
    expect(Coalesce(undefined, 1, 2, 3)).toBe(1);
  });

  it(`should return undefined when it has no items defined`, () => {
    expect(Coalesce(undefined, undefined, undefined)).toBeUndefined();
  });

  it(`should return the first defined item when it has some items defined, even if the first item is falsy`, () => {
    expect(Coalesce(null, undefined, 0, ``, 1, 2, 3)).toBe(null);
  });

  it(`should return the first defined item when it has some items defined, even if the first item is an object`, () => {
    const obj = {};
    expect(Coalesce(obj, undefined, null, 1, 2, 3)).toBe(obj);
  });

  it(`should return the first defined item when it has some items defined, even if the first item is a function`, () => {
    const func = () => {};
    expect(Coalesce(func, undefined, null, 1, 2, 3)).toBe(func);
  });
});