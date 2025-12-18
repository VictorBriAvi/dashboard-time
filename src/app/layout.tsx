import "./globals.css";
import { Providers } from "@/app/providers";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";

export const metadata = {
  title: "Dashboard Time",
  description: "Administra tu negocio con inteligencia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
