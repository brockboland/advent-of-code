# Advent of Code 2025 - Node.js Solutions
This year, I'm experimenting with using AI agents to help with the the stuff _around_ the coding challenges. I'm doing the challenges myself—after all, that's the fun part—but using the agent for things like building out the package.json file, generating the test runner script, that kind of thing. I haven't had much of a reason to play with AI agents to this point and want to get some practice working with them, so this seemed like a good way to do that and avoid the tooling work that's less fun.

## Project Structure

Each day's solution is organized in its own folder (e.g., `01/`, `02/`, etc.) with the following structure:

```
NN/
├── index.js           # Solution code with part1 and part2 functions
├── index.test.js      # Test cases for both parts
├── input-sample.txt   # Sample/example input for testing
└── input-real.txt     # Real puzzle input
```

### File Details

- **`index.js`**: Exports two functions:
  - `part1(input)` — solves part 1 of the day's puzzle
  - `part2(input)` — solves part 2 of the day's puzzle
  - Both functions receive input as an array of lines (strings)

- **`index.test.js`**: Jest test file organized into two describe blocks:
  - `Day NN — Part 1` — tests for the `part1` function
  - `Day NN — Part 2` — tests for the `part2` function

- **`input-sample.txt`**: Small sample input to test logic during development
- **`input-real.txt`**: Full puzzle input for final validation

## Running Tests

### Run all tests for a day

```bash
npm test -- 01
```

This will run all test cases (both Part 1 and Part 2) for day 01.

### Run tests for a specific part only

```bash
npm test -- 01 2
```

This will run only Part 2 tests for day 01. Use `1` for Part 1 or `2` for Part 2.

### Run tests directly (without npm)

```bash
node ./test-runner.js 01
node ./test-runner.js 01 2
```

## Example Test Structure

```javascript
describe('Day NN — Part 1', () => {
  test('part1 is exported', () => {
    expect(typeof part1).toBe('function');
  });

  test('part1 returns correct result for sample input', () => {
    const sample = fs.readFileSync(path.join(__dirname, 'input-sample.txt'), 'utf8').split('\n');
    const result = part1(sample);
    expect(result).toBe(expectedValue);
  });

  test('part1 returns correct result for real input', () => {
    const real = fs.readFileSync(path.join(__dirname, 'input-real.txt'), 'utf8').split('\n');
    const result = part1(real);
    expect(result).toBe(expectedValue);
  });
});

describe('Day NN — Part 2', () => {
  // Similar structure for part2 tests
});
```

## Dependencies

- **Node.js**: >=16
- **Package Manager**: Yarn
- **Testing**: Jest
