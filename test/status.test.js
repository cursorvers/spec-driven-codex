const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');

const { status } = require('../lib/commands/status');

async function createTempDir(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

test('status reports missing .sdd directory', async () => {
  const projectDir = await createTempDir('sdc-status-project-');
  const logs = [];

  const result = await status({
    cwd: projectDir,
    logger: {
      info: (msg) => logs.push(msg),
      warn: (msg) => logs.push(msg),
      error: (msg) => logs.push(msg),
    },
  });

  assert.equal(result.exists, false);
});

test('status reports current spec and files', async () => {
  const projectDir = await createTempDir('sdc-status-project-');
  const sddDir = path.join(projectDir, '.sdd');
  await fs.ensureDir(path.join(sddDir, 'steering'));
  await fs.ensureDir(path.join(sddDir, 'specs', 'feature-a'));
  await fs.ensureDir(path.join(sddDir, 'specs', 'archives'));
  await fs.writeFile(path.join(sddDir, 'specs', 'feature-a', 'requirements.md'), '');
  await fs.writeFile(path.join(sddDir, 'specs', 'feature-a', 'design.md'), '');
  await fs.writeFile(path.join(sddDir, 'target-spec.txt'), 'feature-a');

  const result = await status({
    cwd: projectDir,
    logger: {
      info() {},
      warn() {},
      error() {},
    },
  });

  assert.equal(result.exists, true);
  assert.equal(result.targetSpec, 'feature-a');
  assert.deepEqual(result.generatedFiles.sort(), ['design.md', 'requirements.md']);
});
