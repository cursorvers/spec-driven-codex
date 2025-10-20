import js from '@eslint/js';
import pluginSecurity from 'eslint-plugin-security';
import globals from 'globals';

export default [
  js.configs.recommended,
  pluginSecurity.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs', 'tests/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node }
    },
    rules: { 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }] }
  }
];
