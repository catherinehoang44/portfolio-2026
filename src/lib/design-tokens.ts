/**
 * Design tokens — single source of truth for layout, type, measure, and color.
 * Use these in components and pair with CSS variables in globals.css for theming.
 */

/** Breakpoint (min-width) for desktop layout. Align with Tailwind `lg`. */
export const BREAKPOINT_DESKTOP_PX = 1024;

/** Measure strip (left-edge guides): label + arrow width in px */
export const MEASURE_LABEL_WIDTH = 12;
export const MEASURE_ARROW_WIDTH = 4;
export const MEASURE_STRIP_WIDTH = MEASURE_LABEL_WIDTH + MEASURE_ARROW_WIDTH;
export const MEASURE_ARROW_HEAD_HEIGHT = 3;
export const MEASURE_LINE_WIDTH = 0.5;

/** Content offset from left when measure strips are present */
export const CONTENT_OFFSET_LEFT_PX = 27;

/** Main container */
export const CONTAINER_MAX_WIDTH_PX = 1152;
export const CONTAINER_WIDTH_PERCENT = 90;
/** Horizontal padding: mobile, tablet, desktop */
export const CONTAINER_PADDING_X_PX = { mobile: 16, tablet: 32, desktop: 64 };
export const CONTAINER_GAP_PX = 16;

/** Gap between stacked media (top/bottom) — apply between video/image blocks and their captions. */
export const MEDIA_GAP_PX = 42;

/** Vertical rhythm / section gaps */
export const SECTION_GAP_TOP_PX = 96;
export const SECTION_GAP_HEADER_NAV_MOBILE_PX = 24;
export const SECTION_GAP_HEADER_NAV_DESKTOP_PX = 16;

/** Case study: content container (e.g. case page main content) */
export const CASE_CONTENT_PADDING_BOTTOM_PX = 16;

/** Case study: caption (description + optional tag pill). Use in CaseStudyCaption. */
export const CASE_CAPTION_FONT_SIZE_PX = 14;
export const CASE_CAPTION_LINE_HEIGHT = 1;
/** Gap between media container and caption — always 8px. */
export const CAPTION_MEDIA_GAP_PX = 8;

/** Case study: “Link to site” CTA button. Use in LinkToSiteButton. */
export const CASE_CTA_PADDING_Y_PX = 2;
export const CASE_CTA_PADDING_X_PX = 8;
export const CASE_CTA_BORDER_RADIUS_PX = 4;
export const CASE_CTA_BG_ALPHA = 0.2;

/** Case study: default body text (paragraphs, list items). Use 16px via .text-case-body or CASE_BODY_FONT_SIZE_PX. */
export const CASE_BODY_FONT_SIZE_PX = 16;

/** Case study: scope container (details list). Use in ScopeDetails. */
export const SCOPE_LABEL_WIDTH_PX = 96;
export const SCOPE_HEADING_FONT_SIZE_PX = 21;
/** Case study: scope value/tag font size (e.g. "2 weeks", "Solo project"). Use in ScopeDetails. 15px, Inter Regular (same as case body). */
export const SCOPE_VALUE_FONT_SIZE_PX = 15;

/**
 * Case study: section subheading (e.g. "Key Observations & Opportunities").
 * Same font style and color as scope item labels (Timeline, Team, Skills): font-mono, this size, lineHeight 1, COLORS.textMuted.
 */
export const CASE_SECTION_SUBHEADING_FONT_SIZE_PX = 14;

/** Case study: back-to-home link measure strip label. Same typography as case list title/tag on home. */
export const CASE_BACK_MEASURE_LABEL = "BCK";

/**
 * Case list title / tag on home page and case back link use:
 * Font: font-mono (--font-mono / IBM Plex Mono)
 * Tailwind: font-mono text-xs uppercase font-medium tracking-wide
 * CSS variable: --font-mono (see globals.css / theme)
 */
export const CASE_LIST_AND_BACK_LINK_FONT = "font-mono" as const;

/** Case media: desktop stack height; mobile card height */
export const CASE_MEDIA_DESKTOP_HEIGHT_PX = 720;
export const CASE_MEDIA_MOBILE_HEIGHT_PX = 420;
export const CASE_MEDIA_MAX_WIDTH_PX = 420;

