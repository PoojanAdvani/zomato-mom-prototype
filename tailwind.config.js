/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Zomato-inspired primary
        zomato: {
          DEFAULT: '#E23744',
          50: '#FDECEE',
          100: '#FAD1D6',
          200: '#F2A3AC',
          300: '#EC7581',
          400: '#E85462',
          500: '#E23744',
          600: '#C4222F',
          700: '#9E1B25',
          800: '#78141C',
          900: '#520E13',
        },
        // "Ghar ka khana" warm secondary (mustard / turmeric)
        ghee: {
          DEFAULT: '#E8A33D',
          50: '#FDF4E6',
          100: '#FAE6C4',
          200: '#F3CB85',
          300: '#EDB65B',
          400: '#E8A33D',
          500: '#D98A22',
          600: '#B36E17',
          700: '#8A5411',
        },
        // Blinkit brand accent (yellow/green) for the verification story
        blinkit: {
          DEFAULT: '#F8CB46',
          green: '#0C831F',
          dark: '#1A1A1A',
        },
        masala: {
          // warm neutral background palette
          50: '#FBF8F4',
          100: '#F5EFE7',
          200: '#E9DFD2',
          300: '#D6C6B2',
        },
        ink: {
          DEFAULT: '#1C1B1A',
          soft: '#4A4644',
          faint: '#8A8480',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(28, 27, 26, 0.06), 0 1px 2px rgba(28, 27, 26, 0.04)',
        float: '0 12px 32px rgba(28, 27, 26, 0.12)',
        phone: '0 30px 60px -12px rgba(28, 27, 26, 0.35), 0 18px 36px -18px rgba(28, 27, 26, 0.30)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(0) scaleX(1)' },
          '40%': { opacity: '0.6' },
          '100%': { opacity: '0', transform: 'translateY(-16px) scaleX(1.4)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        steam: 'steam 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
