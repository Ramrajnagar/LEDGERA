/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Control Room Palette
                control: {
                    dark: "#050505", // Near black
                    panel: "#0a0a0a", // Panel background
                    border: "#1f1f1f", // Subtle borders
                    text: "#e5e5e5", // Primary text
                    muted: "#737373", // Secondary text
                    cyan: "#22d3ee", // Accent (low usage)
                    danger: "#ef4444", // Warnings
                    success: "#22c55e", // Status ok
                },
            },
            fontFamily: {
                mono: ['var(--font-geist-mono)', 'monospace'],
                sans: ['var(--font-geist-sans)', 'sans-serif'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)",
            },
        },
    },
    plugins: [],
};
