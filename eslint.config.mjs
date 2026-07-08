import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'eslint:recommended'),
  {
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@next/next/no-img-element': 'warn',
      'no-dupe-keys': 'error'
    },
    languageOptions: {
      globals: {
        React: 'readonly'
      }
    }
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'src/generated/**']
  }
];

export default eslintConfig;
