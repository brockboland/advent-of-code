import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { part1, part2 } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Day 03 — Part 1', () => {
  test('part1 is exported', () => {
    expect(typeof part1).toBe('function');
  });

  test.skip('part1 sample (TODO)', () => {
    // TODO: add sample and expected value
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
    const result = part1(sample);
    // expect(result).toBe(/* expected */);
  });
});

describe('Day 03 — Part 2', () => {
  test('part2 is exported', () => {
    expect(typeof part2).toBe('function');
  });

  test.skip('part2 sample (TODO)', () => {
    // TODO: add sample and expected value
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
    const result = part2(sample);
    // expect(result).toBe(/* expected */);
  });
});
