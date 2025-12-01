// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // important for toggling
  theme: {
    extend: {
      colors: {
        cyberPurple: '#8b5cf6',
        cyberPink: '#ec4899',
        cyberBlue: '#60a5fa',
        pastelLav: '#e9e4ff',
        pastelCyan: '#d7fbff'
      },
      animation: {
        'slow-pulse': 'pulse 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'scan': 'scanlines 6s linear infinite',
        'glitch': 'glitch 1.5s linear infinite'
      },
      keyframes: {
        scanlines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 200%' }
        },
        glitch: {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(1px)' },
          '100%': { transform: 'translateX(0)' }
        }
      }
    }
  },
  plugins: []
};
