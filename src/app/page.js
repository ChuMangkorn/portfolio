// app/page.jsx
'use client'; // *** Mark component as Client Component ***

import Link from 'next/link';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation'; // Import TypeAnimation

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[60vh] gap-8 md:gap-12">
      {/* Image Column */}
      <div className="flex-shrink-0">
        <Image
          src="/profile.jpg"
          alt="Your Name"
          width={180}
          height={180}
          className="rounded-full object-cover shadow-xl border-4 border-white"
          priority
        />
      </div>

      {/* Text Column */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
          Hi, I'm [Your Name]
        </h1>
        {/* Replace static text with TypeAnimation */}
        <TypeAnimation
          sequence={[
            // Same String at the start will only be typed once, initially
            'I build modern web apps.',
            1500, // wait 1.5s
            'I love Frontend Development.',
            1500,
            'I focus on UI/UX.',
            1500,
            'Let\'s create something amazing.',
            1500,
          ]}
          wrapper="p" // Use a 'p' tag for the text
          speed={50} // Typing speed
          className="text-lg md:text-xl text-slate-600 mb-6 max-w-xl" // Apply styling
          repeat={Infinity} // Repeat animation infinitely
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg hover:scale-105 transform text-center">
              Contact Me
          </Link>
           {/* Optional button */}
        </div>
      </div>
    </div>
  );
}