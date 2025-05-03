/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Scan Angular templates and code
  ],
  darkMode: "class", // Enable class-based dark mode ('dark-theme' class)
  theme: {
    extend: {
      // Optional: Extend theme if needed, e.g., map Material colors
      colors: {
        primary: "var(--mdc-sys-color-primary)",
        "on-primary": "var(--mdc-sys-color-on-primary)",

        // ... map other M3 CSS variables
      },
    },
    // Optional: Inherit fonts from Material/CSS variables
    fontFamily: {
      sans: ["Inter", "sans-serif"], // Default plain font
      display: ["Montserrat", "sans-serif"], // Brand/Display font
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // IMPORTANT: Disable Tailwind's base reset (Preflight)
    // to avoid conflicts with Angular Material's styles.
  },
};
