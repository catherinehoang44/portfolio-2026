"use client";

import { useState, useRef, useEffect } from "react";
import { CaseStudyMediaSlot } from "@/app/components/CaseStudyMediaSlot";

const FIELD_NOTE_HEADINGS = [
  "Business Goals",
  "User Considerations",
  "Developer Bandwidth",
] as const;

function parseFieldNoteSections(note: string) {
  return FIELD_NOTE_HEADINGS
    .map((heading, idx) => {
      const startToken = `${heading}:`;
      const startIdx = note.indexOf(startToken);
      if (startIdx === -1) return null;

      const contentStart = startIdx + startToken.length;
      const nextHeading = FIELD_NOTE_HEADINGS[idx + 1];
      const endIdx = nextHeading
        ? note.indexOf(`${nextHeading}:`, contentStart)
        : note.length;
      const body = note.slice(contentStart, endIdx === -1 ? note.length : endIdx).trim();
      return { heading, body };
    })
    .filter(
      (section): section is { heading: (typeof FIELD_NOTE_HEADINGS)[number]; body: string } =>
        section != null,
    );
}

export function CourseCatalogFieldNotesMedia({
  src,
  note,
}: {
  src: string;
  note: string;
}) {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const sections = parseFieldNoteSections(note);
  const fieldNotesShellRef = useRef<HTMLDivElement>(null);
  const notesScrollRef = useRef<HTMLDivElement>(null);

  /** Wheel over toggle strip / overlay still scrolls notes (needs non-passive listener for preventDefault). */
  useEffect(() => {
    const shell = fieldNotesShellRef.current;
    if (!shell) return;

    const onWheel = (e: WheelEvent) => {
      if (!isNotesOpen) return;
      const el = notesScrollRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const delta = e.deltaY;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if (delta < 0 && atTop) return;
      if (delta > 0 && atBottom) return;
      el.scrollTop += delta;
      e.preventDefault();
    };

    shell.addEventListener("wheel", onWheel, { passive: false });
    return () => shell.removeEventListener("wheel", onWheel);
  }, [isNotesOpen]);

  return (
    <div
      className="case-media relative w-full overflow-hidden"
      style={{
        minHeight: 200,
        background: "#EEEEEE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 16px 16px 0",
      }}
    >
      <div
        className="relative w-full"
        style={{
          maxWidth: "514px",
          aspectRatio: "514/420",
          maxHeight: "420px",
        }}
      >
        <CaseStudyMediaSlot
          src={src}
          className="absolute inset-0 h-full w-full rounded-none"
          objectFit="contain"
        />
      </div>

      {/* Tablet/Desktop only: right-edge toggle + slide-out notes drawer */}
      <div
        ref={fieldNotesShellRef}
        className="hidden md:block absolute inset-y-0 right-0 z-20"
        data-media-fullscreen-ignore
        style={{ overflow: "visible" }}
      >
        {isNotesOpen ? (
          <button
            type="button"
            aria-label="Close Field Notes"
            className="absolute inset-0 h-full w-full cursor-default bg-transparent"
            style={{ zIndex: 15 }}
            onClick={() => setIsNotesOpen(false)}
          />
        ) : null}

        <button
          type="button"
          onClick={() => setIsNotesOpen((prev) => !prev)}
          aria-expanded={isNotesOpen}
          aria-label={isNotesOpen ? "Hide Field Notes" : "Show Field Notes"}
          className="absolute top-1/2 -translate-y-1/2 rounded-l-md border border-r-0 bg-white/95 text-xs text-[#71717A]"
          style={{
            right: isNotesOpen ? "248px" : "0px",
            transition: "right 0.28s ease",
            whiteSpace: "nowrap",
            borderColor: "#E4E4E7",
            borderRightWidth: 0,
            zIndex: 30,
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            overflow: "visible",
          }}
        >
          <img
            src="/images/field-note-icon.svg"
            alt=""
            aria-hidden
            draggable={false}
            style={{ width: 16, height: 16, display: "block", position: "relative", zIndex: 1, opacity: 1 }}
          />
        </button>

        <aside
          className="h-full w-[248px] border-l border-[#E4E4E7] bg-white/95 backdrop-blur-sm"
          style={{
            transform: isNotesOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.28s ease",
            zIndex: 20,
          }}
        >
          <div className="h-full min-h-0 flex flex-col gap-3 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-[#71717A]">Field Notes</p>
            <div ref={notesScrollRef} className="hide-scrollbar min-h-0 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-4">
              {sections.length > 0 ? (
                sections.map(({ heading, body }) => (
                  <div key={heading} className="flex flex-col gap-1.5">
                    <p className="text-sm leading-5 font-medium text-[#71717A]">{heading}</p>
                    <p className="text-sm leading-6 text-[#71717A]">{body}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-[#71717A]">{note}</p>
              )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
