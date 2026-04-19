import { motion } from "framer-motion";

export default function Loader({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "48px 0" }}
    >
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <div className="spin-ring-1" style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#7c3aed",
        }} />
        <div className="spin-ring-2" style={{
          position: "absolute", inset: 8,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#2563eb",
        }} />
        <div className="spin-ring-3" style={{
          position: "absolute", inset: 16,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#a855f7",
        }} />
      </div>

      <motion.p
        className="font-mono"
        style={{ color: "#8b82a8", fontSize: 13 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text || "Cooking something up…"}
      </motion.p>
    </motion.div>
  );
}
