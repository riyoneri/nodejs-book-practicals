import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default [
  {
    plugins: { unicorn: eslintPluginUnicorn },
    rules: {
      ...js.configs.recommended.rules,
      "unicorn/no-unused-properties": "error",
      "no-console": "error",
      "no-self-compare": "error",
      "no-useless-assignment": "error",
      "func-style": ["error", "expression"],
      "no-var": "error",
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "all",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "prefer-const": "error",
    },
  },
  eslintConfigPrettier,
];
