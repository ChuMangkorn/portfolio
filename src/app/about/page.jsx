import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">About Me</h1> {/* */}

      <div className="mb-10 flex justify-center">
        <Image
          src="/profile.jpg"
          alt="Your Name - Profile Picture"
          width={160}
          height={160}
          className="rounded-full object-cover shadow-lg border-4 border-white dark:border-slate-700" //
          priority
        />
      </div>

      <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed"> {/* */}
        <p>
          Hello! I am committed to continuous learning, currently undertaking further studies in Japan and consistently practicing coding to refine my abilities. I possess JLPT N3 Japanese proficiency and functional English skills. I am enthusiastic about applying my skills to real-world challenges and contributing to a forward-thinking company.
        </p>
        {/* หากมี Paragraph อื่นๆ ก็จะได้รับผลจาก text-slate-700 dark:text-slate-300 โดยอัตโนมัติ */}
      </div>
    </div>
  );
}