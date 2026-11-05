import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const notoJp = Noto_Sans_JP({ variable: "--font-noto-jp", subsets: ["latin"], weight: ["400", "500"] });

const displaySerif = Instrument_Serif({ variable: "--font-display-serif", subsets: ["latin"], weight: "400" });

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
    images: [{ url: "/profile-cutout.png", width: 813, height: 1024 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${notoJp.variable} ${displaySerif.variable} antialiased`}>
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
