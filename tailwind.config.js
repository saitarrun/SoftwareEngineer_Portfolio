/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            colors: {
                glass: {
                    10: 'rgba(255, 255, 255, 0.1)',
                    20: 'rgba(255, 255, 255, 0.2)',
                    30: 'rgba(255, 255, 255, 0.3)',
                }
            }
        },
    },
    plugins: [],
}
