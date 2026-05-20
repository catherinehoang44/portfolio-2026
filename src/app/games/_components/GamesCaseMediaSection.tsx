"use client";

import { useState } from "react";
import { MeasureGuide } from "@/app/components/MeasureGuide";
import { CaseStudyCaption } from "@/app/components/CaseStudyCaption";
import { CaseStudyMediaSlot } from "@/app/components/CaseStudyMediaSlot";
import {
  CONTENT_OFFSET_LEFT_PX,
  CAPTION_MEDIA_GAP_PX,
  CASE_MEDIA_ALIGN_WITH_TEXT_PADDING,
  CASE_MEDIA_PLACEHOLDER_FILL,
  CASE_MEDIA_ASPECT_FULL,
  CASE_MEDIA_MAX_WIDTH_PX,
} from "@/lib/design-tokens";
import { AdobeCertPortalCoverRive } from "@/app/work/adobe-learning-portal/AdobeCertPortalCoverRive";
import {
  gamesCaseMediaUsesHugLayout,
  type GamesCaseMediaItem,
} from "./games-case-media-types";

function GamesCaseVideoSlot({
  src,
  objectFit = "contain",
  objectPosition,
  hugLayout = false,
  borderRadiusPx,
}: {
  src: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  hugLayout?: boolean;
  borderRadiusPx?: number;
}) {
  const radiusStyle =
    borderRadiusPx != null ? { borderRadius: borderRadiusPx } : undefined;
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center ${hugLayout ? "min-h-[200px] w-full" : "h-full w-full"}`}
        style={{ background: CASE_MEDIA_PLACEHOLDER_FILL }}
      />
    );
  }
  if (hugLayout) {
    return (
      <video
        src={src}
        className="block h-auto w-full max-w-full"
        style={{
          objectFit,
          ...radiusStyle,
          ...(objectPosition ? { objectPosition } : {}),
        }}
        muted
        loop
        playsInline
        autoPlay
        aria-hidden
        draggable={false}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <video
      src={src}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        objectFit,
        ...(objectPosition ? { objectPosition } : {}),
      }}
      muted
      loop
      playsInline
      autoPlay
      aria-hidden
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

function GamesCaseHugImage({
  src,
  objectFit = "contain",
  borderRadiusPx,
}: {
  src: string;
  objectFit?: "cover" | "contain";
  borderRadiusPx?: number;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className="min-h-[200px] w-full"
        style={{ background: CASE_MEDIA_PLACEHOLDER_FILL }}
      />
    );
  }
  return (
    <img
      src={src}
      alt=""
      className={`block h-auto w-full max-w-full ${borderRadiusPx == null ? "rounded-[4px]" : ""} ${objectFit === "contain" ? "object-contain" : "object-cover"}`}
      style={borderRadiusPx != null ? { borderRadius: borderRadiusPx } : undefined}
      onError={() => setFailed(true)}
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  );
}

function GamesCaseMediaFrame({
  media,
  hugLayout,
  borderRadiusPx,
}: {
  media: GamesCaseMediaItem;
  hugLayout: boolean;
  borderRadiusPx?: number;
}) {
  const aspectRatio = media.aspectRatio ?? CASE_MEDIA_ASPECT_FULL;
  const frameRadiusStyle =
    borderRadiusPx != null ? { borderRadius: borderRadiusPx } : undefined;

  if (hugLayout) {
    return (
      <div
        className="case-media relative w-full overflow-hidden"
        style={frameRadiusStyle}
      >
        {media.kind === "image" ? (
          <GamesCaseHugImage
            src={media.src}
            objectFit={media.objectFit ?? "contain"}
            borderRadiusPx={borderRadiusPx}
          />
        ) : media.kind === "rive" ? (
          <AdobeCertPortalCoverRive className="h-full w-full rounded-none" />
        ) : (
          <GamesCaseVideoSlot
            src={media.src}
            objectFit={media.objectFit ?? "contain"}
            objectPosition={media.objectPosition}
            hugLayout
            borderRadiusPx={borderRadiusPx}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="case-media relative w-full overflow-hidden"
      style={{
        aspectRatio,
        ...(borderRadiusPx != null ? { borderRadius: borderRadiusPx } : {}),
      }}
    >
      {media.kind === "image" ? (
        <CaseStudyMediaSlot
          src={media.src}
          className="absolute inset-0 h-full w-full rounded-none"
          objectFit={media.objectFit ?? "contain"}
          borderRadiusPx={borderRadiusPx}
        />
      ) : media.kind === "rive" ? (
        <AdobeCertPortalCoverRive className="absolute inset-0 h-full w-full rounded-none" />
      ) : (
        <GamesCaseVideoSlot
          src={media.src}
          objectFit={media.objectFit ?? "contain"}
          objectPosition={media.objectPosition}
          borderRadiusPx={borderRadiusPx}
        />
      )}
    </div>
  );
}

type GamesCaseMediaSectionProps = {
  media: GamesCaseMediaItem;
  /** When true, media spans full case content width (no CASE_MEDIA_MAX_WIDTH_PX cap). */
  fillContainerWidth?: boolean;
  /** Override default 4px media corner radius (e.g. Pokémon +2px). */
  mediaBorderRadiusPx?: number;
};

export function GamesCaseMediaSection({
  media,
  fillContainerWidth = false,
  mediaBorderRadiusPx,
}: GamesCaseMediaSectionProps) {
  const hugLayout = gamesCaseMediaUsesHugLayout(media);
  const showCaption = media.caption != null || media.tag != null;
  const useFullWidthStack = fillContainerWidth || !hugLayout;
  const stackMaxWidthPx =
    media.maxWidthPx ?? (useFullWidthStack ? undefined : CASE_MEDIA_MAX_WIDTH_PX);

  const mediaStack = (
    <>
      <GamesCaseMediaFrame
        media={media}
        hugLayout={hugLayout}
        borderRadiusPx={mediaBorderRadiusPx}
      />
      {showCaption ? (
        <CaseStudyCaption description={media.caption ?? ""} tag={media.tag} />
      ) : null}
    </>
  );

  return (
    <section className="relative w-full overflow-visible">
      <div className="absolute inset-0">
        <MeasureGuide label="DIV" className="h-full" />
      </div>
      <div
        className="flex w-full flex-col py-6"
        style={{
          marginLeft: CONTENT_OFFSET_LEFT_PX,
          ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING,
        }}
      >
        {useFullWidthStack ? (
          <div
            className={`flex flex-col ${stackMaxWidthPx != null ? "w-full max-w-full" : "w-full"}`}
            style={{
              gap: CAPTION_MEDIA_GAP_PX,
              ...(stackMaxWidthPx != null ? { maxWidth: stackMaxWidthPx } : {}),
            }}
          >
            {mediaStack}
          </div>
        ) : (
          <div
            className="flex w-max max-w-full flex-col"
            style={{
              maxWidth: stackMaxWidthPx ?? CASE_MEDIA_MAX_WIDTH_PX,
              gap: CAPTION_MEDIA_GAP_PX,
            }}
          >
            {mediaStack}
          </div>
        )}
      </div>
    </section>
  );
}
