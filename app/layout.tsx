import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/Footer";
import { TerminalProvider } from "@/components/terminal/TerminalProvider";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Superteam Australia — Building Australia's Solana Future",
  description:
    "Superteam Australia connects the builders, designers, and creators shaping the Solana ecosystem Down Under.",
  metadataBase: new URL('https://superteam.com.au'),
  openGraph: {
    title: "Superteam Australia",
    description:
      "Superteam Australia connects the builders, designers, and creators shaping the Solana ecosystem Down Under.",
    type: "website",
    locale: "en_AU",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Superteam Australia' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Superteam Australia",
    description:
      "Superteam Australia connects the builders, designers, and creators shaping the Solana ecosystem Down Under.",
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://superteam.com.au',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <TerminalProvider>
          <NavBar />
          {children}
          <Footer />
        </TerminalProvider>
      </body>
    </html>
  );
}
