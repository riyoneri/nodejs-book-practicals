import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";

export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
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
  eslintPluginUnicorn.configs["flat/recommended"],
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
];
