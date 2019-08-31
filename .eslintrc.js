module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersoin: 2018,
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
    "prefer-promise-reject-errors": "off",
    "vue/html-closing-bracket-spacing": [
      "warn",
      {
        startTag: "never",
        endTag: "never",
        selfClosingTag: "always"
      }
    ],
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": true }]
  }
};