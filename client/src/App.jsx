import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundOrbs from "./components/BackgroundOrbs";
import Loader from "./components/Loader";
import InputScreen from "./pages/InputScreen";
import ExcuseScreen from "./pages/ExcuseScreen";
import StoryScreen from "./pages/StoryScreen";
import { generateExcuses, generateStory } from "./hooks/useApi";

const STEPS = { INPUT: "input", EXCUSES: "excuses", STORY: "story" };

export default function App() {
  const [step, setStep] = useState(STEPS.INPUT);
  const [situation, setSituation] = useState("");
  const [excuses, setExcuses] = useState([]);
  const [selectedExcuse, setSelectedExcuse] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateExcuses = async (sit) => {
    setError("");
    setLoading(true);
    setSituation(sit);
    try {
      const result = await generateExcuses(sit);
      setExcuses(result);
      setStep(STEPS.EXCUSES);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectExcuse = async (excuse) => {
    setError("");
    setLoading(true);
    setSelectedExcuse(excuse);
    try {
      const result = await generateStory(situation, excuse);
      setStory(result);
      setStep(STEPS.STORY);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(STEPS.INPUT);
    setSituation("");
    setExcuses([]);
    setSelectedExcuse("");
    setStory("");
    setError("");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 0" }}>
      <BackgroundOrbs />

      <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: 640, margin: "0 auto 24px", padding: "0 16px" }}
          >
            <div style={{
              borderRadius: 12, padding: "12px 16px", fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171",
            }}>
              <span>⚠</span> {error}
              <button
                onClick={() => setError("")}
                style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#f87171", opacity: 0.7 }}
              >✕</button>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {loading && step === STEPS.INPUT && (
            <motion.div key="loader-input" style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px" }}>
              <Loader text="Consulting the excuse archives…" />
            </motion.div>
          )}
          {!loading && step === STEPS.INPUT && (
            <InputScreen key="input" onSubmit={handleGenerateExcuses} loading={loading} />
          )}
          {step === STEPS.EXCUSES && (
            <ExcuseScreen
              key="excuses"
              excuses={excuses}
              situation={situation}
              onSelect={handleSelectExcuse}
              loading={loading}
              onBack={handleReset}
            />
          )}
          {loading && step === STEPS.EXCUSES && (
            <motion.div key="loader-story" style={{ maxWidth: 640, margin: "24px auto 0", padding: "0 16px" }}>
              <Loader text="Fabricating plausible deniability…" />
            </motion.div>
          )}
          {!loading && step === STEPS.STORY && (
            <StoryScreen key="story" story={story} selectedExcuse={selectedExcuse} onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>

      <div style={{ position: "fixed", bottom: 16, left: 0, right: 0, textAlign: "center", zIndex: 10 }}>
        <p className="font-mono" style={{ color: "#1e1e2e", fontSize: 11 }}>
          NoCap Excuse — built with chaos and caffeine
        </p>
      </div>
    </div>
  );
}
