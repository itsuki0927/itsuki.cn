module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:import/typescript',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // 导入扩展名
    'import/extensions': [
      'error',
      'never',
      {
        svg: 'always',
        scss: 'always',
        png: 'always',
        jpg: 'always',
        jpeg: 'always',
      },
    ],
    // react 在jsx中不需要导入
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    // 关闭 prop-types
    'react/prop-types': 'off',
    // 关闭 默认props
    'react/require-default-props': 'off',
    //
    'consistent-return': 'off',
    // 允许 {...restProps}
    'react/jsx-props-no-spreading': 'off',
    // jsx 中使用单引号
    'jsx-quotes': ['error', 'prefer-single'],
    // TODO: 暂时关闭坚持
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
