"use client";

import { useRef, useState, useEffect } from "react";
import { MeasureGuide } from "@/app/components/MeasureGuide";
import { LinkToSiteButton } from "@/app/components/LinkToSiteButton";
import { ScopeDetails } from "@/app/components/ScopeDetails";
import { CaseStudyCaption } from "@/app/components/CaseStudyCaption";
import { CaseStudyMediaSlot } from "@/app/components/CaseStudyMediaSlot";
import { DataVisualizationPanel } from "@/app/work/adobe-learning-portal/DataVisualizationPanel";
import { PrioritizationChart } from "@/app/work/adobe-learning-portal/PrioritizationChart";
import { TestimonialCard } from "@/app/work/adobe-learning-portal/TestimonialCard";
import { Highlight, HIGHLIGHT_TWINKLE_ICON_SRC } from "@/app/components/Highlight";
import {
  CONTAINER_GAP_PX,
  CONTENT_OFFSET_LEFT_PX,
  SECTION_GAP_TOP_PX,
  MEDIA_GAP_PX,
  CAPTION_MEDIA_GAP_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
  CASE_SECTION_SUBHEADING_FONT_SIZE_PX,
  CASE_MEDIA_PLACEHOLDER_FILL,
  SCOPE_HEADING_FONT_SIZE_PX,
} from "@/lib/design-tokens";

const ADOBE_MEDIA_BASE = "/work/adobe-learning-portal";

const CONTEXT_OPACITY_DIM = 0.36;
const CONTEXT_STEPS = 4;

const CONTEXT_TEXTS: string[] = [
  "On any Adobe forum, there was a resounding confusion on what Adobe Digital Experience even offered. The average person was not going to remember all 15 apps. Instead…",
  "They'd remember only 1 app at a time.",
  "And when they begun to learn that app, users came across the same set of problems.",
  "There was no central place to learn and actually try it out.",
];

const CONTEXT_IMAGE_SRCS = [
  `${ADOBE_MEDIA_BASE}/context-1.jpg`,
  `${ADOBE_MEDIA_BASE}/context-2.jpg`,
  `${ADOBE_MEDIA_BASE}/context-3.jpg`,
  `${ADOBE_MEDIA_BASE}/context-4.jpg`,
];

const COURSE_CATALOG_STEPS = 3;
const COURSE_CATALOG_TEXTS: string[] = [
  "Overdeliver with clear design and user experience",
  "Encouraging continuous engagement through gamified elements",
  "Receive guidance from Adobe product teams outside of the internal team",
];
const COURSE_CATALOG_IMAGE_SRCS = [
  `${ADOBE_MEDIA_BASE}/course-catalog-1.png`,
  `${ADOBE_MEDIA_BASE}/course-catalog-2.png`,
  `${ADOBE_MEDIA_BASE}/course-catalog-3.png`,
];

function ContextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [contextFocus, setContextFocus] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      if (rect.bottom < 0 || rect.top > viewportHeight) return;
      const scrolledInto = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledInto / (sectionHeight - viewportHeight)));
      const step = Math.min(CONTEXT_STEPS - 1, Math.floor(progress * CONTEXT_STEPS));
      const next = (step + 1) as 1 | 2 | 3 | 4;
      setContextFocus((prev) => (prev !== next ? next : prev));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-visible w-full"
      style={{ minHeight: "400vh" }}
    >
      <div className="absolute inset-0">
        <MeasureGuide label="STK" className="h-full" />
      </div>
      {/* Spacer so sticky content stays below Overview + GAP until user scrolls into this section */}
      <div aria-hidden className="w-full shrink-0" style={{ height: "50vh" }} />
      <div
        className="sticky flex flex-col py-6 w-full md:flex-row md:items-start md:justify-between gap-6 md:gap-12 min-h-[60vh] md:min-h-0"
        style={{
          marginLeft: CONTENT_OFFSET_LEFT_PX,
          top: "50vh",
          transform: "translateY(-50%)",
        }}
      >
        {/* Left: Context label + Recurring Pain Point + 4 context items (opacity by contextFocus) */}
        <div className="flex-1 min-w-[320px] w-full">
          <p
            className="font-medium text-case-body w-full"
            style={{ color: COLORS.textMutedStrong }}
          >
            Context
          </p>
          <h2
            className="font-sans font-light w-full mt-2"
            style={{ color: COLORS.text, fontSize: 21 }}
          >
            Recurring Pain Point
          </h2>
          <div className="flex flex-col w-full max-w-full mt-4" style={{ gap: 16 }}>
            {CONTEXT_TEXTS.map((text, i) => (
              <p
                key={i}
                className="text-case-body w-full max-w-full transition-opacity duration-300"
                style={{
                  color: COLORS.textMutedStrong,
                  lineHeight: 1.6,
                  opacity: contextFocus === i + 1 ? 1 : CONTEXT_OPACITY_DIM,
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
        {/* Right: one media — context 1 & 2 = single DataVisualizationPanel that animates by frame; 3 & 4 = image (514/420 for panel) */}
        <div className="flex-1 min-w-[320px] w-full flex flex-col" style={{ padding: 16 }}>
          <div
            className="case-media relative w-full overflow-hidden flex items-center justify-center"
            style={{ aspectRatio: "514/420", minHeight: 200, background: "#FFFFFF" }}
          >
            {/* Context 1 & 2: single panel, frame drives animation (context1 ↔ context2) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: contextFocus <= 2 ? 1 : 0,
                pointerEvents: contextFocus <= 2 ? "auto" : "none",
              }}
            >
              <DataVisualizationPanel
                frame={contextFocus === 1 ? "context1" : "context2"}
              />
            </div>
            {/* Context 3 & 4: testimonial card (scroll animates between 3 and 4) */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{
                opacity: contextFocus >= 3 ? 1 : 0,
                pointerEvents: contextFocus >= 3 ? "auto" : "none",
              }}
            >
              <TestimonialCard motionStep={contextFocus >= 3 ? contextFocus : 3} style={{ width: "100%", height: "100%", maxWidth: "513.5px" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseCatalogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [focus, setFocus] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      if (rect.bottom < 0 || rect.top > viewportHeight) return;
      const scrolledInto = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledInto / (sectionHeight - viewportHeight)));
      const step = Math.min(COURSE_CATALOG_STEPS - 1, Math.floor(progress * COURSE_CATALOG_STEPS));
      const next = (step + 1) as 1 | 2 | 3;
      setFocus((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-visible w-full"
      style={{ minHeight: "400vh" }}
    >
      <div className="absolute inset-0">
        <MeasureGuide label="DIV" className="h-full" />
      </div>
      <div aria-hidden className="w-full shrink-0" style={{ height: "50vh" }} />
      <div
        className="sticky flex flex-col py-6 w-full md:flex-row md:items-start md:justify-between gap-6 md:gap-12 min-h-[60vh] md:min-h-0"
        style={{
          marginLeft: CONTENT_OFFSET_LEFT_PX,
          top: "50vh",
          transform: "translateY(-50%)",
        }}
      >
        <div className="flex-1 min-w-[320px] w-full">
          <p
            className="font-mono w-full"
            style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
          >
            Iterations
          </p>
          <h2
            className="font-sans font-light w-full mt-2"
            style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
          >
            Course Catalog Iterations
          </h2>
          <div className="flex flex-col w-full max-w-full mt-4" style={{ gap: 16 }}>
            {COURSE_CATALOG_TEXTS.map((text, i) => (
              <p
                key={i}
                className="text-case-body w-full max-w-full transition-opacity duration-300"
                style={{
                  color: COLORS.textMutedStrong,
                  lineHeight: 1.6,
                  opacity: focus === i + 1 ? 1 : CONTEXT_OPACITY_DIM,
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-1 min-w-[320px] w-full flex flex-col" style={{ padding: 16 }}>
          <div
            className="case-media relative w-full overflow-hidden"
            style={{ aspectRatio: "514/420", minHeight: 200, background: "#FFFFFF" }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: focus === i ? 1 : 0,
                  pointerEvents: focus === i ? "auto" : "none",
                }}
              >
                <CaseStudyMediaSlot
                  src={COURSE_CATALOG_IMAGE_SRCS[i - 1]}
                  className="absolute inset-0 h-full w-full rounded-none"
                />
              </div>
            ))}
          </div>
          <CaseStudyCaption
            description={
                [
                  "Actions and hierarchy unclear, weakening scannability",
                  "Ambiguous interactions (e.g., star icon, multi-tag behavior)",
                  "Card layout improves scannability and visual hierarchy",
                ][focus - 1]
              }
            tag="Image"
          />
        </div>
      </div>
    </section>
  );
}

const ADOBE_SCOPE_ITEMS = [
  { label: "Timeline", value: "4 months" },
  { label: "Team", value: "UX manager → 1 designer, 3 devs" },
  { label: "Skills", value: "User testing, web design, enterprise tools" },
];

export default function AdobeLearningPortalPage() {
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

        {/* Case study header (Figma 126-2175) */}
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
                  Adobe Certifications
                </h1>
                <LinkToSiteButton href="#final-designs" iconVariant="jumpToDesigns">Jump to designs</LinkToSiteButton>
              </div>
              <div className="flex flex-1 min-w-[320px]">
                <ScopeDetails
                  detailsLabel="Details"
                  scopeLabel="Scope"
                  items={ADOBE_SCOPE_ITEMS}
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

        {/* Overview: left = text from Figma 126-2243, right = temporary image + caption */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full md:flex-row md:items-start md:justify-between gap-6 md:gap-12"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="flex-1 min-w-[320px] w-full">
              <p
                className="font-medium text-case-body w-full"
                style={{ color: COLORS.textMutedStrong }}
              >
                Overview
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: 21 }}
              >
                How we achieved +500% Adobe credentialed in 3 Quarters
              </h2>
              <div className="flex flex-col w-full max-w-full mt-4" style={{ gap: 16 }}>
                <p
                  className="text-case-body w-full max-w-full"
                  style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
                >
                  When you hear &quot;Adobe&quot;, your first thought may be Photoshop, the Creative Cloud products, or Adobe Acrobat.
                </p>
                <p
                  className="text-case-body w-full max-w-full"
                  style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
                >
                  Yet, Adobe has 15 business analytic products under Experience Cloud. It&apos;s hard to care when it&apos;s frustrating and &quot;nearly impossible&quot; to self-learn these complex tools.
                </p>
                <p
                  className="text-case-body w-full max-w-full"
                  style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
                >
                  To make the learning path enjoyable and clear for users, I led the end-to-end conception of the web experience for the Certification Learning Portal.
                </p>
              </div>
            </div>
            <div className="flex-1 min-w-[320px] flex flex-col w-full" style={{ gap: 8, padding: 16 }}>
              <div
                className="case-media relative w-full overflow-hidden"
                style={{ aspectRatio: "514/420", minHeight: 200, background: "#FFFFFF" }}
              >
                <CaseStudyMediaSlot
                  src={`${ADOBE_MEDIA_BASE}/scope-diagram.png`}
                  className="absolute inset-0 h-full w-full rounded-none"
                />
              </div>
              <CaseStudyCaption
                description="Scope diagram"
                tag="Image"
              />
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

        {/* Context: sticky left (text with focus opacity) + sticky right (swapping images); scroll drives contextFocus 1–4 */}
        <ContextSection />

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Problem: Learning was being gate-kept (Figma 272-2837, 272-2836) — top/bottom */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <p
              className="font-mono w-full"
              style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
            >
              Problem
            </p>
            <h2
              className="font-sans font-light w-full mt-2"
              style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
            >
              Learning was being gate-kept
            </h2>
            {/* Block 1 (Figma 272-2837): logo 272-2823 left of subheading */}
            <div className="flex flex-col w-full max-w-full" style={{ gap: 12 }}>
              <div className="flex items-center gap-3">
                <img
                  src={`${ADOBE_MEDIA_BASE}/problem-logo-1.svg`}
                  alt=""
                  aria-hidden
                  className="shrink-0"
                  style={{ width: 16, height: 16 }}
                />
                <p className="text-case-body font-medium" style={{ color: COLORS.text, lineHeight: 1.6 }}>
                  Even our company partners struggled:
                </p>
              </div>
              <ul className="list-disc list-inside flex flex-col w-full max-w-full" style={{ gap: 8, paddingLeft: 8 }}>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  Existing sandboxes and requesting on-demand synchronous training was not an automized process for company partners
                </li>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  Everyday users were unable to access sandboxes and on-demand synchronous training at all
                </li>
              </ul>
            </div>
            {/* Block 2 (Figma 272-2836): logo 272-2832 left of subheading */}
            <div className="flex flex-col w-full max-w-full" style={{ gap: 8 }}>
              <div className="flex items-center gap-3">
                <img
                  src={`${ADOBE_MEDIA_BASE}/problem-logo-2.svg`}
                  alt=""
                  aria-hidden
                  className="shrink-0"
                  style={{ width: 16, height: 16 }}
                />
                <p className="text-case-body font-medium" style={{ color: COLORS.text, lineHeight: 1.6 }}>
                  Designing for people:
                </p>
              </div>
              <ul className="list-disc list-inside flex flex-col w-full max-w-full" style={{ gap: 8, paddingLeft: 8 }}>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  How would the learning experience change if a &quot;Learning Platform&quot; existed?
                </li>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  What if we allowed all users to easily access training and sandboxes?
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Plan: Guiding Principles (Figma 235-2952) — top/bottom */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="w-full">
              <p
                className="font-mono w-full"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                Plan
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Guiding Principles for the Design Process
              </h2>
              <div className="flex flex-col w-full max-w-full mt-4" style={{ gap: 16 }}>
                <div className="flex flex-col min-w-0" style={{ gap: 4 }}>
                  <p className="font-medium text-case-body" style={{ color: COLORS.text, lineHeight: 1.6 }}>
                    Product Excellence
                  </p>
                  <p className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                    Overdeliver with clear design and user experience.
                  </p>
                </div>
                <div className="flex flex-col min-w-0" style={{ gap: 4 }}>
                  <p className="font-medium text-case-body" style={{ color: COLORS.text, lineHeight: 1.6 }}>
                    Motivational Mechanics
                  </p>
                  <p className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                    Encouraging continuous engagement through gamified elements.
                  </p>
                </div>
                <div className="flex flex-col min-w-0" style={{ gap: 4 }}>
                  <p className="font-medium text-case-body" style={{ color: COLORS.text, lineHeight: 1.6 }}>
                    Proactive Feedback
                  </p>
                  <p className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                    Receive guidance from Adobe product teams outside of the internal team.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col" style={{ gap: MEDIA_GAP_PX, padding: 16 }}>
              <div className="w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "1110/320", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                >
                  <CaseStudyMediaSlot
                    src={`${ADOBE_MEDIA_BASE}/timeline.png`}
                    className="absolute inset-0 h-full w-full rounded-none"
                    objectFit="contain"
                  />
                </div>
                <CaseStudyCaption description="Design process timeline" tag="Motion" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Research: 3 images research1–3 (Figma 126-2400) — top/bottom */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="w-full">
              <p
                className="font-mono w-full"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                Research
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                I spearheaded feature prioritizations alongside my team
              </h2>
              <p
                className="text-case-body w-full max-w-full mt-4"
                style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
              >
                By conducting a series of research methodologies, the data helped us define what functionality and experiences were necessary and when to implement. While I cannot share specifics due to NDA, I can share the methods used:
              </p>
            </div>
            {/* Research container: 3 images research1–3, 350×207 aspect ratio */}
            <div
              className="w-full flex flex-row gap-4"
              style={{ minWidth: 0, padding: 16 }}
            >
              <div
                className="case-media relative flex-1 min-w-0 overflow-hidden"
                style={{ aspectRatio: "350/207", background: "#FFFFFF" }}
              >
                <CaseStudyMediaSlot
                  src={`${ADOBE_MEDIA_BASE}/research1.png`}
                  className="absolute inset-0 h-full w-full rounded-none"
                />
              </div>
              <div
                className="case-media relative flex-1 min-w-0 overflow-hidden"
                style={{ aspectRatio: "350/207", background: "#FFFFFF" }}
              >
                <CaseStudyMediaSlot
                  src={`${ADOBE_MEDIA_BASE}/research2.png`}
                  className="absolute inset-0 h-full w-full rounded-none"
                />
              </div>
              <div
                className="case-media relative flex-1 min-w-0 overflow-hidden"
                style={{ aspectRatio: "350/207", background: "#FFFFFF" }}
              >
                <CaseStudyMediaSlot
                  src={`${ADOBE_MEDIA_BASE}/research3.png`}
                  className="absolute inset-0 h-full w-full rounded-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* People: Prioritization Chart (Figma 235-3414) — top/bottom */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="w-full">
              <p
                className="font-mono w-full"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                People
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Prioritization Chart
              </h2>
            </div>
            <div className="w-full flex flex-col" style={{ gap: MEDIA_GAP_PX, padding: 16 }}>
              <div className="w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="relative w-full overflow-visible"
                  style={{ width: "100%", minHeight: 0 }}
                >
                  <PrioritizationChart style={{ width: "100%" }} />
                </div>
                <CaseStudyCaption description="Audience prioritization chart" tag="Interactable" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Flow: Site User Flow Iterations (Figma 126-2420) — top/bottom */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="w-full">
              <p
                className="font-mono w-full"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                Flow
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Site User Flow Iterations
              </h2>
              <ul className="list-none flex flex-col w-full max-w-full mt-4" style={{ gap: 8 }}>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  <strong>Flow V1:</strong> Overdeliver with clear design and user experience
                </li>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  <strong>Flow V2:</strong> Encouraging continuous engagement through gamified elements
                </li>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  <strong>Flow V3:</strong> Receive guidance from Adobe product teams outside of the internal team
                </li>
              </ul>
            </div>
            <div className="w-full flex flex-col" style={{ gap: MEDIA_GAP_PX, padding: 16 }}>
              <div className="w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "1110/320", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                >
                  <CaseStudyMediaSlot
                    src={`${ADOBE_MEDIA_BASE}/flow-chart.png`}
                    className="absolute inset-0 h-full w-full rounded-none"
                    objectFit="contain"
                  />
                </div>
                <CaseStudyCaption description="Community and secondary paths surfaced too early" tag="Image" />
              </div>
              <div className="w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "1110/320", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                >
                  <CaseStudyMediaSlot
                    src={`${ADOBE_MEDIA_BASE}/flow-chart-updated.png`}
                    className="absolute inset-0 h-full w-full rounded-none"
                    objectFit="contain"
                  />
                </div>
                <CaseStudyCaption description="Streamlined navigation centered on core learning flow" tag="Image" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Flow: Course Catalog Iterations — sticky, 3 images + text (no captions) */}
        <CourseCatalogSection />

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Retrospective: Project Takeaways (Figma 237-2250 + 272-3431) — top/bottom */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="w-full">
              <p
                className="font-mono w-full"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                Retrospective
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Project Takeaways
              </h2>
              <ul className="list-none flex flex-col w-full max-w-full mt-4" style={{ gap: 24 }}>
                {[
                  {
                    title: "Balancing Ambition with Practicality",
                    description:
                      "Breaking down a large-scale vision into actionable, prioritized steps allowed us to make significant progress within tight time constraints.",
                  },
                  {
                    title: "Data-Informed Design Decisions",
                    description:
                      "Adobe's suite of design and data resources saved immense time and overhead, by guiding our choices to create a targeted final product.",
                  },
                  {
                    title: "Scalability Through Modularity",
                    description:
                      "Designing a flexible, modular system enabled us to create a solution that could grow and adapt to future needs.",
                  },
                  {
                    title: "Accessibility as a Driver",
                    description:
                      "Prioritizing accessibility and cross-functional stakeholders from the start led to a more inclusive and ultimately better product for all users, not just those from different regions and specific needs.",
                  },
                ].map(({ title, description }) => (
                  <li key={title} className="flex flex-col w-full" style={{ gap: 8 }}>
                    <span className="text-case-body font-medium" style={{ color: COLORS.text, lineHeight: 1.6 }}>
                      {title}
                    </span>
                    <p
                      className="text-case-body w-full"
                      style={{ color: COLORS.textMutedStrong, lineHeight: 1.6, marginLeft: 0, paddingLeft: 0 }}
                    >
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {/* Highlight: outcome quote + twinkle (same as Hick's Law) */}
            <div className="w-full">
              <Highlight
                title=""
                iconSrc={HIGHLIGHT_TWINKLE_ICON_SRC}
                iconLeftLayout
                style={{ width: "100%", maxWidth: "100%" }}
              >
                We received funding and resources to bring the project into existence. Since launch, we&apos;ve achieved over a million MoM learners on the platform, 500% of our target amount.
              </Highlight>
            </div>
            <div className="w-full flex flex-col gap-6" style={{ padding: 16 }}>
              <div>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "1110/320", minHeight: 300, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                >
                  <CaseStudyMediaSlot
                    src={`${ADOBE_MEDIA_BASE}/positive-comments.png`}
                    className="absolute inset-0 h-full w-full rounded-none"
                    objectFit="cover"
                  />
                </div>
                <CaseStudyCaption description="Positive user feedback" tag="Image" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Final Designs: Adobe Certification Portal (Figma 272-3370) — top/bottom */}
        <section id="final-designs" className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="w-full">
              <p
                className="font-mono w-full"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                Final Designs
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Adobe Certification Portal
              </h2>
            </div>
            <div className="w-full flex flex-col" style={{ gap: MEDIA_GAP_PX, padding: 16 }}>
              {/* Rive: first, same layout as video blocks — 1920/1080 outer, fill height, scales */}
              <div className="flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden flex items-center justify-center"
                  style={{
                    aspectRatio: "1920/1080",
                    background: "#EEEEEE",
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: 8,
                    }}
                  >
                    <div className="absolute inset-0" style={{ transform: "scale(1.01)", transformOrigin: "center" }}>
                      <iframe
                        src="https://rive.app/s/I3tXUnV88EWMu2piaT7uaA/embed?runtime=rive-renderer"
                        title="Promotional motion - course catalog"
                        className="absolute inset-0 w-full h-full border-0"
                        style={{ objectFit: "cover", borderRadius: 4 }}
                      />
                    </div>
                  </div>
                </div>
                <CaseStudyCaption description="Promotional motion made to represent course catalog" tag="Video" />
              </div>
              {[
                { src: `${ADOBE_MEDIA_BASE}/adobe-home.mp4`, caption: "Certification portal home" },
                { src: `${ADOBE_MEDIA_BASE}/adobe-profile.mp4`, caption: "User profile" },
                { src: `${ADOBE_MEDIA_BASE}/adobe-catalog.mp4`, caption: "Course catalog" },
                { src: `${ADOBE_MEDIA_BASE}/adobe-lms.mp4`, caption: "Learning management experience" },
              ].map(({ src, caption }) => (
                <div key={src} className="flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                  <div
                    className="case-media relative w-full overflow-hidden flex items-center justify-center"
                    style={{
                      aspectRatio: "1920/1080",
                      background: "#EEEEEE",
                    }}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{
                        position: "relative",
                        height: "80%",
                        width: "auto",
                        aspectRatio: "16/9",
                        borderRadius: 8,
                      }}
                    >
                      <div className="absolute inset-0" style={{ transform: "scale(1.01)", transformOrigin: "center" }}>
                        <video
                          src={src}
                          className="absolute inset-0 w-full h-full object-contain block"
                          style={{ borderRadius: 4 }}
                          muted
                          loop
                          playsInline
                          autoPlay
                        />
                      </div>
                    </div>
                  </div>
                  <CaseStudyCaption description={caption} tag="Video" />
                </div>
              ))}
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
