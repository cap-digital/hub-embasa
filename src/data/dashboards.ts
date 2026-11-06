/**
 * Painéis de campanha exibidos no hub.
 *
 * Para atualizar: edite `status` (ou adicione um novo item ao array).
 * Campanhas "Em andamento" aparecem primeiro e com destaque.
 */

export type DashboardStatus = "Em andamento" | "Encerrada";

export type Dashboard = {
  /** Identificador único (usado como key). */
  slug: string;
  /** Nome da campanha. */
  name: string;
  /** Sigla/tag exibida como selo no card, opcional. Ex.: "AON". */
  tag?: string;
  /** Descrição curta exibida no card. */
  description: string;
  /** URL do painel (abre em nova aba). */
  url: string;
  status: DashboardStatus;
  /** Período de veiculação, opcional. Ex.: "24/09 – 04/10/2026". */
  period?: string;
  /** Quantidade de plataformas de mídia, opcional. */
  platforms?: number;
  /** Quantidade de estratégias de mídia, opcional. */
  strategies?: number;
};

export const dashboards: Dashboard[] = [
  {
    slug: "always-on-2026",
    name: "Always On 2026",
    tag: "AON",
    description: "Performance da comunicação contínua da Embasa ao longo do ano.",
    url: "https://aonembasa.capdigital.company/",
    status: "Em andamento",
    period: "até 31/12/2026",
  },
  {
    slug: "nova-conta",
    name: "Nova Conta",
    description: "Acompanhamento da campanha Nova Conta",
    url: "https://embasa-novaconta.capdigital.company/",
    status: "Em andamento",
    period: "05/11 – 13/11/2026",
    strategies: 4,
  },
  {
    slug: "el-nino",
    name: "El Niño tá chegando",
    description: "Proteja a Bahia. Fique alerta com queimadas.",
    url: "https://embasa-elnino.capdigital.company/",
    status: "Encerrada",
    period: "24/09 – 04/10/2026",
    platforms: 9,
  },
  {
    slug: "historias-que-conectam",
    name: "Histórias que Conectam",
    description: "Performance da campanha Histórias que Conectam",
    url: "https://embasahqc.capdigital.company/",
    status: "Encerrada",
    period: "18/03 – 05/04/2026",
    strategies: 10,
  },
];

/** Campanhas em andamento primeiro, mantendo a ordem original dentro de cada grupo. */
export function sortedDashboards(list: Dashboard[] = dashboards): Dashboard[] {
  return [...list].sort(
    (a, b) =>
      Number(b.status === "Em andamento") - Number(a.status === "Em andamento"),
  );
}

export function dashboardSummary(list: Dashboard[] = dashboards) {
  const total = list.length;
  const active = list.filter((d) => d.status === "Em andamento").length;
  return { total, active };
}