/** Case media placeholder: fill for empty image/video containers until assets are added. */
export const CASE_MEDIA_PLACEHOLDER_FILL = "#EEEEEE";

/** Case media: full-width section aspect ratio (e.g. single media below heading). */
export const CASE_MEDIA_ASPECT_FULL = "16/10";

/** Case media: corner radius and drop shadow for all case media containers. */
export const CASE_MEDIA_BORDER_RADIUS_PX = 4;
export const CASE_MEDIA_BOX_SHADOW = "0 0 16px rgba(0,0,0,0.15)";

/**
 * Case study components (design system):
 * - CaseStudyCaption — src/app/components/CaseStudyCaption.tsx — use for all case study captions (right-aligned description + optional tag pill "Video" | "Image"). Same style across case studies (Otherworld, Dia, etc.).
 * - Case section subheadings (e.g. "Key Observations & Opportunities", "Focus 1", "Information Hierarchy") use same style as scope item labels: font-mono, CASE_SECTION_SUBHEADING_FONT_SIZE_PX, lineHeight 1, COLORS.textMuted.
 * - Case study default text: 16px body copy. Use CASE_BODY_FONT_SIZE_PX or .text-case-body (--text-case-body in globals.css).
 * - Case section (top/bottom): heading block on top (subheading + SCOPE_HEADING_FONT_SIZE_PX title only), then full-width media container + CaseStudyCaption below. Use flex-col, CONTENT_OFFSET_LEFT_PX, media w-full. No left/right columns.
 * - LinkToSiteButton — src/app/components/LinkToSiteButton.tsx (case CTA link with external icon)
 * - ScopeDetails — src/app/components/ScopeDetails.tsx (Details / Scope heading + label/value list). Scope values use SCOPE_VALUE_FONT_SIZE_PX (15px), Inter Regular.
 * - CaseStudyMediaSlot — src/app/components/CaseStudyMediaSlot.tsx (image slot; no fill on error)
 * - MeasureGuide — src/app/components/MeasureGuide.tsx (measure strip for layout)
 * Tokens above (CASE_*, SCOPE_*) are the single source of truth for these components.
 */

/**
 * Case study page template (structure for all /work/[slug] case studies):
 * 1. Outer: container-main pt-4 pb-4 flex flex-col, gap CONTAINER_GAP_PX, paddingBottom CASE_CONTENT_PADDING_BOTTOM_PX
 * 2. Measure: GAP (SECTION_GAP_TOP_PX)
 * 3. Back link section: MeasureGuide label CASE_BACK_MEASURE_LABEL ("BCK"); Link "Home" with arrow; typography CASE_LIST_AND_BACK_LINK_FONT (font-mono text-xs uppercase font-medium tracking-wide)
 * 4. Header section: MeasureGuide "HDR"; two-column (title + CTA | ScopeDetails); CONTENT_OFFSET_LEFT_PX
 * 5. Measure: GAP
 * 6. Description block (optional): MeasureGuide "DIV"; intro text
 * 7. Repeat: GAP → Section (MeasureGuide "DIV", media + CaseStudyCaption), CONTAINER_GAP_PX between sections
 * Two-column media row: grid minmax(320px,1fr) x2, gap CONTAINER_GAP_PX; each column min-w-0 w-full, gap CONTAINER_GAP_PX
 * Single media: full width. Video slots may use height (e.g. 320) and objectPosition (e.g. "left center").
 * 8. No case study route/link for items with badge "COMING SOON" (only items with slug get /work/[slug]).
 */

/** Typography (px) — use with CSS vars for actual font-size in styles */
export const FONT_SIZE = {
  heading: 40,
  body: 16,
  nav: 16,
  link: 16,
  label: 12,
  badge: 8,
} as const;

/** Colors (hex) — mirror of CSS custom properties for use in inline styles / JS */
export const COLORS = {
  background: "#fafafa",
  text: "#18181b",
  textMuted: "#a1a1aa",
  textMutedStrong: "#71717a",
  nav: "#52525b",
  navHover: "#18181b",
  accent: "#3B82F6",
  accentBarActive: "#3B82F6",
  accentBarInactive: "#E4E4E7",
  measure: "#a1a1aa",
  border: "#e4e4e7",
  /** Case study / full-width dark sections */
  backgroundDark: "#0f0f0f",
  textOnDark: "#fafafa",
  textMutedOnDark: "#a1a1aa",
} as const;
