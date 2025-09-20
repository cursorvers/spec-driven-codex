const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('node:path');

const { resolvePaths } = require('../utils/paths');
const { createLogger } = require('../utils/logger');

async function clean(options = {}) {
  const paths = resolvePaths(options);
  const logger = createLogger(options.logger);

  const result = {
    exists: true,
    removedSpecs: [],
  };

  if (!await fs.pathExists(paths.sddDir)) {
    result.exists = false;
    logger.warn(chalk.yellow('⚠ .sdd ディレクトリが見つかりません。実行する必要はありません。'));
    return result;
  }

  await fs.ensureDir(paths.specsDir);
  // .sdd 配下は本ツールが管理する専用ディレクトリ
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const entries = await fs.readdir(paths.specsDir);
  for (const entry of entries) {
    if (entry === 'archives') continue;
    const fullPath = path.join(paths.specsDir, entry);
    // fullPath は .sdd/specs 内の既知サブディレクトリ
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const stat = await fs.stat(fullPath);
    if (!stat.isDirectory()) continue;

    await fs.remove(fullPath);
    result.removedSpecs.push(entry);
    logger.info(chalk.green(`✓ ${entry} を削除しました`));
  }

  // target-spec.txt も resolvePaths で固定化された位置
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await fs.writeFile(paths.targetSpecPath, '');
  logger.info(chalk.green('✓ .sdd/target-spec.txt を初期化しました'));

  if (!result.removedSpecs.length) {
    logger.info(chalk.gray('実行するクリーンアップ対象はありませんでした。'));
  }

  return result;
}

module.exports = { clean };
