"use client";

import { LinkToSiteButton } from "@/app/components/LinkToSiteButton";
import {
  CONTAINER_GAP_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
  CASE_MEDIA_BORDER_RADIUS_PX,
} from "@/lib/design-tokens";
import { GAMES_CASE_DESCRIPTIONS, GAMES_CASE_SCOPE } from "../games-case-scope";
import { GamesCaseMeasureGap } from "../_components/GamesCaseMeasureGap";
import { GamesCaseMediaSection } from "../_components/GamesCaseMediaSection";
import { GamesCaseScopeSection } from "../_components/GamesCaseScopeSection";
import { GamesCaseStudyHeader } from "../_components/GamesCaseStudyHeader";
import { gamesCaseMediaKey } from "../_components/games-case-media-types";
import {
  POKEMON_FIRERED_GITHUB_URL,
  POKEMON_FIRERED_MEDIA_ITEMS,
} from "./pokemon-firered-media";

export default function GamesPokemonFireRedPage() {
  const scope = GAMES_CASE_SCOPE.pokemonFirered;

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

        <GamesCaseStudyHeader title="Pokemon FireRed" />

        <GamesCaseMeasureGap />

        <GamesCaseScopeSection
          detailsLabel="Scope"
          scopeLabel={scope.scopeLabel}
          items={[...scope.items]}
          description={GAMES_CASE_DESCRIPTIONS.pokemonFirered}
          afterDescription={
            <LinkToSiteButton href={POKEMON_FIRERED_GITHUB_URL}>
              Link to Github
            </LinkToSiteButton>
          }
        />

        {POKEMON_FIRERED_MEDIA_ITEMS.map((media, index) => (
          <div key={gamesCaseMediaKey(media, index)} className="contents">
            <GamesCaseMeasureGap />
            <GamesCaseMediaSection
              media={media}
              fillContainerWidth
              mediaBorderRadiusPx={CASE_MEDIA_BORDER_RADIUS_PX + 2}
            />
          </div>
        ))}

        <GamesCaseMeasureGap />
      </div>
    </div>
  );
}
