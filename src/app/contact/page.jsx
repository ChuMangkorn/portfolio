// app/contact/page.jsx
'use client';

// 1. แก้ไข Import Icons
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import { SiIndeed } from 'react-icons/si'; // <--- แก้ไขตรงนี้: Import SiIndeed จาก si

export default function ContactPage() {

  return (
    <div className="max-w-xl mx-auto text-center py-10 md:py-16">

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Get In Touch
      </h1>
      <p className="text-lg text-slate-600 mb-8 px-4">
        I'm always open to discussing new projects, creative ideas, or job opportunities. Feel free to reach out through your preferred channel below!
      </p>

      <hr className="max-w-xs mx-auto mb-10 border-slate-200" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">

        {/* Email Button with Icon */}
        <a
          href="mailto:chu.mangkorn@gmail.com"
          className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 transform"
        >
          <FiMail className="w-5 h-5" />
          <span>Send me an Email</span>
        </a>

        {/* LinkedIn Button with Icon */}
        <a
          href="https://www.linkedin.com/in/chulaprungrueang-mangkorn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 transform"
        >
          <FiLinkedin className="w-5 h-5" />
          <span>Connect on LinkedIn</span>
        </a>

        {/* Indeed Button with Icon */}
        <a
          href="https://profile.indeed.com/p/mangkornc-sykyjft"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 transform"
        >
          {/* --- 2. แก้ไขการเรียกใช้ไอคอน --- */}
          <SiIndeed className="w-5 h-5" /> {/* <--- แก้ไขตรงนี้: ใช้ SiIndeed */}
          <span>Connect on indeed</span>
        </a>

        {/* GitHub Button with Icon */}
        <a
          href="https://github.com/ChuMangkorn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 transform"
        >
          <FiGithub className="w-5 h-5" />
          <span>View my GitHub</span>
        </a>

      </div>
    </div>
  );
}