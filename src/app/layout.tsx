import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://abdelrhman-hesham.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Abdelrhman Hesham Galal — AI/ML & Backend Engineer · Aviation Information Systems",
  description:
    "AI/ML and backend engineer specializing in aviation information systems. Built Gate Buddy (40+ endpoint airport platform) and DistilBERT airline sentiment research at 93.5% accuracy.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Abdelrhman Hesham Galal — AI/ML & Backend Engineer",
    description:
      "AI/ML and backend engineer specializing in aviation information systems. Gate Buddy, airline sentiment AI, and production backends.",
    siteName: "Abdelrhman Hesham Galal",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Abdelrhman Hesham Galal — AI/ML & Backend Engineer, Aviation Information Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrhman Hesham Galal — AI/ML & Backend Engineer",
    description:
      "AI/ML and backend engineer specializing in aviation information systems.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-950 text-foreground">
        {children}
      </body>
    </html>
  );
}
