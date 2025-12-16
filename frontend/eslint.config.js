import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ["**/*.{ts,tsx}"],

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json"
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
            "react-hooks/exhaustive-deps": "warn"
        },

        settings: {
            react: {
                version: "detect"
            }
        }
    }
];
