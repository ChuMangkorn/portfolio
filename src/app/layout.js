// app/layout.jsx
import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header'; // Assuming components/Header.jsx exists
import Footer from './components/Footer'; // Assuming components/Footer.jsx exists

// Configure Inter font weights
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Improve font loading performance
  variable: '--font-inter', // Optional: if you want to use it as a CSS variable
});

export const metadata = {
  title: { // Improved title handling
    template: '%s | My Modern Portfolio', // Template for page titles
    default: 'My Modern Portfolio', // Default title
  },
  description: 'A modern personal portfolio website built with Next.js App Router and Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}> 
      <body className={`bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased ${inter.className}`}> {/* Base background, text color, font, and anti-aliasing */}
        <Header />
        {/* Add padding top/bottom to main content area */}
        <main className="flex-grow container mx-auto p-6 md:p-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}