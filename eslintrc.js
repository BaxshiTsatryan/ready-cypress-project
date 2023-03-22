module.exports = {
    env: {
        browser: true,
        es2021: true,
        'cypress/globals': true,
    },
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react/recommended',
        'plugin:cypress/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', 'cypress', 'prettier', 'simple-import-sort', 'import'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'cypress/no-assigning-return-values': 'error',
        'cypress/no-unnecessary-waiting': 'error',
        'cypress/assertion-before-screenshot': 'warn',
        'cypress/no-force': 'warn',
        'cypress/no-async-tests': 'error',
        'cypress/no-pause': 'error',
    },
};