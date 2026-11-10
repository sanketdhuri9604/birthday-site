"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { RotateCcw, Waves } from "lucide-react";
import Confetti from "./Confetti";
import { birthdayData as D, type Progress } from "@/data/birthdayData";

/* Peaceful Sea-Glass, Aquamarine & Ocean Blue Floating Spheres */
const OCEAN_ORBS = [
  { color: "#38bdf8", left: 12, delay: 0, dur: 14 },
  { color: "#2dd4bf", left: 32, delay: 3, dur: 16 },
  { color: "#0284c7", left: 54, delay: 1.5, dur: 15 },
  { color: "#7dd3fc", left: 74, delay: 4.5, dur: 13 },
  { color: "#a5f3fc", left: 90, delay: 2, dur: 17 },
];

export default function FinalCelebration({ progress, onReplay }: { progress: Progress; onReplay: () => void }) {
  const F = D.finale;
  const [lit, setLit] = useState(true);
  const [burst, setBurst] = useState(0);
  const maxXp = D.missions.reduce((sum, m) => sum + m.xp, 0) + F.bonusXp;

  const blow = () => {
    if (!lit) return;
    setLit(false);
    setBurst((b) => b + 1);
  };

  return (
    <section className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-5 pb-16 pt-12 text-center">
      {/* Gentle Ocean Sparkles & Flakes */}
      <Confetti loop count={40} />
      {burst > 0 && <Confetti key={burst} count={75} />}

      {/* Floating Sea-Glass Spheres */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        {OCEAN_ORBS.map((b, i) => (
          <span
            key={i}
            className="balloon"
            style={{
              left: `${b.left}%`,
              background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${b.color} 60%, #061c2e 120%)`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#7dd3fc]">
          <Waves size={13} className="text-[#38bdf8]" />
          <span>Finale</span>
        </div>
        <h1 className="mt-2 font-display text-4xl font-normal tracking-tight text-[#f0fdfa] sm:text-5xl">
          {F.headline}
        </h1>
      </motion.div>

      {/* Oceanic Birthday Cake */}
      <button
        onClick={blow}
        aria-label="Blow out the candles"
        className="relative z-10 mt-10 cursor-pointer focus:outline-none"
      >
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="cake"
        >
          {/* Candles */}
          <div className="candles">
            {[0, 1, 2].map((i) => (
              <div key={i} className="candle">
                <div className={`flame${lit ? "" : " out"}`} />
              </div>
            ))}
          </div>
          {/* Layers */}
          <div className="layer top" />
          <div className="layer mid" />
          <div className="layer bottom" />
          <div className="plate" />
        </motion.div>
      </button>

      {/* Wish Instructions / Done State */}
      <p
        className={`relative z-10 mt-6 font-display text-xs leading-relaxed italic transition-colors ${
          lit ? "text-[#7dd3fc]" : "text-[#2dd4bf]"
        }`}
      >
        {lit ? F.wishText : F.wishDone}
      </p>

      {/* Heartfelt Birthday Message Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="glass relative z-10 mt-8 w-full rounded-2xl p-6 shadow-xl"
      >
        <p className="font-display text-sm font-normal leading-relaxed text-[#f0fdfa] italic">
          "{F.message}"
        </p>

        {/* Quiet Summary Tag */}
        <div className="mt-5 border-t border-sky-400/15 pt-4 text-center">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#38bdf8]">
            {progress.xp} / {maxXp} XP · {progress.badges.length} / {D.achievements.length} Badges
          </span>
        </div>
      </motion.div>

      {/* Replay Adventure Button */}
      <div className="relative z-10 mt-8 w-full">
        <button
          onClick={onReplay}
          className="btn-primary w-full text-xs font-medium"
        >
          <RotateCcw size={15} />
          <span>{F.replay}</span>
        </button>
      </div>
    </section>
  );
}
