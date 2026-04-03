import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/Footer";
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
  openGraph: {
    title: "Superteam Australia",
    description:
      "Superteam Australia connects the builders, designers, and creators shaping the Solana ecosystem Down Under.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Superteam Australia",
    description:
      "Superteam Australia connects the builders, designers, and creators shaping the Solana ecosystem Down Under.",
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
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
