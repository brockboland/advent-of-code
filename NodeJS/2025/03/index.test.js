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

    test('part1 sample', () => {
        const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
        const result = part1(sample);
        expect(result).toBe(357);
    });

    test('part1 real input', () => {
        const input = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8').split('\n');
        const result = part1(input);
        expect(result).toBe(17229);
    });
});

describe('Day 03 — Part 2', () => {
    test('part2 is exported', () => {
        expect(typeof part2).toBe('function');
    });

    test('part2 sample', () => {
        const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
        const result = part2(sample);
        expect(result).toBe(3121910778619);
    });

    test('part2 real input', () => {
        const input = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8').split('\n');
        const result = part2(input);
        expect(result).toBe(170520923035051);
    });
});
