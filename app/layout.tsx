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
  title: "Nadjide Omar | Software Engineer (Full Stack & DevOps)",
  description:
    "Nadjide Omar, Software Engineer Full Stack & DevOps à Nice. 5 ans en entreprise, 6 applications en production. Projets, architecture, IA locale et livraison continue.",
  keywords: ["Software Engineer", "Ingénieur DevOps", "Développeur Full Stack", "Docker", "CI/CD", "Next.js", "React", "TypeScript", "FastAPI", "Python", "Portfolio", "Nadjide Omar"],
  authors: [{ name: "Nadjide Omar" }],
  creator: "Nadjide Omar",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://portfolio-ts-nine.vercel.app",
    title: "Nadjide Omar | Software Engineer (Full Stack & DevOps)",
    description: "Du code à la production. Découvrez les projets et le parcours de Nadjide Omar, Software Engineer Full Stack & DevOps à Nice.",
    siteName: "Portfolio Nadjide Omar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadjide Omar | Software Engineer (Full Stack & DevOps)",
    description: "Du code à la production — projets Full Stack, DevOps et IA locale de Nadjide Omar.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1115",
  colorScheme: "dark light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nadjide Omar",
  jobTitle: "Software Engineer",
  url: "https://portfolio-ts-nine.vercel.app",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nice",
    addressRegion: "Alpes-Maritimes",
    addressCountry: "FR",
  },
  knowsLanguage: ["fr", "en"],
  knowsAbout: ["DevOps", "Docker", "CI/CD", "Next.js", "React", "TypeScript", "FastAPI", "Python"],
  sameAs: [
    "https://github.com/Nadjide",
    "https://www.linkedin.com/in/nadjide-omar-b55a01212/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NoiseOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
