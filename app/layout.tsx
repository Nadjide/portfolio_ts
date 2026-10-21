import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import NoiseOverlay from "./components/NoiseOverlay";
import { profile } from "./profileData";
import { portfolioUrl, findLink } from "./contactData";

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
  metadataBase: new URL(portfolioUrl),
  alternates: { canonical: portfolioUrl },
  title: "Nadjide Omar | Software Engineer (Full Stack & DevOps)",
  description: profile.seoDescription,
  keywords: ["Software Engineer", "Ingénieur DevOps", "Développeur Full Stack", "Docker", "CI/CD", "Next.js", "React", "TypeScript", "FastAPI", "Python", "Java", "Spring Boot", "Portfolio", "Nadjide Omar"],
  authors: [{ name: "Nadjide Omar" }],
  creator: "Nadjide Omar",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: portfolioUrl,
    title: "Nadjide Omar | Software Engineer (Full Stack & DevOps)",
    description: profile.seoDescription,
    siteName: "Portfolio Nadjide Omar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadjide Omar | Software Engineer (Full Stack & DevOps)",
    description: profile.seoDescription,
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
  url: portfolioUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nice",
    addressRegion: "Alpes-Maritimes",
    addressCountry: "FR",
  },
  knowsLanguage: ["fr", "en"],
  knowsAbout: ["DevOps", "Docker", "CI/CD", "Next.js", "React", "TypeScript", "FastAPI", "Python", "Java", "Spring Boot"],
  sameAs: [
    findLink("GitHub")!.href,
    findLink("LinkedIn")!.href,
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
