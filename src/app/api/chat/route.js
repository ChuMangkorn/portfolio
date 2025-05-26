// src/app/api/chat/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import { getFullPortfolioContext } from '@/lib/portfolioData';

const apiKey = process.env.GOOGLE_API_KEY;
// ตรวจสอบว่า apiKey มีค่าอยู่หรือไม่
let genAI;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.error("CRITICAL: Missing GOOGLE_API_KEY in .env.local at server start. API will not function.");
}


export async function POST(request) {
  // --- ย้ายการตรวจสอบ apiKey และ genAI เข้ามาในนี้ ---
  if (!apiKey) {
    console.error("POST Error: Missing GOOGLE_API_KEY in .env.local");
    return NextResponse.json({ reply: 'Configuration error: Missing API Key' }, { status: 500 });
  }
  if (!genAI) {
    console.error("POST Error: AI Service not initialized (Missing API Key or error during init).");
    return NextResponse.json({ reply: 'Configuration error: AI Service not initialized' }, { status: 500 });
  }

  try {
    const { messages } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const portfolioContextString = getFullPortfolioContext();

    const promptParts = [portfolioContextString];
    messages.slice(1).forEach(msg => {
      promptParts.push(`${msg.from === 'bot' ? 'AI' : 'User'}: ${msg.text}`);
    });
    promptParts.push(`AI:`);

    const result = await model.generateContent(promptParts.join('\n'));
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Error in AI Chat API (inside POST):", error);
    let errorMessage = 'เกิดข้อผิดพลาดในการติดต่อ AI ค่ะ โปรดลองอีกครั้ง';
    if (error.message && error.message.includes('API key not valid')) {
      errorMessage = 'API Key ไม่ถูกต้อง โปรดตรวจสอบการตั้งค่าค่ะ';
    }
    return NextResponse.json({ reply: errorMessage }, { status: 500 });
  }
}