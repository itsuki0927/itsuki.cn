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
      mask: 'rgba(0, 0, 0, 0.35)',

      // #f8f8f8
      // #f2f2f2
      // #eeeeee
      // #b6b6b6
      // #999999
      // #777777
      // #444444
      // #2d2d2d
      // #222222
      // #1c1c1c

      'white-1': '#f8f8f8',
      'white-2': '#f2f2f2',
      'white-3': '#eeeeee',
      'gray-1': '#b6b6b6',
      'gray-2': '#999999',
      'gray-3': '#777777',
      'dark-1': '#444444',
      'dark-2': '#2d2d2d',
      'dark-3': '#222',
      'dark-4': '#1c1c1c',

      basic: '#444444',
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
