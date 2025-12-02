const { arrayAllSame } = require('./arrays');

describe('Array comparer', () => {
  test('arrayAllSame is exported', () => {
    expect(typeof arrayAllSame).toBe('function');
  });

  test('arrayAllSame returns true on an empty array', () => {
    const result = arrayAllSame([]);
    expect(result).toBe(true);
  });

  test('arrayAllSame returns true on a single-item array', () => {
    const result = arrayAllSame(["just me"]);
    expect(result).toBe(true);
  });

  test('arrayAllSame returns true for same number', () => {
    const result = arrayAllSame([2, 2, 2]);
    expect(result).toBe(true);
  });

  test('arrayAllSame returns false for different numbers', () => {
    const result = arrayAllSame([2, 3, 2]);
    expect(result).toBe(false);
  });

  test('arrayAllSame returns false for different types', () => {
    const result = arrayAllSame([1, "1"]);
    expect(result).toBe(false);
  });
  
});