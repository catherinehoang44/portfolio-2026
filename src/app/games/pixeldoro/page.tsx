"use client";

import {
  CONTAINER_GAP_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
} from "@/lib/design-tokens";
import { GAMES_CASE_DESCRIPTIONS, GAMES_CASE_SCOPE } from "../games-case-scope";
import { GamesCaseMeasureGap } from "../_components/GamesCaseMeasureGap";
import { GamesCaseMediaSection } from "../_components/GamesCaseMediaSection";
import { GamesCaseScopeSection } from "../_components/GamesCaseScopeSection";
import { GamesCaseStudyHeader } from "../_components/GamesCaseStudyHeader";
import { gamesCaseMediaKey } from "../_components/games-case-media-types";
import { PIXELDORO_MEDIA_ITEMS } from "./pixeldoro-media";

export default function GamesPixeldoroPage() {
  const scope = GAMES_CASE_SCOPE.pixeldoro;

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: COLORS.background }}
    >
      <div
        className="container-main flex w-full flex-col pt-4 pb-4"
        style={{
          gap: CONTAINER_GAP_PX,
          paddingBottom: CASE_CONTENT_PADDING_BOTTOM_PX,
        }}
      >
        <GamesCaseMeasureGap />

        <GamesCaseStudyHeader title="Pixeldoro" />

        <GamesCaseMeasureGap />

        <GamesCaseScopeSection
          detailsLabel="Scope"
          scopeLabel={scope.scopeLabel}
          items={[...scope.items]}
          description={GAMES_CASE_DESCRIPTIONS.pixeldoro}
        />

        {PIXELDORO_MEDIA_ITEMS.map((media, index) => (
          <div key={gamesCaseMediaKey(media, index)} className="contents">
            <GamesCaseMeasureGap />
            <GamesCaseMediaSection media={media} fillContainerWidth />
          </div>
        ))}

        <GamesCaseMeasureGap />
      </div>
    </div>
  );
}
