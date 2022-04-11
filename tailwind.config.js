const colors = require('tailwindcss/colors');

/*  @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./pages/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}'],
  darkMode: 'class',
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

      'basic--dark': '#bdb7af',
      'white--dark': '#e8e6e3',
      'white-1--dark': '#e4e1de',
      'white-2--dark': '#e0ddd9',
      'white-3--dark': '#dddad6',
      'gray-1--dark': '#bab4ab',
      'gray-2--dark': '#a8a095',
      'gray-3--dark': '#9d9488',
      'dark-1--dark': '#bdb7af',
      'dark-2--dark': '#ccc7c0',
      'dark-3--dark': '#d3cfc9',
      'dark-4--dark': '#d6d3cd',
    },
    extend: {
      borderColor: {
        'white--dark': '#303436',
        'white-1--dark': '#323638',
        'white-2--dark': '#34383a',
        'white-3--dark': '#35393b',
        'gray-1--dark': '#454a4d',
        'gray-2--dark': '#4d5356',
        'gray-3--dark': '#655e53',
        // 'gray-3--dark': '#4d5356',
        'dark-1--dark': '#766d61',
        'dark-2--dark': '#7d7467',
        'dark-3--dark': '#81786a',
        'dark-4--dark': '#83796b',
      },
      backgroundColor: {
        base: '#efefef',
        'base--dark': '#212425',
        'white--dark': '#181a1b',
        'white-1--dark': '#1c1e1f',
        'white-2--dark': '#1f2223',
        'white-3--dark': '#222426',
        'gray-1--dark': '#414749',
        'gray-2--dark': '#52585c',
        'gray-3--dark': '#5a6165',
        'dark-1--dark': '#33373a',
        'dark-2--dark': '#222526',
        'dark-3--dark': '#1a1c1d',
        'dark-4--dark': '#151718',
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
      keyframes: {
        'move-left-half': {
          '0%': {
            transform: 'none',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
        'move-left-half-vertical': {
          '0%': {
            transform: 'none',
          },
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        wave: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '10%': {
            transform: 'rotate(14deg)',
          },
          '20%': {
            transform: 'rotate(-8deg)',
          },
          '30%': {
            transform: 'rotate(14deg)',
          },
          '40%': {
            transform: 'rotate(-4deg)',
          },
          '50%': {
            transform: 'rotate(10deg)',
          },
          '60%': {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(0deg)',
          },
        },
      },
      animation: {
        'move-left-half': 'move-left-half 0.3s ease forwards',
        'move-left-half-vertical': 'move-left-half-vertical 0.3s ease forwards',
        wave: 'wave 2s linear 15',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
