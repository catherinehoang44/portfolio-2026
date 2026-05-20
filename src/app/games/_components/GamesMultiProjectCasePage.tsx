"use client";

import Link from "next/link";
import { MeasureGuide } from "@/app/components/MeasureGuide";
import {
  CONTAINER_GAP_PX,
  CONTENT_OFFSET_LEFT_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
} from "@/lib/design-tokens";
import { GamesCaseMeasureGap } from "./GamesCaseMeasureGap";
import { GamesCaseProjectSection } from "./GamesCaseProjectSection";
import type { GamesCaseProject } from "./games-case-project-types";

type GamesMultiProjectCasePageProps = {
  title: string;
  description: string;
  projects: GamesCaseProject[];
  /** When true, project media spans full case content width. */
  mediaFillContainerWidth?: boolean;
};

export function GamesMultiProjectCasePage({
  title,
  description,
  projects,
  mediaFillContainerWidth = false,
}: GamesMultiProjectCasePageProps) {
  return (
    <div
      className="flex min-h-screen flex-col items-center"
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
            <p
              className="max-w-[640px] font-sans font-normal text-case-body"
              style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
            >
              {description}
            </p>
          </div>
        </header>

        {projects.map((project) => (
          <div key={project.scopeLabel} className="contents">
            <GamesCaseMeasureGap />
            <GamesCaseProjectSection
              {...project}
              fillContainerWidth={
                project.fillContainerWidth ?? mediaFillContainerWidth
              }
            />
          </div>
        ))}

        <GamesCaseMeasureGap />
      </div>
    </div>
  );
}
