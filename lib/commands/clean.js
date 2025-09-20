const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('node:path');

const { resolvePaths } = require('../utils/paths');
const { createLogger } = require('../utils/logger');

const messages = {
  en: {
    notFound: '⚠ .sdd directory not found — nothing to clean.',
    removed: (entry) => `✓ Removed ${entry}`,
    resetTarget: '✓ Reset .sdd/target-spec.txt',
    nothing: 'No working specs were found to clean.',
  },
  ja: {
    notFound: '⚠ .sdd ディレクトリが見つかりません。実行する必要はありません。',
    removed: (entry) => `✓ ${entry} を削除しました`,
    resetTarget: '✓ .sdd/target-spec.txt を初期化しました',
    nothing: '実行するクリーンアップ対象はありませんでした。',
  },
};

async function clean(options = {}) {
  const paths = resolvePaths(options);
  const strings = messages[paths.locale] || messages.en;
  const logger = createLogger(options.logger);

  const result = {
    locale: paths.locale,
    exists: true,
    removedSpecs: [],
  };

  if (!await fs.pathExists(paths.sddDir)) {
    result.exists = false;
    logger.warn(chalk.yellow(strings.notFound));
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
    logger.info(chalk.green(strings.removed(entry)));
  }

  // target-spec.txt も resolvePaths で固定化された位置
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await fs.writeFile(paths.targetSpecPath, '');
  logger.info(chalk.green(strings.resetTarget));

  if (!result.removedSpecs.length) {
    logger.info(chalk.gray(strings.nothing));
  }

  return result;
}

module.exports = { clean };
