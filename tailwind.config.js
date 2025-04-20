/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4B83B8',
          DEFAULT: '#0F4C81',
          dark: '#0A3661',
        },
        secondary: {
          light: '#64A633',
          DEFAULT: '#3B7302',
          dark: '#2A5201',
        },
        accent: {
          light: '#E2C466',
          DEFAULT: '#D4AF37',
          dark: '#9E8129',
        },
        success: {
          light: '#84E1BC',
          DEFAULT: '#10B981',
          dark: '#0B815A',
        },
        warning: {
          light: '#FDE68A',
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        error: {
          light: '#FDA4AF',
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};