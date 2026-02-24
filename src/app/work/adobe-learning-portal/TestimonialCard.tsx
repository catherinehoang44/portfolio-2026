"use client";

import React, { useRef, useEffect, useState } from "react";

interface ProfileProps {
  className?: string;
  style?: React.CSSProperties;
}

const Profile: React.FC<ProfileProps> = ({ className, style }) => (
  <div
    className={className}
    style={{
      width: "24px",
      height: "24px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(250, 250, 250, 1)",
      borderColor: "rgba(242, 242, 242, 1)",
      borderStyle: "solid",
      borderWidth: "1px",
      boxSizing: "border-box",
      borderRadius: "23.04px",
      overflow: "hidden",
      position: "relative",
      ...style,
    }}
  />
);

interface QuoteBoxProps {
  description: string;
  sourceText: string;
  summaryTitle?: string;
  iconUrl: string;
  opacity?: number;
}

const DIM_OPACITY = 0.5;
const MOTION_TRANSITION = "opacity 0.4s ease, filter 0.4s ease, background-color 0.4s ease, border-color 0.4s ease";

const QuoteBox: React.FC<QuoteBoxProps> = ({
  description,
  sourceText,
  summaryTitle,
  iconUrl,
  opacity = 1,
}) => {
  const isDimmed = opacity < 1;
  const bgAlpha = isDimmed ? DIM_OPACITY : 1;
  const borderAlpha = isDimmed ? DIM_OPACITY : 1;
  const textOpacity = isDimmed ? DIM_OPACITY : 1;
  const blurPx = isDimmed ? 4 : 4;
  return (
  <div
    role="article"
    style={{
      flex: "0 0 auto",
      width: "240px",
      height: "auto",
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      padding: "16px",
      gap: "8px",
      backgroundColor: isDimmed ? "transparent" : `rgba(255, 255, 255, ${bgAlpha})`,
      borderColor: `rgba(242, 242, 242, ${borderAlpha})`,
      borderStyle: "solid",
      borderWidth: "1px",
      boxSizing: "border-box",
      borderRadius: "4px",
      overflow: "hidden",
      cursor: "default",
      position: "relative",
      transition: MOTION_TRANSITION,
      ...(isDimmed ? {} : { backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }),
    }}
  >
      {/* Blur layer: always in DOM for smooth transition; opacity 0 when not dimmed */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          borderRadius: "4px",
          backgroundColor: `rgba(255, 255, 255, ${DIM_OPACITY})`,
          boxSizing: "border-box",
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`,
          pointerEvents: "none",
          opacity: isDimmed ? 1 : 0,
          transition: MOTION_TRANSITION,
        }}
      />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          paddingTop: "40px",
          gap: "16px",
          boxSizing: "border-box",
          alignSelf: "stretch",
          minWidth: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        <blockquote
          style={{
            margin: 0,
            height: "auto",
            color: "rgba(161, 161, 170, 1)",
            boxSizing: "content-box",
            fontSize: "12px",
            fontFamily: '"Neue Montreal", sans-serif',
            fontWeight: 400,
            lineHeight: "14.4px",
            letterSpacing: "0.48px",
            textAlign: "left",
            flexShrink: 0,
            alignSelf: "stretch",
            minWidth: 0,
            zIndex: 0,
            position: "relative",
            opacity: textOpacity,
            transition: MOTION_TRANSITION,
            ...(isDimmed ? { filter: "blur(8px)", WebkitFilter: "blur(8px)" } : {}),
          }}
        >
          {description}
        </blockquote>

        <footer
          style={{
            height: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            boxSizing: "border-box",
            flexShrink: 0,
            alignSelf: "stretch",
            minWidth: 0,
            zIndex: 1,
            position: "relative",
            transition: MOTION_TRANSITION,
            ...(isDimmed ? { filter: "blur(8px)", WebkitFilter: "blur(8px)" } : {}),
          }}
        >
          <Profile />
          <cite
            style={{
              fontStyle: "normal",
              height: "auto",
              color: "rgba(59, 130, 246, 1)",
              boxSizing: "content-box",
              fontSize: "12px",
              fontFamily: '"Neue Montreal", sans-serif',
              fontWeight: 400,
              lineHeight: "14.4px",
              letterSpacing: "0.48px",
              textAlign: "left",
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 0,
              minWidth: 0,
              cursor: "default",
              textDecoration: "none",
              opacity: textOpacity,
            }}
          >
            {sourceText}
          </cite>
        </footer>

        <div
          style={{
            width: summaryTitle ? "148px" : "26.65px",
            height: summaryTitle ? "64px" : "24px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            boxSizing: "border-box",
            position: "absolute",
            left: "0px",
            top: "0px",
            zIndex: 2,
            opacity: 1,
            transition: MOTION_TRANSITION,
          }}
        >
          <img
            src={iconUrl}
            alt="Quote Icon"
            style={{
              width: "26.657554626464844px",
              height: "24px",
              boxSizing: "content-box",
            }}
          />
          {summaryTitle && (
            <span
              style={{
                width: "auto",
                height: "auto",
                color: "rgba(59, 130, 246, 1)",
                boxSizing: "content-box",
                fontSize: "24px",
                fontFamily: '"STIX Two Math", sans-serif',
                fontWeight: 400,
                lineHeight: "30px",
                letterSpacing: "0.96px",
                textAlign: "left",
                flexShrink: 0,
              }}
            >
              {summaryTitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const QUOTE_ICON_1 =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/4dc127b0-3575-4d83-919b-da01fb93c2fa.svg";
const QUOTE_ICON_2 =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/2a6dd53f-f87b-4ded-8f53-fd7c341a4599.svg";

export interface TestimonialCardProps {
  style?: React.CSSProperties;
  /** 3 = both quotes default style (full opacity, no blur). 4 = both dimmed with blur and quote summary. */
  motionStep?: 3 | 4;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ style, motionStep = 4 }) => {
  const isMotion4 = motionStep === 4;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    const updateScale = () => {
      const sw = section.clientWidth;
      const sh = section.clientHeight;
      const cw = content.scrollWidth;
      const ch = content.scrollHeight;
      if (cw <= 0 || ch <= 0) return;
      const s = Math.min(1, sw / cw, sh / ch);
      setScale(s);
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(section);
    return () => ro.disconnect();
  }, [motionStep]);

  return (
    <section
      ref={sectionRef}
      className="testimonial-card"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "513.5px",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        boxSizing: "border-box",
        position: "relative",
        margin: "0 auto",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        ref={contentRef}
        className="container"
        style={{
          width: "fit-content",
          flex: "0 0 auto",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          boxSizing: "border-box",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <QuoteBox
          opacity={isMotion4 ? 0.5 : 1}
          description="how are you supposed to get experience if you can't get access to the system"
          sourceText="User on Reddit"
          summaryTitle={isMotion4 ? "Hard to learn" : undefined}
          iconUrl={QUOTE_ICON_1}
        />
        <QuoteBox
          opacity={isMotion4 ? 0.5 : 1}
          description="I'm in a similar situation, looking at a new role/change...but was unable to fin[d] much in the way of online training etc, without paying millions for the Adobe training."
          sourceText="User on Adobe Forums"
          summaryTitle={isMotion4 ? "Limited access" : undefined}
          iconUrl={QUOTE_ICON_2}
        />
      </div>
    </section>
  );
};
