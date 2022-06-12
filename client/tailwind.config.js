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

          "primary": "#c084fc",
          
          "secondary": "#d946ef",
                   
          "accent": "#38bdf8",
                   
          "neutral": "#0284c7",
                   
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
