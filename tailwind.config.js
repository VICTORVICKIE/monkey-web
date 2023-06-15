/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,ts,svelte}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["business"],
    },
};
