module.exports = {
  'root': true,
  'env': {
    'node': true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  'parserOptions': {
    'parser': 'babel-eslint'
  },
  'rules': {
    'semi': [
      'error',
      'never'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'comma-style': [
      'error',
      'last'
    ],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }]
  }
}