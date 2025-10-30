export default {
  '*.{ts,tsx,js,jsx}': ['pnpm exec eslint --fix --max-warnings 0'],
  '*.{js,jsx,ts,tsx,json,md,css,scss,yml,yaml}': ['pnpm exec prettier --write'],
};
