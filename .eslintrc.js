module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    amd: true,
    es6: true
  },
  globals: {},
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  root: true,
  rules: {
    'no-console': 0,
    indent: [2, 2],
    camelcase: [2, { properties: 'never' }],
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    semi: [2, 'never'],
    eqeqeq: [2, 'always'],
    curly: [2, 'multi-line']
  }
}
