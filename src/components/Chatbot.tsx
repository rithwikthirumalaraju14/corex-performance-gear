
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Helper to fetch product names from global scope (populated by window)
function getProductList(): string[] {
  // @ts-ignore
  return window.__ADVANCED_PRODUCTS_LIST__ || [];
}

const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "system" | "user" | "assistant"; content: string }[]
  >([
    {
      role: "system",
      content:
        "You are an expert assistant for a sports clothing brand. Available products: " +
        getProductList().join(", ") +
        ". Answer questions about available products and their attributes only. If asked about stock level, say you do not have inventory data.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  // On open auto-focus input
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatPanelRef.current)
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
  }, [messages.length, open]);

  // Send prompt to Edge Function
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
      const res = await fetch("/functions/v1/groq-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
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
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Failed to connect to Groq Chat." },
      ]);
    }
    setLoading(false);
  };

  // Enter to send
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim() && !loading) {
      sendMessage();
    }
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
        <div className="fixed bottom-4 right-4 w-80 max-w-full z-50 bg-white border rounded-xl shadow-2xl flex flex-col h-[480px]">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <span className="font-bold text-corex-blue">Ask Core X AI</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-5 w-5 text-gray-400 hover:text-gray-800" />
            </button>
          </div>
          <div
            className="flex-1 overflow-y-auto bg-gray-50 px-4 py-2 space-y-2 text-sm"
            ref={chatPanelRef}
          >
            {messages.slice(1).map((m, i) => (
              <div
                key={i}
                className={`mb-2 flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-3 py-2 ${
                    m.role === "user"
                      ? "bg-corex-blue text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
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
