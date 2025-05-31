'use client'; // Needed for Framer Motion

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi'; // Import icons

// --- Project Data (Replace with your actual project data) ---
const projectsData = [
  {
    title: "E-commerce Platform",
    description: "A research project submission system featuring real-time chat via Socket.IO and notifications through email and Line Notify.",
    imageUrl: "/project-ecommerce.jpg", 
    tags: ["Next.js", "NestJS", "Tailwind CSS","React"]
  },
  {
    title: "Pokemon Search App with Next.js & Tailwind CSS",
    description: "Next.js Frontend Basics with REST APIs.",
    imageUrl: "/pokemonproject.png", 
    tags: ["Next.js", "JavaScript","Tailwind CSS", "React"],
    liveUrl: "https://nextjs-tailwindcss-eight.vercel.app", 
    repoUrl: "https://github.com/ChuMangkorn/nextjs-tailwindcss" 
  },
  {
    title: "Portfolio Website",
    description: "My personal portfolio website built using Next.js App Router and modern design principles.",
    imageUrl: "/portfolio.png", 
    tags: ["Next.js", "App Router", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://portfolio-omega-livid-27.vercel.app/", 
    repoUrl: "https://github.com/ChuMangkorn/portfolio" 
  },
  {
    title: "Educational Agency Website Ichiban Japan (2013)",
    description: "Informational site for Japanese language studies and study abroad programs in Japan.",
    imageUrl: "/ichiban.png", 
    tags: ["WordPress", "PHP", "MySQL", "Bootstrap","jQuery"]
  },
  {
    title: "Insurance Policy & Claims Management System (2018)",
    description: "An integrated system designed to manage insurance operations efficiently.",
    imageUrl: "/g-pacv.png", 
    tags: ["PHP", "Javascript", "MySQL", "Bootstrap","jQuery"]
  },
  {
    title: "Tour Agency Management System (2019)",
    description: "Web app for K.Star Travel tour agency, featuring customer booking functions and an admin management panel. ",
    imageUrl: "/k-travel.png", 
    tags: ["PHP", "Javascript", "MySQL", "Bootstrap","jQuery"]
  },
  
];
// --- End of Project Data ---

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-slate-800 dark:text-slate-100">My Projects</h1> {/* เพิ่ม dark:text-slate-100 */}
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 text-center max-w-xl mx-auto"> {/* แก้ไข text-slate-400 เป็น text-slate-600 และเพิ่ม dark:text-slate-400 */}
        Here are some of the projects I've worked on. Take a look!
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl dark:border dark:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.03]" // เพิ่ม dark:bg-slate-800, dark:border, dark:border-slate-700
            variants={cardVariants}
          >
            <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-700"> {/* เพิ่ม dark:bg-slate-700 */}
              <Image
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                fill
                className="object-contain" // แก้จาก object-obtain เป็น object-contain (หรือ object-cover ตามต้องการ)
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">{project.title}</h3> {/* เพิ่ม dark:text-indigo-400 */}
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 flex-grow">{project.description}</p> {/* เพิ่ม dark:text-slate-300 */}

              <div className="mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full" // เพิ่ม dark:bg-slate-700, dark:text-slate-300
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-end space-x-3 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700"> {/* เพิ่ม dark:border-slate-700 */}
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors" // เพิ่ม dark:text-indigo-400, dark:hover:text-indigo-300
                        title="View Live Demo">
                    <FiExternalLink className="w-4 h-4 mr-1" />
                    Live Demo
                  </Link>
                )}
                {project.repoUrl && (
                  <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300 transition-colors" // เพิ่ม dark:text-slate-400, dark:hover:text-slate-300
                        title="View Source Code">
                    <FiGithub className="w-4 h-4 mr-1" />
                    Code
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}