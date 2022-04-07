module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'no-descending-specificity': null,
    'at-rule-no-unknown': true,
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
    'selector-class-pattern': null,
    'scss/dollar-variable-empty-line-after': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/no-global-function-names': null,
    'color-function-notation': null,
    'property-no-vendor-prefix': null,
    'selector-no-vendor-prefix': [
      true,
      {
        ignoreSelectors: ['::-moz-selection'],
      },
    ],
  },
};
