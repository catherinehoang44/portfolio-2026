"use client";

import React, { useRef, useState, useEffect } from "react";
import { Highlight, HIGHLIGHT_BORDER } from "@/app/components/Highlight";

const PANEL_WIDTH = 513.5;
const PANEL_HEIGHT = 420;

/** Duration for frame transition (context1 ↔ context2). */
const FRAME_TRANSITION_MS = 400;
const FRAME_TRANSITION = `all ${FRAME_TRANSITION_MS}ms ease-out`;

/** Connector line color (under Adobe logo); sits behind chart layer. */
const CONNECTOR_LINE_COLOR = "#D9D9D9";

interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Context 1 = starting frame (chart full opacity, no highlight/beam/overlay, central icon with ? in top row). Context 2 = end frame. */
export type DataVizFrame = "context1" | "context2";

interface PaperProps {
  className?: string;
  style?: React.CSSProperties;
}

const PAPER_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/0e44e2ec-155a-48dd-9a51-51bb45345ef4.png";

/**
 * Paper — reusable background texture/pattern component
 */
const Paper = ({ className, style }: PaperProps) => (
  <img
    src={PAPER_SRC}
    alt=""
    aria-hidden
    draggable={false}
    className={`paper ${className ?? ""}`.trim()}
    style={{
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      opacity: 0.16,
      mixBlendMode: "multiply",
      position: "absolute",
      top: 0,
      left: 0,
      objectFit: "cover",
      objectPosition: "center",
      pointerEvents: "none",
      ...style,
    }}
  />
);

const LINE_8_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/19e55f56-80b5-424a-bc53-8aeef751a8ad.svg";
const LINE_9_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/a1c4caa1-901b-4968-b808-a62d489a05ca.svg";
const ICON_1_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/667cae49-cef1-43d3-9051-c7d4c7849200.svg";
const ICON_2_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/d8b406b0-bdee-4663-801e-05e8bc4fdf7d.svg";
const ICON_3_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/37b711c0-6889-4108-b02d-c85084b834eb.svg";
const ADOBE_DX_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/01add29b-3159-4ef1-b5f4-5ce1c5761b0c.svg";
const ICON_4_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/5fbeb367-84f0-4944-a6c7-ccace8bc49f7.svg";
const ICON_5_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/6f1f95f8-d853-4a70-b1d9-6f20a7ba1cb3.svg";
const HICKS_ICON_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/d905aa7c-f535-4de0-bca0-3e36fe363206.svg";
const MASK_ICON_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/4eb36016-6eba-403d-b736-8698c5c55a2d.svg";
const BEAM_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/ac46da02-1a4b-46b7-8b25-38e31818ff6a.svg";

/**
 * DataVisualizationPanel — interactive flowchart for Adobe Context 1 & 2.
 * Context 1 = starting frame. Context 2 = end frame (Hick's Law, beam, overlay, chart dimmed, central icon with mask).
 */
