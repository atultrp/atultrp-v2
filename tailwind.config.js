/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0B0F17', 2: '#111723', 3: '#172031' },
        line: 'rgba(255,255,255,0.09)',
        fg: { DEFAULT: '#E8EBF1', muted: '#A3ABBA', subtle: '#8790A2' },
        signal: { DEFAULT: '#B9F35B', dim: '#B9F35B33', ink: '#0B0F17' },
        warn: '#F5B65B',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: { page: '72rem' },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
      },
      animation: {
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
