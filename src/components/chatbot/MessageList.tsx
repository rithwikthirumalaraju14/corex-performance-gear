
import React, { useRef, useEffect } from "react";
import SampleQuestions from "./SampleQuestions";
import { Dumbbell, User } from "lucide-react";

interface MessageListProps {
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  loading: boolean;
  onSampleClick: (question: string) => void;
}

// Pick on-brand bubble backgrounds
const assistantBubble =
  "bg-gradient-to-br from-corex-blue via-corex-green to-corex-red text-white rounded-bl-2xl shadow";
const userBubble =
  "bg-corex-blue text-white rounded-br-2xl shadow";

const MessageList = ({ messages, loading, onSampleClick }: MessageListProps) => {
  const chatPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatPanelRef.current) {
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
    }
  }, [messages.length, loading]);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-bl from-corex-red via-white/65 to-corex-green px-4 py-6 space-y-4 text-sm" ref={chatPanelRef}>
      {messages.length <= 1 && <SampleQuestions onSampleClick={onSampleClick} />}
      {messages.slice(1).map((m, i) => (
        <div
          key={i}
          className={`flex items-end gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {m.role === "assistant" && (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-corex-blue via-corex-green to-corex-red border-[3px] border-white flex items-center justify-center flex-shrink-0 shadow">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
          )}
          <div className={`max-w-[75%] px-4 py-2.5 ${m.role === "user" ? userBubble : assistantBubble}`}>
            {m.content}
          </div>
          {m.role === "user" && (
            <div className="w-9 h-9 rounded-full bg-corex-blue border-[3px] border-white flex items-center justify-center flex-shrink-0 shadow">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      ))}
      {loading && (
        <div className="flex items-end gap-3 justify-start">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-corex-blue via-corex-green to-corex-red border-[3px] border-white flex items-center justify-center flex-shrink-0 shadow">
            <Dumbbell className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className={`px-4 py-2.5 ${assistantBubble}`}>
            <div className="flex items-center justify-center space-x-1">
              <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse [animation-delay:-0.3s]"></span>
              <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse [animation-delay:-0.15s]"></span>
              <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;

