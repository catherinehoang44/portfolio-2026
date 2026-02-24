"use client";

import { MeasureGuide } from "@/app/components/MeasureGuide";
import { LinkToSiteButton } from "@/app/components/LinkToSiteButton";
import { ScopeDetails } from "@/app/components/ScopeDetails";
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
import { CaseStudyCaption } from "@/app/components/CaseStudyCaption";
import { CaseStudyMediaSlot } from "@/app/components/CaseStudyMediaSlot";

const BUILD_ANYTHING_MEDIA_BASE = "/work/build-anything-ai";
const BUILD_ANYTHING_IMAGES = {
  beforeProjectDb: `${BUILD_ANYTHING_MEDIA_BASE}/before-project-db.png`,
  afterProjectDbNav: `${BUILD_ANYTHING_MEDIA_BASE}/after-project-db-nav.png`,
  afterProjectDbScale: `${BUILD_ANYTHING_MEDIA_BASE}/after-project-db-scale.png`,
  finalProjectDb: `${BUILD_ANYTHING_MEDIA_BASE}/final-project-db.png`,
  beforeEditProject: `${BUILD_ANYTHING_MEDIA_BASE}/before-edit-project.png`,
  afterEditProjectQr: `${BUILD_ANYTHING_MEDIA_BASE}/after-edit-project-qr.png`,
  afterEditProjectChat: `${BUILD_ANYTHING_MEDIA_BASE}/after-edit-project-chat.png`,
  finalEditProject: `${BUILD_ANYTHING_MEDIA_BASE}/final-edit-project.png`,
} as const;

const BUILD_ANYTHING_SCOPE_ITEMS = [
  { label: "Timeline", value: "1 day" },
  { label: "Team", value: "Solo → Personal project" },
  { label: "Skills", value: "Vibe-coded product design" },
];

/** Full-width single media (e.g. Focus 1, Focus 2, Final project design) */
const ASPECT_BIG = "1083/420";
/** Side-by-side media (After: Project Dashboard, After: Editing Project) */
const ASPECT_SIDE = "508/420";

