import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BannerSuperiorRRSS from "@/components/BannerSuperiorRRSS";
import FloatingButtons from "@/components/FloatingButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Asegal B&F",
  description: "Asesorías para el aseguramiento de calidad para empresas gastronómicas, expertas en garantizar la seguridad alimentaria y el cumplimiento regulatorio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BannerSuperiorRRSS/>
        <Navbar/>
        {children}
        <Footer/>
        <FloatingButtons/>
      </body>
    </html>
  );
}
