import { motion } from "framer-motion";

const ICONS = ["🤒", "🛸", "🐈", "⚡", "🌊"];

export default function ExcuseScreen({ excuses, situation, onSelect, loading, onBack }) {
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
        <motion.button
          onClick={onBack}
          whileHover={{ x: -3 }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#8b82a8", fontSize: 13, marginBottom: 20,
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ← Back
        </motion.button>

        <div style={{
          display: "inline-block", padding: "4px 12px", borderRadius: 99, marginBottom: 16,
          background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.3)",
          color: "#60a5fa", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        }}>
          Pick your alibi
        </div>

        <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", color: "#f0eeff", marginBottom: 8 }}>
          Choose your excuse
        </h2>
        <p style={{ color: "#8b82a8", fontSize: 14 }}>We'll turn it into a convincing story</p>
      </div>

      {/* Situation recap */}
      <div className="font-mono" style={{
        borderRadius: 12, padding: "10px 16px", marginBottom: 24,
        background: "rgba(5,5,8,0.6)", border: "1px solid rgba(30,30,46,0.6)",
        fontSize: 13, color: "#8b82a8",
      }}>
        <span style={{ color: "#4a4568" }}>situation: </span>
        <span style={{ color: "#a855f7" }}>"{situation}"</span>
      </div>

      {/* Excuse cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {excuses.map((excuse, i) => (
          <motion.button
            key={i}
            onClick={() => !loading && onSelect(excuse)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
            whileHover={!loading ? { scale: 1.02, x: 4 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            disabled={loading}
            style={{
              width: "100%", textAlign: "left", borderRadius: 14, padding: 20,
              background: "rgba(13,13,20,0.75)", border: "1px solid rgba(30,30,46,0.8)",
              cursor: loading ? "not-allowed" : "pointer",
              backdropFilter: "blur(16px)", transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(124,58,237,0.15)";
                e.currentTarget.style.background = "rgba(18,18,30,0.85)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(30,30,46,0.8)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "rgba(13,13,20,0.75)";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{
                flexShrink: 0, width: 36, height: 36, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
              }}>
                {ICONS[i]}
              </div>
              <p style={{ color: "#f0eeff", fontSize: 15, lineHeight: 1.6, flex: 1 }}>
                {excuse}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {loading && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="font-mono"
          style={{ textAlign: "center", marginTop: 24, color: "#8b82a8", fontSize: 13 }}
        >
          Building your alibi…
        </motion.p>
      )}
    </motion.div>
  );
}
