
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Minimal local storage key for API key
const GROQ_API_KEY_LOCALSTORAGE = "groq_cloud_api_key";
const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

// Helper to fetch product names from global scope (populated by window)
function getProductList(): string[] {
  // @ts-ignore
  return window.__ADVANCED_PRODUCTS_LIST__ || [];
}

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
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem(GROQ_API_KEY_LOCALSTORAGE)
  );
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

  // Save API key
  const handleApiKey = () => {
    if (input.trim()) {
      localStorage.setItem(GROQ_API_KEY_LOCALSTORAGE, input.trim());
      setApiKey(input.trim());
      setInput("");
    }
  };

  // Send prompt to Groq Cloud API
  const sendMessage = async () => {
    if (!input.trim() || loading || !apiKey) return;
    const nextMessages = [
      ...messages,
      { role: "user", content: input.trim() },
    ];
    setMessages(nextMessages);
    setLoading(true);
    setInput("");
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          max_tokens: 256,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: "There was an error: " + (data.error?.message || "Unknown error.") },
        ]);
        setLoading(false);
        return;
      }
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.choices?.[0]?.message?.content || "(No answer returned from Groq.)" },
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Failed to connect to Groq Cloud." },
      ]);
    }
    setLoading(false);
  };

  // Enter to send
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim() && !loading && apiKey) {
      sendMessage();
    }
    if (e.key === "Enter" && !apiKey) {
      handleApiKey();
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
            {!apiKey ? (
              <>
                <Input
                  ref={inputRef}
                  type="password"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="mb-2"
                  placeholder="Paste your Groq Cloud API key..."
                  onKeyDown={handleInputKeyDown}
                  autoFocus
                />
                <Button
                  className="w-full bg-corex-blue text-white"
                  onClick={handleApiKey}
                  disabled={!input.trim()}
                >
                  Save API Key
                </Button>
                <div className="text-xs text-gray-500 mt-2">
                  Your key is stored only in your browser.
                </div>
              </>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
