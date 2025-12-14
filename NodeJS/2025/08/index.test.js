import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { part1, part2 } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Day 08 — Part 1', () => {
  test('part1 is exported', () => {
    expect(typeof part1).toBe('function');
  });

  test('part1 sample', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
    const result = part1(sample, 10);
    expect(result).toBe(40);
  });

  test('part1 real', () => {
    const real = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8').split('\n');
    const result = part1(real, 1000);
    expect(result).toBe(112230);
  });
});

describe('Day 08 — Part 2', () => {
  test('part2 is exported', () => {
    expect(typeof part2).toBe('function');
  });

  test('part2 sample', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
    const result = part2(sample);
    expect(result).toBe(25272);
  });

  test('part2 real', () => {
    const real = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8').split('\n');
    const result = part2(real);
    expect(result).toBe(2573952864)
  });
});
