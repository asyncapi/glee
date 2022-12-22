/** @type {import('tailwindcss').Config} */
export const content = [
  './app/**/*.{js,ts,jsx,tsx}',
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
  extend: {
    colors: {
      accent: '#fde046',
    },
  },
}
export const plugins = []
