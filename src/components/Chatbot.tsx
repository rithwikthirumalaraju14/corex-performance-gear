
import React, { useState, useRef, useEffect } from "react";
import { Dumbbell } from "lucide-react";
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
      <div className="fixed bottom-8 right-8 z-50">
        {!open && (
          <Button
            className="rounded-full p-3 bg-gradient-to-br from-corex-red via-corex-blue to-corex-green shadow-xl hover:scale-110 hover:shadow-2xl transition-transform duration-300 text-white animate-pulse"
            style={{
              boxShadow: "0 6px 32px 0 rgba(0,0,0,0.13), 0 1.5px 4px 0 rgba(0,0,0,0.10)"
            }}
            onClick={() => setOpen(true)}
            aria-label="Open gym chatbot"
            size="icon"
          >
            <Dumbbell className="w-8 h-8 text-white drop-shadow" />
          </Button>
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

