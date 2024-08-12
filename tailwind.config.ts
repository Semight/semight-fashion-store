/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: {
        max: "640px",
      },
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      white: "#fff",
      "white-1": "#F5F5F5",
      "white-2": "#F1FFF2",
      "white-3": "#d9d9d9",
      "white-5": "#AAB7B0",
      green: "#2C4C3B",
      blue: "#3A66A5",
      "primary": "#D4145A",
      "primary-1": "#EC84AC",
      "primary-2": "#fff",
      "primary-3": "#BFC9C4",
      "primary-4": "#AAB7B0",
      "primary-5": "#95A59D",
      "primary-6": "#809389",
      "primary-7": "#6B8175",
      "primary-8": "#566F62",
      "primary-9": "#2C4C3B",
      "primary-10": "#274435",
      black: "#080F0B",
      "black-1": "#292D32",
      "light-black": "#A8A8A8",
      "light-black-1": "#CECFCE",
      "light-black-2": "#ADAFAE",
      "light-black-3": "#838785",
      "light-black-4": "#5A5F5C",
      "light-black-5": "#313734",
      "light-black-6": "#080F0B",
      "light-black-7": "#070D09",
      "light-black-8": "#050A07",
      "light-black-9": "#040806",
      "light-black-10": "#030504",
      "light-black-11": "#020302",
      "light-black-12": "#FAFAFA",
      "light-black-13": "#595E5C",
      "light-black-14": "#D9D9D9",
      "light-black-15": "#D4DBD7",
      "light-blue": "#55ACEE",
      orange: "#FF5341",
      "light-yellow": "#FF8820",
      "light-yellow-1": "#FFE7D6",
      "light-yellow-2": "#DE7C32",
      "light-yellow-3": "#FFE9E9",
      danger: "#FF0000",
      weirdBrown: "#A90041",
      darkBrownGradient: "#F8B99F",
      lightBrownGradient: "#FDD5D8",
      deepBrownGradient: "#D28E8D",
      purpleBrown: "#DD7385"
    },
    fontFamily: {
      merriweather: ['Merriweather', 'serif'],
    },
    // extend: {
    //   spacing: {
    //     "8xl": "96rem",
    //     "9xl": "128rem",
    //   },
    //   borderRadius: {
    //     "4xl": "2rem",
    //   },
    // },
  },
  plugins: [],
};
