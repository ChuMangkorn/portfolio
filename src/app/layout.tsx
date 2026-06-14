import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/app/components/Chatbot';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mangkorn Chulaprungrueang — Frontend Developer',
  description: 'Frontend Developer based in Japan. Building modern web experiences with React, Next.js, and a passion for UI craft.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'Thailand', 'Japan'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
