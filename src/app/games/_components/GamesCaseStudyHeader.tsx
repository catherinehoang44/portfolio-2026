"use client";

import Link from "next/link";
import { MeasureGuide } from "@/app/components/MeasureGuide";
import {
  CONTAINER_GAP_PX,
  CONTENT_OFFSET_LEFT_PX,
  COLORS,
} from "@/lib/design-tokens";

type GamesCaseStudyHeaderProps = {
  title: string;
};

/** Case title block: back link + h1 only (scope lives on the next section). */
export function GamesCaseStudyHeader({ title }: GamesCaseStudyHeaderProps) {
  return (
    <header className="relative w-full overflow-visible">
      <div className="pointer-events-none absolute inset-0">
        <MeasureGuide label="HDR" className="h-full" />
      </div>
      <div
        className="flex w-full flex-col"
        style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: CONTAINER_GAP_PX }}
      >
        <Link
          href="/games"
          className="case-study-tag font-medium text-case-body"
        >
          <img
            src="/images/case-back-arrow.svg"
            alt=""
            aria-hidden
            style={{ width: 12, height: 12 }}
            draggable={false}
          />
          <span>Back</span>
        </Link>
        <h1
          className="font-display text-heading"
          style={{ color: COLORS.text }}
        >
          {title}
        </h1>
      </div>
    </header>
  );
}
