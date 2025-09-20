const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('node:path');

const { resolvePaths } = require('../utils/paths');
const { createLogger } = require('../utils/logger');

async function status(options = {}) {
  const paths = resolvePaths(options);
  const logger = createLogger(options.logger);
  const result = {
    exists: true,
    targetSpec: null,
    generatedFiles: [],
    otherSpecs: [],
  };

  if (!await fs.pathExists(paths.sddDir)) {
    result.exists = false;
    logger.error(chalk.red('❌ .sdd ディレクトリが見つかりません'));
    logger.warn(chalk.yellow('先に npx spec-driven-codex init を実行してください'));
    return result;
  }

  const targetSpec = (await safeRead(paths.targetSpecPath)).trim();
  if (!targetSpec) {
    logger.warn(chalk.yellow('⚠ 作業中のspecがありません'));
    logger.info('description.md を記述して /sdd-requirements を実行してください');
    result.targetSpec = '';
    return result;
  }

  result.targetSpec = targetSpec;
  logger.info(chalk.cyan(`📋 現在のspec: ${chalk.bold(targetSpec)}`));

  const specDir = path.join(paths.specsDir, targetSpec);
  if (await fs.pathExists(specDir)) {
    // specDir は .sdd 配下で管理されるサンドボックス
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const files = await fs.readdir(specDir);
    result.generatedFiles = files;
    if (files.length) {
      logger.info(chalk.green('\n✓ 生成済みファイル:'));
      for (const file of files) {
        logger.info(`  - ${file}`);
      }
    }
  }

  if (await fs.pathExists(paths.specsDir)) {
    // specsDir はツールが生成したディレクトリのみを含む
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const specs = await fs.readdir(paths.specsDir);
    result.otherSpecs = specs.filter((name) => name !== targetSpec && name !== 'archives');
    if (result.otherSpecs.length) {
      logger.info(chalk.gray('\n📂 その他のspec:'));
      for (const spec of result.otherSpecs) {
        logger.info(chalk.gray(`  - ${spec}`));
      }
    }
  }

  return result;
}

async function safeRead(filePath) {
  try {
    // filePath は resolvePaths で生成し、ユーザー入力を受け付けない
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return '';
    }
    throw error;
  }
}

module.exports = { status };
