'use client'; // Needed for useState

import Link from 'next/link';
import { useState } from 'react'; // Import useState for mobile menu toggle
import { FiMenu, FiX } from 'react-icons/fi'; // Example icons (install: npm install react-icons)

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' }, // Added Projects link
    { href: '/skills', label: 'Skills' },
    { href: '/education', label: 'Education' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center h-16 px-6">
        {/* Logo/Brand Name */}
        <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          MyPortfolio
        </Link>

        {/* Desktop Menu (Hidden on small screens) */}
        <ul className="hidden md:flex space-x-5 text-sm font-medium text-slate-700"> {/* Adjusted space-x-5 */}
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-indigo-600 transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (Visible on small screens) */}
        <div className="md:hidden text-slate-700">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Dropdown) - Shows when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40 ">
          <ul className="flex flex-col items-center py-4">
              {menuItems.map((item) => (
                 <li key={item.href} className="w-full text-center py-1"> {/* อาจจะลด padding ตรงนี้ถ้าต้องการ */}
                  <Link
                    href={item.href}
                    // *** เพิ่ม text-slate-700 หรือสีเข้มอื่นๆ ตรงนี้ ***
                    className="block text-slate-700 hover:text-indigo-600 transition-colors py-2" // <--- เพิ่มสีตรงนี้ และอาจจะเพิ่ม padding y
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </header>
  );
}