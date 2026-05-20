"use client";

import { GAMES_CASE_DESCRIPTIONS } from "../games-case-scope";
import { GamesMultiProjectCasePage } from "../_components/GamesMultiProjectCasePage";
import { ADOBE_GAMES_PROJECTS } from "./adobe-projects";

export default function GamesAdobePage() {
  return (
    <GamesMultiProjectCasePage
      title="Adobe Learning Portal"
      description={GAMES_CASE_DESCRIPTIONS.adobe}
      projects={ADOBE_GAMES_PROJECTS}
      mediaFillContainerWidth
    />
  );
}
