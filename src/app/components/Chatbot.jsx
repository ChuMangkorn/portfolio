
'use client';

import { useState, useRef, useEffect } from 'react'; // <-- เพิ่ม useRef, useEffect
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'สวัสดีค่ะ! มีอะไรให้ช่วยเกี่ยวกับ Portfolio นี้ไหมคะ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // <-- เพิ่ม state สำหรับ loading
  const messagesEndRef = useRef(null); // <-- Ref สำหรับ auto-scroll

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // <-- Scroll ทุกครั้งที่ messages เปลี่ยน
  }, [messages]);


  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => { // <--- เปลี่ยนเป็น async
    if (input.trim() === '' || isLoading) return;

    const userMessage = { from: 'user', text: input };
    const currentInput = input;
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // ส่ง history ไปด้วย (รวมข้อความใหม่ของผู้ใช้)
            body: JSON.stringify({ messages: [...messages, userMessage] }),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        const botMessage = { from: 'bot', text: data.reply };
        setMessages(prev => [...prev, botMessage]);

    } catch (error) {
        console.error("Failed to get AI response:", error);
        const errorMessage = { from: 'bot', text: 'ขออภัยค่ะ เกิดข้อผิดพลาดบางอย่าง' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  }

  return (
    <>
      {/* --- Chat Bubble Button --- */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-[100] hover:scale-110"
        aria-label="Open Chatbot"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {/* --- Chat Window --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-6 w-80 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-[99]"
          >
            {/* Header */}
            <div className="bg-indigo-600 text-white p-4 text-center font-semibold text-lg shadow-sm">
              AI Assistant
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index} // <-- ยังใช้ index ได้ เพราะเรา append อย่างเดียว ไม่ลบ/สลับ
                  className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-[80%] text-sm shadow-sm ${
                      msg.from === 'bot'
                        ? 'bg-white text-slate-800 rounded-bl-none'
                        : 'bg-indigo-500 text-white rounded-br-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && ( // <-- แสดง Typing Indicator
                <div className="flex justify-start">
                    <div className="p-3 rounded-xl bg-white text-slate-500 rounded-bl-none text-sm shadow-sm italic">
                        AI กำลังคิด...
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} /> {/* <-- จุดสำหรับ Scroll */}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="พิมพ์คำถามที่นี่..."
                className="flex-1 border border-slate-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                disabled={isLoading} // <-- Disable ตอน AI กำลังคิด
              />
              <button
                onClick={handleSend}
                className={`bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors duration-200 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Send Message"
                disabled={isLoading} // <-- Disable ตอน AI กำลังคิด
              >
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}