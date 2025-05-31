// src/app/page.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[60vh] gap-8 md:gap-12">
      <div className="flex-shrink-0">
        <Image
          src="/profile.jpg"
          alt="Your Name"
          width={180}
          height={180}
          className="rounded-full object-cover shadow-xl border-4 border-white dark:border-slate-700" //
          priority
        />
      </div>

      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight text-slate-800 dark:text-slate-100"> {/* */}
          Hi, I&apos;m Chulaprungrueang Mangkorn
        </h1>
        <TypeAnimation
          sequence={[
            'I build modern web apps.',
            1500,
            'I love Frontend Development.',
            1500,
            'I focus on UI/UX.',
            1500,
            'Let\'s create something amazing.',
            1500,
          ]}
          wrapper="p"
          speed={50}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-6 max-w-xl" //
          repeat={Infinity}
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            href="/contact"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg hover:scale-105 transform text-center
                       dark:bg-indigo-500 dark:hover:bg-indigo-600" //
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}