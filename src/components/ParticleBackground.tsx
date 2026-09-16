"use client";

import React, { useEffect, useRef } from "react";

const MATH_SYMBOLS = [
  "∑", "π", "∞", "√", "∫", "⊕", "⊗", "∩", "∪", "⊆", "λ", "Δ",
  "¬", "∧", "∨", "≠", "≡", "∈", "∀", "∃", "ℤ", "Sₙ", "Aₙ", "K₄"
];

// Exact Swatch Palette: Flame Red, Solar Orange, Sand Cream, Electric Cyan
const PALETTE = [
  "rgba(223, 48, 28, ",  // Flame Red #df301c
  "rgba(255, 145, 0, ",  // Solar Orange #ff9100
  "rgba(255, 241, 209, ", // Sand Cream #fff1d1
  "rgba(0, 183, 205, ",  // Electric Cyan #00b7cd
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  size: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  color: string;
  rotation: number;
  vRot: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const particleCount = Math.min(26, Math.floor(width / 50));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.2 - Math.random() * 0.3,
      symbol: MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)],
      size: Math.floor(Math.random() * 16) + 14,
      baseAlpha: Math.random() * 0.22 + 0.1,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.008,
    }));

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        const currentAlpha =
          p.baseAlpha + Math.sin(frame * p.pulseSpeed + p.pulseOffset) * 0.08;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `600 ${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `${p.color}${Math.max(0.04, currentAlpha)})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Ambient Lighting with 4 Swatch Colors */}
      <div className="absolute top-[-10%] left-[10%] w-[550px] h-[550px] bg-[#df301c]/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-[#00b7cd]/16 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] right-[25%] w-[450px] h-[450px] bg-[#ff9100]/14 rounded-full blur-[95px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-[#fff1d1]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* HTML5 Canvas Particles */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
