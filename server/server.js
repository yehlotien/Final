require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

async function callGroq(prompt) {
    const API_KEY = process.env.GROQ_API_KEY;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Groq Error");
    return data.choices[0].message.content;
}

app.post("/api/excuses", async (req, res) => {
    const { situation } = req.body;
    try {
        const prompt = `Generate exactly 5 short, funny excuses for: "${situation}". Return ONLY 5 sentences, one per line. No numbers.`;
        const text = await callGroq(prompt);
        const excuses = text.trim().split("\n").filter(l => l.length > 5).slice(0, 5);
        res.json({ excuses });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/story", async (req, res) => {
    const { situation, selectedExcuse } = req.body;
    try {
        const prompt = `Write a 4-sentence story. Situation: "${situation}". Excuse: "${selectedExcuse}". First-person.`;
        const story = await callGroq(prompt);
        res.json({ story: story.trim() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server live on Groq!`));
