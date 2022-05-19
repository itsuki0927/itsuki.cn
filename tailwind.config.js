const colors = require('tailwindcss/colors');

/*  @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
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
    },
    extend: {
      textColor: {
        basic: 'var(--text-dark-1)',
        white: 'var(--text-white)',
        'white-1': 'var(--text-white-1)',
        'white-2': 'var(--text-white-2)',
        'white-3': 'var(--text-white-3)',
        'gray-1': 'var(--text-gray-1)',
        'gray-2': 'var(--text-gray-2)',
        'gray-3': 'var(--text-gray-3)',
        'dark-1': 'var(--text-dark-1)',
        'dark-2': 'var(--text-dark-2)',
        'dark-3': 'var(--text-dark-3)',
        'dark-4': 'var(--text-dark-4)',
        primary: 'var(--text-primary)',
        'primary-hover': 'var(--text-primary-hover)',
        'primary-light': 'var(--text-primary-light)',
        danger: 'var(--text-danger)',
        'danger-hover': 'var(--text-danger-hover)',
        'danger-light': 'var(--text-danger-light)',
      },
      borderColor: {
        white: 'var(--border-white)',
        'white-1': 'var(--border-white-1)',
        'white-2': 'var(--border-white-2)',
        'white-3': 'var(--border-white-3)',
        'gray-1': 'var(--border-gray-1)',
        'gray-2': 'var(--border-gray-2)',
        'gray-3': 'var(--border-gray-3)',
        // 'gray-3': '#4d5356',
        'dark-1': 'var(--border-dark-1)',
        'dark-2': 'var(--border-dark-2)',
        'dark-3': 'var(--border-dark-3)',
        'dark-4': 'var(--border-dark-4)',
      },
      backgroundColor: {
        basic: 'var(--bg-basic)',
        white: 'var(--bg-white)',
        'white-1': 'var(--bg-white-1)',
        'white-2': 'var(--bg-white-2)',
        'white-3': 'var(--bg-white-3)',
        'gray-1': 'var(--bg-gray-1)',
        'gray-2': 'var(--bg-gray-2)',
        'gray-3': 'var(--bg-gray-3)',
        'dark-1': 'var(--bg-dark-1)',
        'dark-2': 'var(--bg-dark-2)',
        'dark-3': 'var(--bg-dark-3)',
        'dark-4': 'var(--bg-dark-4)',
        primary: 'var(--bg-primary)',
        'primary-hover': 'var(--bg-primary-hover)',
        'primary-light': 'var(--bg-primary-light)',
        danger: 'var(--bg-danger)',
        'danger-hover': 'var(--bg-danger-hover)',
        'danger-light': 'var(--bg-danger-light)',
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
        enter: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
      },
      animation: {
        'move-left-half': 'move-left-half 0.3s ease forwards',
        'move-left-half-vertical': 'move-left-half-vertical 0.3s ease forwards',
        wave: 'wave 2s linear 15',
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
