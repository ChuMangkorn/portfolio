// app/about/page.jsx
import Image from 'next/image'; // *** 1. Import Image component ***

export const metadata = {
  title: 'About Me | My Modern Portfolio',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h1> {/* Increased bottom margin */}

      {/* *** 2. Add Image component here *** */}
      <div className="mb-10 flex justify-center"> {/* Centering the image */}
        <Image
          src="/profile.jpg" // *** Path relative to the 'public' folder ***
          alt="Your Name - Profile Picture"
          width={160} // *** Intrinsic width of the image (or desired base size) ***
          height={160} // *** Intrinsic height of the image (or desired base size) ***
          className="rounded-full object-cover shadow-lg border-4 border-white" // Styling: circle, cover, shadow, white border
          priority // Optional: Add priority=true if the image is above the fold to load it faster
        />
      </div>

      <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
        <p>
          Hello! I am committed to continuous learning, currently undertaking further studies in Japan and consistently practicing coding to refine my abilities. I possess JLPT N3 Japanese proficiency and functional English skills. I am enthusiastic about applying my skills to real-world challenges and contributing to a forward-thinking company.
        </p>
        {/* ... rest of your paragraphs ... */}
      </div>
    </div>
  );
}