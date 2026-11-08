/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Palette Tokens
        midnight: {
          DEFAULT: '#101B2D',
          dark: '#0B1320',
          light: '#1B2C46',
          900: '#070C15',
          800: '#101B2D',
          700: '#182944',
          600: '#233C61',
        },
        sand: {
          DEFAULT: '#F2E8D8',
          light: '#FAF5EE',
          dark: '#E2D3BE',
          border: 'rgba(242, 232, 216, 0.22)',
        },
        terracotta: {
          DEFAULT: '#C66B4E',
          hover: '#B55A3D',
          dark: '#8C3F26',
          light: '#F4D4CA',
        },
        sunset: {
          DEFAULT: '#E9A45B',
          hover: '#DE9546',
          light: '#FCE7D2',
        },
        forest: {
          DEFAULT: '#314C42',
          light: '#47685B',
          dark: '#1F322B',
        },
        ivory: {
          DEFAULT: '#FFFDF7',
          muted: '#E6E2D8',
          soft: 'rgba(255, 253, 247, 0.78)',
        },
        charcoal: {
          DEFAULT: '#242424',
          dark: '#181818',
          light: '#363636',
        },
        // Semantic aliases
        brand: {
          primary: '#C66B4E',
          accent: '#E9A45B',
          navy: '#101B2D',
          sand: '#F2E8D8',
          forest: '#314C42',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        num: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        luxury: '0 25px 50px -12px rgba(16, 27, 45, 0.55)',
        glow: '0 0 35px rgba(198, 107, 78, 0.35)',
        goldGlow: '0 0 35px rgba(233, 164, 91, 0.3)',
        card: '0 15px 35px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(242, 232, 216, 0.1)',
        cardHover: '0 30px 60px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(198, 107, 78, 0.3)',
        floating: '0 20px 40px -8px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(255, 255, 255, 0.1)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'pill': '9999px',
      }
    },
  },
  plugins: [],
}
