import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// --- ตรวจสอบให้แน่ใจว่าไฟล์ .env.local มีบรรทัดนี้: ---
// --- GOOGLE_API_KEY=AIzaSyB6fsCDj152WUWopdaGuGnGo85pz4QUf5o ---
// --- (แทนที่ด้วย API Key จริงๆ ของคุณ) ---

const apiKey = process.env.GOOGLE_API_KEY; // <--- 1. อ่านค่าจาก GOOGLE_API_KEY

if (!apiKey) {
  // ถ้าไม่พบ API Key ให้ Log Error และคืนค่า Error Response ทันที
  console.error("Missing GOOGLE_API_KEY in .env.local");
  return NextResponse.json({ reply: 'Configuration error: Missing API Key' }, { status: 500 });
}

const genAI = new GoogleGenerativeAI(apiKey); // <--- 2. ใช้ตัวแปร apiKey ที่อ่านมา

// ... (ส่วนที่เหลือของ portfolioContext และฟังก์ชัน POST เหมือนเดิม) ...

const portfolioContext = `
คุณคือผู้ช่วย AI ของ Chulaprungrueang Mangkorn (มังกร ชูลาภรุ่งเรือง) ทำหน้าที่ตอบคำถามเกี่ยวกับ Portfolio นี้
ข้อมูลของ Chulaprungrueang Mangkorn:
- ทักษะเด่น: JavaScript (Advanced), React (Advanced), Next.js (Intermediate), Tailwind CSS (Advanced), Node.js (Intermediate), Git (Advanced), TypeScript (Intermediate).
- ทักษะภาษา: ญี่ปุ่น (JLPT N3), อังกฤษ (Intermediate), ไทย (Native).
- โปรเจกต์ที่น่าสนใจ:
    - E-commerce Platform: ระบบส่งงานวิจัย มีแชท Socket.IO และแจ้งเตือนผ่าน Line Notify
    - Pokemon Search App: ใช้ Next.js และ Tailwind CSS ดึงข้อมูลจาก REST API
    - Portfolio Website (เว็บนี้): ใช้ Next.js App Router, Tailwind CSS, Framer Motion
    - โปรเจกต์เก่าๆ: เว็บเอเจนซี่เรียนต่อญี่ปุ่น (WordPress), ระบบรับประกันคุณภาพสินค้า (PHP), ระบบจัดการทัวร์ (PHP).
- การศึกษา: ป.ตรี CIS ที่ มทร.ล้านนา, ปวช. คอมพิวเตอร์ธุรกิจ ที่ พาณิชย์ลานนา.
- เกี่ยวกับฉัน: มุ่งมั่นเรียนรู้, กำลังเรียนต่อที่ญี่ปุ่น, ฝึกเขียนโค้ดเสมอ.
- การติดต่อ: Email (chu.mangkorn@gmail.com), LinkedIn, Indeed, GitHub.

คำแนะนำในการตอบ:
- ตอบคำถามโดยอ้างอิงจากข้อมูลที่ให้มาเท่านั้น
- ถ้าไม่ทราบข้อมูล ให้ตอบว่า "ขออภัยค่ะ ฉันไม่มีข้อมูลในส่วนนี้" หรือ "เรื่องนี้คงต้องสอบถามคุณ Chulaprungrueang โดยตรงค่ะ"
- ตอบอย่างสุภาพ เป็นมิตร และกระชับ
- พยายามชี้นำให้ผู้ใช้ดูรายละเอียดเพิ่มเติมในหน้าต่างๆ ของเว็บ
- ตอบเป็นภาษาไทยเป็นหลัก แต่ถ้าผู้ใช้ถามภาษาอื่น ให้ตอบเป็นภาษานั้น
`;

export async function POST(request) {
  if (!apiKey) { // ตรวจสอบอีกครั้งเผื่อกรณี Server รีสตาร์ทแล้ว .env ไม่ถูกโหลด
    return NextResponse.json({ reply: 'Configuration error: API Key not available at request time' }, { status: 500 });
  }
  try {
    const { messages } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const promptParts = [portfolioContext];
    messages.slice(1).forEach(msg => {
        promptParts.push(`${msg.from === 'bot' ? 'AI' : 'User'}: ${msg.text}`);
    });
    const lastUserMessage = messages[messages.length - 1].text;
    promptParts.push(`User: ${lastUserMessage}`);
    promptParts.push(`AI:`);

    const result = await model.generateContent(promptParts.join('\n'));
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Error in AI Chat API:", error); // นี่คือจุดที่ควรจะมี Log Error ใน Terminal ของคุณ
    // ลองดูว่า error object ที่นี่บอกอะไรเพิ่มเติม
    let errorMessage = 'เกิดข้อผิดพลาดในการติดต่อ AI ค่ะ โปรดลองอีกครั้ง';
    if (error.message && error.message.includes('API key not valid')) {
        errorMessage = 'API Key ไม่ถูกต้อง โปรดตรวจสอบการตั้งค่าค่ะ';
    } else if (error.message) {
        // อาจจะแสดง error.message บางส่วนถ้าไม่ละเอียดอ่อนเกินไป
        // แต่ระวังอย่าให้ข้อมูลสำคัญรั่วไหลไป Client
    }
    return NextResponse.json({ reply: errorMessage }, { status: 500 });
  }
}