import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        main: '#0089D7',
        inputBg: '#CDE9E9',
        buttonBg: '#6BB7FE',
        font: '#514E66',
        dot: '#5C9EDB',
        off: '#A2C3E1',
        cyan: {
          figma: '#CDE9E9',
        },
        keyframes: {
          fadeIn: { from: { opacity: '0', transform: 'scale(.95)' } },
          fadeOut: { to: { opacity: '0', transform: 'scale(.95)' } },
        },
        animation: {
          fadeIn: 'fadeIn 0.1s ease-out',
          fadeOut: 'fadeOut 0.15s ease-out forwards',
        },
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: { from: { opacity: '0', transform: 'scale(.95)' } },
        fadeOut: { to: { opacity: '0', transform: 'scale(.95)' } },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 0.1s ease-out',
        fadeOut: 'fadeOut 0.15s ease-out forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: { from: { opacity: '0', transform: 'scale(.95)' } },
        fadeOut: { to: { opacity: '0', transform: 'scale(.95)' } },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 0.1s ease-out',
        fadeOut: 'fadeOut 0.15s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
