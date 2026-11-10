"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { birthdayData as D, type MissionId, type Progress, type Trigger } from "@/data/birthdayData";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestDashboard from "@/components/QuestDashboard";
import MemoryTimeline from "@/components/MemoryTimeline";
import FriendshipWall from "@/components/FriendshipWall";
import BirthdayLetter from "@/components/BirthdayLetter";
import FinalCelebration from "@/components/FinalCelebration";

type Stage = "welcome" | "dashboard" | "timeline" | "wall" | "letter" | "finale";
type Toast = { id: number; emoji: string; text: string };

const STAGES: Stage[] = ["welcome", "dashboard", "timeline", "wall", "letter", "finale"];
const KEY = "suhani-birthday-quest-v1";
const EMPTY: Progress = { xp: 0, done: [], badges: [] };

export default function Page() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [ready, setReady] = useState(false);
  const pr = useRef<Progress>(EMPTY);

  const commit = useCallback((next: Progress) => {
    pr.current = next;
    setProgress(next);
  }, []);

  const notify = useCallback((emoji: string, text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, emoji, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  const withBadge = useCallback(
    (p: Progress, trigger: Trigger): Progress => {
      const a = D.achievements.find((x) => x.trigger === trigger);
      if (!a || p.badges.includes(a.id)) return p;
      notify(a.emoji, `Badge unlocked: ${a.name}`);
      return { ...p, badges: [...p.badges, a.id] };
    },
    [notify]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as { stage?: Stage; progress?: Progress };
        if (s.progress) {
          pr.current = s.progress;
          setProgress(s.progress);
        }
        if (s.stage && STAGES.includes(s.stage)) setStage(s.stage);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ stage, progress }));
    } catch {
      /* storage may be unavailable */
    }
  }, [stage, progress, ready]);

  const finishMission = useCallback(
    (id: MissionId, xp: number) => {
      const p = pr.current;
      if (p.done.includes(id)) return;
      notify("✦", `+${xp} XP`);
      commit(withBadge({ ...p, xp: p.xp + xp, done: [...p.done, id] }, id));
    },
    [commit, notify, withBadge]
  );

  const begin = useCallback(() => {
    commit(withBadge(pr.current, "start"));
    setStage("dashboard");
  }, [commit, withBadge]);

  const goFinale = useCallback(() => {
    const a = D.achievements.find((x) => x.trigger === "finale");
    let p = pr.current;
    if (a && !p.badges.includes(a.id)) {
      p = { ...p, xp: p.xp + D.finale.bonusXp };
      notify("✦", `+${D.finale.bonusXp} XP`);
      commit(withBadge(p, "finale"));
    }
    setStage("finale");
  }, [commit, notify, withBadge]);

  const replay = useCallback(() => {
    commit(EMPTY);
    setStage("welcome");
    window.scrollTo({ top: 0 });
  }, [commit]);

  return (
    <MotionConfig reducedMotion="user">
      {/* Bioluminescent Ocean Motes in Background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {[
          { top: "12%", left: "18%", delay: "0s", size: "2.5px" },
          { top: "28%", left: "82%", delay: "1.4s", size: "3px" },
          { top: "48%", left: "12%", delay: "0.7s", size: "2.5px" },
          { top: "65%", left: "86%", delay: "2.1s", size: "3px" },
          { top: "78%", left: "24%", delay: "1.1s", size: "2.5px" },
          { top: "88%", left: "68%", delay: "2.5s", size: "3px" },
        ].map((star, i) => (
          <span
            key={i}
            className="star-dot"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Sea-Glass Toast Notifications */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              className="glass inline-flex items-center gap-2 rounded-xl border border-sky-400/25 bg-[#06182c]/90 px-4 py-2 text-xs font-medium text-[#f0fdfa] shadow-xl backdrop-blur-md"
            >
              <span className="text-[#38bdf8]">{t.emoji}</span>
              <span>{t.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <main className="relative z-10 min-h-dvh">
        {ready && (
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {stage === "welcome" && <WelcomeScreen onStart={begin} />}
              {stage === "dashboard" && (
                <QuestDashboard progress={progress} onFinishMission={finishMission} onContinue={() => setStage("timeline")} />
              )}
              {stage === "timeline" && <MemoryTimeline onNext={() => setStage("wall")} />}
              {stage === "wall" && <FriendshipWall onNext={() => setStage("letter")} />}
              {stage === "letter" && <BirthdayLetter onNext={goFinale} />}
              {stage === "finale" && <FinalCelebration progress={progress} onReplay={replay} />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </MotionConfig>
  );
}
