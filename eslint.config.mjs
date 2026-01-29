import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});
const project = path.join(__dirname, "tsconfig.json");

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  ...compat.config({
    extends: [
      require.resolve("@vercel/style-guide/eslint/node"),
      require.resolve("@vercel/style-guide/eslint/typescript"),
    ],
    parserOptions: {
      project,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
    overrides: [
      {
        files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
        extends: [require.resolve("@vercel/style-guide/eslint/jest")],
      },
    ],
  }),
  {
    files: ["eslint.config.mjs"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    files: ["src/**/*.ts", "test/**/*.ts"],
    rules: {
      "import/no-default-export": "off",
      "import/no-cycle": "off",
      "import/no-useless-path-segments": "off",
      "unicorn/filename-case": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unnecessary-type-arguments": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/method-signature-style": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/require-await": "off",
      "no-param-reassign": "off",
      "eslint-comments/require-description": "off",
      "import/order": "off",
    },
  },
  {
    files: ["test/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
    rules: {
      "jest/no-identical-title": "off",
      "jest/prefer-lowercase-title": "off",
      "jest/valid-expect": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
    },
  },
];
