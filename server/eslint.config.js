const parser = require('@typescript-eslint/parser');
const eslintPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    files: ['**/*.ts'], // Target TypeScript files
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPlugin, // Use the plugin object directly
    },
    rules: {
      ...eslintPlugin.configs.recommended.rules, // Spread recommended rules
    },
  },
  {
    files: ['**/*.js'], // Optionally target JavaScript files
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Add JavaScript-specific rules here
    },
  },
];