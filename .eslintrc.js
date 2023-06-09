module.exports = {
  "root": true,
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true,
    "jest/globals": true
  },
  "extends": ["airbnb-base"],
  "rules": {
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
    "no-console": "off",
    "no-underscore-dangle" : "off",
    "max-len": [
      "warn",
      {
        "code": 150
      }
    ]
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "parser": "@typescript-eslint/parser",
      "plugins": ["@typescript-eslint", "jest"],
      "extends": ["airbnb-typescript/base"],
      "parserOptions": {
        "ecmaVersion": 12,
        "project": ["./tsconfig.json"]
      },
      "rules": {
        "@typescript-eslint/no-floating-promises": ["error"]
      }
    }
  ]
}
