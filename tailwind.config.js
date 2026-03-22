/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Plus Jakarta Sans', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                label: ['Space Grotesk', 'monospace'],
            },
            colors: {
                primary: {
                    DEFAULT: '#ff9249',
                    fixed: '#FF7A00',
                    container: '#ff7b04',
                    dim: '#fb7800',
                },
                surface: {
                    DEFAULT: '#0e0e0e',
                    variant: 'rgba(32, 31, 31, 0.6)',
                    container: {
                        lowest: '#000000',
                        low: '#131313',
                        DEFAULT: '#1a1a1a',
                        high: '#201f1f',
                        highest: '#2a2828',
                    }
                },
                'on-surface': {
                    DEFAULT: '#ffffff',
                    variant: '#adaaaa',
                },
                'outline-variant': 'rgba(119, 117, 115, 0.1)',
                error: '#ff7351',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
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
