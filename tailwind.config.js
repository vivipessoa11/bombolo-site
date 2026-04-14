/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#2B1A17',
                    gold: '#C59A3B',
                    cream: '#F6F0E8',
                    text: '#3A2320',
                    pistachio: '#93C572',
                    berry: '#8B2E3E',
                    surface: '#F6F0E8',
                    red: '#691f06',
                    green: '#1B4D3E',
                    brown: '#2C1810',
                    light: '#F6F0E8',
                }
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '200% center' },
                    '100%': { backgroundPosition: '-200% center' },
                }
            },
            animation: {
                shimmer: 'shimmer 8s linear infinite',
            },
        },
    },
    plugins: [],
}
