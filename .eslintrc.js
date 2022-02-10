const OFF = 'off'; // 关闭使用某项规则
const ERROR = 'error'; // 禁止使用某项规则
const WARNING = 'warn'; // 警告使用某项规则

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
    // 禁止 log
    'no-console': ERROR,
    // jsx 中使用单引号
    'jsx-quotes': [ERROR, 'prefer-single'],
    // 导入扩展名
    'import/extensions': [
      ERROR,
      'never',
      {
        svg: 'always',
        scss: 'always',
        png: 'always',
        jpg: 'always',
        jpeg: 'always',
      },
    ],
    // 允许 react 在jsx中不需要导入
    'react/react-in-jsx-scope': OFF,
    'react/jsx-uses-react': OFF,
    // 关闭 prop-types
    'react/prop-types': OFF,
    // 关闭 默认props
    'react/require-default-props': OFF,
    //
    'consistent-return': OFF,
    // 允许 {...restProps}
    'react/jsx-props-no-spreading': OFF,
    // 允许 使用位运算
    'no-bitwise': OFF,
    // 关闭 循环 import
    'import/no-cycle': OFF,
    // TODO: 暂时关闭坚持
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    'no-param-reassign': WARNING,
    // 警告 hook 只能在组件/函数中使用
    'react-hooks/rules-of-hooks': WARNING,
    // 警告 不使用默认导出
    'import/prefer-default-export': WARNING,
    // 函数命名方式
    'react/function-component-definition': OFF,
    'react/jsx-no-useless-fragment': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'react/no-unescaped-entities': OFF,
    // 允许 使用any
    '@typescript-eslint/no-explicit-any': OFF,
  },
};
