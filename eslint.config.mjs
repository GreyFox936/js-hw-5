import js from '@eslint/js';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      'Tasks/**',
    ],
  },

  js.configs.recommended,
  ...compat.extends('airbnb-base'),

  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'linebreak-style': 'off',
      'no-console': 'off',
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },

  {
    files: ['src/js/__tests__/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  {
    files: ['webpack.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/no-commonjs': 'off',
      'global-require': 'off',
      'linebreak-style': 'off',
    },
  },
];
