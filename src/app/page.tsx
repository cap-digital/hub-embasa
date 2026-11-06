import Image from "next/image";
import type { CSSProperties } from "react";
import { CardGrid } from "@/components/card-grid";
import { DashboardCard } from "@/components/dashboard-card";
import { ScrollSurface } from "@/components/scroll-surface";
import { Waves } from "@/components/waves";
import { dashboardSummary, sortedDashboards } from "@/data/dashboards";

export default function Home() {
  const list = sortedDashboards();
  const { total, active } = dashboardSummary(list);

  const summary = [
    { value: String(total), label: total === 1 ? "campanha" : "campanhas", numeric: true },
    { value: String(active), label: "em andamento", numeric: true, live: active > 0 },
    { value: "Diária", label: "atualização dos dados" },
    { value: "360°", label: "geral, plataformas, metas e criativos" },
  ];

  return (
    <>
      <ScrollSurface targetId="paineis" />

      {/* DOBRA 1 — hero */}
      <section className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-linear-160 from-embasa-950 via-embasa-900 to-embasa-700 text-white">
        {/* brilhos decorativos */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-sky-water/12 blur-3xl" />
          <div className="absolute bottom-10 left-[-15%] size-[28rem] rounded-full bg-teal-brand/15 blur-3xl" />
        </div>

        <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pt-6 sm:px-8 sm:pt-8">
          <div className="rounded-2xl bg-white px-3.5 py-2.5 shadow-lg shadow-embasa-950/30">
            <Image
              src="/brand/embasa-logo.svg"
              alt="Embasa"
              width={259}
              height={80}
              priority
              unoptimized
              className="h-8 w-auto sm:h-9"
            />
          </div>
          {/* mobile: texto em cima, logo embaixo (alinhados à direita); sm+: lado a lado */}
          <div className="flex flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs whitespace-nowrap text-white/80 sm:text-sm">Painéis de mídia por</span>
            <a
              href="https://www.capdigital.company/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CAP Digital (abre em nova aba)"
              className="block rounded-md transition duration-200 hover:scale-[1.04] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              <Image
                src="/brand/capco-logo-400.png"
                alt="CAP Digital"
                width={400}
                height={122}
                priority
                sizes="96px"
                className="h-5 w-auto sm:h-7"
              />
            </a>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-14 pb-36 sm:px-8 sm:pb-44 lg:pb-48">
          <p className="text-sm font-bold tracking-[0.18em] text-aqua uppercase">
            Mídia digital · Embasa · 2026
          </p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-extrabold tracking-tight text-balance">
            Painéis de campanha da Embasa.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Acompanhe investimento, entrega contratada e ritmo de cada campanha de
            mídia, na visão consolidada e por plataforma.
          </p>

          <div className="mt-9">
            <a
              href="#paineis"
              className="group inline-flex items-center gap-3 rounded-full bg-white py-3 pr-3 pl-6 font-bold text-embasa-800 shadow-lg shadow-embasa-950/30 transition hover:bg-embasa-50 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-aqua motion-reduce:transition-none"
            >
              Ver painéis
              <span className="grid size-8 place-items-center rounded-full bg-embasa-600 text-white transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
                  <path d="M10 4v12m0 0-5-5m5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>

          {/*
            Largura total do container (alinhada aos logos do topo).
            Mobile/tablet: 2x2, legenda com espaço fixo de 2 linhas → blocos com a mesma altura
            e valores alinhados.
            1024–1151px: 4 colunas ajustadas ao conteúdo (a legenda do 360° não cabe em 1/4).
            ≥1152px (container no tamanho máximo, 1088px úteis): 4 colunas iguais.
          */}
          <dl className="mt-12 grid w-full auto-rows-fr grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/15 backdrop-blur-sm lg:max-[1152px]:grid-cols-[repeat(4,auto)] min-[1152px]:grid-cols-4">
            {summary.map((item) => (
              <div
                key={item.label}
                className="flex flex-col-reverse items-center justify-center gap-1 bg-embasa-950/40 px-3 py-4 text-center sm:px-5 lg:max-[1152px]:px-6 min-[1152px]:px-3"
              >
                <dt className="flex min-h-[2lh] items-center justify-center text-sm leading-snug text-white/80 lg:min-h-0 lg:whitespace-nowrap">
                  {item.label}
                </dt>
                <dd className="flex items-center justify-center gap-2 text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl">
                  {item.live && (
                    <span className="relative flex size-2.5" aria-hidden="true">
                      <span className="absolute inline-flex size-full rounded-full bg-[#3fd17f] opacity-75 motion-safe:animate-ping" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-[#3fd17f]" />
                    </span>
                  )}
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Waves />
      </section>

      {/* DOBRA 2 — painéis */}
      <section
        id="paineis"
        aria-labelledby="paineis-titulo"
        className="flex min-h-dvh flex-col bg-surface"
      >
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 pt-16 pb-10 sm:px-8 lg:pt-20 lg:short:pt-12 lg:short:pb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold tracking-[0.18em] text-embasa-600 uppercase tabular-nums">
                {total} {total === 1 ? "painel" : "painéis"}
              </p>
              <h2
                id="paineis-titulo"
                className="mt-2 text-3xl font-extrabold tracking-tight text-embasa-950 sm:text-4xl"
              >
                Painéis de campanha 2026
              </h2>
            </div>
            <p className="max-w-sm text-slate-600 sm:text-right">
              Escolha uma campanha para abrir o painel em uma nova aba.
            </p>
          </div>

          <CardGrid className="mt-10 grid gap-5 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-4 lg:short:mt-8">
            {list.map((d, i) => (
              <li key={d.slug} style={{ "--i": i } as CSSProperties}>
                <DashboardCard dashboard={d} index={i} />
              </li>
            ))}
          </CardGrid>

          <footer className="mt-auto pt-12 text-center text-sm text-slate-600 lg:short:pt-8">
            Dados atualizados diariamente a partir das plataformas de mídia ·{" "}
            <a
              href="https://www.capdigital.company/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm font-semibold text-embasa-800 underline decoration-embasa-200 underline-offset-4 transition-colors hover:text-embasa-600 hover:decoration-embasa-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-embasa-600"
            >
              CAP Digital<span className="sr-only"> (abre em nova aba)</span>
            </a>
          </footer>
        </div>
      </section>
    </>
  );
}
