/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/App.js"
    ],
    theme: {
        extend: {
            maxWidth: {
                '1/2': '70%',
                '3/4': '85%',
            }
        },
    },
    plugins: [],
}