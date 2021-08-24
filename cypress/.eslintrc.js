module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  root: true,
  plugins: ['react', 'eslint-plugin-cypress', 'prettier', '@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  env: {
    'cypress/globals': true,
    browser: true,
    es6: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
};
