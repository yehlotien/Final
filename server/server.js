require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

async function callGemini(prompt) {
    const API_KEY = process.env.GEMINI_API_KEY;
    // Danh sách các model tiềm năng nhất năm 2026
    const models = [
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro-latest",
        "gemini-pro"
    ];

    let lastError = null;

    for (const modelName of models) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();

            if (response.ok && data.candidates) {
                return data.candidates[0].content.parts[0].text;
            }
            lastError = data.error?.message || "Unknown error";
            console.log(`Model ${modelName} failed, trying next...`);
        } catch (err) {
            lastError = err.message;
        }
    }
    throw new Error(`Tất cả model đều thất bại: ${lastError}`);
}

app.post("/api/excuses", async (req, res) => {
    const { situation } = req.body;
    if (!situation) return res.status(400).json({ error: "Input missing" });

    try {
        const prompt = `Generate exactly 5 short, funny, creative excuses for: "${situation}". 
        Return ONLY 5 sentences, one per line. No numbers, no bullets.`;
        
        const text = await callGemini(prompt);
        const excuses = text.trim().split("\n")
            .map(l => l.replace(/^[0-9.\-* ]+/, '').trim())
            .filter(l => l.length > 5).slice(0, 5);

        res.json({ excuses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI đang bận, thử lại sau nhé!" });
    }
});

app.post("/api/story", async (req, res) => {
    const { situation, selectedExcuse } = req.body;
    try {
        const prompt = `Write a 4-sentence first-person story. Situation: "${situation}". Core excuse: "${selectedExcuse}". Return only the story paragraph.`;
        const story = await callGemini(prompt);
        res.json({ story: story.trim() });
    } catch (err) {
        res.status(500).json({ error: "Lỗi tạo cốt truyện." });
    }
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server live on ${PORT}`));
