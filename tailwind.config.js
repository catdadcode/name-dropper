/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        blue: {
          500: "#1D4ED8",
          600: "#1E40AF",
          400: "#60A5FA",
        },
        orange: {
          500: "#F97316",
          600: "#EA580C",
          400: "#FB923C",
        },
        gray: {
          900: "#111827",
          100: "#F3F4F6",
          300: "#D1D5DB",
        },
        green: {
          500: "#10B981",
          600: "#059669",
          400: "#6EE7B7",
        },
        yellow: {
          500: "#F59E0B",
          600: "#D97706",
          400: "#FDE047",
        },
      },
    },
  },
  plugins: [],
};
