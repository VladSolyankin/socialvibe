/* eslint-disable import/no-anonymous-default-export */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'no-shadow': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        trailingComa: 'all',
        singleQuote: true,
        semi: true,
      },
    ],
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'import/extensions': 'off',
  },
  env: {
    browser: true,
    es6: true,
  },
};