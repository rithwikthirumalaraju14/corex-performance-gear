
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/integrations/supabase/client";

// Helper to fetch product names from global scope (populated by window)
function getProductList(): string[] {
  // @ts-ignore
  return window.__ADVANCED_PRODUCTS_LIST__ || [];
}

const SAMPLE_QUESTIONS = [
  "What is the difference between joggers and tights?",
  "Are your compression shorts available in navy?",
  "Which tops have moisture-wicking?",
  "What's your most popular hoodie?",
  "Do you have any items on sale?"
];

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
            "You are an expert assistant for a sports clothing brand. Available products: " +
            getProductList().join(", ") +
            ". Answer questions about available products and their attributes only. If asked about stock level, say you do not have inventory data.",
        }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (chatPanelRef.current)
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
  }, [messages.length, open]);

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

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim() && !loading) {
      sendMessage();
    }
  };

  const handleSample = (q: string) => {
    setInput(q);
    inputRef.current?.focus();
  };

  // Button that hovers bottom right
  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        {!open && (
          <Button
            className="rounded-full p-3 bg-corex-blue text-white shadow-lg hover:bg-corex-red transition"
            onClick={() => setOpen(true)}
            aria-label="Open chatbot"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>
      {open && (
        <div className="fixed bottom-4 right-4 w-80 max-w-full z-50 bg-white border rounded-xl shadow-2xl flex flex-col h-[480px] animate-fade-in">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <span className="font-bold text-corex-blue">Ask Core X AI</span>
            <button onClick={() => { setOpen(false);} } aria-label="Close chat">
              <X className="h-5 w-5 text-gray-400 hover:text-gray-800" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-2 space-y-2 text-sm" ref={chatPanelRef}>
            {messages.length <= 1 && (
              <div className="text-gray-400 text-xs my-2 font-medium">
                👋 Hi there! Ask me anything about our products.<br />
                <div className="flex flex-wrap mt-2 gap-1.5">
                  {SAMPLE_QUESTIONS.map(q => (
                    <button
                      key={q}
                      className="rounded border bg-white text-gray-600 px-2 py-1 text-xs shadow-sm hover:bg-corex-blue/10 focus:bg-corex-blue/10"
                      style={{ borderColor: '#0088ff' }}
                      tabIndex={0}
                      onClick={() => handleSample(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
          <div className="border-t p-3 bg-white">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                placeholder="Ask about our products..."
                onKeyDown={handleInputKeyDown}
                disabled={loading}
                autoFocus
              />
              <Button onClick={sendMessage} disabled={!input.trim() || loading} className="bg-corex-blue text-white">
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
