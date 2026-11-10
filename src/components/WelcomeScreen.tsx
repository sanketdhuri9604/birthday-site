"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { birthdayData as D } from "@/data/birthdayData";

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const w = D.welcome;

  return (
    <section className="relative mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 py-16 text-center">
      {/* Soft ocean bioluminescence ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-0 -z-10 h-72 w-72 rounded-full bg-sky-600/10 blur-[100px]"
      />

      {/* Understated peaceful ocean badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/[0.05] px-4 py-1.5 text-[11px] font-medium tracking-[0.25em] text-[#7dd3fc] uppercase backdrop-blur-md shadow-sm"
      >
        <Sparkles size={12} className="text-[#38bdf8]" />
        <span>{D.siteTitle}</span>
        <span className="text-white/30">•</span>
        <span>{D.birthdayLabel}</span>
      </motion.div>

      {/* Intimate Greeting */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="font-display text-4xl font-normal tracking-tight text-[#f0fdfa] sm:text-5xl"
      >
        {w.greeting}
      </motion.h1>

      {/* Frosted Sea-Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass mt-10 w-full rounded-2xl p-7 shadow-2xl"
      >
        <p className="font-display text-lg font-normal leading-relaxed text-[#e0f2fe]/90 italic">
          {w.line}
        </p>

        <div className="mt-8">
          <button
            onClick={onStart}
            className="btn-primary pulse-ring w-full text-[0.95rem] font-medium tracking-wide shadow-lg"
          >
            <span>{w.button}</span>
            <ArrowRight size={16} className="opacity-80" />
          </button>
        </div>
      </motion.div>

      {/* Peaceful tagline footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-12 max-w-xs font-display text-xs leading-relaxed text-[#93c5fd] italic"
      >
        {D.tagline}
      </motion.p>
    </section>
  );
}
