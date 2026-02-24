"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
        hour12: true,
      });
      setTime(`${formatted} ET`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return <>{time}</>;
}

type CardState = "active" | "inactive";

function CardBase({ state }: { state: CardState }) {
  const isActive = state === "active";
  const fillBot = isActive ? "#93C5FD" : "#E4E4E7";
  const fillTop = isActive ? "#EFF6FF" : "white";
  const stroke = isActive ? "#3B82F6" : "#A1A1AA";

  return (
    <svg
      viewBox="0 0 500 313.462"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-1/2 w-full"
      style={{ transform: "translateX(-50%)" }}
    >
      <path
        d="M18 170.693C9.748 165.614 9.748 153.617 18 148.539L236.367 14.16C244.728 9.014 255.273 9.014 263.634 14.16L482 148.539C490.253 153.617 490.253 165.614 482 170.693L263.634 305.072C255.273 310.217 244.728 310.217 236.367 305.072L18 170.693Z"
        fill={fillBot}
        stroke={stroke}
        className="transition-all duration-500"
      />
      <path
        d="M18 164.924C9.748 159.845 9.748 147.848 18 142.769L236.367 8.39C244.728 3.245 255.273 3.245 263.634 8.39L482 142.769C490.253 147.848 490.253 159.845 482 164.924L263.634 299.303C255.273 304.448 244.728 304.448 236.367 299.303L18 164.924Z"
        fill={fillTop}
        stroke={stroke}
        className="transition-all duration-500"
      />
    </svg>
  );
}

/* eslint-disable @next/next/no-img-element */

function CardTopSvg({ src, visible }: { src: string; visible: boolean }) {
  return (
    <div
      className="absolute top-0 left-1/2 w-full h-full transition-opacity duration-500 select-none"
      style={{
        transform: "translateX(-50%)",
        opacity: visible ? 1 : 0,
      }}
    >
      <img src={src} alt="" className="w-full h-full" draggable={false} />
    </div>
  );
}

const DIA_COMPACT_SCALE = 0.58;
const DIA_DESKTOP_SCALE = 0.75; /* 500×500 box scaled to fit desktop card */

