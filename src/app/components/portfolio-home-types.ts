/** Case study row on the portfolio home / games landing. */
export type PortfolioWorkItem = {
  title: string;
  tag: string | null;
  badge: string | null;
  /** Full path when set (e.g. `/games/adobe`, `/work/otherworld`). */
  href?: string;
  /** Legacy: resolves to `/work/[slug]` when href is omitted. */
  slug?: string;
};

export function getPortfolioItemHref(item: PortfolioWorkItem): string | undefined {
  if (item.href) return item.href;
  if (item.slug) return `/work/${item.slug}`;
  return undefined;
}

/** Only set slug when a case study page exists at /work/[slug]. Do not set slug for COMING SOON. */
export const WORK_PORTFOLIO_ITEMS: PortfolioWorkItem[] = [
  { title: "Adobe Learning Portal", tag: "Web Design", badge: null, slug: "adobe-learning-portal" },
  { title: "Dia Browser", tag: "Product Onboarding", badge: null, slug: "dia-browser" },
  { title: "Build Anything AI", tag: "Product Design", badge: null, slug: "build-anything-ai" },
  { title: "Notion Mobile", tag: "Mobile Interactions", badge: "coming soon" },
  { title: "Otherworld", tag: "Web Design", badge: null, slug: "otherworld" },
  {
    title: "Experiments",
    tag: "Diddle daddles",
    badge: null,
    slug: "pokemon-firered",
  },
];

export const GAMES_PORTFOLIO_ITEMS: PortfolioWorkItem[] = [
  { title: "Pixeldoro", tag: "Solarpunk Pomodoro", badge: null, href: "/games/pixeldoro" },
  {
    title: "Minecraft Education",
    tag: "Marketing Assets",
    badge: null,
    href: "/games/minecraft-education",
  },
  { title: "Pokemon FireRed", tag: "Personal fan remake", badge: null, href: "/games/pokemon-firered" },
  {
    title: "Lovelee Laundromat",
    tag: "Couples App",
    badge: null,
    href: "/games/lovelee-laundromat",
  },
  {
    title: "Adobe Learning Portal",
    tag: "Web Design",
    badge: null,
    href: "/games/adobe",
  },
  { title: "Experiments", tag: "Diddle daddles", badge: null, href: "/games/experiments" },
];
