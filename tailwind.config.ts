import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // container: {
      //   center: true,
      //   padding: {
      //     DEFAULT: "1rem",
      //     // sm: "2rem",
      //     // md: "4rem",
      //     // lg: "6rem",
      //     // xl: "6rem",
      //     // "2xl": "12rem",
      //   },
      //   screens: {
      //     "2xl": "1580px",
      //     xl: "1324px",
      //     lg: "1024px",
      //     md: "768px",
      //     sm: "576px",
      //   },
      // },
       container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "4rem",
          lg: "6rem",
          xl: "6rem",
          "2xl": "12rem",
        },
        screens: {
          "2xl": "1580px",
          xl: "1324px",
          lg: "1024px",
          md: "768px",
          sm: "576px",
          xs: "480px",
        },
      },
      colors: {
        text_default: "#000000",
        text_white: "#FFFFFF",
        text_light_gray: "#AAAAAA",
        text_dark_gray: "#484848",
        button_bg: "#0EA548",
        black: "#1F1F1F",
        "primary": "#D1252B",
        green: "#0EA548",
        section_bg: "#FAFAFA",
        footer_bg: "#1F1F1F",
      },
      boxShadow: {
        customShadow:
          "0px 17px 5px 0px rgba(64, 29, 32, 0.00), 0px 11px 4px 0px rgba(64, 29, 32, 0.01), 0px 6px 4px 0px rgba(64, 29, 32, 0.05), 0px 3px 3px 0px rgba(64, 29, 32, 0.09), 0px 1px 2px 0px rgba(64, 29, 32, 0.10)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
