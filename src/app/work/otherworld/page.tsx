"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MeasureGuide } from "@/app/components/MeasureGuide";
import { LinkToSiteButton } from "@/app/components/LinkToSiteButton";
import { ScopeDetails } from "@/app/components/ScopeDetails";
import { CaseStudyCaption } from "@/app/components/CaseStudyCaption";
import {
  CONTAINER_GAP_PX,
  CONTENT_OFFSET_LEFT_PX,
  SECTION_GAP_TOP_PX,
  CAPTION_MEDIA_GAP_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
  CASE_BACK_MEASURE_LABEL,
} from "@/lib/design-tokens";

/** Upload case study media to public/work/otherworld/ — see MEDIA_SLOTS / VIDEO_SLOTS for filenames. */
const MEDIA_BASE = "/work/otherworld";
const MEDIA_SLOTS = {
  brandBook: `${MEDIA_BASE}/brand-book.png`,
  logoConstruction: `${MEDIA_BASE}/logo-construction.png`,
} as const;
const VIDEO_SLOTS = {
  portal: `${MEDIA_BASE}/otherworld-portal.mp4`,
  casenav: `${MEDIA_BASE}/otherworld-casenav.mp4`,
  form: `${MEDIA_BASE}/otherworld-form.mp4`,
  "404": `${MEDIA_BASE}/otherworld-404.mp4`,
  work: `${MEDIA_BASE}/otherworld-work.mp4`,
} as const;

const CASE_SCOPE_ITEMS = [
  { label: "Timeline", value: "1 month" },
  { label: "Team", value: "Solo → Freelance project" },
  { label: "Skills", value: "Web and brand design" },
];

/** Otherworld case media: fixed sizes on desktop, fill width on mobile. */
const CASE_MEDIA_SIZES = {
  brandAndLogo: { w: 508, h: 312 },
  videoFull: { w: 1083, h: 609 },
  videoSideBySide: { w: 508, h: 402 },
} as const;

