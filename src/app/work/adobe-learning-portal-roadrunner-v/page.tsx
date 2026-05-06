"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { MeasureGuide } from "@/app/components/MeasureGuide";
import { LinkToSiteButton } from "@/app/components/LinkToSiteButton";
import { ScopeDetails } from "@/app/components/ScopeDetails";
import { CaseStudyCaption } from "@/app/components/CaseStudyCaption";
import { CaseStudyMediaSlot } from "@/app/components/CaseStudyMediaSlot";
import { DataVisualizationPanel } from "@/app/work/adobe-learning-portal/DataVisualizationPanel";
import { PrioritizationChart } from "@/app/work/adobe-learning-portal/PrioritizationChart";
import { TestimonialCard } from "@/app/work/adobe-learning-portal/TestimonialCard";
import { FlowIterationsPanel } from "@/app/work/adobe-learning-portal/FlowIterationsPanel";
import { CourseCatalogFieldNotesMedia } from "@/app/work/adobe-learning-portal/CourseCatalogFieldNotesMedia";
import { AdobeCertPortalCoverRive } from "@/app/work/adobe-learning-portal/AdobeCertPortalCoverRive";
import { Highlight, HIGHLIGHT_TWINKLE_ICON_SRC } from "@/app/components/Highlight";
import {
  CONTAINER_GAP_PX,
  CONTENT_OFFSET_LEFT_PX,
  SECTION_GAP_TOP_PX,
  MEDIA_GAP_PX,
  COLORS,
  CASE_CONTENT_PADDING_BOTTOM_PX,
  CASE_SECTION_SUBHEADING_FONT_SIZE_PX,
  CASE_MEDIA_PLACEHOLDER_FILL,
  CASE_MEDIA_ALIGN_WITH_TEXT_PADDING,
  SCOPE_HEADING_FONT_SIZE_PX,
  cssRasterWidthCap,
  cssFinalDesignRasterWidth,
} from "@/lib/design-tokens";

const ADOBE_MEDIA_BASE = "/work/adobe-learning-portal";
/** Caption-media gap on this page (16px). */
const ADOBE_CAPTION_MEDIA_GAP_PX = 16;
/** Final Designs: inner media column matches former video frame width (80% of section). */
const FINAL_DESIGN_MEDIA_INNER_WIDTH = "80%";
/** Rive promo only: caps square motion height (≈ 1080/1920 of a ~1000px-wide column). */
const FINAL_DESIGN_RIVE_MAX_HEIGHT_PX = 560;

const CONTEXT_OPACITY_DIM = 0.36;
const CONTEXT_STEPS = 4;
const CONTEXT_SLIDES_BOTTOM_SPACE_PX = 24;

