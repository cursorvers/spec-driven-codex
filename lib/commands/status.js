const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('node:path');

const { resolvePaths } = require('../utils/paths');
const { createLogger } = require('../utils/logger');

const messages = {
  en: {
    notFound: '❌ .sdd directory not found',
    runInit: 'Run npx spec-driven-codex init first.',
    noActive: '⚠ No active specification is selected.',
    startRequirements: 'Fill in .sdd/description.md and run /sdd-requirements to begin.',
    activeSpec: (name) => `📋 Active spec: ${name}`,
    generatedHeading: '\n✓ Generated files:',
    otherSpecsHeading: '\n📂 Other specs:',
  },
  ja: {
    notFound: '❌ .sdd ディレクトリが見つかりません',
    runInit: '先に npx spec-driven-codex init を実行してください',
    noActive: '⚠ 作業中のspecがありません',
    startRequirements: 'description.md を記述して /sdd-requirements を実行してください',
    activeSpec: (name) => `📋 現在のspec: ${name}`,
    generatedHeading: '\n✓ 生成済みファイル:',
    otherSpecsHeading: '\n📂 その他のspec:',
  },
};

async function status(options = {}) {
  const paths = resolvePaths(options);
  const strings = messages[paths.locale] || messages.en;
  const logger = createLogger(options.logger);
  const result = {
    locale: paths.locale,
    exists: true,
    targetSpec: null,
    generatedFiles: [],
    otherSpecs: [],
  };

  if (!await fs.pathExists(paths.sddDir)) {
    result.exists = false;
    logger.error(chalk.red(strings.notFound));
    logger.warn(chalk.yellow(strings.runInit));
    return result;
  }

  const targetSpec = (await safeRead(paths.targetSpecPath)).trim();
  if (!targetSpec) {
    logger.warn(chalk.yellow(strings.noActive));
    logger.info(strings.startRequirements);
    result.targetSpec = '';
    return result;
  }

  result.targetSpec = targetSpec;
  logger.info(chalk.cyan(strings.activeSpec(chalk.bold(targetSpec))));

  const specDir = path.join(paths.specsDir, targetSpec);
  if (await fs.pathExists(specDir)) {
    // specDir は .sdd 配下で管理されるサンドボックス
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const files = await fs.readdir(specDir);
    result.generatedFiles = files;
    if (files.length) {
      logger.info(chalk.green(strings.generatedHeading));
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
      logger.info(chalk.gray(strings.otherSpecsHeading));
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
