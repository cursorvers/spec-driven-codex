#!/usr/bin/env node

const minimist = require('minimist');
const chalk = require('chalk');
const { init } = require('../lib/commands');

async function main() {
  const argv = minimist(process.argv.slice(2));
  const command = argv._[0];

  console.log(chalk.cyan('🚀 spec-driven-codex'));

  const localeOption = (argv.locale ?? argv.lang ?? '').toString().trim().toLowerCase();
  const locale = localeOption || undefined;

  if (command === 'init' || !command) {
    await init({ locale });
    return;
  }

  printHelp();
}

function printHelp() {
  console.log(chalk.yellow(`
Usage:
  npx spec-driven-codex init [--locale ja]
`));
}

main().catch((error) => {
  console.error(chalk.red('想定外のエラーが発生しました'));
  console.error(error);
  process.exit(1);
});
