"use client";

import Link from "next/link";
import { MeasureGuide } from "@/app/components/MeasureGuide";
import { LiveClock } from "@/app/components/CardStack";
import {
  CONTENT_OFFSET_LEFT_PX,
  CONTAINER_GAP_PX,
  SECTION_GAP_TOP_PX,
  COLORS,
} from "@/lib/design-tokens";

export default function AboutPage() {
  return (
<div
    className="min-h-screen pb-4 overflow-visible flex flex-col items-center"
    style={{ background: COLORS.background, minHeight: "100vh" }}
  >
      <div
        className="container-main pt-4 overflow-visible flex flex-col flex-1 min-h-0 w-full"
        style={{ gap: CONTAINER_GAP_PX }}
      >
        {/* Measure: top gap */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Header: same as home but "Work" instead of "About", links to home */}
        <header className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="HDR" className="h-full" />
          </div>
          <div className="header-inner flex flex-col items-start lg:flex-row lg:items-end lg:justify-between w-full">
            <div
              className="flex flex-col w-full lg:flex-1 lg:min-w-0"
              style={{ gap: 16 }}
            >
              <p
                className="font-medium text-body"
                style={{ color: COLORS.textMutedStrong }}
              >
                <LiveClock />
              </p>
              <h1
                className="font-display text-heading flex flex-col items-start gap-0"
                style={{ color: COLORS.text }}
              >
                Hiya, I&apos;m Cat
                <span>I design brand, web, and software</span>
              </h1>
            </div>

            <nav
              className="relative z-10 flex flex-col items-start lg:items-end shrink-0"
              style={{ gap: 16 }}
            >
              <Link
                href="/"
                className="font-medium text-nav capitalize transition-colors hover:opacity-80"
                style={{ color: COLORS.nav }}
              >
                Work
              </Link>
              <a
                href="https://curius.app/catherine-hoang"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-nav capitalize transition-colors hover:opacity-80"
                style={{ color: COLORS.nav }}
              >
                Curius
              </a>
              <a
                href="mailto:catherinehoang44@gmail.com"
                className="font-medium text-nav capitalize transition-colors hover:opacity-80"
                style={{ color: COLORS.nav }}
              >
                Email
              </a>
            </nav>
          </div>
        </header>

        {/* GAP */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* About content: default text, no heading; section grows so page meets min 100vh */}
        <section className="relative overflow-visible w-full flex-1 flex flex-col min-h-0">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-4 flex-1 min-h-0 justify-center"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <p
              className="text-case-body w-full max-w-full"
              style={{ color: COLORS.text, lineHeight: 1.6 }}
            >
              Crafting digital designs with clear form and pleasant surprises.
            </p>
            <p
              className="text-case-body w-full max-w-full"
              style={{ color: COLORS.text, lineHeight: 1.6 }}
            >
              Toronto-based designer who got their start in all things running a gaming Youtube channel and making animations.
            </p>
            <p
              className="text-case-body w-full max-w-full"
              style={{ color: COLORS.text, lineHeight: 1.6 }}
            >
              Currently freelancing and looking for a full-time design role.
            </p>
            <p
              className="text-case-body w-full max-w-full"
              style={{ color: COLORS.text, lineHeight: 1.6 }}
            >
              Often excited :)
            </p>
          </div>
        </section>

        {/* Gap measure */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>
      </div>
    </div>
  );
}
