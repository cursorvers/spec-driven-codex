#!/usr/bin/env node

const minimist = require('minimist');
const chalk = require('chalk');
const { init, status, clean } = require('../lib/commands');

async function main() {
  const argv = minimist(process.argv.slice(2));
  const command = argv._[0];

  console.log(chalk.cyan('🚀 spec-driven-codex'));

  const localeOption = (argv.locale ?? argv.lang ?? '').toString().trim().toLowerCase();
  const locale = localeOption || undefined;

  switch (command) {
    case 'init':
      await init({ locale });
      break;
    case 'status':
      await status();
      break;
    case 'clean':
      await clean();
      break;
    default:
      printHelp();
      break;
  }
}

function printHelp() {
  console.log(chalk.yellow(`
Usage:
  npx spec-driven-codex init [--locale ja]    # Initialize SDD assets
  npx spec-driven-codex status [--locale ja]  # Show current spec progress
  npx spec-driven-codex clean [--locale ja]   # Remove working specs and reset target
`));
}

main().catch((error) => {
  console.error(chalk.red('想定外のエラーが発生しました'));
  console.error(error);
  process.exit(1);
});
