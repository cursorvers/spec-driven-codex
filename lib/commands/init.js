const path = require('node:path');
const chalk = require('chalk');
const fs = require('fs-extra');

const { resolvePaths } = require('../utils/paths');
const { createLogger } = require('../utils/logger');
const { createYesNoPrompt } = require('../utils/prompt');

const messages = {
  en: {
    descriptionCreated: '✓ Created .sdd/description.md',
    descriptionExists: '⚠ .sdd/description.md already exists',
    readmeCreated: '✓ Created .sdd/README.md',
    readmeExists: '⚠ .sdd/README.md already exists',
    targetSpecCreated: '✓ Created .sdd/target-spec.txt',
    targetSpecExists: '⚠ .sdd/target-spec.txt already exists',
    promptInstalled: (file) => `✓ Installed ${file}`,
    promptOverwritten: (file) => `✓ Overwrote ${file}`,
    promptSkipped: (file) => `⚠ Skipped ${file} (kept existing file)`,
    completion: '\n✨ Initialization complete! Start your Codex SDD flow.\n',
    overwriteQuestion: (file) => `${file} already exists. Overwrite?`,
  },
  ja: {
    descriptionCreated: '✓ .sdd/description.md を作成しました',
    descriptionExists: '⚠ .sdd/description.md は既に存在します',
    readmeCreated: '✓ .sdd/README.md を作成しました',
    readmeExists: '⚠ .sdd/README.md は既に存在します',
    targetSpecCreated: '✓ .sdd/target-spec.txt を作成しました',
    targetSpecExists: '⚠ .sdd/target-spec.txt は既に存在します',
    promptInstalled: (file) => `✓ ${file} をインストールしました`,
    promptOverwritten: (file) => `✓ ${file} を上書きしました`,
    promptSkipped: (file) => `⚠ ${file} は既存のためスキップしました`,
    completion: '\n✨ 初期化完了！',
    overwriteQuestion: (file) => `${file} は既に存在します。上書きしますか？`,
  },
};

async function init(options = {}) {
  const paths = resolvePaths(options);
  const strings = messages[paths.locale] || messages.en;
  const logger = createLogger(options.logger);
  const askYesNo = createYesNoPrompt(options.promptIO);
  const promptForOverwrite = options.promptForOverwrite || (async (_dest, file) => {
    return askYesNo(strings.overwriteQuestion(file));
  });

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

  if (!await fs.pathExists(paths.sddReadmePath)) {
    await fs.copy(paths.templates.sddReadme, paths.sddReadmePath);
    result.created.sddReadme = true;
    logger.info(chalk.green(strings.readmeCreated));
  } else {
    logger.warn(chalk.yellow(strings.readmeExists));
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
      const shouldOverwrite = await promptForOverwrite(dest, file);
      if (shouldOverwrite) {
        await fs.copy(src, dest);
        result.prompts.overwritten.push(file);
        logger.info(chalk.green(strings.promptOverwritten(file)));
      } else {
        result.prompts.skipped.push(file);
        logger.warn(chalk.yellow(strings.promptSkipped(file)));
      }
    } else {
      await fs.copy(src, dest);
      result.prompts.installed.push(file);
      logger.info(chalk.green(strings.promptInstalled(file)));
    }
  }

  if (result.prompts.installed.length || result.prompts.overwritten.length) {
    logger.info(chalk.cyan(strings.completion));
  }

  return result;
}

module.exports = { init };
