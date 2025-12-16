/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinic Brand Colors
        maroon: {
          50: "#faf5f5",
          100: "#f5ebeb",
          200: "#e6d1d1",
          300: "#d6b7b7",
          400: "#b8860b",
          500: "#800000",
          600: "#6b0000",
          700: "#5B1A13",
          800: "#4a0f0a",
          900: "#3d0a07",
        },
        gold: {
          50: "#fffbf0",
          100: "#fff8e7",
          200: "#ffecb3",
          300: "#ffe082",
          400: "#b8860b",
          500: "#a07609",
          600: "#8b6508",
          700: "#6b5106",
          800: "#5a4404",
          900: "#4a3703",
        },
        cream: {
          50: "#fffef9",
          100: "#fffcf5",
          200: "#fff8f0",
          300: "#fff3e0",
          400: "#ffe8cc",
          500: "#fdd9a3",
          600: "#FDF3C4",
          700: "#f5e3b3",
          800: "#e8d4a2",
          900: "#dbc596",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Garamond", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
    },
  },
  plugins: [],
}

