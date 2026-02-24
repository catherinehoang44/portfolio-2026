"use client";

import React from "react";
import { MeasureGuide } from "@/app/components/MeasureGuide";
import { LinkToSiteButton } from "@/app/components/LinkToSiteButton";
import { ScopeDetails } from "@/app/components/ScopeDetails";
import { CaseStudyCaption } from "@/app/components/CaseStudyCaption";
import {
  CONTAINER_GAP_PX,
  CONTENT_OFFSET_LEFT_PX,
  SECTION_GAP_TOP_PX,
  MEDIA_GAP_PX,
  CAPTION_MEDIA_GAP_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
  CASE_MEDIA_PLACEHOLDER_FILL,
  SCOPE_HEADING_FONT_SIZE_PX,
  SCOPE_LABEL_WIDTH_PX,
  SCOPE_VALUE_FONT_SIZE_PX,
} from "@/lib/design-tokens";

const EXPERIMENTS_MEDIA_BASE = "/work/experiments";

const POKEMON_DEMO_VIDEOS = [
  `${EXPERIMENTS_MEDIA_BASE}/pokemon-remake-1.mp4`,
  `${EXPERIMENTS_MEDIA_BASE}/pokemon-remake-2.mp4`,
  `${EXPERIMENTS_MEDIA_BASE}/pokemon-remake-3.mp4`,
  `${EXPERIMENTS_MEDIA_BASE}/pokemon-remake-4.mp4`,
];
/** Left-side text descriptions; one per step. */
const POKEMON_DEMO_TEXTS = [
  "World exploration with AWSD movement",
  "Battle UI, interactions, and edge cases.",
  "Attack sequence and visual timings.",
  "End scene to restart demo.",
];

const POKEMON_SCOPE_ITEMS = [
  { label: "Timeline", value: "2 weeks" },
  { label: "Team", value: "Solo → Personal project" },
];

const DEMO_DESCRIPTION =
  "As a personal project, I decided to recreate a few scenes from Pokémon FireRed. It helped me understand game asset, sprite management and audio/animation timing.";

const PIXELDORO_TITLE = "Pixeldoro";
const PIXELDORO_DESCRIPTION =
  "An RPG-style pixel art Pomodoro app that turns focus sessions into a small adventure—complete tasks to progress and unlock visual rewards.";

const POWERPOINT_NIGHT_TITLE = "Powerpoint Night Poster";
const POWERPOINT_NIGHT_DESCRIPTION =
  "A poster design for a themed presentation night—visual identity and event promo.";

const RADIAL_BITMAP_TITLE = "Radial Bitmap Tool";
const RADIAL_BITMAP_DESCRIPTION =
  "A bitmap tool that draws and edits radial patterns—experiments in procedural graphics.";

const ADOBE_BUSINESS_FRAMER_TITLE = "Adobe for Business site in Framer";
const ADOBE_BUSINESS_FRAMER_DESCRIPTION =
  "A Framer-built preview of the Adobe for Business marketing site—layout and motion.";

function SkillsBlock({ skills }: { skills: string[] }) {
  return (
    <dl className="flex flex-col gap-2">
      <div className="flex items-baseline" style={{ gap: 0 }}>
        <dt
          className="shrink-0 font-mono"
          style={{
            width: SCOPE_LABEL_WIDTH_PX,
            fontSize: 14,
            lineHeight: 1,
            color: COLORS.textMuted,
          }}
        >
          Skills
        </dt>
        <dd
          className="font-sans font-normal w-fit"
          style={{
            fontSize: SCOPE_VALUE_FONT_SIZE_PX,
            color: COLORS.textMutedStrong,
          }}
        >
          {skills.join(", ")}
        </dd>
      </div>
    </dl>
  );
}

