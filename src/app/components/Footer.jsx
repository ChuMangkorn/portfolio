// src/app/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 text-center text-sm text-slate-500 dark:text-slate-400"> {/* */}
      <p>© {new Date().getFullYear()} Chulaprungrueang Mangkorn. All rights reserved.</p>
    </footer>
  );
}