module.exports = {
  root: false,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // parser: 'babel-eslint'
  },
  extends: [
    // 'prettier',
    // 'prettier/vue',
    // 'plugin:prettier/recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // plugins: [
  //   'prettier'
  // ],
  // add your custom rules here
  rules: {
    "no-console": 0,
    "dot-notation": 0,
  }
}