function ExperimentPlaceholderSection({
  title,
  description,
  mediaSrc,
  ctaHref,
  captionDescription,
  captionTag,
  skills,
}: {
  title: string;
  description: string;
  mediaSrc?: string;
  ctaHref?: string;
  captionDescription?: string;
  captionTag?: string;
  skills?: string[];
}) {
  return (
    <section className="relative overflow-visible w-full">
      <div className="absolute inset-0">
        <MeasureGuide label="DIV" className="h-full" />
      </div>
      <div
        className="flex flex-col py-6 w-full md:flex-row md:items-start md:justify-between gap-6 md:gap-12"
        style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
      >
        <div className="flex-1 min-w-[320px] w-full flex flex-col" style={{ gap: CONTAINER_GAP_PX }}>
          <h2
            className="font-sans font-light w-full"
            style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
          >
            {title}
          </h2>
          <p
            className="text-case-body w-full max-w-full mt-4"
            style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
          >
            {description}
          </p>
          {skills != null && skills.length > 0 && <SkillsBlock skills={skills} />}
          {ctaHref && (
            <LinkToSiteButton href={ctaHref}>Link to site</LinkToSiteButton>
          )}
        </div>
        <div className="flex-1 min-w-[320px] w-full flex flex-col" style={{ gap: MEDIA_GAP_PX, padding: 16 }}>
          {mediaSrc ? (
            <>
              <div className="flex flex-col w-full" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media w-full overflow-hidden"
                  style={{ background: CASE_MEDIA_PLACEHOLDER_FILL }}
                >
                  <video
                    src={mediaSrc}
                    className="block w-full h-auto"
                    muted
                    loop
                    playsInline
                    autoPlay
                    aria-hidden
                    draggable={false}
                  />
                </div>
                {(captionDescription != null || captionTag != null) && (
                  <div className="w-full">
                    <CaseStudyCaption
                      description={captionDescription ?? ""}
                      tag={captionTag}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              className="case-media w-full"
              style={{ width: 428, minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function PokemonDemoSection() {
  return (
    <section className="relative overflow-visible w-full">
      <div className="absolute inset-0">
        <MeasureGuide label="DIV" className="h-full" />
      </div>
      <div
        className="flex flex-col py-6 w-full md:flex-row md:items-start md:justify-between gap-6 md:gap-12"
        style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
      >
        <div className="flex-1 min-w-[320px] w-full flex flex-col" style={{ gap: CONTAINER_GAP_PX }}>
          <h2
            className="font-sans font-light w-full"
            style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
          >
            Pokémon FireRed Recreation with Cursor
          </h2>
          <p
            className="text-case-body w-full max-w-full mt-4"
            style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
          >
            {DEMO_DESCRIPTION}
          </p>
          <SkillsBlock skills={["Sound design", "animation"]} />
          <LinkToSiteButton href="https://github.com/catherinehoang44/pokemon-remake">Link to Github</LinkToSiteButton>
        </div>
        <div className="flex-1 min-w-[320px] w-full flex flex-col items-center" style={{ gap: MEDIA_GAP_PX, padding: 16 }}>
          {POKEMON_DEMO_VIDEOS.map((src, i) => (
            <div key={src} className="flex flex-col w-full items-center" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
              <div
                className="case-media relative overflow-hidden"
                style={{
                  width: 428,
                  height: 310,
                  background: CASE_MEDIA_PLACEHOLDER_FILL,
                }}
              >
                <video
                  src={src}
                  className="absolute inset-0 w-full h-full object-contain"
                  muted
                  loop
                  playsInline
                  autoPlay
                  aria-hidden
                  draggable={false}
                />
              </div>
              <CaseStudyCaption description={POKEMON_DEMO_TEXTS[i]} tag="Demo Video" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PixeldoroDemoSection() {
  return (
    <ExperimentPlaceholderSection
      title={PIXELDORO_TITLE}
      description={PIXELDORO_DESCRIPTION}
      mediaSrc={`${EXPERIMENTS_MEDIA_BASE}/pixeldoro.webm`}
      captionDescription="Pixeldoro app preview"
      captionTag="Video"
    />
  );
}

function PowerpointNightSection() {
  return (
    <ExperimentPlaceholderSection
      title={POWERPOINT_NIGHT_TITLE}
      description={POWERPOINT_NIGHT_DESCRIPTION}
      mediaSrc={`${EXPERIMENTS_MEDIA_BASE}/toaster.webm`}
      captionDescription="Powerpoint Night poster design"
      captionTag="Video"
      skills={["Rive", "motion design"]}
    />
  );
}

function AdobeBusinessFramerSection() {
  return (
    <ExperimentPlaceholderSection
      title={ADOBE_BUSINESS_FRAMER_TITLE}
      description={ADOBE_BUSINESS_FRAMER_DESCRIPTION}
      mediaSrc={`${EXPERIMENTS_MEDIA_BASE}/adobe-business-framer-preview.mp4`}
      ctaHref="https://business-adobe-sandbox.framer.website/"
      captionDescription="Adobe for Business Framer site preview"
      captionTag="Video"
      skills={["Framer", "web design"]}
    />
  );
}

function RadialBitmapToolSection() {
  return (
    <ExperimentPlaceholderSection
      title={RADIAL_BITMAP_TITLE}
      description={RADIAL_BITMAP_DESCRIPTION}
      mediaSrc={`${EXPERIMENTS_MEDIA_BASE}/radial-bitmap.mp4`}
      captionDescription="Radial bitmap tool in action"
      captionTag="Video"
      skills={["Cursor", "vibe-coding"]}
    />
  );
}

export default function PokemonFireRedPage() {
  return (
    <div
      className="flex flex-col items-center"
      style={{ background: COLORS.background }}
    >
      <div
        className="container-main pt-4 flex flex-col"
        style={{ gap: CONTAINER_GAP_PX, paddingBottom: CASE_CONTENT_PADDING_BOTTOM_PX }}
      >
        {/* Measure: top gap */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Case study header (Figma 126-2105) */}
        <header className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="HDR" className="h-full" />
          </div>
          <div
            className="flex flex-col w-full"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: 32 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
              <div
                className="flex flex-col flex-1 min-w-[320px]"
                style={{ gap: CONTAINER_GAP_PX }}
              >
                <p
                  className="font-medium text-case-body"
                  style={{ color: COLORS.textMutedStrong }}
                >
                  Diddle daddles
                </p>
                <h1
                  className="font-display text-heading"
                  style={{ color: COLORS.text }}
                >
                  Experiments
                </h1>
              </div>
              <div className="flex flex-1 min-w-[320px]">
                <ScopeDetails
                  detailsLabel="Details"
                  scopeLabel="Scope"
                  items={POKEMON_SCOPE_ITEMS}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Measure gap after header */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Demo: non-sticky; left = title + description, right = 4 videos vertically with captions */}
        <PokemonDemoSection />

        {/* Measure gap between demo sections */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Pixeldoro: same layout, placeholder media */}
        <PixeldoroDemoSection />

        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Powerpoint Night Poster */}
        <PowerpointNightSection />

        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Adobe for Business site in Framer */}
        <AdobeBusinessFramerSection />

        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Radial Bitmap Tool */}
        <RadialBitmapToolSection />

        {/* Measure gap (end of content) */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>
      </div>
    </div>
  );
}
