import "./globals.css";
import Providers from "@/providers/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BannerSuperiorRRSS from "@/components/BannerSuperiorRRSS";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata = {
  title: "Asegal B&F",
  description: "Asesorías para el aseguramiento de calidad...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <BannerSuperiorRRSS/>
          <Navbar/>
          {children}
          <Footer/>
          <FloatingButtons/>
        </Providers>
      </body>
    </html>
  );
}