import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    rules: {
      "unicorn/better-regex": "error",
      "unicorn/consistent-destructuring": "error",
      "unicorn/no-unused-properties": "error",

      // Simple imports sort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
];
