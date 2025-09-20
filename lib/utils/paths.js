const path = require('node:path');
const os = require('node:os');

function resolvePaths({ cwd = process.cwd(), homeDir = os.homedir(), templatesRoot } = {}) {
  const root = path.resolve(cwd);
  const home = path.resolve(homeDir);
  const templatesBase = templatesRoot ? path.resolve(templatesRoot) : path.join(__dirname, '..', '..', 'templates');

  return {
    cwd: root,
    home,
    sddDir: path.join(root, '.sdd'),
    steeringDir: path.join(root, '.sdd', 'steering'),
    specsDir: path.join(root, '.sdd', 'specs'),
    targetSpecPath: path.join(root, '.sdd', 'target-spec.txt'),
    descriptionPath: path.join(root, '.sdd', 'description.md'),
    sddReadmePath: path.join(root, '.sdd', 'README.md'),
    codexPromptsDir: path.join(home, '.codex', 'prompts'),
    templates: {
      root: templatesBase,
      prompts: path.join(templatesBase, 'prompts'),
      description: path.join(templatesBase, 'init', 'description.md'),
      sddReadme: path.join(templatesBase, 'init', 'sdd-readme.md'),
    },
  };
}

module.exports = { resolvePaths };