export default function BuildAnythingAIPage() {
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

        {/* Case study header (Figma 121-2218) */}
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
                  Build Anything desktop
                </h1>
                <LinkToSiteButton href="#final-design" iconVariant="jumpToDesigns">Jump to designs</LinkToSiteButton>
              </div>
              <div className="flex flex-1 min-w-[320px]">
                <ScopeDetails
                  detailsLabel="Details"
                  scopeLabel="Scope"
                  items={BUILD_ANYTHING_SCOPE_ITEMS}
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

        {/* First section (Figma 126-1913): Reducing clicks to reduce drop-off */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <h2
              className="font-sans font-light w-full max-w-full"
              style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
            >
              Reducing clicks to reduce drop-off
            </h2>
            <p
              className="font-mono w-full max-w-full mt-4"
              style={{
                fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX,
                lineHeight: 1,
                color: COLORS.textMuted,
              }}
            >
              The Cost of Assuming Your User Is Technical
            </p>
            <p
              className="text-case-body w-full max-w-full mt-4"
              style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
            >
              Build Anything AI is positioned as a tool that lets users quickly generate and publish apps using AI. While powerful, the product currently assumes a highly technical user and over-indexes on inputs, configuration, and conventions familiar to builders. This case study highlights UX opportunities to improve clarity, accessibility, and momentum, especially for non-technical creators.
            </p>
            <p
              className="font-mono w-full max-w-full mt-6"
              style={{
                fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX,
                lineHeight: 1,
                color: COLORS.textMuted,
              }}
            >
              Key Observations &amp; Opportunities
            </p>
            <ol
              className="list-decimal list-inside text-case-body w-full max-w-full mt-2 flex flex-col"
              style={{ color: COLORS.textMutedStrong, lineHeight: 1.6, gap: 12 }}
            >
              <li>Prioritize output over input. The result is the product</li>
              <li>Design for non-technical users using sliders, presets, and visual controls</li>
              <li>Clarify integrations with goal-based recommendations to reduce cognitive load</li>
              <li>Remove early friction. No ratings or interruptions before value is felt</li>
              <li>Align CTAs with user readiness, especially publishing actions</li>
            </ol>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Focus 1: Before — Project Dashboard (Figma 204-2089); top/bottom: heading then full-width media */}
        <section id="designs" className="relative overflow-visible w-full">
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
                Information Overload
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Before: Project Dashboard
              </h2>
            </div>
            <div className="w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
              <div
                className="case-media relative w-full overflow-hidden"
                style={{ aspectRatio: ASPECT_BIG, minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
              >
                <CaseStudyMediaSlot src={BUILD_ANYTHING_IMAGES.beforeProjectDb} className="absolute inset-0 h-full w-full rounded-none" />
              </div>
              <CaseStudyCaption description="Before state of project dashboard" tag="Image" />
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Information Hierarchy — After: Project Dashboard (Figma 200-2045): header then first media under, second media to the right */}
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
                Information Hierarchy
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                After: Project Dashboard
              </h2>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex-1 min-w-0 flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: ASPECT_SIDE, minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                >
                  <CaseStudyMediaSlot src={BUILD_ANYTHING_IMAGES.afterProjectDbNav} className="absolute inset-0 h-full w-full rounded-none" />
                </div>
                <CaseStudyCaption description="Using groups and contrast to signal priorities" tag="Image" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: ASPECT_SIDE, minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                >
                  <CaseStudyMediaSlot src={BUILD_ANYTHING_IMAGES.afterProjectDbScale} className="absolute inset-0 h-full w-full rounded-none" />
                </div>
                <CaseStudyCaption description="Scalable search" tag="Image" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Dashboard media (no heading); caption: Updated project dashboard design */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
              <div
                className="case-media relative w-full overflow-hidden"
                style={{ aspectRatio: ASPECT_BIG, minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
              >
                <CaseStudyMediaSlot src={BUILD_ANYTHING_IMAGES.finalProjectDb} className="absolute inset-0 h-full w-full rounded-none" />
              </div>
              <CaseStudyCaption description="Updated project dashboard design" tag="Image" />
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Focus 2: Before — Editing Project (Figma 232-2427); same as Focus 1: header then full-width media below */}
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
                Information Overload...Again
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Before: Editing Project
              </h2>
            </div>
            <div className="w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
              <div
                className="case-media relative w-full overflow-hidden"
                style={{ aspectRatio: ASPECT_BIG, minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
              >
                <CaseStudyMediaSlot src={BUILD_ANYTHING_IMAGES.beforeEditProject} className="absolute inset-0 h-full w-full rounded-none" />
              </div>
              <CaseStudyCaption description="Multiple actions compete for attention" tag="Image" />
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Information Hierarchy — After: Editing Project; same layout as After: Project Dashboard: header then two media side-by-side */}
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
                Information Hierarchy
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                After: Editing Project
              </h2>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex-1 min-w-0 flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: ASPECT_SIDE, minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                >
                  <CaseStudyMediaSlot src={BUILD_ANYTHING_IMAGES.afterEditProjectQr} className="absolute inset-0 h-full w-full rounded-none" />
                </div>
                <CaseStudyCaption description="Clear next steps shown after 3rd prompt" tag="Image" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: ASPECT_SIDE, minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                >
                  <CaseStudyMediaSlot src={BUILD_ANYTHING_IMAGES.afterEditProjectChat} className="absolute inset-0 h-full w-full rounded-none" />
                </div>
                <CaseStudyCaption description="Reduce decision fatigue while keeping features" tag="Image" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Recipe App media (no heading); caption: Interface prioritizes chat output */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full gap-6"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
              <div
                className="case-media relative w-full overflow-hidden"
                style={{ aspectRatio: ASPECT_BIG, minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
              >
                <CaseStudyMediaSlot src={BUILD_ANYTHING_IMAGES.finalEditProject} className="absolute inset-0 h-full w-full rounded-none" />
              </div>
              <CaseStudyCaption description="Interface prioritizes chat output" tag="Image" />
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Final Design: Build Anything Interaction — same layout as Information Overload */}
        <section id="final-design" className="relative overflow-visible w-full">
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
                Final Design
              </p>
              <h2
                className="font-sans font-light w-full mt-2"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Build Anything Interaction
              </h2>
            </div>
            <div className="w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
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
                    borderRadius: 4,
                  }}
                >
                  <div className="absolute inset-0" style={{ transform: "scale(1.01)", transformOrigin: "center" }}>
                    <video
                      src={`${BUILD_ANYTHING_MEDIA_BASE}/anything-ai.mp4`}
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
              <CaseStudyCaption description="" tag="Video" />
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
