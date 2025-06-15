
import React, { useRef, useEffect } from "react";
import SampleQuestions from "./SampleQuestions";
import { MessageCircle, User } from "lucide-react";

interface MessageListProps {
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  loading: boolean;
  onSampleClick: (question: string) => void;
}

const MessageList = ({ messages, loading, onSampleClick }: MessageListProps) => {
  const chatPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatPanelRef.current) {
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
    }
  }, [messages.length, loading]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6 space-y-4 text-sm" ref={chatPanelRef}>
      {messages.length <= 1 && <SampleQuestions onSampleClick={onSampleClick} />}
      {messages.slice(1).map((m, i) => (
        <div
          key={i}
          className={`flex items-end gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {m.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${m.role === "user" ? "bg-corex-blue text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-sm"}`}>
            {m.content}
          </div>
           {m.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          )}
        </div>
      ))}
      {loading && (
        <div className="flex items-end gap-2.5 justify-start">
           <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-gray-500" />
            </div>
          <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-sm px-4 py-2.5">
            <div className="flex items-center justify-center space-x-1">
              <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
              <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
              <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
