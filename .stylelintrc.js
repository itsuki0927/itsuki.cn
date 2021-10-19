module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // color另起一行
    // 'declaration-colon-newline-after': null,
    // 忽略 Fira Code
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['Fira Code', 'Inter'],
      },
    ],
    // 忽略 :global 伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
