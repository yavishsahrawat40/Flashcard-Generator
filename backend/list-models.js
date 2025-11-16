import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const result = await genAI.listModels();
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

listModels();