const CONTEXT_TEXTS: string[] = [
  "On any Adobe forum, there was a resounding confusion on what Adobe Digital Experience even offered. The average person was not going to remember all 15 apps. Instead...",
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

const COURSE_CATALOG_TEXTS: string[] = [
  "Dynamic course catalog meant designing for edge-case logic",
  "Customizing to specific audiences",
  "Live A/B testing needed for future iterations",
];
const COURSE_CATALOG_FIELD_NOTES: string[] = [
  "Business Goals: Goal to increase course to certification funnel means instead of a \"New\" tag to increase course engagement, course recommendations based on product interest or previous engagement with Adobe courses would be more effective. User Considerations: Research showed early navigation confusion, so we reduced choice density to focus on product interest. Developer Bandwidth: If course recommendations appear based on prior engagements, we would need to outline what specific engagement metrics would influence top options.",
  "Business Goals: Saved Courses is valuable for enterprise customers. Forcing Saved Course access to course catalog increased other course interest. User Considerations: Progress signals increased motivation and general mood. Developer Bandwidth: What tags are attached to each course card? What can be searched? This will need to be considered in course backend.",
  "Business Goals: Focus on product-related search for enterprise partners. Job-role related search is for individual learners. User Considerations: Still need to consider how showing or hiding progress bars for unstarted courses will impact course start metrics. Developer Bandwidth: Search only applies to tags and title for now. Complex dynamic search will be in future iteration.",
];
const COURSE_CATALOG_IMAGE_SRCS = [
  `${ADOBE_MEDIA_BASE}/course-catalog-1.png`,
  `${ADOBE_MEDIA_BASE}/course-catalog-2.png`,
  `${ADOBE_MEDIA_BASE}/course-catalog-3.png`,
];

/** Final Designs: home PNG uses same grey 1920/1080 shell + 80%×80% inner as videos; LMS = stacked screenshots in grey; rest 16:9 video. */
/** Intrinsic dimensions for layout + sharp browser scaling (PNG served as-is from /public — no optimizer re-encode). */
type AdobeImage = { src: string; width: number; height: number };
type AdobeFinalDesignMedia =
  | {
      media: "image";
      image: AdobeImage;
      caption: string;
      tag?: "Video" | "Image";
    }
  | {
      media: "imageStack";
      images: AdobeImage[];
      caption: string;
      tag?: string;
    }
  | { media: "video"; src: string; caption: string; tag?: "Video" | "Image" };

const ADOBE_LMS_SCREENSHOTS: AdobeImage[] = [
  { src: `${ADOBE_MEDIA_BASE}/lms-3.png`, width: 1024, height: 588 },
  { src: `${ADOBE_MEDIA_BASE}/lms-2.png`, width: 1024, height: 588 },
  { src: `${ADOBE_MEDIA_BASE}/lms-1.png`, width: 1024, height: 588 },
  { src: `${ADOBE_MEDIA_BASE}/lms-4.png`, width: 1024, height: 588 },
  { src: `${ADOBE_MEDIA_BASE}/lms-5.png`, width: 1024, height: 590 },
];

const ADOBE_FINAL_DESIGN_MEDIA: AdobeFinalDesignMedia[] = [
  { media: "video", src: `${ADOBE_MEDIA_BASE}/adobe-profile.mp4`, caption: "User profile" },
  { media: "video", src: `${ADOBE_MEDIA_BASE}/adobe-home.mp4`, caption: "Certification portal home" },
  {
    media: "image",
    image: { src: `${ADOBE_MEDIA_BASE}/adobe-catalog.png`, width: 1024, height: 834 },
    caption: "Course catalog",
    tag: "Image",
  },
  {
    media: "imageStack",
    images: ADOBE_LMS_SCREENSHOTS,
    caption: "Learning management experience",
    tag: "Images",
  },
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
        {/* Right: one media - context 1 & 2 = single DataVisualizationPanel that animates by frame; 3 & 4 = image (514/420 for panel) */}
        <div className="flex-1 min-w-[320px] w-full flex flex-col" style={{ ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING }}>
          <div
            className="case-media relative w-full overflow-hidden flex items-center justify-center"
            data-media-fullscreen-disabled
            style={{
              aspectRatio: "514/420",
              minHeight: 200,
              backgroundColor: contextFocus >= 2 ? "#EBEBEB" : "#FFFFFF",
              transition: "background-color 400ms ease",
            }}
          >
            {/* Context 1 & 2: single panel, frame drives animation (context1 <-> context2) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: contextFocus <= 2 ? 1 : 0,
                pointerEvents: contextFocus <= 2 ? "auto" : "none",
                bottom: CONTEXT_SLIDES_BOTTOM_SPACE_PX,
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
              <TestimonialCard motionStep={contextFocus === 3 || contextFocus === 4 ? contextFocus : 3} style={{ width: "100%", height: "100%", maxWidth: "513.5px" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseCatalogSection() {
  return (
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
            Iterations
          </p>
          <h2
            className="font-sans font-light w-full mt-2"
            style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
          >
            Course Catalog Iterations
          </h2>
        </div>
        <div className="w-full flex flex-col" style={{ gap: MEDIA_GAP_PX + 16, ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col" style={{ gap: 16 }}>
              <CourseCatalogFieldNotesMedia
                src={COURSE_CATALOG_IMAGE_SRCS[i - 1]}
                note={COURSE_CATALOG_FIELD_NOTES[i - 1]}
              />
              <CaseStudyCaption
                description={`V${i}: ${COURSE_CATALOG_TEXTS[i - 1]}`}
                tag="Image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ADOBE_TEAM_MORE_ITEMS = [
  "Course instructional designers",
  "Dev contractors",
  "Exam developers",
  "Go-to-market",
  "Partnerships",
  "Program managers",
  "University team",
  "Voucher and support",
] as const;

const ADOBE_SCOPE_ITEMS = [
  { label: "Timeline", value: "4 months" },
  {
    label: "Team",
    value: "UX manager → 1 designer/copywriter, 3 devs,",
    moreItems: [...ADOBE_TEAM_MORE_ITEMS],
  },
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
          <div className="absolute inset-0 pointer-events-none">
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
                <Link
                  href="/"
                  className="case-study-tag font-medium text-case-body"
                >
                  <img
                    src="/images/case-back-arrow.svg"
                    alt=""
                    aria-hidden
                    style={{ width: 12, height: 12 }}
                    draggable={false}
                  />
                  <span>Case study</span>
                </Link>
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

        {/* Overview: vertical stack (text on top, image below) */}
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
                className="font-medium text-case-body w-full"
                style={{ color: COLORS.textMutedStrong }}
              >
                Overview
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: 21 }}
              >
                How we achieved +20% Adobe credentialed in 1 Quarter
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
            <div className="flex flex-col w-full" style={{ gap: ADOBE_CAPTION_MEDIA_GAP_PX, ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING }}>
              {/*
                Native <img> (not absolute + object-fit) avoids extra resampling. Cap width at file px; asset 1024×355 — use 2× exports for Retina.
              */}
              <div
                className="case-media relative w-full overflow-hidden mx-auto"
                data-media-fullscreen-disabled
                style={{
                  background: "#FFFFFF",
                  maxWidth: cssRasterWidthCap(1024),
                }}
              >
                <img
                  src="/work/adobe-learning-portal-roadrunner-v/my-role.png"
                  alt=""
                  width={1024}
                  height={355}
                  draggable={false}
                  className="block h-auto w-full max-w-full select-none"
                  style={{ borderRadius: 4 }}
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <CaseStudyCaption
                description="Scope of work"
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

        {/* Context: sticky left (text with focus opacity) + sticky right (swapping images); scroll drives contextFocus 1-4 */}
        <ContextSection />

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Problem: Learning was being gate-kept (Figma 272-2837, 272-2836) - top/bottom */}
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

        {/* Plan: Guiding Principles (Figma 235-2952) - top/bottom */}
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
            <div className="w-full flex flex-col" style={{ gap: MEDIA_GAP_PX, ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING }}>
              <div className="w-full flex flex-col" style={{ gap: ADOBE_CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden mx-auto"
                  data-media-fullscreen-disabled
                  style={{
                    aspectRatio: "1384/512",
                    minHeight: 200,
                    background: "#FFFFFF",
                    maxWidth: cssRasterWidthCap(1384),
                  }}
                >
                  <CaseStudyMediaSlot
                    src={`${ADOBE_MEDIA_BASE}/timeline.png`}
                    className="absolute inset-0 h-full w-full rounded-none"
                    objectFit="contain"
                  />
                </div>
                <CaseStudyCaption description="Design sprints timeline" tag="Image" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Research: 3 images research1-3 (Figma 126-2400) - top/bottom */}
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
            {/* Research container: 3 images research1-3, 350x207 aspect ratio */}
            <div
              className="w-full flex flex-row gap-4"
              style={{ minWidth: 0, ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING }}
            >
              <div
                className="case-media relative flex-1 min-w-0 overflow-hidden"
                data-media-fullscreen-disabled
                style={{ aspectRatio: "350/207", background: "#FFFFFF" }}
              >
                <CaseStudyMediaSlot
                  src={`${ADOBE_MEDIA_BASE}/research1.png`}
                  className="absolute inset-0 h-full w-full rounded-none"
                />
              </div>
              <div
                className="case-media relative flex-1 min-w-0 overflow-hidden"
                data-media-fullscreen-disabled
                style={{ aspectRatio: "350/207", background: "#FFFFFF" }}
              >
                <CaseStudyMediaSlot
                  src={`${ADOBE_MEDIA_BASE}/research2.png`}
                  className="absolute inset-0 h-full w-full rounded-none"
                />
              </div>
              <div
                className="case-media relative flex-1 min-w-0 overflow-hidden"
                data-media-fullscreen-disabled
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

        {/* People: Prioritization Chart (Figma 235-3414) - top/bottom */}
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
            <div className="w-full flex flex-col" style={{ gap: MEDIA_GAP_PX, ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING }}>
              <div className="w-full flex flex-col" style={{ gap: ADOBE_CAPTION_MEDIA_GAP_PX }}>
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

        {/* Flow: Site User Flow Iterations (Figma 126-2420) - top/bottom */}
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
            </div>
            <div className="w-full flex flex-col" style={{ gap: MEDIA_GAP_PX, ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING }}>
              <div className="w-full flex flex-col" style={{ gap: ADOBE_CAPTION_MEDIA_GAP_PX }}>
                <FlowIterationsPanel
                  initialSrc={`${ADOBE_MEDIA_BASE}/flow-chart.png`}
                  updatedSrc={`${ADOBE_MEDIA_BASE}/flow-chart-updated.png`}
                  descriptionText="When adjusting the flow, I considered how to overdeliver with clear design and user experience, encourage continuous engagement through gamified elements, and provide guidance from Adobe product teams beyond the internal team."
                />
                <CaseStudyCaption description="Flow comparison" tag="Interactable" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Flow: Course Catalog Iterations - sticky, 3 images + text (no captions) */}
        <CourseCatalogSection />

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Retrospective: Project Takeaways (Figma 237-2250 + 272-3431) - top/bottom */}
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
            <div className="w-full flex flex-col gap-6" style={{ ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING }}>
              <div>
                <div className="w-full flex flex-col" style={{ gap: ADOBE_CAPTION_MEDIA_GAP_PX }}>
                  <div
                    className="case-media relative w-full overflow-hidden mx-auto"
                    style={{
                      aspectRatio: "2166/840",
                      background: CASE_MEDIA_PLACEHOLDER_FILL,
                      maxWidth: cssRasterWidthCap(2166),
                    }}
                  >
                    <CaseStudyMediaSlot
                      src={`${ADOBE_MEDIA_BASE}/positive-comments.png`}
                      className="absolute inset-0 h-full w-full rounded-none"
                      objectFit="contain"
                    />
                  </div>
                  <CaseStudyCaption description="Positive user feedback" tag="Image" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Final Designs: Adobe Certification Portal (Figma 272-3370) - top/bottom */}
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
            <div className="w-full">
              <Highlight
                title=""
                iconSrc={HIGHLIGHT_TWINKLE_ICON_SRC}
                iconLeftLayout
                bodyStyle={{
                  color: "#8C8C8C",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "19.2px",
                }}
                style={{ width: "100%", maxWidth: "100%" }}
              >
                We received funding and resources to bring the project into existence. Since launch, we&apos;ve achieved over a million MoM learners on the platform, and 15%+ increase in certification renewal rate.
              </Highlight>
            </div>
            <div className="w-full flex flex-col" style={{ gap: MEDIA_GAP_PX, ...CASE_MEDIA_ALIGN_WITH_TEXT_PADDING }}>
              {/* Rive: grey hugs square at 80% width (same strip as videos). */}
              <div className="flex flex-col" style={{ gap: ADOBE_CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="relative w-full overflow-hidden flex flex-col items-center"
                  style={{ background: "#EEEEEE", paddingTop: 24, paddingBottom: 24 }}
                >
                  <div
                    className="case-media relative shrink-0 overflow-hidden"
                    style={{
                      width: `min(${FINAL_DESIGN_MEDIA_INNER_WIDTH}, ${FINAL_DESIGN_RIVE_MAX_HEIGHT_PX}px)`,
                      maxHeight: FINAL_DESIGN_RIVE_MAX_HEIGHT_PX,
                      aspectRatio: "1 / 1",
                      borderRadius: 8,
                    }}
                  >
                    <div className="absolute inset-0" style={{ transform: "scale(1.01)", transformOrigin: "center" }}>
                      <AdobeCertPortalCoverRive className="h-full w-full" style={{ borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
                <CaseStudyCaption description="Promotional motion made to represent course catalog" tag="Video" />
              </div>
              {ADOBE_FINAL_DESIGN_MEDIA.map((item) => (
                <div
                  key={item.media === "imageStack" ? item.images[0].src : item.media === "image" ? item.image.src : item.src}
                  className="flex flex-col"
                  style={{ gap: ADOBE_CAPTION_MEDIA_GAP_PX }}
                >
                  {item.media === "image" ? (
                    <div
                      className="relative w-full overflow-hidden flex flex-col items-center"
                      style={{ background: "#EEEEEE", paddingTop: 24, paddingBottom: 24 }}
                    >
                      <div
                        className="case-media relative overflow-hidden mx-auto"
                        style={{
                          width: cssFinalDesignRasterWidth(item.image.width),
                          borderRadius: 8,
                        }}
                      >
                        <img
                          src={item.image.src}
                          alt=""
                          width={item.image.width}
                          height={item.image.height}
                          draggable={false}
                          className="block h-auto w-full max-w-full select-none"
                          style={{ borderRadius: 4 }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  ) : item.media === "imageStack" ? (
                    <div
                      className="relative w-full overflow-hidden flex flex-col items-center"
                      style={{ background: "#EEEEEE", paddingTop: 24, paddingBottom: 24 }}
                    >
                      <div
                        className="mx-auto flex flex-col"
                        style={{
                          width: cssFinalDesignRasterWidth(1024),
                          gap: MEDIA_GAP_PX,
                        }}
                      >
                        {item.images.map((img) => (
                          <div
                            key={img.src}
                            className="case-media relative w-full overflow-hidden"
                            style={{ borderRadius: 4 }}
                          >
                            <img
                              src={img.src}
                              alt=""
                              width={img.width}
                              height={img.height}
                              draggable={false}
                              className="block h-auto w-full max-w-full select-none"
                              style={{ borderRadius: 4 }}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative w-full overflow-hidden flex flex-col items-center"
                      style={{ background: "#EEEEEE", paddingTop: 24, paddingBottom: 24 }}
                    >
                      <div
                        className="case-media relative overflow-hidden"
                        style={{
                          width: FINAL_DESIGN_MEDIA_INNER_WIDTH,
                          aspectRatio: "16 / 9",
                          borderRadius: 8,
                        }}
                      >
                        <div className="absolute inset-0" style={{ transform: "scale(1.01)", transformOrigin: "center" }}>
                          <video
                            src={item.src}
                            className="absolute inset-0 h-full w-full object-contain block"
                            style={{ borderRadius: 4 }}
                            muted
                            loop
                            playsInline
                            autoPlay
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <CaseStudyCaption description={item.caption} tag={item.tag ?? "Video"} />
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
