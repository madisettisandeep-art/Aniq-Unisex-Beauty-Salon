import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF6F0',
          200: '#F5ECE1',
          300: '#EFE2D2',
        },
        ivory: {
          50: '#FAF8F5',
          100: '#F4EFEB',
          200: '#EAE1D9',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          hover: '#C5A028',
          champagne: '#E8D399',
          dark: '#A68218',
        },
        blush: {
          50: '#FDF8F7',
          100: '#FBF0EE',
          200: '#F6DDD9',
          300: '#ECC3BC',
          400: '#DE9F95',
        },
        rosegold: {
          DEFAULT: '#B76E79',
          light: '#D49B9F',
          dark: '#96535D',
        },
        beige: {
          DEFAULT: '#E5D9CE',
          light: '#F0E8E1',
          dark: '#C8B8A9',
        },
        mauve: {
          DEFAULT: '#8A7582',
          light: '#B2A0AC',
          dark: '#675360',
        },
        charcoal: {
          DEFAULT: '#1E1E22',
          light: '#2E2E34',
          subtle: '#4A4A52',
          muted: '#747480',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 10px 30px -5px rgba(183, 110, 121, 0.08), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
        gold: '0 4px 20px rgba(212, 175, 55, 0.25)',
        card: '0 2px 16px -2px rgba(46, 46, 52, 0.05), 0 0 0 1px rgba(239, 226, 210, 0.8)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #B76E79 100%)',
        'gradient-champagne': 'linear-gradient(135deg, #FAF6F0 0%, #F5ECE1 50%, #FBF0EE 100%)',
        'marble-radial': 'radial-gradient(circle at 50% 50%, #FAF6F0 0%, #F4EFEB 100%)',
      }
    },
  },
  plugins: [],
};
export default config;

