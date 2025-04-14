'use client'; 

export default function ContactPage() {
  // ... (rest of the component)

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* ... (h1 and p tags) */}
      <div className="space-y-6">
        {/* Email */}
        <a
          href="mailto:chu.mangkorn@gmail.com"
          className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto hover:scale-105 transform" // Added transform effects
        >
          {/* <FiMail className="w-5 h-5" /> */}
          <span>Send me an Email</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/chulaprungrueang-mangkorn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto ml-0 md:ml-4 mt-4 md:mt-0 hover:scale-105 transform" // Added transform effects
        >
          {/* <FiLinkedin className="w-5 h-5" /> */}
          <span>Connect on LinkedIn</span>
        </a>

        {/* Indeed */}
        <a
          href="https://profile.indeed.com/p/mangkornc-sykyjft"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto ml-0 md:ml-4 mt-4 md:mt-0 hover:scale-105 transform" // Added transform effects
        >
          {/* <Fiindeed className="w-5 h-5" /> */}
          <span>Connect on indeed</span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/ChuMangkorn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto ml-0 md:ml-4 mt-4 md:mt-0 hover:scale-105 transform" // Added transform effects
        >
          {/* <FiGithub className="w-5 h-5" /> */}
          <span>View my GitHub</span>
        </a>
      </div>
    </div>
  );
}