module.exports = {
  root: true,
  plugins: ['react-hooks'],
  extends: ['universe/native', 'plugin:react-hooks/recommended', 'plugin:prettier/recommended'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['error'],
  },
};
