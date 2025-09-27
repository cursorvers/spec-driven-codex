const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');

const { init } = require('../lib/commands/init');

async function createTempDir(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

test('init creates .sdd structure and copies prompts', async () => {
  const projectDir = await createTempDir('sdc-init-project-');
  const homeDir = await createTempDir('sdc-init-home-');
  const codexPromptsDir = path.join(homeDir, '.codex', 'prompts');

  const result = await init({
    cwd: projectDir,
    homeDir,
    templatesRoot: path.join(process.cwd(), 'templates'),
    logger: { info() {}, warn() {}, error() {} },
  });

  assert.ok(result);
  assert.equal(result.locale, 'en');
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'description.md')));
  const description = await fs.readFile(path.join(projectDir, '.sdd', 'description.md'), 'utf8');
  assert.match(description, /Feature Request/);
  const readmePath = path.join(projectDir, '.sdd', 'README.md');
  assert.ok(await fs.pathExists(readmePath));
  const readmeContent = await fs.readFile(readmePath, 'utf8');
  assert.match(readmeContent, /\/sdd-steering/);
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'target-spec.txt')));
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'steering')));
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'specs')));

  const promptFiles = await fs.readdir(codexPromptsDir);
  assert.deepEqual(new Set(promptFiles).size, 7);
  assert.ok(promptFiles.includes('sdd-highway.md'));
  assert.equal(result.prompts.installed.length, 7);
  assert.equal(result.created.sddReadme, true);
});

test('init skips existing prompts without overwriting', async () => {
  const projectDir = await createTempDir('sdc-init-project-');
  const homeDir = await createTempDir('sdc-init-home-');
  const codexPromptsDir = path.join(homeDir, '.codex', 'prompts');
  await fs.ensureDir(codexPromptsDir);
  const existingPath = path.join(codexPromptsDir, 'sdd-steering.md');
  await fs.writeFile(existingPath, 'old-content');

  const result = await init({
    cwd: projectDir,
    homeDir,
    templatesRoot: path.join(process.cwd(), 'templates'),
    logger: { info() {}, warn() {}, error() {} },
  });

  const content = await fs.readFile(existingPath, 'utf8');
  assert.equal(content, 'old-content');
  assert.equal(result.prompts.skipped.length, 1);
  assert.equal(result.created.sddReadme, true);
  assert.equal(result.locale, 'en');
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'README.md')));
});

test('init skips all existing prompts without modifying them', async () => {
  const projectDir = await createTempDir('sdc-init-project-multi-');
  const homeDir = await createTempDir('sdc-init-home-multi-');
  const codexPromptsDir = path.join(homeDir, '.codex', 'prompts');
  await fs.ensureDir(codexPromptsDir);

  const existingFiles = ['sdd-steering.md', 'sdd-archive.md'];
  for (const name of existingFiles) {
    await fs.writeFile(path.join(codexPromptsDir, name), 'old-content');
  }

  const result = await init({
    cwd: projectDir,
    homeDir,
    templatesRoot: path.join(process.cwd(), 'templates'),
    logger: { info() {}, warn() {}, error() {} },
  });

  for (const name of existingFiles) {
    const content = await fs.readFile(path.join(codexPromptsDir, name), 'utf8');
    assert.equal(content, 'old-content');
  }
  assert.deepEqual(new Set(result.prompts.skipped), new Set(existingFiles));
});

test('init overwrites .sdd README on rerun', async () => {
  const projectDir = await createTempDir('sdc-init-project-rerun-');
  const homeDir = await createTempDir('sdc-init-home-rerun-');
  const templateRoot = path.join(process.cwd(), 'templates');
  const templateReadme = await fs.readFile(path.join(templateRoot, 'en', 'init', 'sdd-readme.md'), 'utf8');

  await init({
    cwd: projectDir,
    homeDir,
    templatesRoot: templateRoot,
    logger: { info() {}, warn() {}, error() {} },
  });

  const readmePath = path.join(projectDir, '.sdd', 'README.md');
  await fs.writeFile(readmePath, 'custom-content');

  const result = await init({
    cwd: projectDir,
    homeDir,
    templatesRoot: templateRoot,
    logger: { info() {}, warn() {}, error() {} },
  });

  const updated = await fs.readFile(readmePath, 'utf8');
  assert.equal(updated, templateReadme);
  assert.equal(result.created.sddReadme, false);
});

test('init supports Japanese locale', async () => {
  const projectDir = await createTempDir('sdc-init-project-ja-');
  const homeDir = await createTempDir('sdc-init-home-ja-');

  const result = await init({
    cwd: projectDir,
    homeDir,
    locale: 'ja',
    templatesRoot: path.join(process.cwd(), 'templates'),
    logger: { info() {}, warn() {}, error() {} },
  });

  assert.equal(result.locale, 'ja');
  const description = await fs.readFile(path.join(projectDir, '.sdd', 'description.md'), 'utf8');
  assert.match(description, /実装したい機能/);
  const readmeContent = await fs.readFile(path.join(projectDir, '.sdd', 'README.md'), 'utf8');
  assert.match(readmeContent, /コマンド/);
  const promptDir = path.join(homeDir, '.codex', 'prompts');
  const promptFiles = await fs.readdir(promptDir);
  assert.deepEqual(new Set(promptFiles).size, 7);
  assert.ok(promptFiles.includes('sdd-highway.md'));
});
