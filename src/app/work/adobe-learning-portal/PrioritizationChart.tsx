"use client";

import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "@/lib/design-tokens";

const CHART_DESIGN_WIDTH = 694;
const CHART_DESIGN_HEIGHT = 301;
const CARD_PADDING_X = 26; // 13px * 2
const AXIS_LABEL_FONT_SIZE = 10.7;

interface RadioButtonIndicatorProps {
  className?: string;
  style?: React.CSSProperties;
}

interface PlotPointProps {
  top: number;
  left: number;
  title: string;
  subtitle?: string;
  isAllUsers?: boolean;
}

/** Plot dot: outer (border) and inner (fill). Inner is half the size of outer, same aspect ratio (1:1). */
const IndicatorDot = () => {
  const outerSize = 12;
  const innerSize = outerSize / 2; // 6px — half of outer
  return (
    <div
      style={{
        width: `${outerSize}px`,
        height: `${outerSize}px`,
        boxSizing: "border-box",
        position: "relative",
        flexShrink: 0,
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Outer (border) — white fill, under inner layer */}
      <div
        style={{
          width: `${outerSize}px`,
          height: `${outerSize}px`,
          backgroundColor: "#FFFFFF",
          border: "0.2182px solid rgba(156, 156, 156, 0.64)",
          boxSizing: "border-box",
          position: "absolute",
          left: 0,
          top: 0,
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      {/* Inner (fill) — same aspect ratio as outer, half the size, centered, on top */}
      <div
        style={{
          width: `${innerSize}px`,
          height: `${innerSize}px`,
          backgroundColor: "rgba(156, 156, 156, 0.64)",
          boxSizing: "border-box",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          zIndex: 2,
        }}
      />
    </div>
  );
};

const PlotPoint: React.FC<PlotPointProps> = ({
  top,
  left,
  title,
  subtitle,
  isAllUsers,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "8px",
      boxSizing: "border-box",
      position: "absolute",
      left: `${left}px`,
      top: `${top}px`,
      transition: "opacity 0.2s ease",
    }}
  >
    <IndicatorDot />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          background:
            "linear-gradient(180deg, rgba(206, 206, 206, 1.00) 0%, rgba(140, 140, 140, 1.00) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "10px",
          fontFamily: '"Adobe Clean", sans-serif',
          fontWeight: 500,
          lineHeight: "12.5px",
        }}
      >
        {title}
      </span>
      <span
        style={{
          background:
            "linear-gradient(180deg, rgba(206, 206, 206, 1.00) 0%, rgba(140, 140, 140, 1.00) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "8px",
          fontFamily: '"Adobe Clean", sans-serif',
          fontWeight: 400,
          lineHeight: "10px",
        }}
      >
        {isAllUsers ? "All Users" : subtitle}
      </span>
    </div>
  </div>
);

const GRID_SVG_SRC =
  "https://storage.googleapis.com/storage.magicpath.ai/user/368065211384610816/figma-assets/b7d5dd66-981e-4501-8fb0-07604fa94a67.svg";

