require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Cho phép tất cả các nguồn truy cập (CORS)
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

// Hàm gọi trực tiếp API của Google (Sử dụng model gemini-pro để ổn định nhất)
async function callGemini(prompt) {
    const API_KEY = process.env.GEMINI_API_KEY;
    // Sử dụng endpoint v1 và model gemini-pro
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Google API Error Details:", data);
        throw new Error(data.error?.message || "Lỗi kết nối Gemini API");
    }

    // Kiểm tra xem có dữ liệu trả về không
    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error("AI không trả về kết quả, thử lại với nội dung khác.");
    }
}

// Route tạo 5 lời xin lỗi
app.post("/api/excuses", async (req, res) => {
    const { situation } = req.body;
    if (!situation) return res.status(400).json({ error: "Vui lòng nhập tình huống." });

    try {
        const prompt = `Generate exactly 5 short, funny, and creative excuses for: "${situation}". 
        Return ONLY 5 sentences, one per line. No numbers, no bullets, no symbols.`;
        
        const text = await callGemini(prompt);
        const excuses = text.trim()
            .split("\n")
            .map(l => l.replace(/^[0-9.\-* ]+/, '').trim()) // Xóa bỏ các ký tự đánh số nếu AI tự ý thêm vào
            .filter(l => l.length > 5)
            .slice(0, 5);

        if (excuses.length === 0) throw new Error("AI trả về format không đúng.");
        
        res.json({ excuses });
    } catch (err) {
        console.error("Excuses Error:", err.message);
        res.status(500).json({ error: "Không thể tạo lời xin lỗi. Thử lại sau nhé!" });
    }
});

// Route tạo câu chuyện chi tiết
app.post("/api/story", async (req, res) => {
    const { situation, selectedExcuse } = req.body;
    if (!situation || !selectedExcuse) return res.status(400).json({ error: "Thiếu dữ liệu." });

    try {
        const prompt = `Write a convincing 4-sentence first-person story. 
        Situation: "${situation}". Core excuse: "${selectedExcuse}". 
        Sound like a real person texting a friend. Return ONLY the story paragraph.`;
        
        const story = await callGemini(prompt);
        res.json({ story: story.trim() });
    } catch (err) {
        console.error("Story Error:", err.message);
        res.status(500).json({ error: "Không thể tạo câu chuyện." });
    }
});

// Route kiểm tra server
app.get("/health", (req, res) => res.json({ status: "ok", message: "Server is running" }));

app.listen(PORT, () => console.log(`NoCap Excuse Server is live on port ${PORT}`));
