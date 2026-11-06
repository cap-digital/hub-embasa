"use client";

import { useEffect } from "react";

/**
 * Sincroniza a cor de fundo do <html> com a dobra visível: marca html[data-fold="2"]
 * quando o topo da seção alvo passa da metade da tela. Essa cor aparece atrás do
 * trilho transparente da barra de scroll (Chrome/Safari) e no overscroll, então o
 * trilho fica escuro sobre o hero e claro sobre a dobra 2. Ver globals.css.
 */
export function ScrollSurface({ targetId }: { targetId: string }) {
  useEffect(() => {
    const target = document.getElementById(targetId);
    const root = document.documentElement;
    if (!target || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // intersecta a metade de cima da tela ⇒ topo da dobra 2 já passou do meio
        const past = entry.isIntersecting || entry.boundingClientRect.top < 0;
        if (past) root.dataset.fold = "2";
        else delete root.dataset.fold;
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    io.observe(target);

    return () => {
      io.disconnect();
      delete root.dataset.fold;
    };
  }, [targetId]);

  return null;
}
