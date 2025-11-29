import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fukuoka: {
          pink: '#FFB7C5',
          blue: '#2C3E50',
          gold: '#D4AF37',
          cream: '#FFF8F0',
        },
      },
    },
  },
  plugins: [],
};
export default config;

