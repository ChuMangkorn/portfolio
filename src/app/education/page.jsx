// src/app/education/page.jsx
'use client';

import { motion } from 'framer-motion';
// ถ้ามีการ import ข้อมูลจาก portfolioData.js ให้คงไว้อย่างนั้น
// import { education as educationList } from '@/lib/portfolioData'; // สมมติว่ามีการ import

export default function EducationPage() {
  // ถ้าใช้ข้อมูลที่ hardcode ไว้ในหน้า ก็ใช้ตามเดิม
  // หรือถ้า import มา ก็ใช้ตัวแปรที่ import มา
  const educationList = [ //
    { institution: 'RAJAMANGALA UNIVERSITY OF TECHNOLOGY LANNA', degree: "Bachelor's degree", years: '2015 - 2020', description: 'Computer Information Systems (CIS)' },
    { institution: 'Lanna Commercial Technological College', degree: 'Vocational Certificate', years: '2013 - 2015', description: 'Computer Business' },
    { institution: 'Futureskill Course Platform', degree: 'Next.js Basics for Web Application Developers Certificate', years: '2025', description: 'Creating a Full-Stack Project using Next.js' },
    { institution: 'Futureskill Course Platform', degree: 'Pokemon Search App with Next.js & Tailwind CSS Certificate', years: '2025', description: 'Next.js Frontend Basics with REST APIs' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-slate-800 dark:text-slate-100">Education & Learning</h1> {/* */}
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 text-center max-w-xl mx-auto"> {/* */}
        My academic background and relevant certifications.
      </p>
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        {educationList.map((edu, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:scale-105" //
            variants={cardVariants}
          >
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-1">{edu.institution}</h2> {/* */}
            <p className="text-md font-medium text-slate-800 dark:text-slate-200 mb-1">{edu.degree}</p> {/* */}
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{edu.years}</p> {/* */}
            <p className="text-sm text-slate-600 dark:text-slate-300">{edu.description}</p> {/* */}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}