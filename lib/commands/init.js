const path = require('node:path');
const chalk = require('chalk');
const fs = require('fs-extra');

const { resolvePaths } = require('../utils/paths');
const { createLogger } = require('../utils/logger');
const { messages } = require('./messages');

async function init(options = {}) {
  const paths = resolvePaths(options);
  const strings = messages[paths.locale] || messages.en;
  const logger = createLogger(options.logger);

  const result = {
    locale: paths.locale,
    created: {
      description: false,
      targetSpec: false,
      steeringDir: false,
      specsDir: false,
      sddReadme: false,
    },
    prompts: {
      installed: [],
      overwritten: [],
      skipped: [],
    },
  };

  await fs.ensureDir(paths.sddDir);
  if (!await fs.pathExists(paths.steeringDir)) {
    await fs.ensureDir(paths.steeringDir);
    result.created.steeringDir = true;
  }

  if (!await fs.pathExists(paths.specsDir)) {
    await fs.ensureDir(paths.specsDir);
    result.created.specsDir = true;
  }

  if (!await fs.pathExists(paths.descriptionPath)) {
    await fs.copy(paths.templates.description, paths.descriptionPath);
    result.created.description = true;
    logger.info(chalk.green(strings.descriptionCreated));
  } else {
    logger.warn(chalk.yellow(strings.descriptionExists));
  }

  const readmeExisted = await fs.pathExists(paths.sddReadmePath);
  await fs.copy(paths.templates.sddReadme, paths.sddReadmePath);
  if (readmeExisted) {
    logger.info(chalk.green(strings.readmeOverwritten));
  } else {
    result.created.sddReadme = true;
    logger.info(chalk.green(strings.readmeCreated));
  }

  if (!await fs.pathExists(paths.targetSpecPath)) {
    // パスは resolvePaths で固定化しているためユーザー入力に依存しない
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.writeFile(paths.targetSpecPath, '');
    result.created.targetSpec = true;
    logger.info(chalk.green(strings.targetSpecCreated));
  } else {
    logger.warn(chalk.yellow(strings.targetSpecExists));
  }

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

    if (await fs.pathExists(dest)) {
      result.prompts.skipped.push(file);
      logger.warn(chalk.yellow(strings.promptSkipped(file)));
      continue;
    }

    await fs.copy(src, dest);
    result.prompts.installed.push(file);
    logger.info(chalk.green(strings.promptInstalled(file)));
  }

  if (result.prompts.installed.length || result.prompts.overwritten.length) {
    logger.info(chalk.cyan(strings.completion));
  }

  return result;
}

module.exports = { init };
