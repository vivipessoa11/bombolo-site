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
                    red: '#691f06',
                    green: '#1B4D3E',
                    brown: '#2C1810',
                    light: '#f9f9f9',
                    cream: '#f9f9f9', // Mapping cream to light for compatibility if used elsewhere
                    gold: '#D4C4A8', // Keeping gold as legacy or accent if needed, or mapping to something else? User didn't specify gold removal, but "Neutrals" list didn't include it. I'll keep it for now to avoid breaking other things, but prioritize the new palette.
                    dark: '#2C1810', // Mapping dark to brown for compatibility
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
