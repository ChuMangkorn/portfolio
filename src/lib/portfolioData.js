
// ข้อมูลจาก src/app/about/page.jsx
const aboutMe = `
Hello! I am committed to continuous learning, currently undertaking further studies in Japan and consistently practicing coding to refine my abilities.
I possess JLPT N3 Japanese proficiency and functional English skills.
I am enthusiastic about applying my skills to real-world challenges and contributing to a forward-thinking company.
My full name is Chulaprungrueang Mangkorn.
You can contact me via email at chu.mangkorn@gmail.com.
`; //

// ข้อมูลจาก src/app/skills/page.jsx
const technicalSkills = [
  { name: 'JavaScript (ES6+)', level: 'Advanced', details: 'Experienced with modern JavaScript features, asynchronous programming, and DOM manipulation.' }, //
  { name: 'React', level: 'Advanced', details: 'Proficient in building complex UIs, managing state (useState, useContext, Redux/Zustand if applicable), and working with React Hooks.' }, //
  { name: 'Next.js (App Router)', level: 'Intermediate', details: 'Building server-side rendered and static websites, familiar with App Router, API routes, and Next.js specific features.' }, //
  { name: 'Tailwind CSS', level: 'Advanced', details: 'Skilled in utility-first CSS for rapid UI development and creating responsive designs.' }, //
  { name: 'HTML5 & CSS3', level: 'Advanced', details: 'Strong foundation in semantic HTML and modern CSS features like Flexbox and Grid.' }, //
  { name: 'Node.js', level: 'Intermediate', details: 'Experience in building backend APIs and working with the Node.js runtime environment.' }, //
  { name: 'Git & GitHub', level: 'Advanced', details: 'Proficient with version control using Git and collaborating through GitHub.' }, //
  { name: 'UI/UX Design', level: 'Basic', details: 'Basic understanding of UI/UX principles, with a focus on creating user-friendly interfaces.' }, //
  { name: 'TypeScript', level: 'Intermediate', details: 'Using TypeScript for type safety and building more robust applications.' }, //
];

const languageSkills = [
  { name: 'Japanese', level: 'JLPT N3 Certified', details: 'Certified at JLPT N3 level, capable of understanding Japanese used in everyday situations to a certain degree.' }, //
  { name: 'English', level: 'Intermediate', details: 'Functional English skills for communication and technical understanding.' }, //
  { name: 'Thai', level: 'Native Speaker', details: 'Native Thai speaker.' }, //
];

// ข้อมูลจาก src/app/projects/page.jsx
const projects = [
  {
    title: "E-commerce Platform", //
    description: "A research project submission system featuring real-time chat via Socket.IO and notifications through email and Line Notify. Key technologies included Next.js for the frontend and NestJS for the backend, with Tailwind CSS for styling.", //
    tags: ["Next.js", "NestJS", "Tailwind CSS","React"], //
    // เพิ่ม details, challenges, learnings ถ้ามี
  },
  {
    title: "Pokemon Search App with Next.js & Tailwind CSS", //
    description: "A project focused on Next.js Frontend Basics with REST APIs. Users can search for Pokemon and view details. Built with Next.js, JavaScript, and Tailwind CSS.", //
    tags: ["Next.js", "JavaScript","Tailwind CSS", "React"], //
    liveUrl: "https://nextjs-tailwindcss-eight.vercel.app", //
    repoUrl: "https://github.com/ChuMangkorn/nextjs-tailwindcss" //
  },
  {
    title: "Portfolio Website", //
    description: "My personal portfolio website (this website) built using Next.js App Router and modern design principles, featuring Framer Motion for animations and Tailwind CSS for styling.", //
    tags: ["Next.js", "App Router", "Tailwind CSS", "Framer Motion"], //
    liveUrl: "https://portfolio-omega-livid-27.vercel.app/", //
    repoUrl: "https://github.com/ChuMangkorn/portfolio" //
  },
  // ... (เพิ่มรายละเอียดโปรเจกต์อื่นๆ ให้ครบถ้วน) ...
  {
    title: "Educational Agency Website Ichiban Japan (2013)", //
    description: "An informational site for Japanese language studies and study abroad programs in Japan. Developed using WordPress, PHP, MySQL, Bootstrap, and jQuery.", //
    tags: ["WordPress", "PHP", "MySQL", "Bootstrap","jQuery"] //
  },
  {
    title: "Insurance Policy & Claims Management System (2018)", //
    description: "An integrated system designed to manage insurance operations efficiently. Built with PHP, Javascript, MySQL, Bootstrap, and jQuery.", //
    tags: ["PHP", "Javascript", "MySQL", "Bootstrap","jQuery"] //
  },
  {
    title: "Tour Agency Management System (2019)", //
    description: "A web application for K.Star Travel tour agency, featuring customer booking functions and an admin management panel. Technologies used include PHP, Javascript, MySQL, Bootstrap, and jQuery.", //
    tags: ["PHP", "Javascript", "MySQL", "Bootstrap","jQuery"] //
  }
];

