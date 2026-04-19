import { useState } from "react";
import { motion } from "framer-motion";

export default function StoryScreen({ story, selectedExcuse, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story);
    } catch {
      const el = document.createElement("textarea");
      el.value = story;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: 16, fontSize: 26, marginBottom: 20,
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))",
            border: "1px solid rgba(124,58,237,0.4)",
            boxShadow: "0 0 30px rgba(124,58,237,0.2)",
          }}
        >
          🫣
        </motion.div>

        <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", color: "#f0eeff", marginBottom: 8 }}>
          Your excuse is ready
        </h2>
        <p style={{ color: "#8b82a8", fontSize: 14 }}>Totally believable. Completely yours.</p>
      </div>

      {/* Excuse chip */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span className="font-mono" style={{ color: "#4a4568", fontSize: 12 }}>Using:</span>
        <span className="font-mono" style={{
          fontSize: 12, padding: "4px 12px", borderRadius: 99,
          background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)",
          color: "#a855f7", maxWidth: 400, overflow: "hidden",
          textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block",
        }}>
          {selectedExcuse}
        </span>
      </div>

      {/* Story card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          borderRadius: 20, padding: 28, marginBottom: 20, position: "relative", overflow: "hidden",
          background: "rgba(13,13,20,0.85)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(124,58,237,0.25)",
          boxShadow: "0 0 50px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Corner glow */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: 120, height: 120, opacity: 0.2,
          background: "radial-gradient(circle at top right, rgba(124,58,237,0.5), transparent 70%)",
        }} />
        {/* Bottom line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
        }} />

        {/* Quote mark */}
        <div className="font-display" style={{ fontSize: 64, color: "rgba(124,58,237,0.2)", lineHeight: 0.75, marginBottom: 12, userSelect: "none" }}>
          "
        </div>

        <p style={{
          color: "#e8e2ff", fontSize: 16, lineHeight: 1.75, position: "relative", zIndex: 1,
          fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: "0.01em",
        }}>
          {story}
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ display: "flex", gap: 12 }}
      >
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 1, padding: "16px", borderRadius: 12, fontSize: 14,
            fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer",
            background: "rgba(13,13,20,0.7)", border: "1px solid rgba(30,30,46,0.8)",
            color: "#8b82a8", transition: "all 0.2s", letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; e.currentTarget.style.color = "#f0eeff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(30,30,46,0.8)"; e.currentTarget.style.color = "#8b82a8"; }}
        >
          Generate Again
        </motion.button>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            flex: 1, padding: "16px", borderRadius: 12, fontSize: 14,
            fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer",
            border: "none", transition: "all 0.3s", letterSpacing: "0.02em", color: "#fff",
            background: copied
              ? "linear-gradient(135deg, #059669, #047857)"
              : "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)",
            boxShadow: copied ? "0 0 30px rgba(5,150,105,0.4)" : "0 0 30px rgba(124,58,237,0.4)",
          }}
        >
          {copied ? "✓ Copied!" : "Copy Excuse"}
        </motion.button>
      </motion.div>

      <p className="font-mono" style={{ textAlign: "center", fontSize: 11, color: "#4a4568", marginTop: 16 }}>
        Send it. You've got nothing to lose (except maybe that job).
      </p>
    </motion.div>
  );
}
