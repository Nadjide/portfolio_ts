import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

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
  title: "Nadjide Omar | Développeur Full Stack",
  description: "Portfolio de Nadjide Omar, Développeur Full Stack spécialisé en Next.js, React, Node.js et Python. Découvrez mes projets, mes compétences et mon parcours.",
  keywords: ["Développeur Full Stack", "Next.js", "React", "TypeScript", "Node.js", "Python", "Portfolio", "Nadjide Omar"],
  authors: [{ name: "Nadjide Omar" }],
  creator: "Nadjide Omar",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://nadjide-omar.fr", // Replace with actual URL if known
    title: "Nadjide Omar | Développeur Full Stack",
    description: "Portfolio de Nadjide Omar, Développeur Full Stack spécialisé en Next.js, React, Node.js et Python.",
    siteName: "Portfolio Nadjide Omar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadjide Omar | Développeur Full Stack",
    description: "Portfolio de Nadjide Omar, Développeur Full Stack spécialisé en Next.js, React, Node.js et Python.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