function DiaBrowserTop({
  visible,
  compact = false,
  scale: scaleProp,
}: {
  visible: boolean;
  compact?: boolean;
  /** When set, use 500×500 box with this scale (mobile 0.58, desktop 0.75). */
  scale?: number;
}) {
  const scale = scaleProp ?? (compact ? DIA_COMPACT_SCALE : undefined);
  const useScaledWrapper = scale != null;
  const inner = (
    <div
      className="relative size-full select-none"
      style={useScaledWrapper ? { width: 500, height: 500 } : undefined}
    >
        <div className="absolute flex items-center justify-center" style={{ left: "50%", top: "50%", transform: "translate(calc(-50% + 18.19px), calc(-50% + 94.03px))", width: 433.694, height: 234.529 }}>
          <div style={{ transform: "rotate(-13.15deg)" }}>
            <div className="relative" style={{ width: 411.57, height: 144.682 }}>
              <div className="absolute" style={{ inset: "0.39% 0 0.5% 2.62%" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/shadow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ left: 142.99, top: 123, width: 257.39, height: 269.528 }}>
          <div style={{ transform: "rotate(-2deg) skewX(-3deg)" }}>
            <div className="relative" style={{ width: 252.994, height: 260.739 }}>
              <div className="absolute" style={{ inset: "1.01% -0.2% 1.11% -0.2%" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v577.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ left: 133.25, top: 127.21, width: 257.39, height: 269.528 }}>
          <div style={{ transform: "rotate(-2deg) skewX(-3deg)" }}>
            <div className="relative" style={{ width: 252.994, height: 260.739 }}>
              <div className="absolute" style={{ inset: "1.01% -0.2% 1.11% -0.2%" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v576.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ left: 136.07, top: 127.21, width: 254.568, height: 107.822 }}>
          <div style={{ transform: "rotate(-2deg) skewX(-3deg)" }}>
            <div className="relative" style={{ width: 252.994, height: 99.008 }}>
              <div className="absolute" style={{ inset: "2.65% -0.2% -0.66% -0.2%" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v579.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ left: 183.55, top: 155.51, width: 190.8, height: 73.631 }}>
          <div style={{ transform: "rotate(-2deg) skewX(-3deg)" }}>
            <div className="relative" style={{ width: 189.745, height: 67.019 }}>
              <div className="absolute" style={{ inset: "2.76% -0.26% -0.97% -0.26%" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v578.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ left: 168.25, top: 182.42, width: 192.377, height: 164.002 }}>
          <div style={{ transform: "rotate(-2deg) skewX(-3deg)" }}>
            <div className="relative" style={{ width: 189.746, height: 157.404 }}>
              <div className="absolute" style={{ inset: "0.68% -0.26% 0.79% -0.26%" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v580.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ left: 164.33, top: 185.13, width: 192.377, height: 164.002 }}>
          <div style={{ transform: "rotate(-2deg) skewX(-3deg)" }}>
            <div className="relative" style={{ width: 189.746, height: 157.404 }}>
              <div className="absolute" style={{ inset: "0.68% -0.26% 0.79% -0.26%" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v581.svg" />
              </div>
            </div>
          </div>
        </div>
        {[152.96, 155.51, 158.06].map((top, i) => (
          <div key={i} className="absolute flex items-center justify-center" style={{ left: 147.24 + i * 10.89, top, width: 7.937, height: 8.815 }}>
            <div style={{ transform: "rotate(13.18deg) scaleX(0.99) skewX(5.24deg)" }}>
              <div className="relative" style={{ width: 7.215, height: 7.215 }}>
                <div className="absolute" style={{ inset: "-6.93%" }}>
                  <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/ellipse.svg" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute" style={{ left: 75.26, top: 227.69, width: 117.461, height: 153.603 }}>
          <div className="absolute" style={{ inset: "1.71% -0.43%" }}>
            <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v583.svg" />
          </div>
        </div>
        <div className="absolute" style={{ left: 68.81, top: 231.56, width: 117.461, height: 153.603 }}>
          <div className="absolute" style={{ inset: "1.71% -0.43% 1.9% -0.43%" }}>
            <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v582.svg" />
          </div>
        </div>
        {[259.96, 281.22, 302.49, 323.75].map((top, i) => (
          <div key={`bar-${i}`}>
            <div className="absolute" style={{ left: 86.88, top, width: 10.801, height: 15.122 }}>
              <div className="absolute" style={{ inset: "-0.52% -4.63%" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v584.svg" />
              </div>
            </div>
            <div className="absolute" style={{ left: 103.42, top: top + 9.01, width: 59.07, height: 20.775 }}>
              <div className="absolute" style={{ inset: "1.97% 0" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v585.svg" />
              </div>
            </div>
          </div>
        ))}
        <div className="absolute flex items-center justify-center" style={{ left: 311.77, top: 335.31, width: 48.535, height: 33.291 }}>
          <div style={{ transform: "rotate(19.4deg) scaleX(1.01) scaleY(0.96) skewX(8.04deg)" }}>
            <div className="relative" style={{ width: 47.277, height: 18.374 }}>
              <div className="absolute" style={{ inset: "-1.56% -0.18% -1.65% 0" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v562.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ left: 308.03, top: 337.85, width: 48.535, height: 33.291 }}>
          <div style={{ transform: "rotate(19.4deg) scaleX(1.01) scaleY(0.96) skewX(8.04deg)" }}>
            <div className="relative" style={{ width: 47.277, height: 18.374 }}>
              <div className="absolute" style={{ inset: "-1.56% -0.18% -1.65% 0" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v563.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ left: 256.68, top: 321.36, width: 49.143, height: 33.066 }}>
          <div style={{ transform: "rotate(19.4deg) scaleX(1.01) scaleY(0.96) skewX(5.96deg)" }}>
            <div className="relative" style={{ width: 47.277, height: 18.374 }}>
              <div className="absolute" style={{ inset: "-1.56% -0.18% -1.65% 0" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v563.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ left: 252.99, top: 323.92, width: 49.143, height: 33.066 }}>
          <div style={{ transform: "rotate(19.4deg) scaleX(1.01) scaleY(0.96) skewX(5.96deg)" }}>
            <div className="relative" style={{ width: 47.277, height: 18.374 }}>
              <div className="absolute" style={{ inset: "-1.56% -0.18% -1.65% 0" }}>
                <img alt="" className="block max-w-none size-full" draggable={false} src="/images/dia/v565.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  return (
    <div
      className="absolute top-0 left-1/2 w-full h-full transition-opacity duration-500 select-none"
      style={{ transform: "translateX(-50%)", opacity: visible ? 1 : 0 }}
    >
      {useScaledWrapper ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 500,
            height: 500,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center",
          }}
        >
          {inner}
        </div>
      ) : (
        inner
      )}
    </div>
  );
}

function NotionTop({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute top-0 left-1/2 w-full h-full transition-opacity duration-500 select-none"
      style={{ transform: "translateX(-50%)", opacity: visible ? 1 : 0 }}
    >
      <img
        alt=""
        className="absolute block max-w-none size-full"
        src="/images/notion-top.svg"
        draggable={false}
      />
    </div>
  );
}

const CARD_OFFSETS = [-112, -75, -43, -11, 21, 54];

const ABOVE_SPACING = 32;
const ABOVE_TOP = -320;
const ABOVE_OFFSETS = CARD_OFFSETS.map((_, i) => ABOVE_TOP + i * ABOVE_SPACING);

const CARD_TOP_SVGS = [
  "/images/top-adobe.svg",
  null, // dia-browser - inline component
  "/images/top-anything.svg",
  null, // notion - inline component
  "/images/top-otherworld.svg",
  "/images/top-firered.svg",
];

interface IsometricStackProps {
  selectedIndex: number;
  /** When set, only this card is shown (e.g. for mobile list). No stack effect. */
  singleCardIndex?: number;
  /** Optional className for the wrapper (e.g. mobile smaller size). */
  className?: string;
  /** When set (desktop), hovering a card selects that case. */
  onSelectIndex?: (index: number) => void;
}

export function IsometricStack({
  selectedIndex,
  singleCardIndex,
  className = "",
  onSelectIndex,
}: IsometricStackProps) {
  const totalCards = CARD_OFFSETS.length;
  const isSingleCardMode = singleCardIndex !== undefined;
  const indices = isSingleCardMode ? [singleCardIndex] : CARD_OFFSETS.map((_, i) => i);

  return (
    <div
      className={`relative w-full max-w-[480px] aspect-[480/840] mx-auto ${className}`}
    >
      {indices.map((i) => {
        const isActive = isSingleCardMode || i === selectedIndex;
        const isAbove = !isSingleCardMode && i < selectedIndex;
        const state: CardState = isActive ? "active" : "inactive";
        const svgSrc = CARD_TOP_SVGS[i];
        const baseZ = totalCards - i;

        const cardOffset =
          isSingleCardMode ? 0 : isAbove ? ABOVE_OFFSETS[i] : CARD_OFFSETS[i];

        return (
          <div
            key={i}
            className="absolute left-1/2 w-[104%] aspect-square overflow-hidden select-none cursor-pointer"
            onDragStart={(e) => e.preventDefault()}
            onMouseEnter={
              onSelectIndex && !isSingleCardMode ? () => onSelectIndex(i) : undefined
            }
            onClick={
              onSelectIndex && !isSingleCardMode ? () => onSelectIndex(i) : undefined
            }
            style={{
              top: `calc(50% + ${cardOffset * (100 / 840)}%)`,
              transform: "translateX(-50%) translateY(-50%)",
              zIndex: baseZ,
              opacity: isActive ? 1 : isAbove ? 0.3 : 1,
              transition: "top 500ms ease, opacity 500ms ease",
              animation: isActive ? "cardFloat 3s ease-in-out infinite" : "none",
            }}
          >
            <CardBase state={state} />
            {svgSrc && (
              <CardTopSvg src={svgSrc} visible={isActive} />
            )}
            {i === 1 && (
              <DiaBrowserTop
                visible={isActive}
                compact={isSingleCardMode}
                scale={isSingleCardMode ? DIA_COMPACT_SCALE : DIA_DESKTOP_SCALE}
              />
            )}
            {i === 3 && <NotionTop visible={isActive} />}
          </div>
        );
      })}
    </div>
  );
}
