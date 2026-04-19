export default function BackgroundOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {/* Orb 1 */}
      <div className="orb-1" style={{
        position: "absolute",
        width: 600, height: 600,
        top: -200, left: -100,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      {/* Orb 2 */}
      <div className="orb-2" style={{
        position: "absolute",
        width: 500, height: 500,
        bottom: -150, right: -100,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.11) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      {/* Orb 3 */}
      <div className="orb-3" style={{
        position: "absolute",
        width: 300, height: 300,
        top: "50%", left: "60%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 70%)",
        filter: "blur(30px)",
      }} />
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage:
          "linear-gradient(rgba(168,85,247,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.6) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
    </div>
  );
}
