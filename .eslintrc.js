module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: false,
  },
  settings: {
    ecmascript: 6,
    jsx: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'jest'],
  extends: ['airbnb', 'eslint-config-prettier', 'plugin:jest/recommended'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'function-paren-newline': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-wrap-multilines': 0,
    'react/forbid-prop-types': 0,
    'no-nested-ternary': 0,
    'arrow-parens': 0,
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
