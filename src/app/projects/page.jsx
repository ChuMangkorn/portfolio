// app/projects/page.jsx
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
    imageUrl: "/project-ecommerce.jpg", // Ensure this image exists in /public/images/
    tags: ["Next.js", "NestJS", "Tailwind CSS","React"]
  },
  {
    title: "Pokemon Search App with Next.js & Tailwind CSS",
    description: "Next.js Frontend Basics with REST APIs.",
    imageUrl: "/pokemonproject.png", // Ensure this image exists in /public/images/
    tags: ["Next.js", "JavaScript","Tailwind CSS", "React"],
    liveUrl: "https://nextjs-tailwindcss-eight.vercel.app", // Replace with actual link or remove if none
    repoUrl: "https://github.com/ChuMangkorn/nextjs-tailwindcss" // Replace with actual link or remove if none
  },
  {
    title: "Portfolio Website",
    description: "My personal portfolio website built using Next.js App Router and modern design principles.",
    imageUrl: "/portfolio.png", // Ensure this image exists in /public/images/
    tags: ["Next.js", "App Router", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://portfolio-omega-livid-27.vercel.app/", // Replace with actual link
    repoUrl: "https://github.com/ChuMangkorn/portfolio" // Replace with actual link
  },
  {
    title: "Educational Agency Website Ichiban Japan (2013)",
    description: "Informational site for Japanese language studies and study abroad programs in Japan.",
    imageUrl: "/ichiban.png", // Ensure this image exists in /public/images/
    tags: ["WordPress", "PHP", "MySQL", "Bootstrap","jQuery"]
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
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">My Projects</h1>
      <p className="text-lg text-slate-400 mb-10 text-center max-w-xl mx-auto">
        Here are some of the projects I've worked on. Take a look!
      </p>

      {/* Grid Container with Stagger Animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" // Responsive grid layout
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {projectsData.map((project, index) => (
          // Project Card with Animation and Hover Effect
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.03]" // Card styling
            variants={cardVariants}
          >
            {/* Project Image Container */}
            <div className="relative w-full aspect-video bg-slate-100"> {/* Container ควรมี position: relative และ ขนาด/สัดส่วน */}
              <Image
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                fill // ใช้ fill เพื่อให้ภาพเต็ม container
                // ----- ตรวจสอบบรรทัดนี้ -----
                className="object-obtain" // *** object-cover (เต็มกรอบ แต่รูปถูกตัด) กับ object-contain (เห็นรูปครบ แต่มีขอบว่าง) ***
                // ---------------------------
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow"> {/* Padding and flex-grow */}
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{project.title}</h3>
              <p className="text-sm text-slate-600 mb-4 flex-grow">{project.description}</p> {/* flex-grow pushes tags/links down */}

              {/* Technology Tags */}
              <div className="mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block bg-slate-100 text-slate-700 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex justify-end space-x-3 mt-auto pt-4 border-t border-slate-100"> {/* Pushes links to bottom */}
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                        title="View Live Demo">
                    <FiExternalLink className="w-4 h-4 mr-1" />
                    Live Demo
                  </Link>
                )}
                {project.repoUrl && (
                  <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
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