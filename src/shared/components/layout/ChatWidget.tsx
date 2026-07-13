import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { ChatWindow } from "../../../features/chat/components/ChatWindow";

export function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed bottom-2 right-2 sm:bottom-2 sm:right-3 z-50 flex flex-col items-end gap-4 max-w-[calc(100vw-32px)]">
      {isChatOpen && (
        <div className="w-full sm:w-[360px] md:w-[400px] animate-fade-in drop-shadow-2xl">
          <ChatWindow />
        </div>
      )}

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
          isChatOpen
            ? "bg-rose-500 hover:bg-rose-600 rotate-90"
            : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
        }`}
        title={isChatOpen ? "Close Live Chat" : "Open Live Chat"}
      >
        {isChatOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        )}
      </button>
    </div>
  );
}
