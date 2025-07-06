module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended'
  ],
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
  globals: {
    React: 'readonly'
  }
}