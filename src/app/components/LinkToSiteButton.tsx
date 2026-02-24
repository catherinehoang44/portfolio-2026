"use client";

import {
  COLORS,
  CASE_CTA_PADDING_Y_PX,
  CASE_CTA_PADDING_X_PX,
  CASE_CTA_BORDER_RADIUS_PX,
} from "@/lib/design-tokens";

/** External-link icon: arrow up-right. */
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H5.25M10.5 3.5V8.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Jump-to-designs icon (Figma 181-1925): arrow for in-page “Jump to designs”. */
function JumpToDesignsIcon({ className }: { className?: string }) {
  return (
    <span style={{ display: "inline-flex", transform: "rotate(45deg)" }} aria-hidden>
      <svg
        className={className}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M5.25 3.5L10.5 8.75M10.5 8.75H6.41667M10.5 8.75V4.66667"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function LinkToSiteButton({
  href,
  children = "Link to site",
  className = "",
  iconVariant = "default",
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
  /** Use "jumpToDesigns" when CTA is "Jump to designs" (Figma 181-1925 arrow). */
  iconVariant?: "default" | "jumpToDesigns";
}) {
  const isInternal = href.startsWith("#") || href.startsWith("/");
  const Icon = iconVariant === "jumpToDesigns" ? JumpToDesignsIcon : ExternalLinkIcon;
  return (
    <a
      href={href}
      {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={`case-cta-btn font-medium text-body inline-flex items-center gap-2 w-fit border relative z-10 ${className}`}
      style={{
        padding: `${CASE_CTA_PADDING_Y_PX}px ${CASE_CTA_PADDING_X_PX}px`,
        borderWidth: 1,
        borderRadius: CASE_CTA_BORDER_RADIUS_PX,
        borderColor: COLORS.accent,
        color: COLORS.accent,
        background: "transparent",
      }}
    >
      {children}
      <Icon />
    </a>
  );
}
