require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

// Hàm gọi Gemini trực tiếp qua Fetch
async function callGemini(prompt) {
    const API_KEY = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Gemini API Error");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

app.post("/api/excuses", async (req, res) => {
    const { situation } = req.body;
    if (!situation) return res.status(400).json({ error: "Missing situation" });

    try {
        const prompt = `Generate exactly 5 short, funny excuses for: "${situation}". Return ONLY 5 sentences, one per line. No numbers, no bullets.`;
        const text = await callGemini(prompt);
        const excuses = text.trim().split("\n").map(l => l.trim()).filter(l => l).slice(0, 5);
        res.json({ excuses });
    } catch (err) {
        console.error("Excuses Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/story", async (req, res) => {
    const { situation, selectedExcuse } = req.body;
    if (!situation || !selectedExcuse) return res.status(400).json({ error: "Missing data" });

    try {
        const prompt = `Write a 4-sentence first-person story. Situation: "${situation}". Core excuse: "${selectedExcuse}". Return only the story paragraph.`;
        const story = await callGemini(prompt);
        res.json({ story: story.trim() });
    } catch (err) {
        console.error("Story Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
