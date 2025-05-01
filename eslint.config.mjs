import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser' // Import the parser

// Extract rules from recommended configurations
const eslintRecommendedRules = js.configs.recommended.rules
const typescriptEslintRecommendedRules = typescriptEslintPlugin.configs.recommended.rules

export default [
  // Include ESLint recommended rules
  {
    files: ['**/*.{js,mjs,cjs}'], // Specify file patterns for JavaScript files
    languageOptions: {
      parser: js.parser, // Use the default JavaScript parser
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: 'module',
    },
    rules: eslintRecommendedRules,
  },

  // Include TypeScript ESLint recommended rules
  {
    files: ['**/*.{ts,tsx}'], // Specify file patterns for TypeScript files
    languageOptions: {
      parser: typescriptParser, // Use the TypeScript parser
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: typescriptEslintRecommendedRules,
  },

  // Custom configuration for React and other rules
  {
    ignores: ['dist'],
    files: ['**/*.{ts,tsx}'], // Specify file patterns for TypeScript/React files
    languageOptions: {
      parser: typescriptParser, // Use the TypeScript parser
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: 'module',
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Add additional custom rules here
      curly: ['error', 'all'], // Require curly braces for all control statements
      quotes: ['error', 'single', { avoidEscape: true }], // Enforce single quotes
      // 1) Turn off ESLint’s built-in no-unused-vars (it can’t see TS mapped types)
      'no-unused-vars': 'off',

      // 2) Enable the TS-aware version, and ignore any identifiers starting with "_"
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // function args prefixed _ are ignored
          varsIgnorePattern: '^_', // variables prefixed _ are ignored
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-trailing-spaces': 'error', // Disallow trailing whitespace
      indent: ['error', 2, { SwitchCase: 1 }], // Enforce consistent indentation
      'space-before-blocks': ['error', 'always'], // Require a space before blocks
      'keyword-spacing': ['error', { before: true, after: true }], // Enforce consistent spacing around keywords
      eqeqeq: ['error', 'smart'], // Require the use of === and !==
      'no-multiple-empty-lines': ['error', { max: 1 }], // Limit the number of consecutive empty lines
      'arrow-parens': ['error', 'always'], // Require parentheses around arrow function arguments
      'object-curly-spacing': ['error', 'always'], // Require spaces inside curly braces
      'array-bracket-spacing': ['error', 'never'], // Disallow spaces inside array brackets
      'key-spacing': ['error', { beforeColon: false, afterColon: true }], // Enforce consistent spacing between keys and values in objects
      'no-console': ['warn', { allow: ['info'] }], // Warn when console statements are used
      'prefer-const': 'error', // Suggest using const over let/var when possible
      'no-var': 'error', // Disallow var declarations
      'prefer-arrow-callback': 'error', // Suggest using arrow functions as callbacks
      'max-len': ['error', { code: 120 }], // Enforce a maximum line length
      '@typescript-eslint/no-explicit-any': 'warn', // Warn against using `any` type in TypeScript
      //'@typescript-eslint/explicit-module-boundary-types': 'warn', // Warn if function return types are not explicitly defined
      'arrow-spacing': ['error', { before: true, after: true }],
      'brace-style': ['error', 'stroustrup', { allowSingleLine: false }],
    },
  },
]
