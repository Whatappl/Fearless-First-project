// netlify/functions/chat.js
import OpenAI from "openai";

export async function handler(event, context) {
  try {
    // Parse the incoming request
    const { message } = JSON.parse(event.body);

    // Read your API key from Netlify environment variable
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Call OpenAI API
    const response = await openai.responses.create({
      model: "gpt-4o-mini", // safe model for general use
      input: message,
      temperature: 0.7,
      max_output_tokens: 150
    });

    // Extract AI reply
    const reply = response.output[0].content[0].text;

    // Return the reply to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Sorry, something went wrong." }),
    };
  }
}
