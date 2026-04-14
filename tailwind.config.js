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
                },
                'subtle-scale': {
                    '0%': { transform: 'scale(1.0)' },
                    '100%': { transform: 'scale(1.05)' },
                },
                slideUp: {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
            },
            animation: {
                shimmer: 'shimmer 8s linear infinite',
                'subtle-scale': 'subtle-scale 20s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
            },
        },
    },
    plugins: [],
}
