import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

async function generateFlashcards(topic, maxRetries = 3) {
  const prompt = `
Generate exactly 15 flashcards about "${topic}".
Return ONLY valid JSON. No markdown, no backticks.
Each flashcard must have: question, answer, difficulty.
Difficulty must be: 5 easy, 5 medium, 5 hard.
`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      // ⭐ NEW SDK FORMAT
      const output =
        response.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!output) {
        throw new Error("No text output from Gemini");
      }

      const clean = output.replace(/```json|```/g, "").trim();
      const flashcards = JSON.parse(clean);

      // Validate structure
      if (!Array.isArray(flashcards) || flashcards.length !== 15) {
        throw new Error("Invalid flashcard count");
      }

      for (const card of flashcards) {
        if (!card.question || !card.answer || !card.difficulty) {
          throw new Error("Missing fields in flashcard");
        }
      }

      const dist = flashcards.reduce(
        (acc, c) => {
          acc[c.difficulty]++;
          return acc;
        },
        { easy: 0, medium: 0, hard: 0 }
      );

      if (dist.easy !== 5 || dist.medium !== 5 || dist.hard !== 5) {
        throw new Error("Wrong difficulty distribution");
      }

      return flashcards;
    } catch (err) {
      console.log(`Attempt ${attempt} failed: ${err.message}`);

      if (attempt === maxRetries) {
        throw new Error("Max retries exceeded");
      }
    }
  }
}

app.post("/generate-flashcards", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || topic.trim() === "") {
      return res.status(400).json({ error: "Topic is required" });
    }

    const flashcards = await generateFlashcards(topic.trim());

    res.json({ flashcards });
  } catch (err) {
    console.error("Error generating:", err.message);
    res.status(500).json({
      error: "Failed to generate flashcards",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
