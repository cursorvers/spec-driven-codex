const path = require('node:path');
const chalk = require('chalk');
const fs = require('fs-extra');

const { resolvePaths } = require('../utils/paths');
const { createLogger } = require('../utils/logger');
const { messages } = require('./messages');

async function upgrade(options = {}) {
  const paths = resolvePaths(options);
  const strings = messages[paths.locale] || messages.en;
  const logger = createLogger(options.logger);

  const result = {
    locale: paths.locale,
    prompts: {
      overwritten: [],
    },
    sdd: {
      readmeOverwritten: false,
    },
  };

  await fs.ensureDir(paths.sddDir);
  const readmeExisted = await fs.pathExists(paths.sddReadmePath);
  await fs.copy(paths.templates.sddReadme, paths.sddReadmePath);
  logger.info(chalk.green(readmeExisted ? strings.readmeOverwritten : strings.readmeCreated));
  result.sdd.readmeOverwritten = true;

  await fs.ensureDir(paths.codexPromptsDir);

  // テンプレートディレクトリはプロジェクト内で管理される固定値
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const templateFiles = await fs.readdir(paths.templates.prompts);
  for (const file of templateFiles) {
    const src = path.join(paths.templates.prompts, file);
    const dest = path.join(paths.codexPromptsDir, file);
    // src はテンプレート内の既知ファイルのみ
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const stat = await fs.stat(src);
    if (!stat.isFile()) continue;

    await fs.copy(src, dest);
    result.prompts.overwritten.push(file);
    logger.info(chalk.green(strings.promptOverwritten(file)));
  }

  if (result.prompts.overwritten.length) {
    logger.info(chalk.cyan(strings.upgradeCompletion));
  }

  return result;
}

module.exports = { upgrade };
