"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import { birthdayData as D } from "@/data/birthdayData";

const fill = (s: string) =>
  s.replace(/\{\{(\w+)\}\}/g, (_m, key: string) => {
    if (key === "name") return D.friendName;
    if (key === "senderName") return D.senderName;
    return D.letter.placeholders[key] ?? `{{${key}}}`;
  });

export default function BirthdayLetter({ onNext }: { onNext: () => void }) {
  const L = D.letter;
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");
  const [shown, setShown] = useState(0);

  const text = useMemo(() => L.paragraphs.map(fill).join("\n\n"), [L.paragraphs]);
  const done = shown >= text.length;

  const openEnvelope = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => setPhase("open"), reduce ? 0 : 1200);
  };

  useEffect(() => {
    if (phase !== "open") return;
    if (reduce) {
      setShown(text.length);
      return;
    }
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= text.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 28);
    return () => clearInterval(id);
  }, [phase, reduce, text]);

  return (
    <section className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-5 py-16">
      <AnimatePresence mode="wait">
        {phase !== "open" ? (
          <motion.div key="env" exit={{ opacity: 0, scale: 0.96 }} className="text-center">
            {/* Deep Ocean Wax-Sealed Envelope */}
            <button
              onClick={openEnvelope}
              aria-label="Open the envelope"
              className="relative mx-auto block h-52 w-76 max-w-full cursor-pointer focus:outline-none"
              style={{ perspective: 900 }}
            >
              {/* Envelope Body */}
              <div
                className="absolute inset-0 rounded-xl shadow-2xl"
                style={{
                  background: "linear-gradient(145deg, #0f2b48 0%, #081a2e 100%)",
                  border: "1px solid rgba(125, 211, 252, 0.2)",
                  boxShadow: "0 20px 40px rgba(3, 14, 28, 0.6)",
                }}
              />

              {/* Seafoam Parchment sliding out */}
              <motion.div
                className="absolute left-3 right-3 top-3 h-40 rounded-lg bg-[#f0fdfa] shadow-inner"
                animate={{ y: phase === "opening" ? -60 : 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              />

              {/* Envelope Pocket */}
              <div
                className="absolute inset-0 rounded-xl shadow-sm"
                style={{
                  background: "linear-gradient(160deg, #0c243d 0%, #061424 100%)",
                  clipPath: "polygon(0 100%, 0 35%, 50% 62%, 100% 35%, 100% 100%)",
                }}
              />

              {/* Envelope Flap */}
              <motion.div
                className="absolute inset-x-0 top-0 h-28"
                style={{
                  transformOrigin: "top",
                  background: "linear-gradient(180deg, #143557 0%, #0a1f33 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
                animate={{ rotateX: phase === "closed" ? 0 : -180 }}
                transition={{ duration: 0.55 }}
              />

              {/* Pearl Wax Seal Heart */}
              {phase === "closed" && (
                <span className="absolute left-1/2 top-[76px] grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-tr from-[#0284c7] via-[#38bdf8] to-[#bae6fd] shadow-[0_2px_14px_rgba(56,189,248,0.5)] ring-1 ring-white/50">
                  <Heart size={16} className="fill-[#041421] text-[#041421]" />
                </span>
              )}
            </button>

            <p className="mt-8 font-display text-sm text-[#bae6fd]/80 italic">
              {L.hint}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* Peaceful Seafoam Pearl Stationery */}
            <div className="rounded-2xl border border-sky-200/50 bg-[#f4fbfb] p-6 text-[#0f2b48] shadow-2xl sm:p-7">
              <div className="mb-4 text-center">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#0284c7]">
                  A Letter for You
                </span>
                <h2 className="mt-1 font-display text-2xl font-normal tracking-tight text-[#0c243d]">
                  {L.heading}
                </h2>
              </div>

              <div className="mt-5 border-t border-sky-100 pt-5">
                <p className="font-display text-[0.98rem] font-normal leading-relaxed text-[#091e33] italic">
                  {text.slice(0, shown)}
                  {!done && <span className="caret" />}
                </p>
              </div>

              {done && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mt-6 border-t border-sky-100 pt-4"
                >
                  <p className="font-display text-sm font-normal italic text-[#0369a1]">
                    {L.signOff}
                  </p>
                  <p className="font-display text-base font-medium text-[#0c243d]">
                    {D.senderName}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="mt-6">
              {!done ? (
                <button
                  className="btn-ghost w-full text-xs"
                  onClick={() => setShown(text.length)}
                >
                  Skip typing
                </button>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="btn-primary pulse-ring w-full text-xs font-medium"
                  onClick={onNext}
                >
                  <span>{L.next}</span>
                  <ArrowRight size={15} />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