export function DataVisualizationPanel({
  className,
  style,
  frame = "context2",
}: BaseComponentProps & { frame?: DataVizFrame }) {
  const isContext1 = frame === "context1";
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateScale = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w <= 0 || h <= 0) return;
      const s = Math.min(w / PANEL_WIDTH, h / PANEL_HEIGHT);
      setScale(s);
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const iconTileStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: HIGHLIGHT_BORDER,
    borderStyle: "solid",
    borderWidth: "1px",
    boxSizing: "content-box",
    borderRadius: "2px",
    overflow: "hidden",
    cursor: "default",
  };
  const innerTileStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    backgroundColor: "rgba(249, 249, 249, 1)",
    borderColor: HIGHLIGHT_BORDER,
    borderStyle: "solid",
    borderWidth: "1px",
    boxSizing: "border-box",
    borderRadius: "2px",
    overflow: "hidden",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0",
    minHeight: "0",
    alignSelf: "stretch",
    minWidth: "0",
    position: "relative",
  };

  return (
    <div
      ref={containerRef}
      className={`data-visualization-panel-wrapper ${className ?? ""}`.trim()}
      style={{
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <section
        className="data-visualization-panel"
        style={{
          width: PANEL_WIDTH,
          height: PANEL_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "16px",
          paddingBottom: "16px",
          gap: "32px",
          backgroundColor: "rgba(255, 255, 255, 1)",
          boxSizing: "border-box",
          overflow: "visible",
          position: "relative",
          flexShrink: 0,
        }}
      >
      <div
        className="chart-container"
        style={{
          width: "236px",
          height: "358px",
          boxSizing: "border-box",
          opacity: isContext1 ? 1 : 0.36,
          zIndex: 1,
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          transition: FRAME_TRANSITION,
        }}
      >
        <img
          src={LINE_8_SRC}
          alt=""
          className="line-8"
          style={{
            width: "180px",
            height: "21px",
            boxSizing: "border-box",
            position: "absolute",
            left: "26.25px",
            top: "103.5px",
          }}
        />
        <img
          src={LINE_9_SRC}
          alt=""
          className="line-9"
          style={{
            width: "180px",
            height: "42px",
            boxSizing: "border-box",
            position: "absolute",
            left: "26.25px",
            top: "178.5px",
          }}
        />
        <div
          className="line-10"
          style={{
            width: "0",
            height: "42px",
            boxSizing: "border-box",
            position: "absolute",
            left: "122.25px",
            top: "275.5px",
            borderLeft: `1px solid ${HIGHLIGHT_BORDER}`,
          }}
        />

        {/* Top-Left Icon */}
        <div style={{ ...iconTileStyle, width: "56px", height: "55px", position: "absolute", left: "-5px", top: "124px" }}>
          <div style={{ ...innerTileStyle, padding: "4px" }}>
            <Paper />
            <img src={ICON_1_SRC} alt="Option 1" draggable={false} style={{ width: "22.8px", height: "25.86px", boxSizing: "border-box", position: "relative", zIndex: 1 }} />
          </div>
        </div>

        {/* Bottom-Left Icon */}
        <div style={{ ...iconTileStyle, width: "56px", height: "55px", position: "absolute", left: "-5px", top: "220px" }}>
          <div style={{ ...innerTileStyle, padding: "4px" }}>
            <Paper />
            <img src={ICON_2_SRC} alt="Option 2" draggable={false} style={{ width: "22.8px", height: "25.86px", boxSizing: "border-box", position: "relative", zIndex: 1 }} />
          </div>
        </div>

        {/* Top-Right Icon */}
        <div style={{ ...iconTileStyle, width: "56px", height: "55px", position: "absolute", left: "175px", top: "124px" }}>
          <div style={{ ...innerTileStyle, padding: "4px" }}>
            <Paper />
            <img src={ICON_3_SRC} alt="Option 3" draggable={false} style={{ width: "22.8px", height: "25.86px", boxSizing: "border-box", position: "relative", zIndex: 1 }} />
          </div>
        </div>

        {/* Hero Logo (Adobe DX) */}
        <div
          style={{
            ...iconTileStyle,
            width: "84px",
            height: "82px",
            position: "absolute",
            left: "77px",
            top: "0px",
            translate: "-5px 0px",
            zIndex: 2,
          }}
        >
          <div style={{ ...innerTileStyle, padding: "4px" }}>
            <Paper />
            <div
              className="adobe-dx-logo"
              style={{
                width: "42px",
                height: "40.15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "9px 8px",
                gap: "10px",
                backgroundColor: "rgba(132, 132, 132, 1)",
                boxSizing: "border-box",
                borderRadius: "7.38px",
                overflow: "hidden",
                position: "relative",
                zIndex: 1,
                flexShrink: 0,
              }}
            >
              <img src={ADOBE_DX_SRC} alt="Adobe DX" draggable={false} style={{ width: "25.25px", height: "22.15px", boxSizing: "border-box", display: "block" }} />
            </div>
          </div>
        </div>

        {/* Middle-Bottom Icon */}
        <div style={{ ...iconTileStyle, width: "56px", height: "55px", position: "absolute", left: "86px", top: "220px" }}>
          <div style={{ ...innerTileStyle, padding: "4px" }}>
            <Paper />
            <img src={ICON_4_SRC} alt="Option 4" draggable={false} style={{ width: "22.8px", height: "25.86px", boxSizing: "border-box", position: "relative", zIndex: 1 }} />
          </div>
        </div>

        {/* Many More Badge */}
        <div style={{ ...iconTileStyle, width: "128px", height: "42px", position: "absolute", left: "51px", top: "316px" }}>
          <div style={innerTileStyle}>
            <Paper />
            <span
              style={{
                color: "rgba(140, 140, 140, 1)",
                fontSize: "16px",
                fontFamily: '"Adobe Clean", sans-serif',
                fontWeight: 400,
                lineHeight: "20px",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              ...many more
            </span>
          </div>
        </div>

        {/* Bottom-Right Icon */}
        <div style={{ ...iconTileStyle, width: "56px", height: "55px", position: "absolute", left: "175px", top: "220px" }}>
          <div style={{ ...innerTileStyle, padding: "4px" }}>
            <Paper />
            <img src={ICON_5_SRC} alt="Option 5" draggable={false} style={{ width: "22.8px", height: "25.86px", boxSizing: "border-box", position: "relative", zIndex: 1 }} />
          </div>
        </div>
      </div>

      {/* Opacity overlay — 0% in context1 */}
      <div
        className="opacity-overlay"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          boxSizing: "border-box",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: isContext1 ? 0 : 1,
          transition: FRAME_TRANSITION,
        }}
      />

      {/* Highlight: Hick's Law — 0% opacity in context1; hug height of contents. */}
      <Highlight
        title="Hick's Law"
        iconSrc={HICKS_ICON_SRC}
        style={{
          width: "332px",
          height: "auto",
          minHeight: 0,
          position: "absolute",
          left: "85.5px",
          top: isContext1 ? "407px" : "294px",
          zIndex: 2,
          opacity: isContext1 ? 0 : 1,
          transition: FRAME_TRANSITION,
        }}
      >
        The time and the effort it takes to make a decision increases with the number of options.
      </Highlight>

      {/* Light Beam Effect — 0% opacity in context1 */}
      <div
        className="highlight-beam"
        style={{
          width: "96px",
          height: "335.7px",
          boxSizing: "border-box",
          position: "absolute",
          left: "210.5px",
          top: "-55px",
          zIndex: 3,
          pointerEvents: "none",
          translate: "-0.5px 0px",
          opacity: isContext1 ? 0 : 1,
          transition: FRAME_TRANSITION,
        }}
      >
        <img
          src={BEAM_SRC}
          alt=""
          className="triangle"
          style={{
            width: "96px",
            height: "298px",
            boxSizing: "border-box",
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        />
        <div
          className="ellipse-glow"
          style={{
            width: "96px",
            height: "66.16px",
            backgroundColor: "rgba(255, 255, 255, 1)",
            boxSizing: "border-box",
            position: "absolute",
            left: "0px",
            top: "269.52px",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Vertical Connector Line — under Adobe container (zIndex -1); center x-aligned to main icon. */}
      <div
        className="connector-line"
        style={{
          width: "0",
          height: isContext1 ? "73px" : "113px",
          boxSizing: "border-box",
          position: "absolute",
          left: "256px",
          top: "82px",
          zIndex: -1,
          borderLeft: `1px solid ${CONNECTOR_LINE_COLOR}`,
          transition: FRAME_TRANSITION,
        }}
      />

      {/* Central icon: context1 top 155px; context2 at 195px (lower +10px y). Motion 2 only: outer border #A0A0A0. */}
      <div
        className="central-action-btn"
        style={{
          ...iconTileStyle,
          width: "56px",
          height: "55px",
          position: "absolute",
          left: "225.5px",
          top: isContext1 ? "155px" : "195px",
          zIndex: 5,
          borderColor: isContext1 ? "#F2F2F2" : "#A0A0A0",
          transition: FRAME_TRANSITION,
        }}
      >
        <div style={{ ...innerTileStyle, padding: "4px", borderColor: isContext1 ? "#F2F2F2" : HIGHLIGHT_BORDER, transition: FRAME_TRANSITION }}>
          <Paper />
          {/* Same question-mark vector (dot + curve) as sub-icon containers */}
          <img
            src={ICON_1_SRC}
            alt=""
            aria-hidden
            draggable={false}
            style={{
              width: "22.8px",
              height: "25.86px",
              boxSizing: "border-box",
              position: "relative",
              zIndex: 1,
              opacity: isContext1 ? 1 : 0,
              pointerEvents: "none",
              transition: FRAME_TRANSITION,
            }}
          />
          <img
            src={MASK_ICON_SRC}
            alt="Mask Icon"
            draggable={false}
            style={{
              width: "28px",
              height: "28px",
              boxSizing: "border-box",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              opacity: isContext1 ? 0 : 1,
              pointerEvents: "none",
              transition: FRAME_TRANSITION,
            }}
          />
        </div>
      </div>
    </section>
    </div>
  );
}
