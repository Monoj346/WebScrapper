import dotenv from "dotenv";
dotenv.config();

console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY?.slice(0, 12));

import genAI from "./utils/geminiClient.js";

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Explain how AI works in a few words");
    console.log("Gemini reply:", result.response.text());
  } catch (err) {
    console.error("Gemini failed:", err);
  }
}

test();
