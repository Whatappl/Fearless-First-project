import OpenAI from "openai";

export async function handler(event) {
  try {
    // 🔐 Your OpenAI key is safely stored in Netlify, not here
    const OPENAI_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "Server not configured with API key." }),
      };
    }

    // Get the user's message from frontend
    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "No message provided." }),
      };
    }

    // Create OpenAI client
    const openai = new OpenAI({ apiKey: OPENAI_KEY });

    // Generate a response
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast, lightweight, and smart
      messages: [
        {
          role: "system",
          content:
            "You are FEARLESS AI — friendly, smart, and helpful. Answer clearly and politely.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Extract AI reply
    const reply = resp.choices?.[0]?.message?.content || "I couldn’t think of an answer.";

    // Send back the reply
    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error("FEARLESS AI error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Error occurred in FEARLESS AI." }),
    };
  }
}
