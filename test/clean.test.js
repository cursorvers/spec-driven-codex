const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');

const { clean } = require('../lib/commands/clean');

async function createTempDir(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

test('clean removes non-archive specs and resets target spec', async () => {
  const projectDir = await createTempDir('sdc-clean-project-');
  const sddDir = path.join(projectDir, '.sdd');
  await fs.ensureDir(path.join(sddDir, 'specs', 'feature-a'));
  await fs.ensureDir(path.join(sddDir, 'specs', 'feature-b'));
  await fs.ensureDir(path.join(sddDir, 'specs', 'archives', 'snapshot'));
  await fs.writeFile(path.join(sddDir, 'specs', 'feature-a', 'requirements.md'), '');
  await fs.writeFile(path.join(sddDir, 'specs', 'feature-b', 'design.md'), '');
  await fs.writeFile(path.join(sddDir, 'target-spec.txt'), 'feature-a');

  const result = await clean({
    cwd: projectDir,
    logger: {
      info() {},
      warn() {},
      error() {},
    },
  });

  assert.deepEqual(result.removedSpecs.sort(), ['feature-a', 'feature-b']);
  assert.equal(result.locale, 'en');
  const remaining = await fs.readdir(path.join(sddDir, 'specs'));
  assert.deepEqual(remaining, ['archives']);
  const target = await fs.readFile(path.join(sddDir, 'target-spec.txt'), 'utf8');
  assert.equal(target.trim(), '');
});

test('clean handles missing .sdd directory gracefully', async () => {
  const projectDir = await createTempDir('sdc-clean-project-');
  const result = await clean({
    cwd: projectDir,
    logger: {
      info() {},
      warn() {},
      error() {},
    },
  });

  assert.equal(result.exists, false);
  assert.equal(result.locale, 'en');
});

test('clean supports Japanese locale output', async () => {
  const projectDir = await createTempDir('sdc-clean-project-ja-');
  const sddDir = path.join(projectDir, '.sdd');
  await fs.ensureDir(path.join(sddDir, 'specs', 'temp'));

  const logs = [];
  const result = await clean({
    cwd: projectDir,
    locale: 'ja',
    logger: {
      info: (msg) => logs.push(msg),
      warn: (msg) => logs.push(msg),
      error: (msg) => logs.push(msg),
    },
  });

  assert.equal(result.locale, 'ja');
  assert.ok(result.removedSpecs.includes('temp'));
  assert.ok(logs.some((msg) => typeof msg === 'string' && msg.includes('target-spec.txt を初期化しました')));
});
