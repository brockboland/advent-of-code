#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function getArgs() {
  // Accepts: `node test-runner.js <target> [part]` 
  // where <target> is either "utils" or a day number (e.g., 01, 02)
  // via `npm test <target> [part]` or `yarn test <target> [part]`
  let cooked = [];
  try {
    const npmArgv = process.env.npm_config_argv;
    if (npmArgv) {
      const parsed = JSON.parse(npmArgv);
      cooked = parsed.cooked || [];
    }
  } catch (e) {}

  // Prefer cooked args from npm_config_argv (set when run via npm/yarn), 
  // then fall back to direct process.argv (when run directly via node)
  const target = cooked[0] || process.argv[2];
  const part = cooked[1] || process.argv[3];

  if (!target) {
    console.error('Usage: npm test <target> [part]');
    console.error('  <target> can be a day (e.g., 01, 02) or "utils"');
    console.error('  [part] is optional for day tests (1 or 2)');
    console.error('Examples: npm test 01, npm test 01 2, npm test utils');
    process.exit(1);
  }

  return { target, part };
}

const { target, part } = getArgs();
let jestBin = path.resolve(__dirname, 'node_modules', 'jest', 'bin', 'jest.js');
if (!fs.existsSync(jestBin)) {
  jestBin = path.resolve(__dirname, '..', 'node_modules', 'jest', 'bin', 'jest.js');
}
if (!fs.existsSync(jestBin)) {
  console.error('Could not find local jest binary. Run `yarn install` first.');
  process.exit(1);
}

// Determine if target is "utils" or a day number, and set up Jest args accordingly
let jestArgs = [jestBin, '--colors'];
let cwd = __dirname;

if (target === 'utils') {
  // Running utils tests
  jestArgs.push('--testPathPattern', '/utils/');
} else {
  // Running day tests (01, 02, etc.)
  const pattern = `/${target}/`;
  jestArgs.push('--testPathPattern', pattern);
  cwd = path.resolve(__dirname, target);
  
  if (part) {
    // Use testNamePattern to run only the describe/test names for the requested part
    // We expect describe titles to include the substring `Part <n>` (e.g. `Part 2`)
    const namePattern = `Part\\s*${part}`;
    jestArgs.push('--testNamePattern', namePattern);
  }
}

const result = spawnSync(process.execPath, jestArgs, { stdio: 'inherit', cwd });
process.exit(result.status);
