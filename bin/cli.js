#!/usr/bin/env node

const minimist = require('minimist');
const chalk = require('chalk');
const { init, status, clean } = require('../lib/commands');

async function main() {
  const argv = minimist(process.argv.slice(2));
  const command = argv._[0];

  console.log(chalk.cyan('🚀 spec-driven-codex'));

  switch (command) {
    case 'init':
      await init();
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
使い方:
  npx spec-driven-codex init    # 初期化
  npx spec-driven-codex status  # 状態確認
  npx spec-driven-codex clean   # クリーンアップ
`));
}

main().catch((error) => {
  console.error(chalk.red('想定外のエラーが発生しました'));
  console.error(error);
  process.exit(1);
});
