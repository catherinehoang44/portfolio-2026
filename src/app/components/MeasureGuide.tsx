"use client";

import {
  MEASURE_ARROW_WIDTH,
  MEASURE_ARROW_HEAD_HEIGHT,
  MEASURE_LINE_WIDTH,
  MEASURE_LABEL_WIDTH,
  MEASURE_STRIP_WIDTH,
  COLORS,
} from "@/lib/design-tokens";

export function MeasureGuide({
  label,
  className = "",
  style,
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute left-0 top-0 bottom-0 overflow-visible select-none ${className}`}
      style={{ width: MEASURE_STRIP_WIDTH, ...style }}
      onDragStart={(e) => e.preventDefault()}
      draggable={false}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center overflow-visible"
        style={{ left: 0, width: MEASURE_LABEL_WIDTH, height: 15 }}
      >
        <span
          className="font-mono uppercase text-badge font-light whitespace-nowrap"
          style={{
            color: COLORS.measure,
            transform: "rotate(-90deg)",
          }}
        >
          {label}
        </span>
      </div>
      <div
        className="absolute top-0 bottom-0 flex flex-col overflow-visible"
        style={{ left: MEASURE_LABEL_WIDTH, width: MEASURE_ARROW_WIDTH }}
      >
        <div
          className="absolute left-0 top-0 flex-shrink-0 overflow-visible"
          style={{ width: MEASURE_ARROW_WIDTH, height: MEASURE_ARROW_HEAD_HEIGHT }}
        >
          <svg viewBox="0 0 4 3" className="block w-full h-full">
            <path d="M2 0 L0 3 L4 3 Z" fill={COLORS.measure} />
          </svg>
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 overflow-visible"
          style={{
            top: MEASURE_ARROW_HEAD_HEIGHT,
            bottom: MEASURE_ARROW_HEAD_HEIGHT,
            width: MEASURE_LINE_WIDTH,
            background: COLORS.measure,
          }}
        />
        <div
          className="absolute left-0 bottom-0 flex-shrink-0 overflow-visible rotate-180"
          style={{ width: MEASURE_ARROW_WIDTH, height: MEASURE_ARROW_HEAD_HEIGHT }}
        >
          <svg viewBox="0 0 4 3" className="block w-full h-full">
            <path d="M2 0 L0 3 L4 3 Z" fill={COLORS.measure} />
          </svg>
        </div>
      </div>
    </div>
  );
}
