import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
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
  description: "Portfolio interactif (terminal) de Nadjide Omar, Ingénieur DevOps & Développeur Full Stack : Docker, CI/CD, Next.js, FastAPI, Python. Tape « help » pour explorer projets, stack et parcours.",
  keywords: ["Ingénieur DevOps", "Développeur Full Stack", "Docker", "CI/CD", "Next.js", "React", "TypeScript", "FastAPI", "Python", "Portfolio", "Nadjide Omar"],
  authors: [{ name: "Nadjide Omar" }],
  creator: "Nadjide Omar",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://portfolio-ts-nine.vercel.app",
    title: "Nadjide Omar | Ingénieur DevOps & Développeur Full Stack",
    description: "Portfolio interactif sous forme de terminal. Tape « help » pour explorer projets, stack et parcours.",
    siteName: "Portfolio Nadjide Omar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadjide Omar | Ingénieur DevOps & Développeur Full Stack",
    description: "Portfolio interactif sous forme de terminal — Docker, CI/CD, Next.js, FastAPI, Python.",
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
        <NoiseOverlay />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
