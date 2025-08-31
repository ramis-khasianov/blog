import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  {
    ignores: ["components/ui/**/*", "lib/generated/**/*", ".next/**/*"],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript"
    // "plugin:tailwindcss/recommended",
    // "prettier"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
      "no-undef": "off",
    },
  },
];

export default eslintConfig;
