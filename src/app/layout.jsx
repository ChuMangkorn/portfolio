
import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header'; //
import Footer from './components/Footer'; //
import Chatbot from './components/Chatbot'; //
import { Providers } from './providers'; // Import your ThemeProvider

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    template: '%s | My Portfolio',
    default: 'My Portfolio',
  },
  description: 'A modern personal portfolio website built with Next.js App Router and Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`} suppressHydrationWarning>
      <body className={`
        bg-slate-50 text-slate-800           {/* === Light Mode Styles === */}
        dark:bg-slate-900 dark:text-slate-100 {/* === Dark Mode Styles === */}
        min-h-screen flex flex-col antialiased ${inter.className}
      `}>
        <Providers> {/* Wrap your components with Providers */}
          <Header />
          <main className="flex-grow container mx-auto p-6 md:p-8">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}