/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./**/templates/**/*.html",
    "./core/static/**/main.js",
    "myapp/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
// npx tailwindcss -i ./templates/base.css -o ./core/static/core/css/output.css --watch  