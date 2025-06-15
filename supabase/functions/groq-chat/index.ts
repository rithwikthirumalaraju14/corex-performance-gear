
// This Edge Function uses the GROQ_API_KEY stored securely in Supabase secrets.
// To update the key, use the Supabase dashboard (Edge Functions > Secrets).
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
// Using a standard, reliable model from Groq
const MODEL = "llama3-8b-8192";

/**
 * Searches DuckDuckGo and returns the top search results as a string.
 * This relies on scraping and may break if DuckDuckGo changes its HTML structure.
 * @param query The search query.
 * @returns A string containing formatted search results, or an empty string if an error occurs.
 */
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


serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    // Get the user's latest question to use for the web search
    const userQuery = messages.findLast((m: { role: string }) => m.role === 'user')?.content;

    let searchContext = "";
    if (userQuery) {
      searchContext = await searchDuckDuckGo(userQuery);
    }

    // Deep copy messages to avoid side effects
    const messagesForGroq = JSON.parse(JSON.stringify(messages));

    // Find the system message and inject the search context
    const systemMessage = messagesForGroq.find((m: { role: string }) => m.role === "system");
    if (systemMessage) {
      systemMessage.content += `\n\n## Web Search Context\nIf the user's question isn't about our products, use the following real-time web search results to provide an answer. Otherwise, prioritize product information. \n\n${searchContext}`;
    }

    // Securely build payload
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messagesForGroq, // Use the modified messages array
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
