/**
 * Ondas SVG na base do hero. Cada camada tem 200% da largura e um padrão
 * periódico, então transladar -50% gera um loop contínuo sem emenda.
 * A animação só roda com `motion-safe` (respeita prefers-reduced-motion).
 */

const WIDTH = 2880;
const HEIGHT = 140;
const PERIOD = 720;

function wavePath(mid: number, amp: number): string {
  const third = PERIOD / 3;
  let d = `M0 ${mid}`;
  for (let x = 0; x < WIDTH; x += PERIOD) {
    d += ` C${x + third} ${mid + amp} ${x + 2 * third} ${mid - amp} ${x + PERIOD} ${mid}`;
  }
  return `${d} L${WIDTH} ${HEIGHT} L0 ${HEIGHT} Z`;
}

const layers = [
  {
    d: wavePath(52, 26),
    className: "fill-aqua/25 motion-safe:animate-wave-slow",
  },
  {
    d: wavePath(72, 22),
    className:
      "fill-sky-water/30 motion-safe:animate-wave-mid [animation-direction:reverse]",
  },
  {
    d: wavePath(96, 16),
    className: "fill-surface motion-safe:animate-wave-fast",
  },
];

export function Waves() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden sm:h-32 lg:h-36"
    >
      {layers.map((layer, i) => (
        <svg
          key={i}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          className={`absolute bottom-0 left-0 h-full w-[200%] will-change-transform ${layer.className}`}
        >
          <path d={layer.d} />
        </svg>
      ))}
    </div>
  );
}
