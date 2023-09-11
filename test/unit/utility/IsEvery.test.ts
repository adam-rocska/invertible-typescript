import {IsEvery} from '@21gram-consulting/invertible/utility';

describe('IsEvery', () => {
  type TestType = number;
  const isTestType = (candidate: any): candidate is TestType => typeof candidate === 'number';

  it('should return true for a list of one element', () => {
    expect(IsEvery([1], isTestType)).toBe(true);
  });
  it('should return true for a list of two elements', () => {
    expect(IsEvery([1, 2], isTestType)).toBe(true);
  });
  it('should return true for a list of three elements', () => {
    expect(IsEvery([1, 2, 3], isTestType)).toBe(true);
  });
  it('should return true for a list of four elements', () => {
    expect(IsEvery([1, 2, 3, 4], isTestType)).toBe(true);
  });
  it('should return true for a list of five elements', () => {
    expect(IsEvery([1, 2, 3, 4, 5], isTestType)).toBe(true);
  });
  it('should return true for a list of six elements', () => {
    expect(IsEvery([1, 2, 3, 4, 5, 6], isTestType)).toBe(true);
  });
  it('should return true for a list of seven elements', () => {
    expect(IsEvery([1, 2, 3, 4, 5, 6, 7], isTestType)).toBe(true);
  });
  it('should return true for a list of eight elements', () => {
    expect(IsEvery([1, 2, 3, 4, 5, 6, 7, 8], isTestType)).toBe(true);
  });
  it('should return true for a list of nine elements', () => {
    expect(IsEvery([1, 2, 3, 4, 5, 6, 7, 8, 9], isTestType)).toBe(true);
  });
  it('should return true for a list of ten elements', () => {
    expect(IsEvery([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], isTestType)).toBe(true);
  });

  it('should return false for a list of mixed elements', () => {
    expect(IsEvery([1, '2', 3, '4', 5, 6, 7, 8, 9, 10], isTestType)).toBe(false);
  });

  it('should return false for a list of mixed elements', () => {
    expect(IsEvery([1, '2', 3, '4', 5, 6, 7, 8, 9, 10], isTestType)).toBe(false);
  });

});