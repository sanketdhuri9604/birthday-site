"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type Piece = {
  id: number;
  left: number;
  w: number;
  h: number;
  color: string;
  delay: number;
  dur: number;
  drift: number;
  round: boolean;
};

/* Peaceful Ocean & Sea-Glass Palette */
const OCEAN_FLAKES = [
  "#38bdf8", // luminous ocean blue
  "#7dd3fc", // sky azure
  "#2dd4bf", // seafoam turquoise
  "#f0fdfa", // pearl sea-mist
  "#0284c7", // deep azure
  "#a5f3fc", // aquamarine
];

export default function Confetti({ count = 55, loop = false }: { count?: number; loop?: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: count }, (_, id) => ({
        id,
        left: Math.random() * 100,
        w: 5 + Math.random() * 6,
        h: 7 + Math.random() * 9,
        color: OCEAN_FLAKES[id % OCEAN_FLAKES.length],
        delay: Math.random() * (loop ? 4.5 : 1),
        dur: 3.5 + Math.random() * 3.2,
        drift: (Math.random() - 0.5) * 180,
        round: Math.random() > 0.65,
      }))
    );
  }, [count, loop]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={`confetti${loop ? " loop" : ""}`}
          style={
            {
              left: `${p.left}%`,
              width: p.w,
              height: p.round ? p.w : p.h,
              borderRadius: p.round ? "999px" : "1px",
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
              "--drift": `${p.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
