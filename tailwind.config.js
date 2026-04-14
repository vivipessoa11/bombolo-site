/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
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
                slideRight: {
                    from: { transform: 'translateX(-100%)' },
                    to: { transform: 'translateX(0)' },
                },
                scaleIn: {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
                fadeInUp: {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                shimmer: 'shimmer 8s linear infinite',
                'subtle-scale': 'subtle-scale 20s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'slide-right': 'slideRight 2s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
