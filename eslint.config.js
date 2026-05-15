// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ['dist/*'],
        rules: {
            // Project convention: double-quote imports everywhere…
            quotes: ['error', 'double', { avoidEscape: true, allowTemplateLiterals: true }],
        },
    },
    {
        // …except components/ui/ which preserves shadcn upstream style (single quotes).
        files: ['components/ui/**'],
        rules: {
            quotes: 'off',
        },
    },
]);
