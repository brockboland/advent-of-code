const fs = require('fs');
const path = require('path');
const { part1, part2 } = require('./index');

describe('Day 02 — Part 1', () => {
  test('part1 is exported', () => {
    expect(typeof part1).toBe('function');
  });

  test('part1 returns a number for sample input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8');
    const result = part1(sample);
    expect(typeof result).toBe('number');
  });

  test('part1 returns 1227775554 for the sample input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8');
    const result = part1(sample);
    expect(result).toBe(1227775554);
  });

  test('part1 returns 17077011375 for the real input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8');
    const result = part1(sample);
    expect(result).toBe(17077011375);
  });
});

describe('Day 02 — Part 2', () => {
  test('part2 is exported', () => {
    expect(typeof part2).toBe('function');
  });

  test('part2 returns a number for sample input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8');
    const result = part2(sample);
    expect(typeof result).toBe('number');
  });

  test('part2 returns 4174379265 for the sample input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8');
    const result = part2(sample);
    expect(result).toBe(4174379265);
  });
});
