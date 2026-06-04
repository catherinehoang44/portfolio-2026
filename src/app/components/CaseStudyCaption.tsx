"use client";

import { COLORS, CASE_CAPTION_FONT_SIZE_PX, CASE_CAPTION_LINE_HEIGHT } from "@/lib/design-tokens";

/** When description contains ";", the semicolon and text before it use font-medium (Inter medium). */
function CaptionDescription({ description }: { description: string }) {
  const idx = description.indexOf(";");
  if (idx === -1) {
    return (
      <span
        className="font-sans"
        style={{ fontSize: CASE_CAPTION_FONT_SIZE_PX, lineHeight: CASE_CAPTION_LINE_HEIGHT, color: COLORS.textMuted }}
      >
        {description}
      </span>
    );
  }
  const before = description.slice(0, idx + 1);
  const after = description.slice(idx + 1).trimStart();
  return (
    <>
      <span
        className="font-sans font-medium"
        style={{ fontSize: CASE_CAPTION_FONT_SIZE_PX, lineHeight: CASE_CAPTION_LINE_HEIGHT, color: COLORS.textMuted }}
      >
        {before}
      </span>
      {after ? (
        <span
          className="font-sans"
          style={{ fontSize: CASE_CAPTION_FONT_SIZE_PX, lineHeight: CASE_CAPTION_LINE_HEIGHT, color: COLORS.textMuted }}
        >
          {" "}
          {after}
        </span>
      ) : null}
    </>
  );
}

/**
 * Case study caption (Figma 276-3537): description text + optional pill tag (e.g. "Video").
 */
export function CaseStudyCaption({
  description,
  tag,
  align = "right",
}: {
  description: string;
  tag?: "Video" | "Image" | string;
  align?: "left" | "right";
}) {
  const isLeft = align === "left";
  return (
    <div
      className={`flex flex-wrap items-center gap-2 w-full h-fit ${isLeft ? "justify-start" : "justify-end"}`}
      style={{ paddingTop: 0 }}
    >
      <span
        className={`font-sans flex-1 min-w-0 leading-none ${isLeft ? "text-left" : "text-right"}`}
        style={{ fontSize: CASE_CAPTION_FONT_SIZE_PX, lineHeight: CASE_CAPTION_LINE_HEIGHT, color: COLORS.textMuted }}
      >
        <CaptionDescription description={description} />
      </span>
      {tag != null && (
        <span
          className="font-sans shrink-0 border"
          style={{
            fontSize: CASE_CAPTION_FONT_SIZE_PX,
            lineHeight: CASE_CAPTION_LINE_HEIGHT,
            borderRadius: 4,
            color: COLORS.textMuted,
            borderColor: COLORS.border,
            padding: "3px 8px",
          }}
        >
          {tag}
        </span>
      )}
    </div>
  );
}
