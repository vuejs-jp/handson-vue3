require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  root: true,
  env: { node: true },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:vue/vue3-recommended', '@vue/eslint-config-prettier'],
  rules: {
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'off' // eslint-plugin-prettierの部分だけoffにする
  }
}
