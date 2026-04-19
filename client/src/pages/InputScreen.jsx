import { useState } from "react";
import { motion } from "framer-motion";

const EXAMPLES = [
  "I missed my team standup",
  "I ghosted someone for 3 weeks",
  "I forgot my friend's birthday",
  "I didn't finish my homework",
  "I was late to my own meeting",
];

export default function InputScreen({ onSubmit, loading }) {
  const [situation, setSituation] = useState("");
  const MAX = 500;
  const canSubmit = situation.trim().length >= 3 && !loading;

  const handleKey = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      if (canSubmit) onSubmit(situation.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%", maxWidth: 640, margin: "0 auto", padding: "0 16px" }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "4px 12px", borderRadius: 99, marginBottom: 24,
          background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)",
          color: "#a855f7", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        }}>
          <span>●</span> AI-powered excuse generator
        </div>

        <h1 className="font-display" style={{ fontSize: 56, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 16 }}>
          <span className="text-gradient">NoCap</span>
          <br />
          <span style={{ color: "#f0eeff" }}>Excuse</span>
        </h1>

        <p style={{ color: "#8b82a8", fontSize: 17 }}>
          Life got weird. We make it sound intentional.
        </p>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="glass"
        style={{
          borderRadius: 20, padding: "32px",
          boxShadow: "0 0 40px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <label className="font-display" style={{
          display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "#8b82a8", marginBottom: 12,
        }}>
          What happened?
        </label>

        <div style={{ position: "relative" }}>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value.slice(0, MAX))}
            onKeyDown={handleKey}
            placeholder="e.g. I missed the deadline because…"
            rows={4}
            style={{
              width: "100%", borderRadius: 12, padding: "16px",
              fontSize: 15, resize: "none", outline: "none",
              background: "rgba(5,5,8,0.6)", color: "#f0eeff",
              caretColor: "#a855f7", fontFamily: "'DM Sans', sans-serif",
              border: situation.length > 0 ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(30,30,46,0.8)",
              boxShadow: situation.length > 0 ? "0 0 20px rgba(124,58,237,0.1)" : "none",
              transition: "border 0.2s, box-shadow 0.2s",
            }}
          />
          <span className="font-mono" style={{
            position: "absolute", bottom: 10, right: 12, fontSize: 11,
            color: situation.length > 400 ? "#f59e0b" : "#4a4568",
          }}>
            {situation.length}/{MAX}
          </span>
        </div>

        {/* Examples */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16, marginBottom: 24 }}>
          {EXAMPLES.map((ex, i) => (
            <motion.button
              key={i}
              onClick={() => setSituation(ex)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                fontSize: 12, padding: "6px 12px", borderRadius: 8, cursor: "pointer",
                background: "rgba(30,30,46,0.6)", border: "1px solid rgba(30,30,46,0.8)",
                color: "#8b82a8", fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {ex}
            </motion.button>
          ))}
        </div>

        {/* Submit */}
        <motion.button
          onClick={() => canSubmit && onSubmit(situation.trim())}
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          style={{
            width: "100%", padding: "16px", borderRadius: 12,
            fontSize: 15, fontWeight: 700, letterSpacing: "0.02em",
            fontFamily: "'Syne', sans-serif", cursor: canSubmit ? "pointer" : "not-allowed",
            border: "none", transition: "all 0.3s",
            background: canSubmit
              ? "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)"
              : "rgba(30,30,46,0.5)",
            color: canSubmit ? "#fff" : "#4a4568",
            boxShadow: canSubmit ? "0 0 30px rgba(124,58,237,0.4)" : "none",
          }}
        >
          {loading ? "Generating…" : "Generate Excuses →"}
        </motion.button>

        <p className="font-mono" style={{ textAlign: "center", fontSize: 11, color: "#4a4568", marginTop: 10 }}>
          ⌘ + Enter to submit
        </p>
      </motion.div>
    </motion.div>
  );
}
