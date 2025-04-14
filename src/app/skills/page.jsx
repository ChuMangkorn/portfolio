// app/skills/page.jsx
'use client';

import { motion } from 'framer-motion';
// ถ้าต้องการไอคอนภาษา: npm install react-icons
// import { FaLanguage } from 'react-icons/fa';

export default function SkillsPage() {
  // แยก Technical Skills ออกมา
  const technicalSkills = [
    { name: 'JavaScript (ES6+)', level: 'Advanced' },
    { name: 'React', level: 'Advanced' },
    { name: 'Next.js (App Router)', level: 'Intermediate' },
    { name: 'Tailwind CSS', level: 'Advanced' },
    { name: 'HTML5 & CSS3', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Git & GitHub', level: 'Advanced' },
    { name: 'UI/UX Design', level: 'Basic' },
  ];
  const languageSkills = [
    { name: 'Japanese', level: 'JLPT N3 Certified' },
    { name: 'English', level: 'Intermediate' },
    { name: 'Thai', level: 'Native Speaker' },
  ];
  

  // Animation Variants (เหมือนเดิม)
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">My Skills</h1>
      <p className="text-lg text-slate-600 mb-10 text-center max-w-xl mx-auto">
        A combination of technical skills and language proficiency.
      </p>

      {/* --- Technical Skills Section --- */}
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">Technical Skills</h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12" // เพิ่มระยะห่างด้านล่าง
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {technicalSkills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-slate-100 transition-all duration-300 hover:scale-105"
            variants={cardVariants}
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">{skill.name}</h3>
            <p className="text-sm text-slate-500">{skill.level}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* --- Language Skills Section --- */}
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">Language Skills</h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12" // เพิ่มระยะห่างด้านล่าง
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {languageSkills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-slate-100 transition-all duration-300 hover:scale-105"
            variants={cardVariants}
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">{skill.name}</h3>
            <p className="text-sm text-slate-500">{skill.level}</p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}