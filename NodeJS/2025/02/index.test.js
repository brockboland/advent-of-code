import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { part1, part2 } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Day 02 — Part 1', () => {
  test('part1 is exported', () => {
    expect(typeof part1).toBe('function');
  });

  test('part1 returns a number for sample input', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8');
    const result = part1(input);
    expect(typeof result).toBe('number');
  });

  test('part1 returns 1227775554 for the sample input', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8');
    const result = part1(input);
    expect(result).toBe(1227775554);
  });

  test('part1 returns 17077011375 for the real input', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8');
    const result = part1(input);
    expect(result).toBe(17077011375);
  });
});

describe('Day 02 — Part 2', () => {
  test('part2 is exported', () => {
    expect(typeof part2).toBe('function');
  });

  test('part2 returns a number for sample input', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8');
    const result = part2(input);
    expect(typeof result).toBe('number');
  });

  test('part2 returns 4174379265 for the sample input', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8');
    const result = part2(input);
    expect(result).toBe(4174379265);
  });

  test('part2 returns 36037497037 for the real input', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8');
    const result = part2(input);
    expect(result).toBe(36037497037);
  });
});
