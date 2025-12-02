const fs = require('fs');
const path = require('path');
const { part1, part2 } = require('./index');

describe('Day 01 — Part 1', () => {
  test('part1 is exported', () => {
    expect(typeof part1).toBe('function');
  });

  test('part1 returns a number for sample input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
    const result = part1(50, sample);
    expect(typeof result).toBe('number');
  });

  test('part1 returns 3 for the sample input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
    const result = part1(50, sample);
    expect(result).toBe(3);
  });

  test('part1 returns 1180 for the real input', () => {
    const real = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8').split('\n');
    const result = part1(50, real);
    expect(result).toBe(1180);
  });
});

describe('Day 01 — Part 2', () => {
  test('part2 is exported', () => {
    expect(typeof part2).toBe('function');
  });

  test('part2 returns a number for sample input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
    const result = part2(50, sample);
    expect(typeof result).toBe('number');
  });

    test('part2 returns 6 for the sample input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
    const result = part2(50, sample);
    expect(result).toBe(6);
  });

  test('part2 returns 6892 for the real input', () => {
    const real = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8').split('\n');
    const result = part2(50, real);
    expect(result).toBe(6892);
  });
});
