import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ["src/**/*.{ts,tsx}"],

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
            }
        },

        plugins: {
            react,
            "react-hooks": reactHooks,
            "jsx-a11y": jsxA11y
        },

        rules: {
            "@typescript-eslint/no-unused-vars": ["warn"],
            "@typescript-eslint/no-explicit-any": "warn",

            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",

            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            quotes: ['error', 'single']
        },

        settings: {
            react: {
                version: "detect"
            }
        }
    }
];
