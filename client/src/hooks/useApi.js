const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function generateExcuses(situation) {
  const res = await fetch(`${API_URL}/api/excuses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ situation }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to generate excuses.");
  return data.excuses;
}

export async function generateStory(situation, selectedExcuse) {
  const res = await fetch(`${API_URL}/api/story`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ situation, selectedExcuse }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to generate story.");
  return data.story;
}
