const { fontFamily } = require('tailwindcss/defaultTheme');
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
      mask: 'rgba(0, 0, 0, 0.35)',
      gray: colors.zinc,
      white: 'var(--white)',

      basic: 'var(--accent-700)',
      'white-1': 'var(--accent-50)',
      'white-2': 'var(--accent-100)',
      'white-3': 'var(--accent-200)',
      'gray-1': 'var(--accent-300)',
      'gray-2': 'var(--accent-400)',
      'gray-3': 'var(--accent-500)',
      'dark-1': 'var(--accent-600)',
      'dark-2': 'var(--accent-700)',
      'dark-3': 'var(--accent-800)',
      'dark-4': 'var(--accent-900)',

      primary: 'var(--primary)',
      'primary-hover': 'var(--primary-hover)',
      'primary-light': 'var(--primary-light)',
      danger: 'var(--danger)',
      'danger-hover': 'var(--danger-hover)',
      'danger-light': 'var(--danger-light)',

      github: 'var(--github)',
      qq: 'var(--qq)',
      wechat: 'var(--wechat)',
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', ...fontFamily.sans],
      },
      typography: ({ theme }) => {
        const [fontSize, { lineHeight }] = theme('fontSize.sm');
        return {
          DEFAULT: {
            css: {
              a: {
                color: 'var(--primary)',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'var(--primary-hover)',
                },
              },
              'blockquote p': {
                marginTop: theme('spacing.1'),
                marginBottom: theme('spacing.1'),
              },
              pre: {
                borderRadius: theme('borderRadius.sm'),
                fontFamily: 'Fira Code',
              },
              code: {
                fontSize,
                lineHeight,
                fontFamily: 'Fira Code',
              },
              img: {
                textAlign: 'center',
                margin: '0 auto',
                maxHeight: theme('maxHeight.96'),
              },
            },
          },
        };
      },
      backgroundColor: {
        skeleton: 'var(--bg-skeleton)',
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
      padding: {
        18: '4.5rem',
      },
      margin: {
        18: '4.5rem',
      },
      keyframes: {
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
        wave: 'wave 2s linear 15',
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
};
