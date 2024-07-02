import localFont from "next/font/local";
const NeueMachina = localFont({
  src: [
    {
      path: "../fonts/NeueMachina-Regular.woff",
      weight: "400",
      style: "normal",
    },

    {
      path: "../fonts/NeueMachina-Ultrabold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-neue-machina",
});

export { NeueMachina };
