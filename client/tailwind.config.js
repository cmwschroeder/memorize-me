module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#d946ef",

          "secondary": "#e879f9",

          "accent": "#2563eb",

          "neutral": "#22d3ee",

          "base-100": "#1f2937",

          "info": "#db2777",

          "success": "#a21caf",

          "warning": "#1e40af",

          "error": "#ec4899",
        },
      },
    ]
  }
}
