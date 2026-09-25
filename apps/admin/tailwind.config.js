/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#18B88A',
          deep: '#123C3A',
          light: '#E5F7F0',
        },
        stay: {
          accent: '#8FA888',
          accentLight: '#EDF2EB',
          accentDeep: '#6B8563',
          clay: '#C4A882',
        },
        charcoal: '#172322',
        surface: '#F7FAF8',
      },
    },
  },
  plugins: [],
};
