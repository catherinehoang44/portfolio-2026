"use client";

import { useState } from "react";
import { MeasureGuide } from "@/app/components/MeasureGuide";
import { LinkToSiteButton } from "@/app/components/LinkToSiteButton";
import { ScopeDetails } from "@/app/components/ScopeDetails";
import { CaseStudyCaption } from "@/app/components/CaseStudyCaption";
import {
  CONTAINER_GAP_PX,
  CONTENT_OFFSET_LEFT_PX,
  SECTION_GAP_TOP_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
  SCOPE_HEADING_FONT_SIZE_PX,
} from "@/lib/design-tokens";

/** Base path for media. Files must exist in public/work/dia-browser/ — see that folder’s README for exact filenames. Grey “Image”/“Video” placeholders mean the file is missing or the path failed (404). */
const DIA_MEDIA_BASE = "/work/dia-browser";

/** 508×419 aspect ratio (1px less height); media bottom-aligned in container. */
const DIA_MEDIA_ASPECT = "508/419";

const DIA_SCOPE_ITEMS = [
  { label: "Timeline", value: "1 day" },
  { label: "Team", value: "Solo → Personal project" },
  { label: "Skills", value: "UX design" },
];

/** Renders image in container; use inside a box with aspect ratio and position relative. */
function DiaImageSlot({ src, className = "" }: { src: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center ${className}`}
        style={{ background: COLORS.border }}
      >
        <span className="font-sans text-sm" style={{ color: COLORS.textMuted }}>
          Image
        </span>
      </div>
    );
  }
  return (
    <div
      className={`absolute left-0 right-0 bottom-0 w-full overflow-hidden ${className}`}
      style={{ height: "calc(100% * 420 / 419)" }}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ objectPosition: "bottom" }}
        onError={() => setFailed(true)}
        draggable={false}
      />
    </div>
  );
}

/** Renders video filling its container (muted, loop, playsInline). Use inside a container with aspect ratio. */
function DiaVideoSlot({ src, className = "" }: { src: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center ${className}`}
        style={{ background: COLORS.border }}
      >
        <span className="font-sans text-sm" style={{ color: COLORS.textMuted }}>
          Video
        </span>
      </div>
    );
  }
  return (
    <div
      className={`absolute left-0 right-0 bottom-0 w-full overflow-hidden ${className}`}
      style={{ height: "calc(100% * 420 / 419)" }}
    >
      <video
        src={src}
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
        style={{ objectPosition: "bottom" }}
        muted
        loop
        playsInline
        autoPlay
        onError={() => setFailed(true)}
        aria-hidden
        draggable={false}
      />
    </div>
  );
}

