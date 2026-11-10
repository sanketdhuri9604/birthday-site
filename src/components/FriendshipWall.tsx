"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Waves } from "lucide-react";
import { birthdayData as D } from "@/data/birthdayData";

function JokeCard({ emoji, front, back }: { emoji: string; front: string; back: string }) {
  const [open, setOpen] = useState(false);
  const hide = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as const;

  return (
    <button
      onClick={() => setOpen((o) => !o)}
      aria-pressed={open}
      className="relative h-48 w-full text-left focus:outline-none"
      style={{ perspective: 900 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: open ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div
          className="glass absolute inset-0 flex flex-col justify-between rounded-2xl p-5 shadow-sm transition-all hover:border-sky-400/30"
          style={hide}
        >
          <span className="text-3xl opacity-85">{emoji}</span>
          <p className="font-display text-sm font-medium leading-snug text-[#f0fdfa]">{front}</p>
          <span className="text-[11px] text-[#38bdf8]">
            Tap to reveal ✦
          </span>
        </div>

        {/* Back of Card (Punchline) */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-sky-400/30 bg-gradient-to-br from-[#0c2d48] to-[#071a2e] p-5 shadow-md"
          style={{ ...hide, transform: "rotateY(180deg)" }}
        >
          <p className="font-display text-xs font-normal leading-relaxed text-[#e0f2fe] italic">
            "{back}"
          </p>
        </div>
      </motion.div>
    </button>
  );
}

function Moment({ title, text }: { title: string; text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass rounded-xl p-4 transition-all hover:border-sky-400/25">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-display text-xs font-medium text-[#f0fdfa]">{title}</h4>
        <button
          className="btn-ghost !min-h-8 shrink-0 !px-3 text-[11px]"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide" : "Read"}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pt-3 font-display text-xs leading-relaxed italic text-[#dbeafe]/90"
          >
            {text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FriendshipWall({ onNext }: { onNext: () => void }) {
  const w = D.wall;
  const [tease, setTease] = useState(-1);
  const [fact, setFact] = useState(-1);

  const nextTease = () => setTease((t) => (t + 1) % w.teases.length);
  const randomFact = () =>
    setFact((f) => {
      if (w.facts.length < 2) return 0;
      let n = f;
      while (n === f) n = Math.floor(Math.random() * w.facts.length);
      return n;
    });

  return (
    <section className="relative mx-auto w-full max-w-md px-5 pb-20 pt-10">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#7dd3fc]">
          <Waves size={13} className="text-[#38bdf8]" />
          <span>Inside Jokes</span>
        </div>
        <h2 className="mt-2 font-display text-3xl font-normal tracking-tight text-[#f0fdfa]">
          {w.title}
        </h2>
        <p className="mt-2 text-xs font-normal leading-relaxed text-[#8cb2c9]">
          {w.subtitle}
        </p>
      </header>

      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {w.jokes.map((j, i) => (
          <JokeCard key={i} {...j} />
        ))}
      </div>

      {/* Moments */}
      <div className="mt-12">
        <h3 className="mb-3 font-display text-lg font-normal tracking-wide text-[#f0fdfa]">
          {w.momentsTitle}
        </h3>
        <div className="flex flex-col gap-2.5">
          {w.moments.map((m, i) => (
            <Moment key={i} {...m} />
          ))}
        </div>
      </div>

      {/* Tease Box */}
      <div className="glass mt-10 rounded-2xl p-5 text-center">
        <button className="btn-primary w-full text-xs font-medium" onClick={nextTease}>
          <span>{w.teaseButton}</span>
        </button>
        <div className="mt-4 flex min-h-14 items-center justify-center">
          <AnimatePresence mode="wait">
            {tease >= 0 ? (
              <motion.p
                key={tease}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-display text-xs leading-relaxed italic text-[#dbeafe]"
              >
                "{w.teases[tease]}"
              </motion.p>
            ) : (
              <p className="text-[11px] text-[#8cb2c9]">Tap for a gentle reminder ✦</p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Random Fun Fact Box */}
      <div className="glass mt-4 rounded-2xl p-5 text-center">
        <button className="btn-ghost w-full text-xs font-medium" onClick={randomFact}>
          <span>{w.factButton}</span>
        </button>
        <div className="mt-4 flex min-h-14 items-center justify-center">
          <AnimatePresence mode="wait">
            {fact >= 0 ? (
              <motion.p
                key={fact}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-display text-xs leading-relaxed italic text-[#7dd3fc]"
              >
                {w.facts[fact]}
              </motion.p>
            ) : (
              <p className="text-[11px] text-[#8cb2c9]">Tap for a verified friendship fact ✦</p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Next CTA */}
      <div className="mt-12">
        <button onClick={onNext} className="btn-primary w-full text-xs font-medium">
          <span>{w.next}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
