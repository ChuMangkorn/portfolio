// components/Header.jsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50"> {/* White bg with blur, shadow, sticky */}
      <nav className="container mx-auto flex justify-between items-center h-16 px-6"> {/* Fixed height, padding */}
        <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          MyPortfolio
        </Link>
        <ul className="flex space-x-6 text-sm font-medium text-slate-700"> {/* Adjusted spacing and font style */}
          <li><Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
          <li><Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link></li>
          <li><Link href="/skills" className="hover:text-indigo-600 transition-colors">Skills</Link></li>
          <li><Link href="/education" className="hover:text-indigo-600 transition-colors">Education</Link></li>
          <li><Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}