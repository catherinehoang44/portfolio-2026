"use client";

import { MeasureGuide } from "@/app/components/MeasureGuide";
import {
  CONTAINER_GAP_PX,
  CONTENT_OFFSET_LEFT_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
  CASE_MEDIA_PLACEHOLDER_FILL,
  CASE_MEDIA_ASPECT_FULL,
  CASE_MEDIA_BORDER_RADIUS_PX,
} from "@/lib/design-tokens";
import { GamesCaseMeasureGap } from "./GamesCaseMeasureGap";
import { GamesCaseScopeSection } from "./GamesCaseScopeSection";
import { GamesCaseStudyHeader } from "./GamesCaseStudyHeader";

type GamesCaseStudyPlaceholderProps = {
  title: string;
  description?: string;
  descriptionPreface?: string;
  descriptionPrefaceItalic?: boolean;
  /** Large scope heading; defaults to case `title`. */
  scopeLabel?: string;
  scopeItems?: Array<{ label: string; value: string }>;
};

export function GamesCaseStudyPlaceholder({
  title,
  description = "",
  descriptionPreface,
  descriptionPrefaceItalic = false,
  scopeLabel,
  scopeItems = [{ label: "Status", value: "Coming soon" }],
}: GamesCaseStudyPlaceholderProps) {
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

        <GamesCaseStudyHeader title={title} />

        <GamesCaseMeasureGap />

        <GamesCaseScopeSection
          detailsLabel="Scope"
          scopeLabel={scopeLabel ?? title}
          items={scopeItems}
          descriptionPreface={descriptionPreface}
          descriptionPrefaceItalic={descriptionPrefaceItalic}
          description={description || undefined}
        />

        <GamesCaseMeasureGap />

        <section className="relative w-full overflow-visible">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex w-full flex-col py-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div
              className="flex w-full items-center justify-center"
              style={{
                aspectRatio: CASE_MEDIA_ASPECT_FULL,
                background: CASE_MEDIA_PLACEHOLDER_FILL,
                borderRadius: CASE_MEDIA_BORDER_RADIUS_PX,
              }}
            >
              <span
                className="font-mono text-xs uppercase tracking-wide"
                style={{ color: COLORS.textMuted }}
              >
                Media placeholder
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
