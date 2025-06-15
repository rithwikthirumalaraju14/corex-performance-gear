
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import ChatWindow from "./chatbot/ChatWindow";

// Helper to fetch product names from global scope (populated by window)
function getProductList(): string[] {
  // @ts-ignore
  return window.__ADVANCED_PRODUCTS_LIST__ || [];
}

const getHistory = () => {
  try {
    const raw = localStorage.getItem("cx-bot-history");
    if (raw) return JSON.parse(raw);
  } catch { }
  return undefined;
};
const saveHistory = (messages: { role: string; content: string }[]) => {
  localStorage.setItem("cx-bot-history", JSON.stringify(messages));
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "system" | "user" | "assistant"; content: string }[]
  >(() => {
    const h = getHistory();
    return h && Array.isArray(h) && h[0]?.role === "system"
      ? h
      : [{
          role: "system",
          content:
            "You are a helpful and friendly assistant for Core X, a sports clothing brand. You are an expert on our products and can also answer general knowledge questions, especially about fitness and wellness. Available products: " +
            getProductList().join(", ") +
            ". If asked about stock level, say you do not have inventory data.",
        }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    // save chat except for empty or only system
    if (messages.length > 1) saveHistory(messages);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const nextMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
      ...messages,
      { role: "user", content: input.trim() },
    ];
    setMessages(nextMessages);
    setLoading(true);
    setInput("");
    try {
      const { data, error } = await supabase.functions.invoke("groq-chat", {
        body: {
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: "There was an error: " + (data.error || "Unknown error.") },
        ]);
        setLoading(false);
        return;
      }
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.message || "(No answer returned from Groq.)" },
      ]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: `Error: ${errorMessage}` },
      ]);
    }
    setLoading(false);
  };

  const handleSample = (q: string) => {
    setInput(q);
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <div className="relative">
            {/* Pulse animation ring */}
            <div className="absolute inset-0 rounded-full bg-corex-blue/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-corex-blue/20 animate-pulse"></div>
            
            {/* Main button */}
            <Button
              className="relative w-16 h-16 rounded-full bg-gradient-to-r from-corex-blue to-corex-red text-white shadow-2xl hover:shadow-corex border-0 transition-all duration-300 hover:scale-110 group"
              onClick={() => setOpen(true)}
              aria-label="Open AI Assistant"
            >
              <div className="flex items-center justify-center">
                <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
            </Button>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Chat with AI Assistant
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </div>
      {open && (
        <ChatWindow 
          onClose={() => setOpen(false)}
          messages={messages}
          loading={loading}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          handleSample={handleSample}
          inputRef={inputRef}
        />
      )}
    </>
  );
};

export default Chatbot;
