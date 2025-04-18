'use client';

import { motion } from 'framer-motion';
// --- Import Icons ---
import { SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiGit, SiTypescript } from "react-icons/si";
import { FiCode, FiPenTool } from "react-icons/fi";
import * as React from 'react'; // Import React for Factory
import FlagIconFactory from 'react-flag-icon-css'; // (อย่าลืม Import CSS ธงชาติ ใน layout.jsx ) ---// import 'flag-icon-css/css/flag-icons.min.css';

// --- สร้าง FlagIcon component ---
const FlagIcon = FlagIconFactory(React, { useCssModules: false });

// --- 1. ย้าย Data Definitions ออกมานอก Component หลัก ---
const technicalSkillsData = [
  { name: 'JavaScript (ES6+)', level: 'Advanced', icon: <SiJavascript size={24} className="text-yellow-400" /> },
  { name: 'React', level: 'Advanced', icon: <SiReact size={24} className="text-sky-500" /> },
  { name: 'Next.js (App Router)', level: 'Intermediate', icon: <SiNextdotjs size={24} className="text-black" /> },
  { name: 'Tailwind CSS', level: 'Advanced', icon: <SiTailwindcss size={24} className="text-teal-500" /> },
  { name: 'HTML5 & CSS3', level: 'Advanced', icon: <FiCode size={24} className="text-orange-500" /> },
  { name: 'Node.js', level: 'Intermediate', icon: <SiNodedotjs size={24} className="text-green-600" /> },
  { name: 'Git & GitHub', level: 'Advanced', icon: <SiGit size={24} className="text-red-600" /> },
  { name: 'UI/UX Design', level: 'Basic', icon: <FiPenTool size={24} className="text-purple-500" /> },
  { name: 'TypeScript', level: 'Intermediate', icon: <SiTypescript size={24} className="text-blue-600" /> },
];

const languageSkillsData = [
  { name: 'Japanese', level: 'JLPT N3 Certified', icon: <FlagIcon code="jp" title="Japanese" className="!w-6 !h-auto shadow-sm" /> },
  { name: 'English', level: 'Intermediate', icon: <FlagIcon code="gb" title="English" className="!w-6 !h-auto shadow-sm" /> },
  { name: 'Thai', level: 'Native Speaker', icon: <FlagIcon code="th" title="Thai" className="!w-6 !h-auto shadow-sm" /> },
];

// --- Animation Variants (ไว้ข้างนอกได้) ---
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};


// --- 2. สร้าง Component สำหรับ Technical Skill Card ---
function TechnicalSkillCard({ skill, variants }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-slate-100 transition-all duration-300 hover:scale-105 flex flex-col"
      variants={variants} // รับ variants มาจาก props
    >
      <div className="flex items-center mb-3">
        {skill.icon && <span className="mr-3 flex-shrink-0">{skill.icon}</span>}
        <h3 className="text-lg font-semibold text-indigo-700 leading-tight">{skill.name}</h3>
      </div>
      <p className="text-sm text-slate-500 mt-auto">{skill.level}</p>
    </motion.div>
  );
}

// --- 3. สร้าง Component สำหรับ Language Skill Card ---
function LanguageSkillCard({ skill, variants }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-slate-100 transition-all duration-300 hover:scale-105 flex flex-col"
      variants={variants} // รับ variants มาจาก props
    >
      <div className="flex items-center mb-3">
        {skill.icon && <span className="mr-3 flex-shrink-0 inline-block leading-none">{skill.icon}</span>}
        <h3 className="text-lg font-semibold text-sky-700 leading-tight">{skill.name}</h3>
      </div>
      <p className="text-sm text-slate-500 mt-auto">{skill.level}</p>
    </motion.div>
  );
}


// --- 4. Component หลัก (SkillsPage) จะกระชับขึ้นมาก ---
export default function SkillsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">My Skills</h1>
      <p className="text-lg text-slate-600 mb-10 text-center max-w-xl mx-auto">
        A combination of technical skills and language proficiency.
      </p>

      {/* --- Technical Skills Section --- */}
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">Technical Skills</h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {/* ใช้ Component ย่อยแทนการเขียน JSX ยาวๆ */}
        {technicalSkillsData.map((skill, index) => (
          <TechnicalSkillCard key={index} skill={skill} variants={cardVariants} />
        ))}
      </motion.div>

      {/* --- Language Skills Section --- */}
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">Language Skills</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* ใช้ Component ย่อยแทนการเขียน JSX ยาวๆ */}
        {languageSkillsData.map((skill, index) => (
          <LanguageSkillCard key={index} skill={skill} variants={cardVariants} />
        ))}
      </motion.div>
    </div>
  );
}