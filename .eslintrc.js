module.exports = {
  parser: 'babel-eslint',
  extends: [
    'plugin:flowtype/recommended',
    'airbnb'
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'flowtype',
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    semi: ['error', 'never'],
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
  }
}
