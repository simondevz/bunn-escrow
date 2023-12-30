import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors : {
        customColors : {
          background: '#070906',
          primary : '#7ca46a',
          secondary: '#b6a9cb',
          accent: '#b789a5'
        }
      }
    },
  },
  plugins: [],
}
export default config
