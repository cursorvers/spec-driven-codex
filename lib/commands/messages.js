const messages = {
  en: {
    descriptionCreated: '✓ Created .sdd/description.md',
    descriptionExists: '⚠ .sdd/description.md already exists',
    readmeCreated: '✓ Created .sdd/README.md',
    readmeOverwritten: '✓ Overwrote .sdd/README.md',
    targetSpecCreated: '✓ Created .sdd/target-spec.txt',
    targetSpecExists: '⚠ .sdd/target-spec.txt already exists',
    promptInstalled: (file) => `✓ Installed ${file}`,
    promptOverwritten: (file) => `✓ Overwrote ${file}`,
    promptSkipped: (file) => `⚠ Skipped ${file} (kept existing file)`,
    completion: '\n✨ Initialization complete! Start your Codex SDD flow.\n',
    upgradeCompletion: '\n✨ Upgrade complete! Latest prompts are now installed.\n',
  },
  ja: {
    descriptionCreated: '✓ .sdd/description.md を作成しました',
    descriptionExists: '⚠ .sdd/description.md は既に存在します',
    readmeCreated: '✓ .sdd/README.md を作成しました',
    readmeOverwritten: '✓ .sdd/README.md を上書きしました',
    targetSpecCreated: '✓ .sdd/target-spec.txt を作成しました',
    targetSpecExists: '⚠ .sdd/target-spec.txt は既に存在します',
    promptInstalled: (file) => `✓ ${file} をインストールしました`,
    promptOverwritten: (file) => `✓ ${file} を上書きしました`,
    promptSkipped: (file) => `⚠ ${file} は既存のためスキップしました`,
    completion: '\n✨ 初期化完了！',
    upgradeCompletion: '\n✨ アップグレード完了！最新のプロンプトを適用しました。\n',
  },
};

module.exports = { messages };
