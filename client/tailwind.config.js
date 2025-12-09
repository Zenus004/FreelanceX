/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // Indigo 600
                secondary: '#10B981', // Emerald 500
                dark: '#1F2937', // Gray 800
            },
            animation: {
                'blob': 'blob 10s infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'grid': 'grid-flow 3s linear infinite',
                'spin-slow': 'spin-slow 12s linear infinite',
                'spin-reverse': 'spin-reverse 15s linear infinite',
                'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
                'stripes': 'slide-stripes 30s linear infinite',
                'bounce-gentle': 'bounce-gentle 3s ease-in-out infinite',
                'shooting-star': 'shooting-star 3s linear infinite',
                'shimmer': 'shimmer 2s infinite',
                'gradient': 'gradient 5s ease infinite',
            },
            keyframes: {
                blob: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '25%': { transform: 'translate(20px, -20px) scale(1.1)' },
                    '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '75%': { transform: 'translate(20px, 20px) scale(1.05)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'grid-flow': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(24px)' },
                },
                'spin-slow': {
                    'from': { transform: 'rotate(0deg)' },
                    'to': { transform: 'rotate(360deg)' },
                },
                'spin-reverse': {
                    'from': { transform: 'rotate(360deg)' },
                    'to': { transform: 'rotate(0deg)' },
                },
                'pulse-slow': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
                    '50%': { transform: 'scale(1.1)', opacity: '0.8' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.7', transform: 'scale(1.1)' },
                },
                'slide-stripes': {
                    '0%': { backgroundPosition: '0 0' },
                    '100%': { backgroundPosition: '50px 50px' },
                },
                'bounce-gentle': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                'shooting-star': {
                    '0%': { transform: 'translateX(0) translateY(0) rotate(-45deg)', opacity: '1' },
                    '100%': { transform: 'translateX(-500px) translateY(500px) rotate(-45deg)', opacity: '0' },
                },
                'shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                'gradient': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.animation-delay-2000': {
                    'animation-delay': '2s',
                },
                '.animation-delay-4000': {
                    'animation-delay': '4s',
                },
            })
        }
    ],
}
