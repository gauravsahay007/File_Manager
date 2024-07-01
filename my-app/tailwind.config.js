/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'blue' : "#01A2E0",
        'white':"white",
        'black':"black", 
        'gray':"gray",
        'green':"#45CE30",
        'yellow':"yellow",
        'aliceblue':"#d8f9ff",
         'indigo-500': '#6366F1'
      },
    },
  },
  plugins: [require('daisyui')],
};

// #01A2E0