/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#000000',
                secondary: '#FFFFFF',
                'accent-nude': '#E8D5D0',
                'accent-sage': '#94A37D',
                'gray-light': '#F5F5F5',
                'text-main': '#1A1A1A',
                'text-muted': '#717171',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'var(--font-outfit)', 'sans-serif'],
                display: ['var(--font-outfit)', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                'premium': '0 20px 50px -12px rgba(0, 0, 0, 0.05)',
                'card': '0 10px 30px -5px rgba(0, 0, 0, 0.03)',
            }
        },
    },
    plugins: [],
}
