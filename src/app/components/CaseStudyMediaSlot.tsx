"use client";

import React, { useState } from "react";

/** Renders image from public path; no fill on load error. Served as-is (no Next image optimizer — keeps PNG/UI screenshots sharp). */
export function CaseStudyMediaSlot({
  src,
  className = "",
  objectFit = "cover",
}: {
  src: string;
  className?: string;
  /** "contain" = whole image visible (may letterbox); "cover" = fill container (may crop). */
  objectFit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className={className} />;
  }
  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{ userSelect: "none", WebkitUserDrag: "none" } as React.CSSProperties}
    >
      <img
        src={src}
        alt=""
        className={`pointer-events-none absolute inset-0 h-full w-full rounded-[4px] ${objectFit === "contain" ? "object-contain" : "object-cover"}`}
        onError={() => setFailed(true)}
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
