module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ringColor: {
      first: 'var(--text-first)',
      second: 'var(--text-second)',
      third: 'var(--color-third)',
    },
    ringOffsetColor: {
      first: 'var(--color-first)',
      second: 'var(--color-second)',
      third: 'var(--color-third)',
    },
    outlineColor: {
      first: 'var(--text-first)',
      second: 'var(--text-second)',
      third: 'var(--color-third)',
    },
    textColor: {
      first: 'var(--text-first)',
      second: 'var(--text-second)',
    },
    backgroundColor: {
      first: 'var(--color-first)',
      second: 'var(--color-second)',
      third: 'var(--color-third)',
    },
    fontFamily: {
      lobster: ['Lobster', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
      next: ['AvenirNext', 'sans-serif'],
    },
    fill: {
      first: 'var(--text-first)',
      second: 'var(--text-second)',
    },
    extend: {},
  },
  variants: {},
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
