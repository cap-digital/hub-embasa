"use client";

import { useEffect, useRef, type ReactNode } from "react";

const MAX_TILT_DEG = 4;

/**
 * Grade dos cards de painel. JS leve só para:
 *  - entrada em sequência quando a grade aparece (IntersectionObserver → [data-revealed]);
 *  - tilt 3D seguindo o mouse (só ponteiro de mouse, sem prefers-reduced-motion);
 *  - "água subindo" no toque ([data-pressed]) e bloqueio do :hover grudado do mobile ([data-touch]).
 * Todo o visual fica em CSS (globals.css, seção "Cards de painel").
 */
export function CardGrid({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let io: IntersectionObserver | undefined;
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      grid.dataset.revealed = "";
    } else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            grid.dataset.revealed = "";
            io?.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      io.observe(grid);
    }

    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-card]"));
    const cleanups = cards.map((card) => {
      let raf = 0;
      let pressTimer = 0;
      let releaseTimer = 0;

      const setTilt = (rx: number, ry: number) => {
        card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || reduceMotion.matches) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => setTilt(-y * 2 * MAX_TILT_DEG, x * 2 * MAX_TILT_DEG));
      };

      const onEnter = (e: PointerEvent) => {
        if (e.pointerType === "mouse") delete card.dataset.touch;
      };

      const onLeave = () => {
        cancelAnimationFrame(raf);
        setTilt(0, 0);
      };

      const press = () => {
        window.clearTimeout(releaseTimer);
        card.dataset.pressed = "";
      };

      const onDown = (e: PointerEvent) => {
        if (e.pointerType === "mouse") return;
        card.dataset.touch = "";
        window.clearTimeout(pressTimer);
        // pequeno atraso: se o toque virar rolagem (pointercancel), a água nem sobe
        pressTimer = window.setTimeout(() => {
          pressTimer = 0;
          press();
        }, 80);
      };

      const onUp = (e: PointerEvent) => {
        if (e.pointerType === "mouse") return;
        if (pressTimer) {
          // toque rápido: sobe a água já, antes de abrir a nova aba
          window.clearTimeout(pressTimer);
          pressTimer = 0;
          press();
        }
        releaseTimer = window.setTimeout(() => delete card.dataset.pressed, 1200);
      };

      const onCancel = () => {
        window.clearTimeout(pressTimer);
        pressTimer = 0;
        delete card.dataset.pressed;
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);
      card.addEventListener("pointerdown", onDown);
      card.addEventListener("pointerup", onUp);
      card.addEventListener("pointercancel", onCancel);

      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(pressTimer);
        window.clearTimeout(releaseTimer);
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
        card.removeEventListener("pointerdown", onDown);
        card.removeEventListener("pointerup", onUp);
        card.removeEventListener("pointercancel", onCancel);
      };
    });

    return () => {
      io?.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <ul ref={ref} data-reveal="" className={className}>
      {children}
    </ul>
  );
}
