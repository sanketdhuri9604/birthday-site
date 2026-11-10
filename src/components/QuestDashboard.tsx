"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Lock, Waves } from "lucide-react";
import { birthdayData as D, type MissionId, type Progress } from "@/data/birthdayData";
import MiniGames from "./MiniGames";

type Props = {
  progress: Progress;
  onFinishMission: (id: MissionId, xp: number) => void;
  onContinue: () => void;
};

export default function QuestDashboard({ progress, onFinishMission, onContinue }: Props) {
  const [active, setActive] = useState<MissionId | null>(null);

  const total = D.missions.length;
  const doneCount = progress.done.length;
  const pct = Math.round((doneCount / total) * 100);
  const boxUnlocked = D.missions.filter((m) => m.id !== "box").every((m) => progress.done.includes(m.id));
  const allDone = doneCount === total;

  if (active) {
    return <MiniGames game={active} done={progress.done} onComplete={onFinishMission} onExit={() => setActive(null)} />;
  }

  return (
    <section className="relative mx-auto w-full max-w-md px-5 pb-20 pt-10">
      {/* Header */}
      <header className="text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#7dd3fc]">
          <Waves size={13} className="text-[#38bdf8]" />
          <span>Chapter One</span>
        </div>
        <h2 className="mt-2 font-display text-3xl font-normal tracking-tight text-[#f0fdfa]">
          {D.dashboard.title}
        </h2>
        <p className="mt-2 text-xs font-normal leading-relaxed text-[#8cb2c9]">
          {D.dashboard.subtitle}
        </p>
      </header>

      {/* Ocean Progress Card */}
      <div className="glass mt-8 rounded-2xl p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between text-xs font-medium">
          <span className="text-[#38bdf8] tracking-wider font-medium">
            {progress.xp} XP Earned
          </span>
          <span className="text-[#8cb2c9]">
            {doneCount} / {total} Completed
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#2dd4bf] shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Mission Cards List */}
      <div className="mt-6 flex flex-col gap-3">
        {D.missions.map((m, i) => {
          const isDone = progress.done.includes(m.id);
          const locked = m.id === "box" && !boxUnlocked;

          return (
            <motion.button
              key={m.id}
              disabled={locked}
              onClick={() => setActive(m.id)}
              whileTap={!locked ? { scale: 0.99 } : {}}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: locked ? 0.45 : 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`glass group relative flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all ${
                isDone ? "border-[#2dd4bf]/40 bg-[#2dd4bf]/[0.03]" : ""
              }`}
            >
              {/* Left Emoji Icon in Sea-Glass Box */}
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-sky-400/20 bg-sky-500/[0.08] text-2xl shadow-sm">
                {m.emoji}
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <span className="block font-display text-[0.98rem] font-medium leading-snug text-[#f0fdfa]">
                  {m.title}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-[#8cb2c9]">
                  {locked ? D.dashboard.lockedHint : m.teaser}
                </span>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 text-xs font-medium">
                {isDone ? (
                  <span className="inline-flex items-center gap-1 text-[#2dd4bf]">
                    <Check size={14} /> Done
                  </span>
                ) : locked ? (
                  <span className="text-white/30">
                    <Lock size={15} />
                  </span>
                ) : (
                  <span className="text-[#38bdf8]">
                    +{m.xp}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* When All Missions Completed */}
      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mt-8 rounded-2xl border-[#38bdf8]/40 p-6 text-center shadow-xl"
        >
          <p className="font-display text-base font-normal text-[#f0fdfa] italic">
            {D.dashboard.allDoneText}
          </p>
          <button
            onClick={onContinue}
            className="btn-primary pulse-ring mt-4 w-full text-sm font-medium"
          >
            <span>{D.dashboard.continueButton}</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      )}

      {/* Unlocked Notes */}
      <div className="mt-12">
        <h3 className="font-display text-lg font-normal tracking-wide text-[#f0fdfa]">
          Personal Notes
        </h3>
        <p className="mt-0.5 text-xs text-[#8cb2c9]">Words unlocked along the waves</p>

        <div className="mt-4 flex flex-col gap-2.5">
          {D.missions.map((m) => {
            const open = progress.done.includes(m.id);
            return (
              <div
                key={m.id}
                className={`glass rounded-xl p-4 text-xs transition-all ${
                  open ? "border-sky-400/20 bg-sky-500/[0.04]" : "opacity-40"
                }`}
              >
                {open ? (
                  <div className="flex items-start gap-3 leading-relaxed text-[#dbeafe]">
                    <span className="text-lg opacity-85">{m.emoji}</span>
                    <span className="font-display text-[0.88rem] leading-relaxed italic text-[#f0fdfa]">
                      "{m.reward}"
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[#8cb2c9]">
                    <Lock size={13} />
                    <span>Complete “{m.title}” to read</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestones Shelf */}
      <div className="mt-12">
        <h3 className="font-display text-lg font-normal tracking-wide text-[#f0fdfa]">
          Milestones
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {D.achievements.map((a) => {
            const got = progress.badges.includes(a.id);
            return (
              <div
                key={a.id}
                className={`glass flex flex-col items-center justify-center rounded-xl p-3 text-center transition-all ${
                  got ? "border-[#38bdf8]/35 bg-[#38bdf8]/[0.05]" : "opacity-30 grayscale"
                }`}
                title={got ? a.description : "Locked"}
              >
                <div className="text-2xl">{got ? a.emoji : "🔒"}</div>
                <div className="mt-2 font-display text-[11px] leading-tight text-[#f0fdfa]">
                  {got ? a.name : "—"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
