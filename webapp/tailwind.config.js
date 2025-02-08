/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            text: {
                body: "var(--color-text-body)",
                tab: {
                    normal: "var(--color-text-tab-normal)",
                    focus: "var(--color-text-tab-focus)"
                }
            },
            background: {
                surface: {
                    body: "var(--color-background-surface-body)"
                }
            },
            border: {
                tab: "var(--color-border-tab)"
            }
        },
        screens: {
            md: '1024px',
            sm: '768px',
        }
    },
    plugins: [],
}