'use client'; 

import { motion } from 'framer-motion'; // Import motion

export default function EducationPage() {
  // Keep educationList as before
  const educationList = [
    { institution: 'RAJAMANGALA UNIVERSITY OF TECHNOLOGY LANNA', degree: "Bachelor's degree", years: '2015 - 2020', description: 'Computer Information Systems (CIS)' },
    { institution: 'Lanna Commercial Technological College', degree: 'Vocational Certificate', years: '2013 - 2015', description: 'Computer Business' },
    { institution: 'Futureskill Course Platform', degree: 'Next.js Basics for Web Application Developers Certificate', years: '2025', description: 'Creating a Full-Stack Project using Next.js' },
    { institution: 'Futureskill Course Platform', degree: 'Pokemon Search App with Next.js & Tailwind CSS Certificate', years: '2025', description: 'Next.js Frontend Basics with REST APIs' },
  ];

  // Re-use or define cardVariants (can be moved to a separate file)
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Education & Learning</h1>
      <p className="text-lg text-slate-400 mb-10 text-center max-w-xl mx-auto">
        My academic background and relevant certifications.
      </p>
      {/* Use motion.div for the container to stagger children */}
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } } // Stagger animation slightly slower
        }}
      >
        {educationList.map((edu, index) => (
           // Wrap each card with motion.div
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-slate-100 transition-all duration-300 hover:scale-105" // Added hover:scale-105
            variants={cardVariants}
             // Add whileInView if needed (alternative to stagger)
            // initial="hidden"
            // whileInView="visible"
            // viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-1">{edu.institution}</h2>
            <p className="text-md font-medium text-slate-800 mb-1">{edu.degree}</p>
            <p className="text-sm text-slate-500 mb-3">{edu.years}</p>
            <p className="text-sm text-slate-600">{edu.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}