// ข้อมูลจาก src/app/education/page.jsx
const education = [
  { institution: 'RAJAMANGALA UNIVERSITY OF TECHNOLOGY LANNA', degree: "Bachelor's degree", years: '2015 - 2020', description: 'Computer Information Systems (CIS)' }, //
  { institution: 'Lanna Commercial Technological College', degree: 'Vocational Certificate', years: '2013 - 2015', description: 'Computer Business' }, //
  { institution: 'Futureskill Course Platform', degree: 'Next.js Basics for Web Application Developers Certificate', years: '2025', description: 'Creating a Full-Stack Project using Next.js' }, //
  { institution: 'Futureskill Course Platform', degree: 'Pokemon Search App with Next.js & Tailwind CSS Certificate', years: '2025', description: 'Next.js Frontend Basics with REST APIs' }, //
];

const contactInfo = {
    email: "chu.mangkorn@gmail.com", //
    linkedin: "https://www.linkedin.com/in/chulaprungrueang-mangkorn", //
    indeed: "https://profile.indeed.com/p/mangkornc-sykyjft", //
    github: "https://github.com/ChuMangkorn" //
};

// --- Function to generate the full context string for AI ---
export function getFullPortfolioContext() {
  let context = `คุณคือผู้ช่วย AI ของ Chulaprungrueang Mangkorn (มังกร ชูลาภรุ่งเรือง) ทำหน้าที่ตอบคำถามเกี่ยวกับ Portfolio นี้อย่างสุภาพ เป็นมิตร และกระชับ และตอบเป็นภาษาตามที่พิมพ์​มา.\n\n`;

  context += `**เกี่ยวกับ Chulaprungrueang Mangkorn:**\n${aboutMe}\n\n`;

  context += "**ทักษะทางเทคนิค:**\n";
  technicalSkills.forEach(skill => {
    context += `- ${skill.name} (ระดับ: ${skill.level}): ${skill.details || ''}\n`;
  });
  context += "\n";

  context += "**ทักษะทางภาษา:**\n";
  languageSkills.forEach(skill => {
    context += `- ${skill.name} (ระดับ: ${skill.level}): ${skill.details || ''}\n`;
  });
  context += "\n";

  context += "**โปรเจกต์ที่น่าสนใจ:**\n";
  projects.forEach(project => {
    context += `- **${project.title}**: ${project.description}\n`;
    if (project.tags && project.tags.length > 0) {
        context += `  - เทคโนโลยี: ${project.tags.join(', ')}\n`;
    }
    if (project.liveUrl) context += `  - Live Demo: ${project.liveUrl}\n`;
    if (project.repoUrl) context += `  - Source Code: ${project.repoUrl}\n`;
  });
  context += "\n";

  context += "**ประวัติการศึกษาและใบรับรอง:**\n";
  education.forEach(edu => {
    context += `- ${edu.institution} - <span class="math-inline">\{edu\.degree\} \(</span>{edu.years}): ${edu.description}\n`;
  });
  context += "\n";

  context += "**ช่องทางการติดต่อ:**\n";
  context += `- Email: ${contactInfo.email}\n`;
  context += `- LinkedIn: ${contactInfo.linkedin}\n`;
  context += `- Indeed: ${contactInfo.indeed}\n`;
  context += `- GitHub: ${contactInfo.github}\n\n`;

  context += `คำแนะนำในการตอบ:\n`;
  context += `- ตอบคำถามโดยอ้างอิงจากข้อมูลที่ให้มาเท่านั้น\n`;
  context += `- ถ้าไม่ทราบข้อมูล ให้ตอบว่า "ขออภัยค่ะ ฉันไม่มีข้อมูลในส่วนนี้" หรือ "เรื่องนี้คงต้องสอบถามคุณ Chulaprungrueang โดยตรงค่ะ"\n`;
  context += `- พยายามชี้นำให้ผู้ใช้ดูรายละเอียดเพิ่มเติมในหน้าต่างๆ ของเว็บ ถ้าเกี่ยวข้อง\n`;

  return context;
}