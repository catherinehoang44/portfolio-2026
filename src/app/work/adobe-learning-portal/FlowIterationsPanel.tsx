"use client";

import React, { useEffect, useState } from "react";
import { CaseStudyMediaSlot } from "@/app/components/CaseStudyMediaSlot";
import { COLORS } from "@/lib/design-tokens";

/** Must match exported flow PNGs (both toggles use same dimensions). */
const FLOW_IMAGE_ASPECT_RATIO = "1024/326";

interface FlowIterationsPanelProps {
  initialSrc: string;
  updatedSrc: string;
  descriptionText: string;
}

export function FlowIterationsPanel({ initialSrc, updatedSrc, descriptionText }: FlowIterationsPanelProps) {
  const [showChanges, setShowChanges] = useState(false);
  const [displaySrc, setDisplaySrc] = useState(initialSrc);
  const [isImageVisible, setIsImageVisible] = useState(true);

  useEffect(() => {
    const nextSrc = showChanges ? updatedSrc : initialSrc;
    if (nextSrc === displaySrc) return;

    setIsImageVisible(false);
    const swapTimer = window.setTimeout(() => {
      setDisplaySrc(nextSrc);
      setIsImageVisible(true);
    }, 220);

    return () => {
      window.clearTimeout(swapTimer);
    };
  }, [showChanges, initialSrc, updatedSrc]);

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "13px",
        gap: "16px",
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.02)",
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
          style={{
            margin: 0,
            color: COLORS.textMutedStrong,
            fontSize: "13px",
            fontFamily: '"Neue Montreal", sans-serif',
            fontWeight: 400,
            lineHeight: "19.2px",
            flex: 1,
          }}
        >
          {descriptionText}
        </p>

        <button
          type="button"
          onClick={() => setShowChanges((prev) => !prev)}
          aria-pressed={showChanges}
          style={{
            display: "block",
            position: "relative",
            padding: 0,
            width: "146px",
            height: "35px",
            background:
              "linear-gradient(180deg, rgba(230, 230, 230, 0.85) 0%, rgba(255, 255, 255, 1.00) 75%) padding-box, linear-gradient(180deg, rgba(140, 140, 140, 0.64) 0%, rgba(224, 224, 224, 1.00) 100%) border-box",
            border: "1px solid transparent",
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
          <span
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              paddingLeft: showChanges ? 0 : 36,
              paddingRight: showChanges ? 36 : 0,
              textAlign: "center",
              transition: "padding-left 0.25s ease, padding-right 0.25s ease",
              color: "#8C8C8C",
              fontSize: "13px",
              fontFamily: '"Neue Montreal", sans-serif',
              fontWeight: 400,
              lineHeight: "34px",
            }}
          >
            {showChanges ? "Hide Changes" : "Show Changes"}
          </span>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: showChanges ? "calc(100% - 34px)" : 0,
              width: "34px",
              height: "34px",
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
                width: "22px",
                height: "21px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                border: "0.5px solid rgba(198, 198, 198, 0.42)",
                boxSizing: "border-box",
                boxShadow: "inset 0px 0px 4px rgba(214, 214, 214, 1)",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "10px",
                  height: "10px",
                  transform: showChanges ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                }}
                aria-hidden
              >
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    width: "1px",
                    height: "10px",
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(164, 164, 164, 1)",
                    borderRadius: "1px",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    width: "10px",
                    height: "1px",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(164, 164, 164, 1)",
                    borderRadius: "1px",
                  }}
                />
              </div>
            </div>
          </div>
        </button>
      </div>

      <div
        className="case-media relative w-full overflow-hidden"
        style={{
          aspectRatio: FLOW_IMAGE_ASPECT_RATIO,
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%) padding-box, linear-gradient(180deg, rgba(140, 140, 140, 0.32) 0%, rgba(224, 224, 224, 0.5) 100%) border-box",
          borderRadius: "8px",
          border: "1px solid transparent",
        }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ opacity: isImageVisible ? 1 : 0 }}
        >
          <CaseStudyMediaSlot
            key={displaySrc}
            src={displaySrc}
            className="absolute inset-0 h-full w-full rounded-none"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}
