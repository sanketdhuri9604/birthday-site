"use client";

import { motion } from "motion/react";
import { ArrowRight, Heart, Waves } from "lucide-react";
import { birthdayData as D } from "@/data/birthdayData";

export default function MemoryTimeline({ onNext }: { onNext: () => void }) {
  const t = D.timeline;

  return (
    <section className="relative mx-auto w-full max-w-md px-5 pb-20 pt-10">
      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#7dd3fc]">
          <Waves size={13} className="text-[#38bdf8]" />
          <span>Memories</span>
        </div>
        <h2 className="mt-2 font-display text-3xl font-normal tracking-tight text-[#f0fdfa]">
          {t.title}
        </h2>
        <p className="mt-2 text-xs font-normal leading-relaxed text-[#8cb2c9]">
          {t.subtitle}
        </p>
      </header>

      <div className="relative pl-12 sm:pl-14">
        {/* Subtle Ocean Blue & Seafoam Timeline Spine */}
        <div
          aria-hidden
          className="absolute left-[20px] top-3 bottom-6 w-[1.5px] rounded-full bg-gradient-to-b from-[#0284c7] via-[#38bdf8]/60 to-[#2dd4bf]/40 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
        />

        {t.entries.map((e, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative mb-8"
          >
            {/* Minimalist Sea-Glass Milestone Bubble */}
            <div className="absolute -left-12 sm:-left-14 top-1 grid h-10 w-10 place-items-center rounded-xl border border-sky-400/20 bg-[#09223a] text-lg shadow-md">
              {e.icon}
            </div>

            {/* Sea-Glass Memory Card */}
            <div className="glass rounded-2xl p-5 shadow-sm transition-all hover:border-sky-400/30">
              {e.date && (
                <span className="mb-1.5 inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-[#38bdf8]">
                  {e.date}
                </span>
              )}
              <h3 className="font-display text-base font-medium leading-snug text-[#f0fdfa]">
                {e.title}
              </h3>
              <p className="mt-2 font-display text-xs leading-relaxed italic text-[#dbeafe]/90">
                {e.description}
              </p>
            </div>
          </motion.article>
        ))}

        {/* Quiet Heart Node */}
        <div className="absolute left-[13px] -bottom-2 grid h-4 w-4 place-items-center rounded-full bg-[#0284c7]/40 shadow-[0_0_8px_rgba(56,189,248,0.5)]">
          <Heart size={9} className="fill-[#38bdf8] text-[#38bdf8]" />
        </div>
      </div>

      <div className="mt-12">
        <button onClick={onNext} className="btn-primary w-full text-xs font-medium">
          <span>{t.next}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
