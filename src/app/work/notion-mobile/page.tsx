"use client";

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
  CASE_SECTION_SUBHEADING_FONT_SIZE_PX,
  CASE_MEDIA_PLACEHOLDER_FILL,
  SCOPE_HEADING_FONT_SIZE_PX,
} from "@/lib/design-tokens";

const NOTION_SCOPE_ITEMS = [
  { label: "Timeline", value: "4 days" },
  { label: "Team", value: "Solo → Personal project" },
  { label: "Skills", value: "Mobile interaction design" },
];

export default function NotionMobilePage() {
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
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Case study header */}
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
                  Notion mobile interactions
                </h1>
                <LinkToSiteButton href="#designs" iconVariant="jumpToDesigns">Jump to designs</LinkToSiteButton>
              </div>
              <div className="flex-1 min-w-[320px]">
                <ScopeDetails
                  detailsLabel="Details"
                  scopeLabel="Scope"
                  items={NOTION_SCOPE_ITEMS}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Measure gap after header */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Reimagining Touch Interactions (Figma 179-2410) */}
        <section id="designs" className="relative overflow-visible w-full">
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
              Reimagining Touch Interactions
            </h2>
            <div className="flex flex-col w-full max-w-full mt-4" style={{ gap: 16 }}>
              <p
                className="font-mono w-full"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                Problem
              </p>
              <p
                className="text-case-body w-full max-w-full"
                style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
              >
                The amount of text editing features in Notion are feasible on desktop, but felt overwhelming on mobile even for advanced users that were interested in learning complex tools built for them.
              </p>
              <p
                className="font-mono w-full mt-4"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                Process
              </p>
              <p
                className="text-case-body w-full max-w-full"
                style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
              >
                I thought it was a good experiment to test what &quot;hidden&quot; touch interactions beginner and advanced users were ready to explore without cluttering the surface area, to make editing documents feel seamless on mobile. I leveraged existing touch interactions used in Google Docs, Microsoft Word and Apple Notes and their adoption.
              </p>
              <p
                className="font-mono w-full mt-4"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                Challenge
              </p>
              <p
                className="text-case-body w-full max-w-full"
                style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
              >
                There was difficulty in avoiding overlap with other user interactions; how does the swipe indentation affect the users experience when they press and hold? There was careful consideration on how new interactions would compliment and avoid disturbing old, expected interactions.
              </p>
              <p
                className="text-case-body w-full max-w-full mt-2"
                style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}
              >
                I also wanted to make interactions easy to &quot;figure out&quot;. If the intended outcome didn&apos;t occur, would they be able to figure it out after 1 to 2 tries? It would depend on the type of user.
              </p>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Demo: interaction list (Figma 113-3428) */}
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
                className="font-mono w-full"
                style={{ fontSize: CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight: 1, color: COLORS.textMuted }}
              >
                Demo
              </p>
              <p className="text-case-body w-full max-w-full mt-2" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                The following work was done:
              </p>
              <ul className="list-none flex flex-col w-full max-w-full mt-4" style={{ gap: 12 }}>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  <strong>End-Point Swipe Interactions:</strong> Swipe right/left at start of block for indentation; swipe right/left on characters to select characters.
                </li>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  <strong>Tap Drag Interactions:</strong> Double tap and drag to trigger move and drag; two finger tap and drag to move around document.
                </li>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  <strong>Left Press / Swipe Interaction:</strong> Press hold on left of block enables user to move block; swiping left on the right side of block reveal comment feature.
                </li>
                <li className="text-case-body" style={{ color: COLORS.textMutedStrong, lineHeight: 1.6 }}>
                  <strong>Non-Interactions:</strong> Common tools are to the left of the tool bar while advanced tools are to the right of the tool bar and may require swiping.
                </li>
              </ul>
            </div>
            <div className="flex-1 min-w-[320px] w-full flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX, padding: 16 }}>
              <div
                className="case-media relative w-full overflow-hidden"
                style={{ aspectRatio: "16/10", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
              />
              <CaseStudyCaption description="Demo overview" tag="Motion" />
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* End-Point Swipe Interactions (Figma 179-2311) */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full md:flex-row md:items-start md:justify-between gap-6 md:gap-12"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="flex-1 min-w-[320px] w-full">
              <h2
                className="font-sans font-light w-full"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                End-Point Swipe Interactions
              </h2>
            </div>
            <div className="flex-1 min-w-[320px] w-full flex flex-col gap-6" style={{ padding: 16 }}>
              <div className="flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                />
                <CaseStudyCaption description="Before" tag="Motion" />
              </div>
              <div className="flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                />
                <CaseStudyCaption description="After. Swipe interactions" tag="Motion" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Tap Drag Interactions (Figma 179-2346) */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full md:flex-row md:items-start md:justify-between gap-6 md:gap-12"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="flex-1 min-w-[320px] w-full">
              <h2
                className="font-sans font-light w-full"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Tap Drag Interactions
              </h2>
            </div>
            <div className="flex-1 min-w-[320px] w-full flex flex-col gap-6" style={{ padding: 16 }}>
              <div className="flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                />
                <CaseStudyCaption description="Before" tag="Motion" />
              </div>
              <div className="flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                />
                <CaseStudyCaption description="After. Swipe interactions" tag="Motion" />
              </div>
            </div>
          </div>
        </section>

        {/* GAP */}
        <div className="relative overflow-visible" style={{ height: SECTION_GAP_TOP_PX }}>
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Left Press / Swipe Interaction (Figma 179-2378) */}
        <section className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="DIV" className="h-full" />
          </div>
          <div
            className="flex flex-col py-6 w-full md:flex-row md:items-start md:justify-between gap-6 md:gap-12"
            style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
          >
            <div className="flex-1 min-w-[320px] w-full">
              <h2
                className="font-sans font-light w-full"
                style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
              >
                Left Press / Swipe Interaction
              </h2>
            </div>
            <div className="flex-1 min-w-[320px] w-full flex flex-col gap-6" style={{ padding: 16 }}>
              <div className="flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                />
                <CaseStudyCaption description="Before" tag="Motion" />
              </div>
              <div className="flex flex-col" style={{ gap: CAPTION_MEDIA_GAP_PX }}>
                <div
                  className="case-media relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/10", minHeight: 200, background: CASE_MEDIA_PLACEHOLDER_FILL }}
                />
                <CaseStudyCaption description="After. Swipe interactions" tag="Motion" />
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
