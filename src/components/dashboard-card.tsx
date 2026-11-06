import type { Dashboard } from "@/data/dashboards";

/** Onda periódica (período 100) em 400 de largura: transladar -50% fecha o loop. */
const CREST =
  "M0 9C33 18 67 0 100 9S167 0 200 9 267 18 300 9 367 0 400 9V18H0Z";

function StatusBadge({ status }: { status: Dashboard["status"] }) {
  const live = status === "Em andamento";
  return (
    <span
      className={[
        "dash-ink inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1",
        live
          ? "bg-[var(--badge-bg,var(--color-support-50))] text-[var(--badge-ink,var(--color-support-700))] ring-[var(--badge-ring,rgb(24_142_76/0.25))]"
          : "bg-[var(--badge-bg,var(--color-slate-100))] text-[var(--badge-ink,var(--color-slate-600))] ring-[var(--badge-ring,var(--color-slate-200))]",
      ].join(" ")}
    >
      {live ? (
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full rounded-full bg-[#3fd17f] opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-support" />
        </span>
      ) : (
        <span
          className="dash-ink size-2 rounded-full bg-[var(--badge-dot,var(--color-slate-400))]"
          aria-hidden="true"
        />
      )}
      {status}
    </span>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4" aria-hidden="true">
      <rect x="3" y="4.5" width="14" height="12" rx="2.5" />
      <path d="M3 8.5h14M7 2.75v3.5M13 2.75v3.5" strokeLinecap="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4" aria-hidden="true">
      <path d="m10 3 7 3.75-7 3.75-7-3.75L10 3Z" strokeLinejoin="round" />
      <path d="m3 10.25 7 3.75 7-3.75M3 13.5l7 3.75 7-3.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashboardCard({ dashboard, index }: { dashboard: Dashboard; index: number }) {
  const { name, tag, description, url, status, period, platforms } = dashboard;
  const live = status === "Em andamento";
  const number = String(index + 1).padStart(2, "0");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-card=""
      data-live={live ? "" : undefined}
      className="dash-card relative flex h-full flex-col rounded-3xl outline-none lg:min-h-[min(60vh,calc(100dvh-19rem))] lg:short:min-h-[calc(100dvh-16.5rem)]"
    >
      <span aria-hidden="true" className="dash-border">
        {live && <span className="dash-spin" />}
      </span>

      <span aria-hidden="true" className="dash-surface">
        <span className="dash-water">
          <svg viewBox="0 0 400 18" preserveAspectRatio="none" className="dash-crest dash-crest--back">
            <path d={CREST} />
          </svg>
          <svg viewBox="0 0 400 18" preserveAspectRatio="none" className="dash-crest dash-crest--front">
            <path d={CREST} />
          </svg>
          <span className="dash-water-body" />
        </span>
        {/* mobile/tablet: canto superior; desktop: canto inferior, acima da linha do CTA */}
        <span className="dash-num top-2 right-5 text-[5.5rem] sm:text-[6.5rem] lg:top-auto lg:bottom-[7.5rem] lg:text-[7rem] lg:short:bottom-[6.5rem] lg:short:text-[5rem]">
          {number}
        </span>
      </span>

      <div className="relative z-10 flex flex-1 flex-col p-7 pb-16 sm:p-8 sm:pb-16 lg:short:p-6 lg:short:pb-14">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={status} />
          {tag && (
            <span className="dash-ink rounded-md bg-[var(--tag-bg,var(--color-embasa-600))] px-2 py-1 text-xs leading-none font-extrabold tracking-wider text-[var(--tag-ink,#fff)]">
              {tag}
            </span>
          )}
        </div>

        <h3 className="dash-ink mt-6 text-[1.75rem] leading-tight font-extrabold tracking-tight text-balance text-(--ink-title) lg:short:mt-5 lg:short:text-2xl">
          {name}
        </h3>
        <p className="dash-ink mt-3 text-base leading-relaxed text-(--ink-body) lg:short:mt-2 lg:short:text-sm">
          {description}
        </p>

        {(period || platforms) && (
          <ul className="mt-5 flex flex-wrap gap-2 text-sm font-medium lg:short:mt-4 lg:short:text-[13px]">
            {period && (
              <li className="dash-ink inline-flex items-center gap-1.5 rounded-lg bg-(--chip-bg) px-2.5 py-1 text-(--ink-meta) tabular-nums">
                <CalendarIcon />
                <span className="sr-only">Período:</span>
                {period}
              </li>
            )}
            {platforms && (
              <li className="dash-ink inline-flex items-center gap-1.5 rounded-lg bg-(--chip-bg) px-2.5 py-1 text-(--ink-meta) tabular-nums">
                <LayersIcon />
                {platforms} {platforms === 1 ? "plataforma" : "plataformas"}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto pt-8 lg:short:pt-6">
          <div className="dash-ink border-t border-(--sep) pt-5">
            <span className="dash-ink inline-flex items-center gap-2 text-lg font-bold whitespace-nowrap text-(--ink-cta) lg:short:text-base">
              Acessar painel
              <span aria-hidden="true" className="dash-arrow">
                →
              </span>
            </span>
          </div>
        </div>
      </div>

      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
