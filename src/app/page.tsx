"use client";

import { PortfolioHome } from "./components/PortfolioHome";
import { WORK_PORTFOLIO_ITEMS } from "./components/portfolio-home-types";

export default function Home() {
  return <PortfolioHome items={WORK_PORTFOLIO_ITEMS} cardStackVariant="work" />;
}
