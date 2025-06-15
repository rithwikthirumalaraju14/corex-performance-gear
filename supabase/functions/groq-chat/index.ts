
// This Edge Function uses the GROQ_API_KEY stored securely in Supabase secrets.
// To update the key, use the Supabase dashboard (Edge Functions > Secrets).
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"; // Temporarily disabled for debugging.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
// Using a standard, reliable model from Groq
const MODEL = "llama3-8b-8192";

// The search function is temporarily disabled for debugging.
/*
async function searchDuckDuckGo(query: string): Promise<string> {
  try {
    const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      console.error(`DuckDuckGo search failed with status: ${response.status}`);
      return "Could not perform web search.";
    }
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    if (!doc) {
      return "Could not parse search results.";
    }

    const results = [];
    // DuckDuckGo's simple HTML version uses this structure
    const resultNodes = doc.querySelectorAll(".result");

    for (const node of Array.from(resultNodes).slice(0, 3)) { // Get top 3 results
      const title = node.querySelector(".result__title > a")?.textContent.trim();
      const snippet = node.querySelector(".result__snippet")?.textContent.trim();
      if (title && snippet) {
        results.push(`- ${title}: ${snippet}`);
      }
    }

    if (results.length > 0) {
      return "Search Results:\n" + results.join("\n");
    }
    return "No relevant search results found.";
  } catch (error) {
    console.error("Error during DuckDuckGo search:", error);
    return "An error occurred while searching the web.";
  }
}
*/


serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    // Web search logic is temporarily disabled to isolate potential issues.
    // The chatbot will now directly use the Groq API without performing a web search first.

    // Securely build payload
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages, // Using original messages for now
        max_tokens: 500,
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("Groq API error:", data);
      return new Response(
        JSON.stringify({ error: data.error?.message || "Unknown Groq error." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: data.choices?.[0]?.message?.content || "(No answer returned from Groq.)",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Groq proxy error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// The GROQ_API_KEY is NOT exposed to the frontend; all requests to Groq are handled by this function.

