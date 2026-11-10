"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, Lightbulb, Lock, RotateCcw, Undo2, Waves } from "lucide-react";
import Confetti from "./Confetti";
import { birthdayData as D, type MissionId } from "@/data/birthdayData";

type Props = {
  game: MissionId;
  done: MissionId[];
  onComplete: (id: MissionId, xp: number) => void;
  onExit: () => void;
};

type GameProps = { onWin: () => void; onExit: () => void; xp: number; reward: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function RewardPanel({
  title,
  body,
  xp,
  onExit,
  children,
}: {
  title: string;
  body?: string;
  xp: number;
  onExit: () => void;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="glass mt-6 rounded-2xl border-[#38bdf8]/35 p-6 text-center shadow-xl"
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#38bdf8]">
        +{xp} XP Unlocked
      </span>
      <h3 className="mt-2 font-display text-2xl font-normal text-[#f0fdfa]">{title}</h3>
      {body && <p className="mt-3 font-display text-sm leading-relaxed text-[#dbeafe] italic">{body}</p>}
      {children}
      <button className="btn-primary mt-6 w-full text-sm font-medium" onClick={onExit}>
        Back to Dashboard
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Game 1: Memory Match                                                */
/* ------------------------------------------------------------------ */
function MemoryMatch({ onWin, onExit, xp, reward }: GameProps) {
  const cfg = D.games.memory;
  const [deck] = useState(() => shuffle([...cfg.emojis, ...cfg.emojis]));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [lock, setLock] = useState(false);
  const won = matched.length === cfg.emojis.length;

  useEffect(() => {
    if (won) onWin();
  }, [won, onWin]);

  const flip = (i: number) => {
    if (lock || flipped.includes(i) || matched.includes(deck[i])) return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === 2) {
      setAttempts((a) => a + 1);
      setLock(true);
      const [a, b] = next;
      if (deck[a] === deck[b]) {
        setMatched((m) => [...m, deck[a]]);
        setFlipped([]);
        setLock(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLock(false);
        }, 750);
      }
    }
  };

  return (
    <div>
      <p className="mb-4 text-center font-display text-xs text-[#8cb2c9] italic">{cfg.intro}</p>
      <div className="mb-4 flex items-center justify-between text-xs font-medium text-[#8cb2c9]">
        <span>Attempts: {attempts}</span>
        <span className="text-[#38bdf8]">
          Pairs: {matched.length} / {cfg.emojis.length}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5" style={{ perspective: 900 }}>
        {deck.map((emoji, i) => {
          const isMatched = matched.includes(emoji);
          const up = flipped.includes(i) || isMatched;
          return (
            <button
              key={i}
              onClick={() => flip(i)}
              aria-label={up ? emoji : "Hidden card"}
              className="relative aspect-square focus:outline-none"
            >
              <motion.div
                className="absolute inset-0"
                animate={{ rotateY: up ? 180 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Back of Card (Sea-Glass Matte Card) */}
                <div
                  className="glass absolute inset-0 flex items-center justify-center rounded-xl border border-sky-400/20 bg-sky-500/[0.06] text-lg text-[#38bdf8]/60 shadow-sm transition-colors hover:border-sky-400/40"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <span>✦</span>
                </div>
                {/* Front of Card (Revealed Emoji) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-xl text-2xl shadow-md transition-all ${
                    isMatched
                      ? "border border-[#2dd4bf]/50 bg-[#2dd4bf]/15 shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                      : "border border-white/20 bg-white/[0.08]"
                  }`}
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <span>{emoji}</span>
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>

      {won && (
        <>
          <Confetti count={55} />
          <RewardPanel title={cfg.winTitle} body={reward} xp={xp} onExit={onExit}>
            <p className="mt-3 text-xs text-[#8cb2c9]">Solved in {attempts} attempts.</p>
          </RewardPanel>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Game 2: Friendship Quiz                                             */
/* ------------------------------------------------------------------ */
function Quiz({ onWin, onExit, xp, reward }: GameProps) {
  const cfg = D.games.quiz;
  const qs = cfg.questions;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = qs[i];

  const pick = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 >= qs.length) {
      setFinished(true);
      onWin();
    } else {
      setI(i + 1);
      setPicked(null);
    }
  };

  if (finished) {
    const pct = Math.round((score / qs.length) * 100);
    const res = [...cfg.results].reverse().find((r) => pct >= r.min) ?? cfg.results[0];
    return (
      <>
        {pct >= 70 && <Confetti count={60} />}
        <RewardPanel title={res.title} body={res.message} xp={xp} onExit={onExit}>
          <div className="my-4 inline-flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-500/[0.06] px-5 py-2">
            <span className="font-display text-2xl font-normal text-[#f0fdfa]">
              {score} / {qs.length} Correct
            </span>
          </div>
          <div className="rounded-xl border border-sky-400/15 bg-sky-500/[0.03] p-4 font-display text-xs leading-relaxed italic text-[#dbeafe]">
            "{reward}"
          </div>
        </RewardPanel>
      </>
    );
  }

  return (
    <div>
      <p className="mb-3 text-center font-display text-xs text-[#8cb2c9] italic">{cfg.intro}</p>
      <div className="mb-4 flex items-center justify-between text-xs font-medium text-[#8cb2c9]">
        <span>Question {i + 1} of {qs.length}</span>
        <span className="text-[#38bdf8]">Score: {score}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
        >
          <div className="glass rounded-2xl p-5 shadow-lg">
            <h3 className="font-display text-lg font-normal leading-snug text-[#f0fdfa]">{q.q}</h3>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            {q.options.map((opt, n) => {
              const isRight = picked !== null && n === q.correct;
              const isWrong = picked === n && n !== q.correct;
              return (
                <button
                  key={n}
                  onClick={() => pick(n)}
                  className={`min-h-12 rounded-xl border px-4 py-3 text-left text-xs font-medium transition-all ${
                    isRight
                      ? "border-[#2dd4bf]/60 bg-[#2dd4bf]/15 text-[#f0fdfa] shadow-[0_0_15px_rgba(45,212,191,0.25)]"
                      : isWrong
                        ? "border-[#f43f5e]/60 bg-[#f43f5e]/15 text-[#f0fdfa]"
                        : "glass hover:border-sky-400/30"
                  } ${picked !== null && !isRight && !isWrong ? "opacity-35" : ""}`}
                >
                  <span className="mr-2 text-white/40">{n + 1}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {picked !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 text-center">
          <div
            className={`rounded-xl border p-3.5 font-display text-xs leading-relaxed italic ${
              picked === q.correct
                ? "border-[#2dd4bf]/40 bg-[#2dd4bf]/[0.08] text-[#2dd4bf]"
                : "border-[#f43f5e]/40 bg-[#f43f5e]/[0.08] text-[#fca5a5]"
            }`}
          >
            {picked === q.correct ? q.right : q.wrong}
          </div>
          <button className="btn-primary mt-4 w-full text-xs font-medium" onClick={next}>
            {i + 1 >= qs.length ? "View result" : "Next question →"}
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Game 3: Catch the Stars                                             */
/* ------------------------------------------------------------------ */
type Star = { x: number; y: number; vy: number; emoji: string };
type Spark = { x: number; y: number; vx: number; vy: number; life: number };
const W = 360;
const H = 520;

function CatchStars({ onWin, onExit, xp, reward }: GameProps) {
  const cfg = D.games.stars;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "won" | "lost">("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(cfg.durationSeconds);
  const input = useRef({ left: false, right: false });
  const basket = useRef(0.5);

  const start = () => {
    setScore(0);
    setTimeLeft(cfg.durationSeconds);
    basket.current = 0.5;
    setPhase("playing");
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        input.current.left = true;
        e.preventDefault();
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        input.current.right = true;
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") input.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") input.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const stars: Star[] = [];
    const sparks: Spark[] = [];
    let caught = 0;
    let elapsed = 0;
    let spawn = 0;
    let last = performance.now();
    let shownSec = cfg.durationSeconds;
    let raf = 0;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;
      spawn -= dt;

      const dir = (input.current.right ? 1 : 0) - (input.current.left ? 1 : 0);
      basket.current = Math.min(0.94, Math.max(0.06, basket.current + dir * dt * 1.1));

      if (spawn <= 0) {
        stars.push({
          x: 30 + Math.random() * (W - 60),
          y: -30,
          vy: 125 + Math.random() * 85 + elapsed * 2.2,
          emoji: "✦",
        });
        spawn = Math.max(0.35, 0.7 - elapsed * 0.01);
      }

      const bx = basket.current * W;
      const by = H - 52;
      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.y += s.vy * dt;
        if (s.y > by - 18 && s.y < by + 22 && Math.abs(s.x - bx) < 46) {
          stars.splice(i, 1);
          caught++;
          setScore(caught);
          for (let k = 0; k < 6; k++) {
            sparks.push({
              x: s.x,
              y: s.y,
              vx: (Math.random() - 0.5) * 180,
              vy: (Math.random() - 0.8) * 180,
              life: 1,
            });
          }
          continue;
        }
        if (s.y > H + 30) {
          stars.splice(i, 1);
          continue;
        }
        ctx.fillStyle = "#38bdf8";
        ctx.font = "24px serif";
        ctx.fillText(s.emoji, s.x, s.y);
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 2.2;
        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = "#7dd3fc";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = "#38bdf8";
      ctx.font = "38px sans-serif";
      ctx.fillText("🧺", bx, by);

      const left = Math.max(0, Math.ceil(cfg.durationSeconds - elapsed));
      if (left !== shownSec) {
        shownSec = left;
        setTimeLeft(left);
      }

      if (caught >= cfg.target) {
        setPhase("won");
        onWin();
        return;
      }
      if (elapsed >= cfg.durationSeconds) {
        setPhase("lost");
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase, cfg.durationSeconds, cfg.target, onWin]);

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    basket.current = Math.min(0.94, Math.max(0.06, (e.clientX - r.left) / r.width));
  };

  const hold = (side: "left" | "right", on: boolean) => {
    input.current[side] = on;
  };

  return (
    <div>
      <p className="mb-3 text-center font-display text-xs text-[#8cb2c9] italic">{cfg.intro}</p>
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-[#8cb2c9]">
        <span>Collected: {score} / {cfg.target}</span>
        <span className="text-[#38bdf8]">⏱ {timeLeft}s remaining</span>
      </div>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-[#38bdf8] transition-all"
          style={{ width: `${Math.min(100, (score / cfg.target) * 100)}%` }}
        />
      </div>

      <div
        className="glass relative mx-auto overflow-hidden rounded-2xl border border-sky-400/20"
        style={{ width: "min(100%, calc(min(58dvh, 520px) * 0.6923))", aspectRatio: "360 / 520" }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            move(e);
          }}
          onPointerMove={move}
        />
        {phase !== "playing" && phase !== "won" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 p-6 text-center backdrop-blur-sm">
            {phase === "lost" && <p className="font-display text-sm text-[#dbeafe] italic">{cfg.loseMessage}</p>}
            <button className="btn-primary" onClick={start}>
              {phase === "lost" ? (
                <>
                  <RotateCcw size={16} /> Try again
                </>
              ) : (
                <>Begin catching</>
              )}
            </button>
          </div>
        )}
      </div>

      {phase === "playing" && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(["left", "right"] as const).map((side) => (
            <button
              key={side}
              className="btn-ghost select-none !py-2.5"
              style={{ touchAction: "none" }}
              onPointerDown={() => hold(side, true)}
              onPointerUp={() => hold(side, false)}
              onPointerLeave={() => hold(side, false)}
              onPointerCancel={() => hold(side, false)}
              aria-label={`Move ${side}`}
            >
              {side === "left" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          ))}
        </div>
      )}

      {phase === "won" && (
        <>
          <Confetti count={55} />
          <RewardPanel title={cfg.winTitle} body={cfg.winMessage} xp={xp} onExit={onExit}>
            <div className="mt-3 rounded-xl border border-sky-400/15 bg-sky-500/[0.03] p-4 font-display text-xs leading-relaxed italic text-[#dbeafe]">
              "{reward}"
            </div>
          </RewardPanel>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Game 4: Unlock the Secret                                           */
/* ------------------------------------------------------------------ */
function Secret({ onWin, onExit, xp, reward }: GameProps) {
  const cfg = D.games.secret;
  const answer = cfg.answer.toUpperCase();
  const [tiles] = useState(() => shuffle((answer + cfg.decoys.toUpperCase()).split("")));
  const [picked, setPicked] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [hints, setHints] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [solved, setSolved] = useState(false);

  const guess = picked.map((i) => tiles[i]).join("");

  const check = () => {
    if (guess === answer) {
      setSolved(true);
      onWin();
    } else {
      setAttempts((a) => a + 1);
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setPicked([]);
      }, 650);
    }
  };

  return (
    <div>
      <p className="mb-3 text-center font-display text-xs text-[#8cb2c9] italic">{cfg.intro}</p>

      {/* Clues Card */}
      <div className="glass rounded-2xl p-4">
        <ol className="list-inside list-decimal space-y-2 font-display text-xs leading-relaxed text-[#f0fdfa] italic">
          {cfg.clues.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ol>
        {hints > 0 && (
          <ul className="mt-3 space-y-1.5 border-t border-sky-400/15 pt-3 text-xs text-[#38bdf8]">
            {cfg.hints.slice(0, hints).map((h, i) => (
              <li key={i}>✦ {h}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Answer Slots */}
      <motion.div
        animate={wrong ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        className="mt-6 flex justify-center gap-2"
      >
        {answer.split("").map((_, i) => (
          <div
            key={i}
            className={`grid h-12 w-11 place-items-center rounded-xl border font-display text-xl transition-all ${
              wrong
                ? "border-[#f43f5e] bg-[#f43f5e]/20 text-[#fca5a5]"
                : solved
                  ? "border-[#2dd4bf] bg-[#2dd4bf]/20 text-[#f0fdfa]"
                  : "glass border-sky-400/25 text-[#f0fdfa]"
            }`}
          >
            {guess[i] ?? ""}
          </div>
        ))}
      </motion.div>

      {!solved && (
        <>
          {/* Alphabet Tiles */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {tiles.map((t, i) => (
              <button
                key={i}
                disabled={picked.includes(i) || picked.length >= answer.length}
                onClick={() => setPicked((p) => [...p, i])}
                className="grid h-12 w-12 place-items-center rounded-xl border border-sky-400/20 bg-sky-500/[0.08] font-display text-xl text-[#f0fdfa] transition-all hover:border-sky-400/40 hover:bg-sky-500/[0.15] disabled:opacity-20"
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="btn-ghost" onClick={() => setPicked((p) => p.slice(0, -1))} disabled={!picked.length}>
              <Undo2 size={15} /> Undo
            </button>
            <button
              className="btn-ghost"
              onClick={() => setHints((h) => Math.min(cfg.hints.length, h + 1))}
              disabled={hints >= cfg.hints.length}
            >
              <Lightbulb size={15} /> Hint ({hints}/{cfg.hints.length})
            </button>
          </div>
          <button
            className="btn-primary mt-3 w-full text-xs font-medium"
            onClick={check}
            disabled={picked.length !== answer.length}
          >
            Reveal Secret
          </button>
          <p className="mt-2 text-center text-[11px] text-[#8cb2c9]">Attempts: {attempts}</p>
        </>
      )}

      {solved && (
        <>
          <Confetti count={55} />
          <RewardPanel title={cfg.successTitle} body={cfg.successMessage} xp={xp} onExit={onExit}>
            <div className="mt-3 rounded-xl border border-sky-400/15 bg-sky-500/[0.03] p-4 font-display text-xs leading-relaxed italic text-[#dbeafe]">
              "{reward}"
            </div>
          </RewardPanel>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Game 5: The Final Mystery Box                                       */
/* ------------------------------------------------------------------ */
function MysteryBox({ done, onWin, onExit, xp, reward }: GameProps & { done: MissionId[] }) {
  const cfg = D.games.box;
  const missing = D.missions.filter((m) => m.id !== "box" && !done.includes(m.id)).length;
  const alreadyOpen = done.includes("box");
  const [open, setOpen] = useState(alreadyOpen);
  const [fresh, setFresh] = useState(false);
  const locked = missing > 0;

  const openBox = () => {
    if (locked || open) return;
    setOpen(true);
    setFresh(true);
    onWin();
  };

  return (
    <div className="text-center">
      <p className="mb-6 font-display text-xs text-[#8cb2c9] italic">{locked ? cfg.lockedText : cfg.intro}</p>

      {/* Ocean Sapphire Luxury Gift Box */}
      <div className="relative mx-auto h-48 w-48">
        {open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.6, opacity: 0.7 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 65%)",
            }}
          />
        )}
        <motion.button
          onClick={openBox}
          disabled={locked || open}
          aria-label="Mystery box"
          animate={!open && !locked ? { y: [0, -3, 0] } : { y: 0 }}
          transition={{ repeat: !open && !locked ? Infinity : 0, duration: 2.5 }}
          className={`absolute inset-0 cursor-pointer focus:outline-none ${locked ? "opacity-40 grayscale" : ""}`}
        >
          {/* Box Base (Deep Ocean Sapphire with Seafoam Silk Ribbon) */}
          <div
            className="absolute bottom-0 left-3 right-3 h-28 overflow-hidden rounded-xl shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #075985 0%, #0c2d48 100%)",
              border: "1px solid rgba(125, 211, 252, 0.35)",
            }}
          >
            {/* Seafoam Silk Ribbon */}
            <div
              className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2"
              style={{ background: "linear-gradient(90deg, #0d9488 0%, #5eead4 50%, #0f766e 100%)" }}
            />
          </div>

          {/* Box Lid */}
          <motion.div
            className="absolute left-1 right-1 h-12 overflow-hidden rounded-lg shadow-xl"
            style={{
              bottom: 104,
              background: "linear-gradient(145deg, #0284c7 0%, #0369a1 100%)",
              border: "1px solid rgba(186, 230, 253, 0.4)",
            }}
            animate={open ? { y: -80, x: 30, rotate: -18, opacity: 0.0 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: alreadyOpen && !fresh ? 0 : 0.85 }}
          >
            <div
              className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2"
              style={{ background: "linear-gradient(90deg, #0d9488 0%, #5eead4 50%, #0f766e 100%)" }}
            />
          </motion.div>

          {/* Sea-Glass Bow */}
          {!open && (
            <span className="absolute left-1/2 top-[12px] -translate-x-1/2 text-3xl opacity-90">
              🎀
            </span>
          )}

          {/* Locked Badge */}
          {locked && (
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm">
                <Lock size={20} className="text-[#38bdf8]" />
              </span>
            </span>
          )}
        </motion.button>
      </div>

      {locked ? (
        <p className="mt-6 text-xs text-[#8cb2c9]">
          {missing} mission{missing > 1 ? "s" : ""} left to complete first.
        </p>
      ) : !open ? (
        <p className="mt-6 font-display text-sm text-[#7dd3fc] italic animate-pulse">
          {cfg.tapText}
        </p>
      ) : (
        <>
          {fresh && <Confetti count={70} />}
          <RewardPanel title={cfg.surpriseTitle} body={cfg.surpriseMessage} xp={xp} onExit={onExit}>
            <div className="mt-4 rounded-xl border border-sky-400/15 bg-sky-500/[0.03] p-4 font-display text-xs leading-relaxed italic text-[#dbeafe]">
              "{reward}"
            </div>
          </RewardPanel>
        </>
      )}

      {locked && (
        <button className="btn-ghost mt-6" onClick={onExit}>
          Back to Dashboard
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Wrapper                                                        */
/* ------------------------------------------------------------------ */
export default function MiniGames({ game, done, onComplete, onExit }: Props) {
  const mission = D.missions.find((m) => m.id === game)!;
  const cb = useRef<() => void>(() => {});

  useEffect(() => {
    cb.current = () => onComplete(game, mission.xp);
  });
  const win = useCallback(() => cb.current(), []);

  const common: GameProps = { onWin: win, onExit, xp: mission.xp, reward: mission.reward };

  return (
    <section className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-12 pt-6">
      {/* Top Bar */}
      <button className="btn-ghost !min-h-9 self-start text-xs" onClick={onExit}>
        <ArrowLeft size={14} /> Back
      </button>

      {/* Game Header */}
      <div className="mt-4 text-center">
        <div className="text-3xl mb-1 opacity-90">{mission.emoji}</div>
        <h2 className="font-display text-2xl font-normal text-[#f0fdfa]">
          {mission.title}
        </h2>
      </div>

      <div className="mt-6 flex-1">
        {game === "memory" && <MemoryMatch {...common} />}
        {game === "quiz" && <Quiz {...common} />}
        {game === "stars" && <CatchStars {...common} />}
        {game === "secret" && <Secret {...common} />}
        {game === "box" && <MysteryBox {...common} done={done} />}
      </div>
    </section>
  );
}
