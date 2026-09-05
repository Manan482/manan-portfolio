/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          yellow: "#f4c400",
          yellowLight: "#facc15",
          dark: "#0a0a0a",
          card: "#121216",
          accent: "#3b82f6",
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        cinematic: ['"Syne"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'marquee-fast': 'marquee 15s linear infinite',
        'marquee-fast-reverse': 'marquee-reverse 15s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
      },
      boxShadow: {
        'glow-yellow': '0 0 35px rgba(244, 196, 0, 0.35)',
        'glow-blue': '0 0 35px rgba(59, 130, 246, 0.45)',
        'cinematic': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