/** Renders image from public path; no fill on load error (containers stay empty). */
function CaseStudyMediaSlot({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className={className} />;
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        unoptimized
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/** Renders video from public path (muted, loop, playsInline). Optional height (px); objectPosition; or fillContainer to fill parent. */
function CaseStudyVideoSlot({
  src,
  className = "",
  height,
  objectPosition,
  fillContainer,
}: {
  src: string;
  className?: string;
  height?: number;
  objectPosition?: string;
  fillContainer?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const fixedSize = height != null || fillContainer;
  return (
    <div
      className={`relative overflow-hidden w-full ${fillContainer ? "h-full" : ""} ${className}`}
      style={height != null ? { height } : undefined}
    >
      {failed ? (
        <div
          className={fixedSize ? "absolute inset-0 flex items-center justify-center" : "flex items-center justify-center py-12"}
          style={{ background: COLORS.border }}
        >
          <span
            className="font-sans text-sm"
            style={{ color: COLORS.textMuted }}
          >
            Video
          </span>
        </div>
      ) : fixedSize ? (
        <video
          src={src}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={objectPosition ? { objectPosition } : undefined}
          muted
          loop
          playsInline
          autoPlay
          onError={() => setFailed(true)}
          aria-hidden
          draggable={false}
        />
      ) : (
        <video
          src={src}
          className="block w-full h-auto pointer-events-none"
          muted
          loop
          playsInline
          autoPlay
          onError={() => setFailed(true)}
          aria-hidden
          draggable={false}
        />
      )}
    </div>
  );
}

export default function OtherworldPage() {
  return (
    <div
      className="flex flex-col items-center"
      style={{ background: COLORS.background }}
    >
      <div
        className="container-main pt-4 flex flex-col"
        style={{ gap: CONTAINER_GAP_PX, paddingBottom: CASE_CONTENT_PADDING_BOTTOM_PX }}
      >
        {/* Measure: top gap — same as home */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Back to home: hidden per design */}
        <section className="relative overflow-visible w-full hidden">
          <div className="absolute inset-0">
            <MeasureGuide label={CASE_BACK_MEASURE_LABEL} className="h-full" />
          </div>
          <div className="w-full" style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}>
            <Link
              href="/"
              className="case-back-link font-mono text-xs uppercase font-medium tracking-wide inline-flex items-center gap-2 w-fit transition-colors duration-300 hover:opacity-80"
              style={{ color: COLORS.textMutedStrong }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M8.75 3.5L5.25 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Home
            </Link>
          </div>
        </section>

        {/* Case study header (Figma): measure strip + arrow home + two-column layout */}
        <header className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="HDR" className="h-full" />
          </div>
          <div
            className="flex flex-col w-full"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: 32 }}
          >
            {/* Two columns: both width fill, min 320px */}
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
                  Otherworld
                </h1>
                <LinkToSiteButton href="https://otherworld-studios.com/">Link to site</LinkToSiteButton>
              </div>
              <div className="flex flex-1 min-w-[320px]">
                <ScopeDetails items={CASE_SCOPE_ITEMS} />
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

        {/* Description block: own measure container, text fills width */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col w-full py-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: 16 }}
          >
            <h2
              className="font-sans font-light w-full"
              style={{ color: COLORS.text, fontSize: 21 }}
            >
              Transport to another world
            </h2>
            <p
              className="text-case-body w-full max-w-full"
              style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
            >
              I created a website for a friend&apos;s marketing agency with a space and
              portal theme. We focused on creating a feeling of transporting to
              another world when entering the site while maintaining ease to
              access call to actions and case studies. Figma, Framer, and
              ChatGPT were key tools used on this project.
            </p>
          </div>
        </section>

        {/* Measure gap */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Brand book + Logo construction: fill width, aspect ratio 508/312 (hidden) */}
        <section className="relative overflow-visible w-full hidden">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: 16 }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-[minmax(320px,1fr)_minmax(320px,1fr)] w-full"
              style={{ gap: CONTAINER_GAP_PX }}
            >
              <div
                className="flex flex-col min-w-0 w-full"
                style={{ gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}
              >
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "508/312" }}
                >
                  <CaseStudyMediaSlot src={MEDIA_SLOTS.brandBook} className="absolute inset-0 h-full w-full rounded-none" />
                </div>
                <CaseStudyCaption description="End-to-end brand book" tag="Image" />
              </div>
              <div
                className="flex flex-col min-w-0 w-full"
                style={{ gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}
              >
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "508/312" }}
                >
                  <CaseStudyMediaSlot src={MEDIA_SLOTS.logoConstruction} className="absolute inset-0 h-full w-full rounded-none" />
                </div>
                <CaseStudyCaption description="Logo mark grid and construction guidelines" tag="Image" />
              </div>
            </div>
          </div>
        </section>

        {/* Measure gap (hidden — accompanies brand section) */}
        <div
          className="relative overflow-visible hidden"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* 1. Portal hero: fill width, aspect ratio 1083/609 */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}
          >
            <div
              className="case-media relative w-full overflow-hidden"
              style={{ aspectRatio: "1083/609" }}
            >
              <CaseStudyVideoSlot src={VIDEO_SLOTS.portal} className="absolute inset-0 rounded-none" fillContainer />
            </div>
            <CaseStudyCaption description="Scroll-driven zoom-in experience on page load" tag="Video" />
          </div>
        </section>

        {/* Measure gap */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* 2. Adaptive case navigation + Subtle taste: fill width, aspect ratio 508/402 each */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: 16 }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-[minmax(320px,1fr)_minmax(320px,1fr)] w-full"
              style={{ gap: CONTAINER_GAP_PX }}
            >
              <div
                className="flex flex-col min-w-0 w-full"
                style={{ gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}
              >
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "508/402" }}
                >
                  <CaseStudyVideoSlot src={VIDEO_SLOTS.work} className="absolute inset-0 rounded-none" fillContainer objectPosition="left center" />
                </div>
                <CaseStudyCaption description="Motion-based text reveals" tag="Video" />
              </div>
              <div
                className="flex flex-col min-w-0 w-full"
                style={{ gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}
              >
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "508/402" }}
                >
                  <CaseStudyVideoSlot src={VIDEO_SLOTS.casenav} className="absolute inset-0 rounded-none" fillContainer />
                </div>
                <CaseStudyCaption description="Case navigation updates dynamically on scroll" tag="Video" />
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

        {/* 3. Let&apos;s work together: fill width, aspect ratio 1083/609 */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}
          >
            <div
              className="case-media relative w-full overflow-hidden"
              style={{ aspectRatio: "1083/609" }}
            >
              <CaseStudyVideoSlot src={VIDEO_SLOTS.form} className="absolute inset-0 rounded-none" fillContainer />
            </div>
            <CaseStudyCaption description="Form with progressive glow" tag="Video" />
          </div>
        </section>

        {/* Measure gap */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* 4. Animated 404: fill width, aspect ratio 1083/609 */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX, gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}
          >
            <div
              className="case-media relative w-full overflow-hidden"
              style={{ aspectRatio: "1083/609" }}
            >
              <CaseStudyVideoSlot src={VIDEO_SLOTS["404"]} className="absolute inset-0 rounded-none" fillContainer />
            </div>
            <CaseStudyCaption description="Particles that respond to cursor movement" tag="Video" />
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
