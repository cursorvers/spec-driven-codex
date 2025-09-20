const path = require('node:path');
const os = require('node:os');

function resolvePaths({ cwd = process.cwd(), homeDir = os.homedir(), templatesRoot, locale } = {}) {
  const root = path.resolve(cwd);
  const home = path.resolve(homeDir);
  const templatesBase = templatesRoot ? path.resolve(templatesRoot) : path.join(__dirname, '..', '..', 'templates');
  const supportedLocales = new Set(['en', 'ja']);
  const requestedLocale = typeof locale === 'string' ? locale.toLowerCase() : 'en';
  const activeLocale = supportedLocales.has(requestedLocale) ? requestedLocale : 'en';
  const localeRoot = path.join(templatesBase, activeLocale);

  return {
    cwd: root,
    home,
    locale: activeLocale,
    sddDir: path.join(root, '.sdd'),
    steeringDir: path.join(root, '.sdd', 'steering'),
    specsDir: path.join(root, '.sdd', 'specs'),
    targetSpecPath: path.join(root, '.sdd', 'target-spec.txt'),
    descriptionPath: path.join(root, '.sdd', 'description.md'),
    sddReadmePath: path.join(root, '.sdd', 'README.md'),
    codexPromptsDir: path.join(home, '.codex', 'prompts'),
    templates: {
      root: templatesBase,
      localeRoot,
      prompts: path.join(localeRoot, 'prompts'),
      description: path.join(localeRoot, 'init', 'description.md'),
      sddReadme: path.join(localeRoot, 'init', 'sdd-readme.md'),
    },
  };
}

module.exports = { resolvePaths };