export default function DiaBrowserPage() {
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

        {/* Case study header: template */}
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
                  Case study
                </p>
                <h1
                  className="font-display text-heading"
                  style={{ color: COLORS.text }}
                >
                  Dia browser onboarding
                </h1>
                <LinkToSiteButton href="https://www.diabrowser.com/">Link to Dia</LinkToSiteButton>
              </div>
              <div className="flex flex-1 min-w-[320px]">
                <ScopeDetails
                  detailsLabel="Details"
                  scopeLabel="Scope"
                  items={DIA_SCOPE_ITEMS}
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

        {/* Intro description (Figma 328-1913) */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-4"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <h2
              className="font-sans font-light w-full"
              style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
            >
              Decreasing drop-off at the point of entry
            </h2>
            <p
              className="text-case-body w-full max-w-full"
              style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
            >
              Subtle details in the Dia onboarding were mismatched to user expectations. Made changes to improve aesthetics, match expectations, and add a little more delight to the final experience. The minor details is what keeps people captivated.
            </p>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Section 1: Color hierarchy — Before/After 508×420, captions (Figma 121-2021) */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: CONTAINER_GAP_PX }}
          >
            <h2
              className="font-medium text-case-body w-full"
              style={{ color: COLORS.textMutedStrong }}
            >
              Color hierarchy
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-2 w-full"
              style={{ gap: CONTAINER_GAP_PX }}
            >
              <div className="flex flex-col min-w-0 w-full" style={{ gap: 8, padding: 16 }}>
                <p className="font-sans font-light w-full" style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}>
                  Before
                </p>
                <div
                  className="case-media relative block w-full overflow-hidden"
                  style={{ aspectRatio: DIA_MEDIA_ASPECT, minHeight: 199 }}
                >
                  <DiaImageSlot src={`${DIA_MEDIA_BASE}/dia-confirm-before.png`} className="rounded-none" />
                </div>
                <CaseStudyCaption
                  description="Unclear color hierarchy creates false affordances"
                  tag="Image"
                />
              </div>
              <div className="flex flex-col min-w-0 w-full" style={{ gap: 8, padding: 16 }}>
                <p className="font-sans font-light w-full" style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}>
                  After
                </p>
                <div
                  className="case-media relative block w-full overflow-hidden"
                  style={{ aspectRatio: DIA_MEDIA_ASPECT, minHeight: 199 }}
                >
                  <DiaVideoSlot src={`${DIA_MEDIA_BASE}/dia-confirm-after.mp4`} className="rounded-none" />
                </div>
                <CaseStudyCaption
                  description="Clear hierarchy directs focus to the code field"
                  tag="Video"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Measure gap */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Section 2: Reflecting expectations — Before/After 508×420, captions */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: CONTAINER_GAP_PX }}
          >
            <h2
              className="font-medium text-case-body w-full"
              style={{ color: COLORS.textMutedStrong }}
            >
              Reflecting expectations
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-2 w-full"
              style={{ gap: CONTAINER_GAP_PX }}
            >
              <div className="flex flex-col min-w-0 w-full" style={{ gap: 8, padding: 16 }}>
                <p className="font-sans font-light w-full" style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}>
                  Before
                </p>
                <div
                  className="case-media relative block w-full overflow-hidden"
                  style={{ aspectRatio: DIA_MEDIA_ASPECT, minHeight: 199 }}
                >
                  <DiaImageSlot src={`${DIA_MEDIA_BASE}/dia-custom-before.png`} className="rounded-none" />
                </div>
                <CaseStudyCaption
                  description="Multiple views imply functionality that isn&apos;t supported"
                  tag="Image"
                />
              </div>
              <div className="flex flex-col min-w-0 w-full" style={{ gap: 8, padding: 16 }}>
                <p className="font-sans font-light w-full" style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}>
                  After
                </p>
                <div
                  className="case-media relative block w-full overflow-hidden"
                  style={{ aspectRatio: DIA_MEDIA_ASPECT, minHeight: 199 }}
                >
                  <DiaVideoSlot src={`${DIA_MEDIA_BASE}/dia-custom-after.mp4`} className="rounded-none" />
                </div>
                <CaseStudyCaption
                  description="Reduced visual noise directs focus to meaningful choices"
                  tag="Video"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Measure gap */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Section 3: Accurate demos — Before/After 508×420, captions */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: CONTAINER_GAP_PX }}
          >
            <h2
              className="font-medium text-case-body w-full"
              style={{ color: COLORS.textMutedStrong }}
            >
              Accurate demos
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-2 w-full"
              style={{ gap: CONTAINER_GAP_PX }}
            >
              <div className="flex flex-col min-w-0 w-full" style={{ gap: 8, padding: 16 }}>
                <p className="font-sans font-light w-full" style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}>
                  Before
                </p>
                <div
                  className="case-media relative block w-full overflow-hidden"
                  style={{ aspectRatio: DIA_MEDIA_ASPECT, minHeight: 199 }}
                >
                  <DiaVideoSlot src={`${DIA_MEDIA_BASE}/dia-tut-before.mp4`} className="rounded-none" />
                </div>
                <CaseStudyCaption
                  description="Demo ignores ⌘T shortcut"
                  tag="Video"
                />
              </div>
              <div className="flex flex-col min-w-0 w-full" style={{ gap: 8, padding: 16 }}>
                <p className="font-sans font-light w-full" style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}>
                  After
                </p>
                <div
                  className="case-media relative block w-full overflow-hidden"
                  style={{ aspectRatio: DIA_MEDIA_ASPECT, minHeight: 199 }}
                >
                  <DiaVideoSlot src={`${DIA_MEDIA_BASE}/dia-tut-after.mp4`} className="rounded-none" />
                </div>
                <CaseStudyCaption
                  description="Browser motion consistent with expectations"
                  tag="Video"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Measure gap (end of content) */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>
      </div>
    </div>
  );
}
