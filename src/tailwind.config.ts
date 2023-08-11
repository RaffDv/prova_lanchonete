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
      },
    },
  },
  plugins: [],
}
export default config
