module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    amd: true,
    es6: true
  },
  globals: {
    'jstracker': true
  },
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  root: true,
  rules: {
    'no-console': 0,
    'indent': [2, 2],
    'camelcase': [2, { properties: 'never' }],
    'quotes': [2, 'single', { allowTemplateLiterals: true }],
    'semi': [2, 'never'],
    'eqeqeq': [2, 'always'],
    'curly': [2, 'multi-line'],
    'array-bracket-spacing': [2, 'never'],
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': 2,
    'comma-style': 2,
    'computed-property-spacing': 2,
    'eol-last': 2,
    'func-call-spacing': 2,
    'key-spacing': 2,
    'keyword-spacing': 2,
    'max-depth': [2, { max: 4 }],
    'max-len': [2, {
      code: 120,
      ignoreUrls: true,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }],
    'max-lines': [2, 600],
    'max-params': [2, { max: 8 }],
    'max-statements-per-line': [2, { max: 2 }],
    'max-statements': [1, { max: 16 }],
    'new-cap': 2,
    'no-array-constructor': 2,
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multiple-empty-lines': [2, { max: 2 }],
    'no-multi-spaces': 2,
    'no-new-object': 2,
    'no-tabs': 2,
    'no-trailing-spaces': 2,
    'no-unneeded-ternary': 2,
    'no-whitespace-before-property': 2,
    'object-curly-spacing': [2, 'always'],
    'one-var': [2, {
      var: 'never',
      let: 'never',
      const: 'never'
    }],
    'padded-blocks': [2, 'never'],
    'quote-props': [2, 'consistent'],
    'valid-jsdoc': [2, {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: { returns: 'return' }
    }],
    'semi-spacing': [2, {
      before: false,
      after: true
    }],
    'space-before-blocks': 2,
    'space-before-function-paren': [2, 'never'],
    'space-infix-ops': [2, { int32Hint: false }],
    'space-unary-ops': 2,
    'space-in-parens': 2,
    'spaced-comment': [2, 'always']
  }
}
