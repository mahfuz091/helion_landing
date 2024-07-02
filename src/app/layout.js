import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/Components/Header/Header";
import ThemeProvider from "@/ThemeProvider/ThemeProvider";
import { NeueMachina } from "@/utils/customFonts";
import Footer from "@/Components/Footer/Footer";

export const metadata = {
  title: "Helion Edge",
  description: "Helion Innovault",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={NeueMachina.className}>
        <ThemeProvider>
          <div className='main-radial-gradient'></div>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
