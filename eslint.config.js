const js = require('@eslint/js');
const globals = require('globals');
const securityPlugin = require('eslint-plugin-security');

module.exports = [
  {
    ignores: ['node_modules/**', 'coverage/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      security: securityPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
      'no-console': 'off',
      'security/detect-object-injection': 'off',
    },
  },
  {
    files: ['test/**/*.js'],
    rules: {
      'security/detect-non-literal-fs-filename': 'off',
    },
  },
];
