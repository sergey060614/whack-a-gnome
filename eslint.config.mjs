import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "docs/**", "coverage/**"]
  },

  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  {
    files: ["**/__tests__/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
];
