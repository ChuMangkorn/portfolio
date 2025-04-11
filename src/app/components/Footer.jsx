// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-6 text-center text-sm text-slate-500"> {/* Lighter bg, top border */}
      <p>© {new Date().getFullYear()} Chulaprungrueang Mangkorn. All rights reserved.</p>
    </footer>
  );
}