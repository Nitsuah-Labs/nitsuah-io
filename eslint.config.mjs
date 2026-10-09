import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

const testIgnores = [
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.spec.ts',
  'tests/**',
  'playwright.config.ts',
];

const eslintConfig = [
  { ignores: [...testIgnores, '.next/**', 'out/**', 'coverage/**', 'next-env.d.ts'] },
  ...nextCoreWebVitals,
  ...tseslint.configs.recommended,
  prettier,
  // eslint-plugin-react 7.37.5 auto-detection calls context.getFilename(), removed in ESLint 10; pin the version.
  { settings: { react: { version: '19' } } },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: { project: './tsconfig.json' },
    },
  },
  {
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