export const PrioritizationChart: React.FC<RadioButtonIndicatorProps> = ({
  className,
  style,
}) => {
  const [showPriorities, setShowPriorities] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [chartScale, setChartScale] = useState(1);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const updateScale = () => {
      const cardWidth = el.offsetWidth;
      const contentWidth = Math.max(0, cardWidth - CARD_PADDING_X);
      setChartScale(contentWidth / CHART_DESIGN_WIDTH);
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`graph-toggle ${className || ""}`.trim()}
      style={{
        width: "100%",
        height: "auto",
        minHeight: "391px",
        display: "flex",
        flexDirection: "column",
        padding: "13px",
        gap: "16px",
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.02)",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          boxSizing: "border-box",
        }}
      >
        <p
          className="text-case-body"
          style={{
            margin: 0,
            color: COLORS.textMutedStrong,
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          As a result of our research, we determined the need to broaden the
          scope of users and create new sets of content categories within the
          web experience. We plotted our potential users as a spectrum between
          enterprise and independent users, as well as junior to senior career
          experience.
        </p>

        <button
          type="button"
          onClick={() => setShowPriorities(!showPriorities)}
          aria-pressed={showPriorities}
          style={{
            display: "block",
            position: "relative",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            width: "152px",
            height: "42px",
            background:
              "linear-gradient(180deg, rgba(153, 153, 153, 0.42) 0%, rgba(255, 255, 255, 1.00) 100%)",
            border: "1px solid #E0E0E0",
            boxSizing: "border-box",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.04)",
            borderRadius: "8px",
            cursor: "pointer",
            outline: "none",
            flexShrink: 0,
            overflow: "hidden",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0px 4px 12px rgba(0, 0, 0, 0.08)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              "0px 4px 24px rgba(0, 0, 0, 0.04)")
          }
        >
          {/* Text: full width, padding animates so switch doesn’t overlap */}
          <span
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              paddingLeft: showPriorities ? 0 : 42,
              paddingRight: showPriorities ? 42 : 0,
              textAlign: "center",
              transition: "padding-left 0.25s ease, padding-right 0.25s ease",
              color: "rgba(140, 140, 140, 1)",
              fontSize: "13px",
              fontFamily: '"Neue Montreal", sans-serif',
              fontWeight: 400,
              lineHeight: "42px",
            }}
          >
            {showPriorities ? "Hide Priorities" : "Show Priorities"}
          </span>
          {/* Switch: position absolute, left animates to slide */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: showPriorities ? "calc(100% - 42px)" : 0,
              width: "42px",
              height: "42px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              border: "1px solid #F0F0F0",
              boxSizing: "border-box",
              boxShadow: "2px 0px 12px rgba(0, 0, 0, 0.12)",
              borderRadius: "7px",
              transition: "left 0.25s ease",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "27px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                border: "0.5px solid #F5F5F5",
                boxSizing: "border-box",
                boxShadow: "inset 0px 0px 4px rgba(214, 214, 214, 1)",
                borderRadius: "4px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  color: "rgba(164, 164, 164, 1)",
                  fontSize: "9.6px",
                  fontFamily: '"Adobe Clean", sans-serif',
                  marginTop: "-1px",
                  transform: showPriorities ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                }}
              >
                +
              </span>
            </div>
          </div>
        </button>
      </div>

      <div
        className="graph-container"
        style={{
          width: "100%",
          height: CHART_DESIGN_HEIGHT * chartScale,
          position: "relative",
          marginTop: "auto",
          overflow: "hidden",
          minWidth: 0,
          border: 0,
        }}
      >
        <div
          style={{
            width: CHART_DESIGN_WIDTH,
            height: CHART_DESIGN_HEIGHT,
            position: "relative",
            transform: `scale(${chartScale})`,
            transformOrigin: "top left",
          }}
        >
        {/* Large circle: 50% size + 10%; when toggle on → F2F2F2 fill, b8b8b8 stroke 50% opacity, gradient 15% top / 50% middle / 15% bottom */}
        <div
          style={{
            width: "135.52px",
            height: "135.52px",
            background: showPriorities
              ? "linear-gradient(180deg, rgba(242,242,242,0.15) 0%, rgba(242,242,242,0.5) 50%, rgba(242,242,242,0.15) 100%)"
              : "linear-gradient(180deg, rgba(255, 255, 255, 1.00) 0%, rgba(255, 255, 255, 0.00) 100%)",
            border: showPriorities ? "1.28px solid rgba(184,184,184,0.5)" : "1.28px solid rgba(240,240,240,1)",
            boxShadow: showPriorities ? "none" : "inset 0px 41px 61px rgba(214, 214, 214, 0.16)",
            opacity: showPriorities ? 1 : 0.42,
            borderRadius: "50%",
            position: "absolute",
            left: "279.44px",
            top: "78.44px",
            zIndex: 0,
            transition: "background 0.25s ease, border 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease",
          }}
        />
        {/* Grid: dim to 36% when toggle enabled */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: showPriorities ? 0.36 : 1,
            transition: "opacity 0.25s ease",
          }}
        >
          <img
            src={GRID_SVG_SRC}
            alt="Grid"
            style={{
              width: "100%",
              height: "301px",
              position: "absolute",
              left: 0,
              top: 0,
              opacity: 0.72,
              objectFit: "fill",
            }}
          />
        </div>

        {/* Y-Axis Labels (full opacity when toggle enabled) */}
        <div
          style={{
            width: "1px",
            height: "280px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            position: "absolute",
            left: "347px",
            top: "14px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              padding: "4px 8px",
              backgroundColor: "#FFF",
              border: "0.33px solid #E0E0E0",
              boxShadow: "inset 0px 0px 5.3px rgba(214, 214, 214, 1)",
              borderRadius: "0.67px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "rgba(140, 140, 140, 1)",
                fontSize: `${AXIS_LABEL_FONT_SIZE}px`,
                fontFamily: '"Adobe Clean", sans-serif',
                lineHeight: 1,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              Independent User
            </span>
          </div>
          <div
            style={{
              flex: 1,
              width: "1px",
              borderLeft: "1px dashed #DDD",
            }}
          />
          <div
            style={{
              padding: "4px 8px",
              backgroundColor: "#FFF",
              border: "0.33px solid #E0E0E0",
              boxShadow: "inset 0px 0px 5.3px rgba(214, 214, 214, 1)",
              borderRadius: "0.67px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "rgba(140, 140, 140, 1)",
                fontSize: `${AXIS_LABEL_FONT_SIZE}px`,
                fontFamily: '"Adobe Clean", sans-serif',
                lineHeight: 1,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              Enterprise Partner
            </span>
          </div>
        </div>

        {/* X-Axis Labels */}
        <div
          style={{
            width: "672px",
            height: "1px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
            position: "absolute",
            left: "11px",
            top: "148px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              padding: "4px 8px",
              backgroundColor: "#FFF",
              border: "0.33px solid #E0E0E0",
              boxShadow: "inset 0px 0px 5.3px rgba(214, 214, 214, 1)",
              borderRadius: "0.67px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "rgba(140, 140, 140, 1)",
                fontSize: `${AXIS_LABEL_FONT_SIZE}px`,
                fontFamily: '"Adobe Clean", sans-serif',
                lineHeight: 1,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              Senior in Career
            </span>
          </div>
          <div
            style={{
              flex: 1,
              height: "1px",
              borderTop: "1px dashed #DDD",
            }}
          />
          <div
            style={{
              padding: "4px 8px",
              backgroundColor: "#FFF",
              border: "0.33px solid #E0E0E0",
              boxShadow: "inset 0px 0px 5.3px rgba(214, 214, 214, 1)",
              borderRadius: "0.67px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "rgba(140, 140, 140, 1)",
                fontSize: `${AXIS_LABEL_FONT_SIZE}px`,
                fontFamily: '"Adobe Clean", sans-serif',
                lineHeight: 1,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              Junior in Career
            </span>
          </div>
        </div>

        {/* Plotting Points: dimmed (36%) when toggle enabled, except Support and FAQ, Online Courses, Community Forums */}
        <div
          style={{
            position: "absolute",
            width: "623px",
            height: "211px",
            left: "47px",
            top: "53px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: showPriorities ? 0.36 : 1,
              transition: "opacity 0.25s ease",
            }}
          >
            <PlotPoint top={23} left={144} title="On-Demand Training" isAllUsers />
            <PlotPoint
              top={188}
              left={0}
              title="Beginner Certificates and Exams"
              subtitle="New in Career, Students"
            />
            <PlotPoint
              top={156}
              left={466}
              title="Advanced Certificates and Exams"
              subtitle="Advanced in Career, Management"
            />
            <PlotPoint
              top={124}
              left={59}
              title="University/College Programs"
              subtitle="Education Partners, Teachers, Students"
            />
            <PlotPoint
              top={0}
              left={441}
              title="Admin & Voucher Dashboard"
              subtitle="Adobe Internal, Admin Partners"
            />
          </div>
          {/* Full opacity when toggle enabled: Support and FAQ, Online Courses, Community Forums */}
          <PlotPoint top={117} left={253} title="Online Courses" isAllUsers />
          <PlotPoint top={165} left={294} title="Community Forums" isAllUsers />
          <PlotPoint top={83} left={294} title="Support and FAQ" isAllUsers />
        </div>
        </div>
      </div>
    </div>
  );
};
