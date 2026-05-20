"use client";

import { PortfolioHome } from "../components/PortfolioHome";
import { GAMES_PORTFOLIO_ITEMS } from "../components/portfolio-home-types";

export default function GamesHome() {
  return (
    <PortfolioHome
      items={GAMES_PORTFOLIO_ITEMS}
      cardStackVariant="games"
      heroGreeting="Hiya, I'm Cat"
      heroTagline="I design pixel art, motion, and cross-platform games"
    />
  );
}
