import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import NoiseOverlay from "./components/NoiseOverlay";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-ts-nine.vercel.app"),
  title: "Nadjide Omar | Ingénieur DevOps & Développeur Full Stack",
  description:
    "Portfolio interactif de Nadjide Omar, Ingénieur DevOps & Développeur Full Stack : Docker, CI/CD, Next.js, FastAPI, Python. Un vrai terminal jouable — tape « help » — ou une vue simplifiée, au choix.",
  keywords: ["Ingénieur DevOps", "Développeur Full Stack", "Docker", "CI/CD", "Next.js", "React", "TypeScript", "FastAPI", "Python", "Portfolio", "Nadjide Omar"],
  authors: [{ name: "Nadjide Omar" }],
  creator: "Nadjide Omar",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://portfolio-ts-nine.vercel.app",
    title: "Nadjide Omar | Ingénieur DevOps & Développeur Full Stack",
    description: "Portfolio interactif — un terminal DevOps jouable ou une vue simplifiée, au choix. Tape « help ».",
    siteName: "Portfolio Nadjide Omar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadjide Omar | Ingénieur DevOps & Développeur Full Stack",
    description: "Portfolio interactif avec terminal DevOps jouable — Docker, CI/CD, Next.js, FastAPI, Python.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e1e1e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NoiseOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
