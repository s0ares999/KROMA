import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./secondary.css";
import "./booking-flow.css";
import "./scroll-motion.css";
import "./immersive.css";

const archivo = localFont({
  src: "../fonts/ArchivoBlack-Regular.ttf",
  variable: "--font-archivo",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "KROMA — Estúdio criativo",
  description: "Fotografia, vídeo, design e digital para dar presença à tua marca, ao teu evento e à tua próxima ideia. Conhece a KROMA e prepara o teu projeto.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={archivo.variable}>
      <body>
        <a href="#conteudo" className="skip-link">Saltar para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
