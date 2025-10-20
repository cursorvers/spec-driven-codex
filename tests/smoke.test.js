import assert from 'node:assert/strict';
import test from 'node:test';

// 最小のスモークテスト
// CLIが存在し、基本的なモジュールが読み込めることを確認

test('package loads', async () => {
  const pkg = await import('../lib/index.js').catch(() => null);
  assert.ok(pkg !== null, 'lib/index.js should be importable');
});
