require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Đổi thư viện

const app = express();
const PORT = process.env.PORT || 3001;

// Khởi tạo Gemini (Thay thế Anthropic client)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/excuses", async (req, res) => {
  const { situation } = req.body;
  if (!situation || typeof situation !== "string" || !situation.trim()) {
    return res.status(400).json({ error: "Please provide a situation." });
  }
  try {
    // Cách gọi của Gemini
    const prompt = `Generate exactly 5 excuses for this situation: "${situation.trim()}"

Rules:
- Each excuse must be exactly 1 sentence
- Funny but plausible, like a real person might say
- Mix tones: one dramatic, one technical, one blaming external forces, one weirdly specific, one almost too honest
- NO numbering, NO bullet points
- Return ONLY the 5 excuses, one per line, nothing else

Output:
[excuse 1]
[excuse 2]
[excuse 3]
[excuse 4]
[excuse 5]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Giữ nguyên logic xử lý chuỗi của bạn để khớp với Frontend
    const excuses = text.trim()
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 0)
      .slice(0, 5);

    if (excuses.length < 5) {
      return res.status(500).json({ error: "Failed to generate 5 excuses. Please try again." });
    }
    res.json({ excuses });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Something went wrong. Try again." });
  }
});

app.post("/api/story", async (req, res) => {
  const { situation, selectedExcuse } = req.body;
  if (!situation || !selectedExcuse) {
    return res.status(400).json({ error: "Missing situation or excuse." });
  }
  try {
    const prompt = `Write a convincing excuse story.

Situation: "${situation.trim()}"
Core excuse: "${selectedExcuse.trim()}"

Rules:
- 4 to 6 sentences, first-person
- Start with the excuse, then build context naturally
- Add one small human detail (feeling, name, minor inconvenience)
- Sound like a real person texting their boss or friend
- No formal tone, no "I sincerely apologize"
- Return ONLY the story paragraph, nothing else`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const story = response.text().trim();

    res.json({ story });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Couldn't generate the story. Try again." });
  }
});

app.use((req, res) => res.status(404).json({ error: "Not found." }));

app.listen(PORT, () => console.log(`NoCap Excuse server running on port ${PORT}`));
});

app.use((req, res) => res.status(404).json({ error: "Not found." }));

app.listen(PORT, () => console.log(`NoCap Excuse server running on port ${PORT}`));
