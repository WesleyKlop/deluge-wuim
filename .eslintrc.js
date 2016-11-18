module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb'
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'import'
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
