/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",

      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            // M&A Deal Colors
            'ewf-purple': '#5D2E8C',
            'sbp-cyan': '#00C2FF',
            'sbp-green': '#2EFF92',
            'deal-gold': '#FFD700',
            'deep-navy': '#0F172A',
         },
         animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'fade-in': 'fade-in 0.6s ease-out',
            'slide-up': 'slide-up 0.6s ease-out',
         },
         keyframes: {
            'fade-in': {
               '0%': { opacity: '0' },
               '100%': { opacity: '1' },
            },
            'slide-up': {
               '0%': { opacity: '0', transform: 'translateY(20px)' },
               '100%': { opacity: '1', transform: 'translateY(0)' },
            },
         },
         backgroundImage: {
            'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            'glass-gradient-dark': 'linear-gradient(135deg, rgba(93, 46, 140, 0.15) 0%, rgba(0, 194, 255, 0.1) 100%)',
         },
      },
   },
   plugins: [],
}
