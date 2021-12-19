const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./client/**/*.html', './client/**/*.jsx', './client/**/*.js'],
  variants: {},
  plugins: [],
  theme: {
    // screens: {
    //   tablet: '640px',
    //   // => @media (min-width: 640px) { ... }

    //   laptop: '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   desktop: '1280px'
    //   // => @media (min-width: 1280px) { ... }
    // },
    extend: {
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
        outline: '0 0 0 1px rgba(66, 153, 225, 0.5)'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      amber: colors.amber,
      cyan: colors.cyan,
      yellow: colors.yellow,
      lime: colors.lime,
      teal: colors.teal,
      fuchsia: colors.fuchsia,
      blueGray: colors.blueGray,
      indigo: colors.indigo,
      green: colors.emerald,
      violet: colors.violet
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: 'auto'
    },
    minWidth: {
      0: '0',
      '1/6': '16%',
      '4/6': '66%',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%'
    }
  }
}
