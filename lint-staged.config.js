module.exports = {
  // 检查 ts 是否有语法错误
  '**/*.ts?(x)': () => 'yarn check-types',
  // eslint 检查
  '*.ts?(x)': 'yarn check-lint',
  // scss 检查
  '*.scss': 'yarn stylelint',
  // code 格式化
  '*.{ts,tsx,scss,md}': 'yarn format',
};
