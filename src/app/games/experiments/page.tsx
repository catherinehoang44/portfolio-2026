"use client";

import { GAMES_CASE_DESCRIPTIONS } from "../games-case-scope";
import { GamesMultiProjectCasePage } from "../_components/GamesMultiProjectCasePage";
import { EXPERIMENTS_GAMES_PROJECTS } from "./experiments-projects";

export default function GamesExperimentsPage() {
  return (
    <GamesMultiProjectCasePage
      title="Experiments"
      description={GAMES_CASE_DESCRIPTIONS.experiments}
      projects={EXPERIMENTS_GAMES_PROJECTS}
    />
  );
}
