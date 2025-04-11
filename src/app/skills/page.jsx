// app/skills/page.jsx
'use client'; // *** Mark component as Client Component for Framer Motion ***

import { motion } from 'framer-motion'; // Import motion

export default function SkillsPage() {
  // Keep skillsList as before
  const skillsList = [
    { name: 'JavaScript (ES6+)', level: 'Advanced' },
    { name: 'React', level: 'Advanced' },
    { name: 'Next.js (App Router)', level: 'Intermediate' },
    { name: 'Tailwind CSS', level: 'Advanced' },
    { name: 'HTML5 & CSS3', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Git & GitHub', level: 'Advanced' },
    { name: 'UI/UX Design', level: 'Basic' },
  ];

  // Animation Variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 }, // Start hidden and slightly down
    visible: {
      opacity: 1, y: 0,   // Fade in and slide up
      transition: { duration: 0.5 }
    }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">My Technical Skills</h1>
      <p className="text-lg text-slate-400 mb-10 text-center max-w-xl mx-auto">
        Here's a list of technologies and tools I'm proficient with.
      </p>
      {/* Use motion.div for the grid container to stagger children */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible" // Or use whileInView on individual cards if preferred
        variants={{
          visible: { transition: { staggerChildren: 0.1 } } // Stagger animation
        }}
      >
        {skillsList.map((skill, index) => (
          // Wrap each card with motion.div
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-slate-100 transition-all duration-300 hover:scale-105" // Added hover:scale-105
            variants={cardVariants}
            // Add whileInView if not using staggerChildren on parent:
            // initial="hidden"
            // whileInView="visible"
            // viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% visible
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">{skill.name}</h3>
            <p className="text-sm text-slate-500">{skill.level}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}