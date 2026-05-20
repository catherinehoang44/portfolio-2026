"use client";

import { GamesCaseMeasureGap } from "./GamesCaseMeasureGap";
import { GamesCaseScopeSection } from "./GamesCaseScopeSection";
import { GamesCaseMediaSection } from "./GamesCaseMediaSection";
import { gamesCaseMediaKey } from "./games-case-media-types";
import type { GamesCaseProject } from "./games-case-project-types";

export function GamesCaseProjectSection({
  scopeLabel,
  description,
  descriptionPreface,
  descriptionPrefaceItalic,
  descriptionItalic,
  scopeItems,
  mediaItems,
  fillContainerWidth = false,
}: GamesCaseProject) {
  return (
    <>
      <GamesCaseScopeSection
        detailsLabel="Scope"
        scopeLabel={scopeLabel}
        items={scopeItems}
        descriptionPreface={descriptionPreface}
        descriptionPrefaceItalic={descriptionPrefaceItalic}
        description={description}
        descriptionItalic={descriptionItalic}
      />

      {mediaItems?.map((media, index) => (
        <div key={gamesCaseMediaKey(media, index)} className="contents">
          <GamesCaseMeasureGap />
          <GamesCaseMediaSection media={media} fillContainerWidth={fillContainerWidth} />
        </div>
      ))}
    </>
  );
}
