import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#1D4ED8',
        surface: '#FFFFFF',
        background: '#F3F6FB',
        'text-main': '#0F172A',
        'text-muted': '#64748B',
        accent: '#0EA5E9',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(37, 99, 235, 0.12)',
        'hover': '0 12px 30px -8px rgba(37, 99, 235, 0.22), 0 8px 14px -10px rgba(14, 165, 233, 0.2)',
        'button': '0 8px 18px -8px rgba(37, 99, 235, 0.55)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.45)',
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [],
}
export default config
