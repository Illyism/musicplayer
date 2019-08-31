module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    browser: true,
    jest: true,
    node: true
  },
  extends: [
    "plugin:vue/strongly-recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/eslint-config-typescript"
  ],
  // required to lint *.vue files
  plugins: [
    "vue"
  ],
  // add your custom rules here
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/html-closing-bracket-spacing": [
      "warn",
      {
        startTag: "never",
        endTag: "never",
        selfClosingTag: "always"
      }
    ],
    "no-unused-vars": 0, // enabled via ts-eslint below
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }],
    "@typescript-eslint/no-explicit-any": 0, // allow "any" sometimes => makes typescript workable
    "@typescript-eslint/explicit-function-return-type": 0, // not needed => types can be inferred
    "@typescript-eslint/camelcase": 0, // ignore => some api calls, settings use _
    "@typescript-eslint/no-var-requires": 0, // allow require('') => used by config files
    "@typescript-eslint/no-empty-interface": 0, // ignore => needed in some typings
    "@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": true }], // false => functions are hoisted
    'require-await': 'error',
  }
};