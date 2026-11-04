import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Software engineer in Bangkok. Japanese client brief to shipped product: Shopify, landing pages, tracking, and media, driven by an AI workflow.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mangkorn.vercel.app"),
  title: `${profile.shortName}, Software Engineer`,
  description,
  openGraph: {
    title: `${profile.name}, Software Engineer`,
    description,
    type: "website",
    images: [{ url: "/profile.jpg", width: 800, height: 800 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-card focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
