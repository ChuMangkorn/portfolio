import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

// Display: Archivo SemiCondensed at weight 600, one instance cut to printable ASCII (about 8 KB instead of the 90 KB variable
// font; regenerate with scripts/subset-display-font.mjs). Body: Hanken Grotesk. Figures and code: IBM Plex Mono, for numbers,
// dates and identifiers only, not for labels.
const displaySans = localFont({ src: "./fonts/archivo-display-subset.woff2", variable: "--font-display-sans", weight: "600", display: "swap" });
const bodySans = Hanken_Grotesk({ variable: "--font-body-sans", subsets: ["latin"] });
const codeMono = IBM_Plex_Mono({ variable: "--font-code-mono", subsets: ["latin"], weight: "400" });
// Noto Sans JP cut down to the glyphs the page uses (about 30 KB instead of about 260 KB of slices).
// Regenerate with scripts/subset-jp-font.mjs when Japanese copy changes; npm run check fails if a character is missing.
const notoJp = localFont({ src: "./fonts/noto-sans-jp-subset.woff2", variable: "--font-noto-jp", weight: "400 500", display: "swap" });

const description =
  "Software engineer in Bangkok. Japanese client briefs to delivery: Shopify, landing pages, WordPress and tracking, using AI agents I run and review.";

const title = `${profile.name}, ${profile.tabTitle}`;

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
    <html lang="en" className={`${bodySans.variable} ${codeMono.variable} ${notoJp.variable} ${displaySans.variable} antialiased`}>
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
