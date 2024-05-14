import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default [
  {
    rules: {
      ...js.configs.recommended.rules,
      "unicorn/better-regex": "error",
      "unicorn/consistent-destructuring": "error",
      "unicorn/no-unused-properties": "error",
      "no-console": "error",
      "no-duplicate-imports": "error",
      "no-self-compare": "error",
      "no-useless-assignment": "error",
      "func-style": ["error", "expression"],
      "no-var": "error",
      "prefer-const": "error"
    },
    plugins: { unicorn: eslintPluginUnicorn },
  },
  eslintConfigPrettier,
];
