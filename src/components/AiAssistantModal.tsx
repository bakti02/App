import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Zap } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ role: 'assistant' | 'user'; text: string }>>([
    {
      role: 'assistant',
      text: 'Halo! Saya asisten AI workspace Anda. Anda bisa menanyakan analisis penggunaan akun, rekomendasi paket langganan yang cocok, atau bantuan alur kerja otomatis.'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = 'Terima kasih atas pertanyaannya! Berdasarkan aktivitas workspace Anda, paket Plus direkomendasikan jika tim Anda membutuhkan integrasi unlimited tim dan alur kerja kustom.';
      if (userText.toLowerCase().includes('harga') || userText.toLowerCase().includes('biaya') || userText.toLowerCase().includes('diskon')) {
        reply = 'Paket Plus dibanderol $12/user/bulan (atau $10 jika tahunan dengan diskon 20%). Anda juga bisa menambahkan Add-on AI seharga +$4/bulan.';
      } else if (userText.toLowerCase().includes('fitur') || userText.toLowerCase().includes('plus') || userText.toLowerCase().includes('premium')) {
        reply = 'Paket Plus menyertakan Unlimited timeline views, Unlimited teams, Private docs, Google SSO, dan Custom workflows.';
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full h-[520px] flex flex-col shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                Workspace AI Assistant
                <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.2 rounded">Gemini Powered</span>
              </h3>
              <p className="text-[11px] text-slate-500">Asisten cerdas untuk wawasan dan optimasi paket</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm bg-slate-50/30">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] p-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs shadow-2xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2.5 items-center text-xs text-slate-400">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-100 flex gap-2 overflow-x-auto text-[11px]">
          <button
            onClick={() => setInputMessage('Apa perbedaan paket Plus dan Premium?')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap"
          >
            Perbedaan Plus vs Premium?
          </button>
          <button
            onClick={() => setInputMessage('Bagaimana cara hemat 20%?')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap"
          >
            Cara hemat 20%?
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tanyakan sesuatu ke AI..."
            className="flex-1 px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
