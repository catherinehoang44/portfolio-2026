"use client";

import React from "react";
import { CASE_BODY_FONT_SIZE_PX } from "@/lib/design-tokens";

/** Border color for Highlight container and inner elements. */
export const HIGHLIGHT_BORDER = "#EEEEEE";

/** Same icon as Hick's Law highlight (twinkle). Use for Adobe retro highlight. */
export const HIGHLIGHT_TWINKLE_ICON_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/d905aa7c-f535-4de0-bca0-3e36fe363206.svg";

export interface HighlightProps {
  className?: string;
  style?: React.CSSProperties;
  /** Optional icon image URL (e.g. for Hick's Law lightbulb / twinkle). */
  iconSrc?: string;
  /** Card title (e.g. "Hick's Law"). Omit or leave empty to show only children. */
  title?: string;
  /** When true, layout is [icon/star container] [children filling rest]. Same twinkle as Hick's Law. */
  iconLeftLayout?: boolean;
  children: React.ReactNode;
}

/**
 * Highlight — reusable callout/tooltip card. Used for Hick's Law and similar highlights.
 * Borders use HIGHLIGHT_BORDER (#EEEEEE).
 */
const starContainerStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2px",
  backgroundColor: "rgba(255, 255, 255, 1)",
  borderColor: HIGHLIGHT_BORDER,
  borderStyle: "solid",
  borderWidth: "1px",
  boxSizing: "content-box",
  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.08)",
  borderRadius: "8px",
  overflow: "hidden",
  flexShrink: 0,
};

const starInnerStyle: React.CSSProperties = {
  display: "flex",
  padding: "8px",
  backgroundColor: "rgba(255, 255, 255, 1)",
  borderColor: HIGHLIGHT_BORDER,
  borderStyle: "solid",
  borderWidth: "0.5px",
  boxSizing: "content-box",
  boxShadow: "inset 0px 0px 4px rgba(214, 214, 214, 1)",
  borderRadius: "6px",
  overflow: "hidden",
  flexGrow: 1,
  alignSelf: "stretch",
  justifyContent: "center",
  alignItems: "center",
};

function StarOrIcon({ iconSrc }: { iconSrc?: string }) {
  return (
    <div style={starContainerStyle}>
      <div style={starInnerStyle}>
        {iconSrc != null ? (
          <img src={iconSrc} alt="" draggable={false} style={{ width: "12px", height: "12px" }} />
        ) : (
          <span style={{ fontSize: "12px", lineHeight: 1 }} aria-hidden>★</span>
        )}
      </div>
    </div>
  );
}

export function Highlight({ className, style, iconSrc, title = "", iconLeftLayout = false, children }: HighlightProps) {
  const articleStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    padding: "6px",
    background: "linear-gradient(180deg, rgba(249, 249, 249, 1) 0%, rgba(249, 249, 249, 0) 100%)",
    borderColor: HIGHLIGHT_BORDER,
    borderStyle: "solid",
    borderWidth: "0.5px",
    boxSizing: "content-box",
    borderRadius: "4px",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "3px",
    paddingBottom: "3px",
    ...style,
  };

  if (iconLeftLayout && iconSrc != null) {
    return (
      <article className={className} style={articleStyle}>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderColor: HIGHLIGHT_BORDER,
            borderStyle: "solid",
            borderWidth: "0.5px",
            boxSizing: "border-box",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <StarOrIcon iconSrc={iconSrc} />
          <div
            style={{
              flex: 1,
              minWidth: 0,
              margin: 0,
              color: "rgba(140, 140, 140, 1)",
              fontSize: CASE_BODY_FONT_SIZE_PX,
              fontFamily: '"Neue Montreal", sans-serif',
              fontWeight: 400,
              lineHeight: "15.6px",
              textAlign: "left",
            }}
          >
            {children}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={className} style={{ ...articleStyle, alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          gap: "8px",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderColor: HIGHLIGHT_BORDER,
          borderStyle: "solid",
          borderWidth: "0.5px",
          boxSizing: "content-box",
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)",
          borderRadius: "4px",
          overflow: "hidden",
          flexGrow: 1,
        }}
      >
        <header
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "12px",
            alignSelf: "stretch",
          }}
        >
          <StarOrIcon iconSrc={iconSrc} />
          {(title !== "" || iconSrc != null) && (
            <h1
              style={{
                margin: 0,
                color: "rgba(140, 140, 140, 1)",
                fontSize: "16px",
                fontFamily: '"Neue Montreal", sans-serif',
                fontWeight: 500,
                lineHeight: "19.2px",
                textAlign: "left",
                flexGrow: 1,
              }}
            >
              {title}
            </h1>
          )}
        </header>
        <div
          style={{
            margin: 0,
            color: "rgba(140, 140, 140, 1)",
            fontSize: CASE_BODY_FONT_SIZE_PX,
            fontFamily: '"Neue Montreal", sans-serif',
            fontWeight: 400,
            lineHeight: "15.6px",
            textAlign: "left",
            alignSelf: "stretch",
          }}
        >
          {children}
        </div>
      </div>
    </article>
  );
}
