import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Noto Sans JP cut down to the glyphs the page uses (about 30 KB instead of about 260 KB of slices).
// Regenerate with scripts/subset-jp-font.mjs when Japanese copy changes; npm run check fails if a character is missing.
const notoJp = localFont({ src: "./fonts/noto-sans-jp-subset.woff2", variable: "--font-noto-jp", weight: "400 500", display: "swap" });

const displaySerif = Instrument_Serif({ variable: "--font-display-serif", subsets: ["latin"], weight: "400" });

const description =
  "Software engineer in Bangkok. Japanese client briefs to delivery: Shopify, landing pages, WordPress and tracking, using AI agents I run and review.";

const title = `${profile.name}, ${profile.title} in ${profile.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", url: "/" },
  twitter: { card: "summary_large_image", title, description },
};

// The address bar on mobile takes the page colour. It must be a literal and equals --bg.
export const viewport: Viewport = {
  themeColor: "#0d0d10", // ds-allow-hardcode: meta tag cannot read a CSS variable
  colorScheme: "dark",
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
        {/* Fills as the reader scrolls, in browsers that can tie an animation to scroll position. Hidden elsewhere. */}
        <div aria-hidden className="scroll-progress print:hidden" />
        {children}
      </body>
    </html>
  );
}
