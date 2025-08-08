/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors (default)
        background: '#0D0D0F',
        foreground: '#F5F7FA',
        
        // Semantic color system
        primary: {
          50: '#F0F7FF',
          100: '#E0F0FF',
          200: '#B8E1FF',
          300: '#7BC8FF',
          400: '#3A9BDC',
          500: '#2B7CB8',
          600: '#1E5A94',
          700: '#174270',
          800: '#122A4C',
          900: '#0D1F33',
          DEFAULT: '#3A9BDC'
        },
        secondary: {
          50: '#F5F0FF',
          100: '#EBE0FF',
          200: '#D6C1FF',
          300: '#C1A2FF',
          400: '#8F6ED5',
          500: '#7A5BC1',
          600: '#6548AD',
          700: '#503599',
          800: '#3B2285',
          900: '#261571',
          DEFAULT: '#8F6ED5'
        },
        
        // Grayscale for UI elements  
        muted: {
          50: '#F5F7FA',
          100: '#E8EAED',
          200: '#D1D5DB', 
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#25252A',
          800: '#1A1A1F',
          900: '#0D0D0F',
          DEFAULT: '#25252A',
          foreground: '#9CA3AF'
        },
        
        // Status colors
        success: '#10B981',
        warning: '#F59E0B', 
        destructive: '#EF4444',
        
        // Card and component backgrounds
        card: '#1A1A1F',
        popover: '#1A1A1F',
        
        // Borders 
        border: '#25252A',
        input: '#25252A',
        ring: '#3A9BDC'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Monaco', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(58, 155, 220, 0.5)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(58, 155, 220, 0.8)',
            transform: 'scale(1.02)'
          }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(30px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(30px) rotate(-360deg)' }
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      backgroundImage: {
        'starfield': 'radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent), radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent), radial-gradient(2px 2px at 160px 30px, #ddd, transparent)',
        'nebula': 'linear-gradient(45deg, rgba(58, 155, 220, 0.1) 0%, rgba(143, 110, 213, 0.1) 100%)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['2rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.5rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '3.25rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }]
      },
      borderRadius: {
        '4xl': '2rem'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};