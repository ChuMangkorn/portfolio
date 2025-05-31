// src/app/components/Header.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/skills', label: 'Skills' },
    { href: '/education', label: 'Education' },
    { href: '/contact', label: 'Contact' },
  ];
  
  return (
    <header className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center h-16 px-6">
        <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
          MyPortfolio
        </Link>
{/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-5"> 
          <ul className="flex space-x-5 text-sm font-medium text-slate-700 dark:text-slate-300">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeSwitcher /> 
        </div>
        {/* Mobile Menu Button and ThemeSwitcher */}
        <div className="md:hidden flex items-center space-x-2"> 
          <ThemeSwitcher /> 
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="text-slate-700 dark:text-slate-300 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-800 shadow-md z-40">
          <ul className="flex flex-col items-center py-4">
            {menuItems.map((item) => (
              <li key={item.href} className="w-full text-center py-1">
                <Link
                  href={item.href}
                  className="block text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
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