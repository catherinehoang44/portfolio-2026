"use client";

import {
  CONTAINER_GAP_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
} from "@/lib/design-tokens";
import {
  GAMES_CASE_DESCRIPTION_PREFACES,
  GAMES_CASE_DESCRIPTIONS,
  GAMES_CASE_SCOPE,
} from "../games-case-scope";
import { GamesCaseMeasureGap } from "../_components/GamesCaseMeasureGap";
import { GamesCaseMediaSection } from "../_components/GamesCaseMediaSection";
import { GamesCaseScopeSection } from "../_components/GamesCaseScopeSection";
import { GamesCaseStudyHeader } from "../_components/GamesCaseStudyHeader";
import { gamesCaseMediaKey } from "../_components/games-case-media-types";
import { LOVELEE_LAUDROMAT_MEDIA_ITEMS } from "./lovelee-laundromat-media";

export default function GamesLoveleeLaundromatPage() {
  const scope = GAMES_CASE_SCOPE.loveleeLaundromat;

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

        <GamesCaseStudyHeader title="Lovelee Laundromat" />

        <GamesCaseMeasureGap />

        <GamesCaseScopeSection
          detailsLabel="Scope"
          scopeLabel={scope.scopeLabel}
          items={[...scope.items]}
          descriptionPreface={GAMES_CASE_DESCRIPTION_PREFACES.loveleeLaundromat}
          descriptionPrefaceItalic
          description={GAMES_CASE_DESCRIPTIONS.loveleeLaundromat}
        />

        {LOVELEE_LAUDROMAT_MEDIA_ITEMS.map((media, index) => (
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
