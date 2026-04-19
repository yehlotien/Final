# 🫣 NoCap Excuse

AI-powered excuse generator. Funny, chaotic, and weirdly convincing.

## Project Structure

```
nocap-excuse/
├── server/    ← Express API (deploy to Render)
└── client/    ← React + Vite frontend (deploy to Vercel)
```

---

## 🚀 Deploy in 5 minutes

### 1. Backend → Render
1. New Web Service → connect your repo
2. Root Directory: `server`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add env vars:
   - `ANTHROPIC_API_KEY` = your key from console.anthropic.com
6. Deploy → copy the `.onrender.com` URL

### 2. Frontend → Vercel
1. New Project → connect your repo
2. Root Directory: `client`
3. Framework: Vite
4. Add env var:
   - `VITE_API_URL` = your Render URL (e.g. `https://nocap-excuse.onrender.com`)
5. Deploy

---

## 💻 Local Development

```bash
# Terminal 1 - Backend
cd server
cp .env.example .env   # add your ANTHROPIC_API_KEY
npm install
npm run dev

# Terminal 2 - Frontend
cd client
cp .env.example .env   # set VITE_API_URL=http://localhost:3001
npm install
npm run dev
```
