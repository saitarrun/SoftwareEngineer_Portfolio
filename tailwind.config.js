/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Satoshi', 'Inter', 'sans-serif'],
                serif: ['Satoshi', 'Inter', 'sans-serif'],
            },
            colors: {
                accent: {
                    DEFAULT: '#F97316',
                    light: '#FB923C',
                    dark: '#EA580C',
                },
                surface: {
                    DEFAULT: '#0F1528',
                    2: '#151D35',
                    3: '#1C2540',
                },
                glass: {
                    4: 'rgba(255, 255, 255, 0.04)',
                    8: 'rgba(255, 255, 255, 0.08)',
                    12: 'rgba(255, 255, 255, 0.12)',
                    20: 'rgba(255, 255, 255, 0.20)',
                }
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'float-slow': 'float 12s ease-in-out infinite reverse',
                'shimmer': 'shimmer 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
                    '33%': { transform: 'translateY(-20px) translateX(10px)' },
                    '66%': { transform: 'translateY(10px) translateX(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
            },
        },
    },
    plugins: [],
}
