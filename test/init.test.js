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
    promptForOverwrite: async () => true,
    logger: { info() {}, warn() {}, error() {} },
  });

  assert.ok(result);
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'description.md')));
  const readmePath = path.join(projectDir, '.sdd', 'README.md');
  assert.ok(await fs.pathExists(readmePath));
  const readmeContent = await fs.readFile(readmePath, 'utf8');
  assert.match(readmeContent, /\/sdd-steering/);
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'target-spec.txt')));
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'steering')));
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'specs')));

  const promptFiles = await fs.readdir(codexPromptsDir);
  assert.deepEqual(new Set(promptFiles).size, 6);
  assert.equal(result.prompts.installed.length, 6);
  assert.equal(result.created.sddReadme, true);
});

test('init asks before overwriting existing prompts', async () => {
  const projectDir = await createTempDir('sdc-init-project-');
  const homeDir = await createTempDir('sdc-init-home-');
  const codexPromptsDir = path.join(homeDir, '.codex', 'prompts');
  await fs.ensureDir(codexPromptsDir);
  const existingPath = path.join(codexPromptsDir, 'sdd-steering.md');
  await fs.writeFile(existingPath, 'old-content');

  const decisions = [];
  const result = await init({
    cwd: projectDir,
    homeDir,
    templatesRoot: path.join(process.cwd(), 'templates'),
    promptForOverwrite: async (file) => {
      decisions.push(path.basename(file));
      return false;
    },
    logger: { info() {}, warn() {}, error() {} },
  });

  assert.deepEqual(decisions, ['sdd-steering.md']);
  const content = await fs.readFile(existingPath, 'utf8');
  assert.equal(content, 'old-content');
  assert.equal(result.prompts.skipped.length, 1);
  assert.equal(result.created.sddReadme, true);
  assert.ok(await fs.pathExists(path.join(projectDir, '.sdd', 'README.md')));
});
