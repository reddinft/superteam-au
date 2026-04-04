import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/Footer";
import { TerminalProvider } from "@/components/terminal/TerminalProvider";
import { reader } from "@/lib/keystatic.reader";
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
  metadataBase: new URL('https://superteam-au-redditech.vercel.app'),
  openGraph: {
    title: "Superteam Australia",
    description:
      "Superteam Australia connects the builders, designers, and creators shaping the Solana ecosystem Down Under.",
    type: "website",
    locale: "en_AU",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Superteam Australia' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Superteam Australia",
    description:
      "Superteam Australia connects the builders, designers, and creators shaping the Solana ecosystem Down Under.",
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://superteam-au-redditech.vercel.app',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/favicon-32.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await reader.singletons.siteConfig.read()
  const joinUrl = siteConfig?.telegramUrl ?? 'https://t.me/superteamaustralia'
  const twitterUrl = siteConfig?.twitterUrl ?? 'https://x.com/SuperteamAU'

  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <TerminalProvider>
          <NavBar joinUrl={joinUrl} />
          {children}
          <Footer telegramUrl={joinUrl} twitterUrl={twitterUrl} />
        </TerminalProvider>
      </body>
    </html>
  );
}
