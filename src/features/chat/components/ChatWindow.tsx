import { useState, useRef, useEffect } from 'react';
import { useChatWebSocket } from '../hooks/useChatWebSocket';
import { Send, Circle } from 'lucide-react';

export function ChatWindow() {
  const { messages, isConnected, sendMessage } = useChatWebSocket();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden transition-colors">
      
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">Support Echo Chat</h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">Testing real-time events</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-[11px] font-medium">
          <Circle className={`w-2 h-2 fill-current ${isConnected ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`} />
          <span className="text-slate-600 dark:text-slate-300">{isConnected ? 'Online' : 'Connecting'}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30 dark:bg-slate-900/10">
        {messages.map((msg) => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="text-center text-[10px] font-medium text-slate-400 dark:text-slate-500 my-2 bg-slate-100 dark:bg-slate-800/40 py-1 px-3 rounded-md max-w-xs mx-auto">
                {msg.text}
              </div>
            );
          }

          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-xs font-medium shadow-2xs ${
                isUser 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600/50 text-slate-800 dark:text-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isConnected ? "Type a message..." : "Waiting for connection..."}
          disabled={!isConnected}
          className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!isConnected || !inputText.trim()}
          className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 dark:disabled:text-slate-500 rounded-xl transition cursor-pointer disabled:cursor-not-allowed shrink-0 flex items-center justify-center w-9 h-9 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}