const colors = require('tailwindcss/colors');

/*  @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./pages/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}'],
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: colors.black,
      white: colors.white,
      gray: colors.stone,
      mask: 'rgba(0, 0, 0, 0.35)',

      // #f8f8f8
      // #f2f2f2
      // #eee
      // #b6b6b6
      // #999
      // #777
      // #444
      // #2d2d2d
      // #222
      // #1c1c1c

      base: '#464646',
    },
    extend: {
      backgroundColor: {
        base: '#efefef',
      },
      fontSize: {
        xxs: ['0.625rem', '0.75rem'],
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
      },
      listStyleType: {
        square: 'square',
      },
    },
  },
  plugins: [],
};
