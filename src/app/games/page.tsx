"use client";

import { PortfolioHome } from "../components/PortfolioHome";
import { GAMES_PORTFOLIO_ITEMS } from "../components/portfolio-home-types";

const GAMES_RESUME_HREF =
  "https://drive.google.com/file/d/1qboqyJLK9SGK2cDf2Kd8t53mthrkS7lB/view?usp=sharing";

export default function GamesHome() {
  return (
    <PortfolioHome
      items={GAMES_PORTFOLIO_ITEMS}
      cardStackVariant="games"
      heroGreeting="Hiya, I'm Cat"
      heroTagline="I design pixel art, motion, and cross-platform games"
      resumeHref={GAMES_RESUME_HREF}
    />
  );
}
