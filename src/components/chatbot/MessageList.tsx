
import React, { useRef, useEffect } from "react";
import SampleQuestions from "./SampleQuestions";

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
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-2 space-y-2 text-sm" ref={chatPanelRef}>
      {messages.length <= 1 && <SampleQuestions onSampleClick={onSampleClick} />}
      {messages.slice(1).map((m, i) => (
        <div
          key={i}
          className={`mb-2 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div className={`rounded-lg px-3 py-2 ${m.role === "user" ? "bg-corex-blue text-white" : "bg-gray-200 text-gray-800"}`}>
            {m.content}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start mb-2">
          <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2">
            ...
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
