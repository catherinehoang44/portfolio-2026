"use client";

import { useState, useEffect, useRef } from "react";
import { COLORS } from "@/lib/design-tokens";

const RESEARCH_FONT = "var(--font-ibm-plex-mono), monospace";
const RESEARCH_FONT_SIZE_PX = 16;

/** Figma 235-3341: kanban cards white, moderate radius, light gray placeholders */
const KANBAN = {
  cardBg: "#FFFFFF",
  cardRadius: 8,
  cardPaddingV: 16,
  cardPaddingH: 20,
  cardGap: 10,
  barBg: "#E0E0E0",
  barRadius: 6,
  barHeight: 10,
  iconBlockBg: "#D9D9D9",
  iconBlockRadius: 6,
  columnHeaderBg: "#F5F5F5",
  columnHeaderRadius: 6,
  columnHeaderHeight: 36,
  topBarBg: "#F0F0F0",
  topBarRadius: 6,
  columnGap: 16,
  verticalGap: 16,
} as const;

const Card = ({
  lines,
  delay,
  icons,
}: {
  lines: string[];
  delay: number;
  icons?: number[];
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        backgroundColor: KANBAN.cardBg,
        borderRadius: KANBAN.cardRadius,
        padding: `${KANBAN.cardPaddingV}px ${KANBAN.cardPaddingH}px`,
        display: "flex",
        flexDirection: "column",
        gap: KANBAN.cardGap,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {lines.map((width, i) => (
        <div
          key={i}
          style={{
            height: KANBAN.barHeight,
            borderRadius: KANBAN.barRadius,
            backgroundColor: KANBAN.barBg,
            width,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-8px)",
            transition: `opacity 0.4s ease ${0.15 * i}s, transform 0.4s ease ${0.15 * i}s`,
          }}
        />
      ))}
      {icons && icons.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
          {icons.map((w, i) => (
            <div
              key={i}
              style={{
                height: 14,
                width: w,
                borderRadius: KANBAN.iconBlockRadius,
                backgroundColor: KANBAN.iconBlockBg,
                opacity: visible ? 1 : 0,
                transition: `opacity 0.4s ease ${0.15 * (lines.length + i)}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Column = ({
  cards,
  delay,
}: {
  cards: { lines: string[]; icons?: number[] }[];
  delay: number;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: KANBAN.verticalGap,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div
        style={{
          height: KANBAN.columnHeaderHeight,
          borderRadius: KANBAN.columnHeaderRadius,
          backgroundColor: KANBAN.columnHeaderBg,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease 0.1s",
        }}
      />
      {cards.map((card, i) => (
        <Card
          key={i}
          lines={card.lines}
          icons={card.icons}
          delay={delay + 200 + i * 250}
        />
      ))}
    </div>
  );
};

export default function BusinessRequirementsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [started]);

  const [barVisible, setBarVisible] = useState(false);
  useEffect(() => {
    if (started) {
      const timer = setTimeout(() => setBarVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [started]);

  const columnsData: { delay: number; cards: { lines: string[]; icons?: number[] }[] }[] = [
    {
      delay: 400,
      cards: [{ lines: ["65%", "80%", "100%", "60%"], icons: [18, 18] }],
    },
    {
      delay: 700,
      cards: [
        { lines: ["70%", "90%", "50%"], icons: [18, 18] },
        { lines: ["40%", "75%", "100%", "60%"], icons: [18, 18] },
      ],
    },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        boxSizing: "border-box",
        padding: `${KANBAN.cardPaddingV}px ${KANBAN.cardPaddingH}px`,
      }}
    >
      <h2
        style={{
          fontFamily: RESEARCH_FONT,
          fontSize: RESEARCH_FONT_SIZE_PX,
          fontWeight: 700,
          margin: "0 0 24px 0",
          color: COLORS.text,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        Business Requirements
      </h2>

      <div
        style={{
          height: 40,
          borderRadius: KANBAN.topBarRadius,
          backgroundColor: KANBAN.topBarBg,
          marginBottom: KANBAN.verticalGap,
          opacity: started && barVisible ? 1 : 0,
          transform: started && barVisible ? "scaleX(1)" : "scaleX(0.3)",
          transformOrigin: "left",
          transition:
            "opacity 0.6s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {started && (
        <div style={{ display: "flex", gap: KANBAN.columnGap, flex: 1, minHeight: 0 }}>
          {columnsData.map((col, i) => (
            <Column key={i} cards={col.cards} delay={col.delay} />
          ))}
        </div>
      )}
    </div>
  );
}
