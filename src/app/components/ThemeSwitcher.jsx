// src/components/ThemeSwitcher.jsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme, themes } = useTheme(); 

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 w-9 h-9" aria-hidden="true" />;
  }

  const currentActiveTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      onClick={() => {
        setTheme(currentActiveTheme === 'dark' ? 'light' : 'dark');
      }}
    >
      {currentActiveTheme === 'dark' ? (
        <FiSun className="h-5 w-5 text-orange-300" />
      ) : (
        <FiMoon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
      )}
    </button>
  );
}