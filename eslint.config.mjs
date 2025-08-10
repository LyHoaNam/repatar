import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import _import from "eslint-plugin-import";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(["**/.husky", "**/dist"]),
  {
    extends: fixupConfigRules(
      compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:react-hooks/recommended"
      )
    ),

    plugins: {
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
    },

    rules: {
      "no-var": "error",
      semi: [2, "always"],
      quotes: [2, "double"],

      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          trailingComma: "es5",
        },
      ],

      "@typescript-eslint/indent": 0,
      "@typescript-eslint/no-explicit-any": 2,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "no-return-await": "off",
      "@typescript-eslint/return-await": "error",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "react/display-name": "off",
      "react/jsx-filename-extension": "off",
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "dot-notation": "off",
      "@typescript-eslint/dot-notation": "off",
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],

    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^next", "^[a-z]"],
            ["^@"],
            ["^~"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
            ["^\\u0000"],
          ],
        },
      ],
    },
  },
]);
