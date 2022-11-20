const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const gray = {
  25: '#FCFCFD',
  50: '#F9FAFB',
  100: '#F2F4F7',
  200: '#EAECF0',
  300: '#D0D5DD',
  400: '#98A2B3',
  500: '#667085',
  600: '#475467',
  700: '#344054',
  800: '#1D2939',
  900: '#101828',
};

/*  @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './app/**/*.tsx'],
  /* darkMode: 'class', */
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: colors.black,
      mask: 'rgba(0, 0, 0, 0.35)',
      gray,
      white: 'var(--white)',

      basic: '#344054',

      // TODO: 删除
      'white-1': gray['50'],
      'white-2': gray['100'],
      'white-3': gray['200'],
      'gray-1': gray['300'],
      'gray-2': gray['400'],
      'gray-3': gray['500'],
      'dark-1': gray['600'],
      'dark-2': gray['700'],
      'dark-3': gray['800'],
      'dark-4': gray['900'],

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
        sans: ['var(--font-ibm)', 'var(--font-fira)', ...fontFamily.sans],
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
                fontFamily: 'var(--font-fira)',
              },
              code: {
                fontSize,
                lineHeight,
                fontFamily: 'var(--font-fira)',
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
