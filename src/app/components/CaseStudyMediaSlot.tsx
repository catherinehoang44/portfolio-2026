"use client";

import { useState } from "react";
import Image from "next/image";

/** Renders image from public path; no fill on load error. */
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
    <div className={`relative overflow-hidden select-none ${className}`} style={{ userSelect: "none", WebkitUserDrag: "none" }}>
      <Image
        src={src}
        alt=""
        fill
        className={`pointer-events-none ${objectFit === "contain" ? "object-contain" : "object-cover"}`}
        unoptimized
        onError={() => setFailed(true)}
        draggable={false}
      />
    </div>
  );
}
