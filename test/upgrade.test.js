const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');

const { upgrade } = require('../lib/commands/upgrade');

async function createTempDir(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

test('upgrade overwrites all prompt files in English locale', async () => {
  const projectDir = await createTempDir('sdc-upgrade-project-');
  const homeDir = await createTempDir('sdc-upgrade-home-');
  const codexPromptsDir = path.join(homeDir, '.codex', 'prompts');
  await fs.ensureDir(codexPromptsDir);

  const templateRoot = path.join(process.cwd(), 'templates');
  const templateFile = path.join(templateRoot, 'en', 'prompts', 'sdd-steering.md');
  const existingPath = path.join(codexPromptsDir, 'sdd-steering.md');
  await fs.writeFile(existingPath, 'outdated-content');

  const sddReadmeTemplate = await fs.readFile(path.join(templateRoot, 'en', 'init', 'sdd-readme.md'), 'utf8');
  const sddDir = path.join(projectDir, '.sdd');
  const sddReadmePath = path.join(sddDir, 'README.md');
  await fs.ensureDir(sddDir);
  await fs.writeFile(sddReadmePath, 'stale-readme');

  const result = await upgrade({
    cwd: projectDir,
    homeDir,
    templatesRoot: templateRoot,
    logger: { info() {}, warn() {}, error() {} },
  });

  const updated = await fs.readFile(existingPath, 'utf8');
  const templateContent = await fs.readFile(templateFile, 'utf8');
  assert.equal(updated, templateContent);
  const promptFiles = await fs.readdir(codexPromptsDir);
  assert.ok(promptFiles.includes('sdd-highway.md'));
  assert.equal(new Set(promptFiles).size, 7);
  assert.equal(result.prompts.overwritten.length, new Set(promptFiles).size);
  const readmeUpdated = await fs.readFile(sddReadmePath, 'utf8');
  assert.equal(readmeUpdated, sddReadmeTemplate);
  assert.equal(result.sdd.readmeOverwritten, true);
});

test('upgrade respects locale selection', async () => {
  const projectDir = await createTempDir('sdc-upgrade-project-ja-');
  const homeDir = await createTempDir('sdc-upgrade-home-ja-');
  const codexPromptsDir = path.join(homeDir, '.codex', 'prompts');

  const templateRoot = path.join(process.cwd(), 'templates');
  const templateFile = path.join(templateRoot, 'ja', 'prompts', 'sdd-tasks.md');
  const templateReadme = await fs.readFile(path.join(templateRoot, 'ja', 'init', 'sdd-readme.md'), 'utf8');
  const sddDir = path.join(projectDir, '.sdd');
  const sddReadmePath = path.join(sddDir, 'README.md');
  await fs.ensureDir(sddDir);
  await fs.writeFile(sddReadmePath, 'ja-stale');

  const result = await upgrade({
    cwd: projectDir,
    homeDir,
    locale: 'ja',
    templatesRoot: templateRoot,
    logger: { info() {}, warn() {}, error() {} },
  });

  const targetPath = path.join(codexPromptsDir, 'sdd-tasks.md');
  const updated = await fs.readFile(targetPath, 'utf8');
  const templateContent = await fs.readFile(templateFile, 'utf8');
  assert.equal(updated, templateContent);
  assert.equal(result.locale, 'ja');
  const readmeUpdated = await fs.readFile(sddReadmePath, 'utf8');
  assert.equal(readmeUpdated, templateReadme);
});
