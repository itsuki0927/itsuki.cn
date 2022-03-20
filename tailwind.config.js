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
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow,
      red: colors.red,

      primary: colors.blue['500'],
      success: colors.green['500'],
      warning: colors.yellow['500'],
      error: colors.red['500'],
    },
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
      },
    },
  },
  plugins: [],
};
