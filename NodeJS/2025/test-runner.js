#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function getArgs() {
  // Accepts: `node test-runner.js <day> [part]` or via `npm test -- <day> [part]`
  const cliDay = process.argv[2];
  const cliPart = process.argv[3];

  let cooked = [];
  try {
    const npmArgv = process.env.npm_config_argv;
    if (npmArgv) {
      const parsed = JSON.parse(npmArgv);
      cooked = parsed.cooked || [];
    }
  } catch (e) {}

  const day = cliDay || cooked[0];
  const part = cliPart || cooked[1];

  if (!day) {
    console.error('Usage: npm test <day> [part] (e.g. npm test 01 2)');
    process.exit(1);
  }

  return { day, part };
}

const { day, part } = getArgs();
let jestBin = path.resolve(__dirname, 'node_modules', 'jest', 'bin', 'jest.js');
if (!fs.existsSync(jestBin)) {
  jestBin = path.resolve(__dirname, '..', 'node_modules', 'jest', 'bin', 'jest.js');
}
if (!fs.existsSync(jestBin)) {
  console.error('Could not find local jest binary. Run `yarn install` first.');
  process.exit(1);
}

let pattern = `/${day}/`;
const args = [jestBin, '--testPathPattern', pattern, '--colors'];
if (part) {
  // Use testNamePattern to run only the describe/test names for the requested part
  // We expect describe titles to include the substring `Part <n>` (e.g. `Part 2`)
  const namePattern = `Part\\s*${part}`;
  args.push('--testNamePattern', namePattern);
}

const result = spawnSync(process.execPath, args, { stdio: 'inherit', cwd: path.resolve(__dirname, day) });
process.exit(result.status);
