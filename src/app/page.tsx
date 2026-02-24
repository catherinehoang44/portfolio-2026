"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LiveClock, IsometricStack } from "./components/CardStack";
import { MeasureGuide } from "./components/MeasureGuide";
import {
  CONTENT_OFFSET_LEFT_PX,
  CONTAINER_GAP_PX,
  SECTION_GAP_TOP_PX,
  CASE_MEDIA_DESKTOP_HEIGHT_PX,
  CASE_MEDIA_MOBILE_HEIGHT_PX,
  CASE_MEDIA_MAX_WIDTH_PX,
  COLORS,
} from "@/lib/design-tokens";

/** Only set slug when a case study page exists at /work/[slug]. Do not set slug for COMING SOON. */
const WORK_ITEMS: Array<{
  title: string;
  tag: string | null;
  badge: string | null;
  slug?: string;
}> = [
  { title: "Adobe Learning Portal", tag: "Web Design", badge: null, slug: "adobe-learning-portal" },
  { title: "Dia Browser", tag: "Product Onboarding", badge: null, slug: "dia-browser" },
  { title: "Build Anything AI", tag: "Product Design", badge: null, slug: "build-anything-ai" },
  { title: "Notion Mobile", tag: "Mobile Interactions", badge: "coming soon" },
  { title: "Otherworld", tag: "Web Design", badge: null, slug: "otherworld" },
  {
    title: "Experiments",
    tag: "Diddle daddles",
    badge: null,
    slug: "pokemon-firered",
  },
];

function AccentBar({ active }: { active: boolean }) {
  return (
    <div
      className="w-px h-6 shrink-0 transition-all duration-300"
      style={{
        background: active ? COLORS.accentBarActive : COLORS.accentBarInactive,
        opacity: active ? 1 : 0,
      }}
    />
  );
}

function CatImage({ className }: { className?: string }) {
  return (
    <img
      src="/images/cat.png"
      alt=""
      className={className}
      aria-hidden
      style={{ height: "1em", width: "auto", verticalAlign: "baseline" }}
    />
  );
}

/** Tag next to case title (desktop). For now: no animation, show full tag when visible. */
function TypedTag({ tag, visible }: { tag: string; visible: boolean }) {
  return (
    <span className="font-mono text-xs uppercase text-zinc-400 inline-block overflow-hidden whitespace-nowrap">
      {visible ? tag : ""}
    </span>
  );
}

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  return (
    <div
      className="min-h-screen pb-4 overflow-visible flex flex-col items-center"
      style={{ background: COLORS.background }}
    >
      <div
        className="container-main pt-4 overflow-visible flex flex-col"
        style={{ gap: CONTAINER_GAP_PX }}
      >
        {/* Measure: top gap — same on mobile and desktop */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Header: stacked on mobile, row on desktop */}
        <header className="relative overflow-visible w-full">
          <div className="absolute inset-0">
            <MeasureGuide label="HDR" className="h-full" />
          </div>
          <div className="header-inner flex flex-col items-start lg:flex-row lg:items-end lg:justify-between w-full">
            <div
              className="flex flex-col w-full lg:flex-1 lg:min-w-0"
              style={{ gap: 16 }}
            >
              <p
                className="font-medium text-body"
                style={{ color: COLORS.textMutedStrong }}
              >
                <LiveClock />
              </p>
              <h1
                className="font-display text-heading flex flex-col items-start gap-0"
                style={{ color: COLORS.text }}
              >
                <span className="inline-flex items-center gap-2">
                  Hiya, I&apos;m Cat
                  <CatImage className="hidden" />
                </span>
                <span>I design brand, web, and software</span>
              </h1>
            </div>

            <nav
              className="relative z-10 flex flex-col items-start lg:items-end shrink-0"
              style={{ gap: 16 }}
            >
              <Link
                href="/about"
                className="font-medium text-nav capitalize transition-colors hover:opacity-80"
                style={{ color: COLORS.nav }}
              >
                About
              </Link>
              <a
                href="https://curius.app/catherine-hoang"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-nav capitalize transition-colors hover:opacity-80"
                style={{ color: COLORS.nav }}
              >
                Curius
              </a>
              <a
                href="mailto:catherinehoang44@gmail.com"
                className="font-medium text-nav capitalize transition-colors hover:opacity-80"
                style={{ color: COLORS.nav }}
              >
                Email
              </a>
            </nav>
          </div>
        </header>

        {/* Measure: gap between header and work */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>

        {/* Desktop: stacked illustration + work list */}
        <section className="relative overflow-visible hidden lg:block">
          <div
            className="relative overflow-visible"
            style={{ height: CASE_MEDIA_DESKTOP_HEIGHT_PX }}
          >
            <MeasureGuide
              label="DIV"
              className="h-full"
              style={{ height: CASE_MEDIA_DESKTOP_HEIGHT_PX }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ paddingLeft: CONTENT_OFFSET_LEFT_PX + 100 }}
            >
              <div
                className="w-full aspect-[480/840] pointer-events-auto"
                style={{ maxWidth: CASE_MEDIA_MAX_WIDTH_PX }}
              >
                <IsometricStack
                  selectedIndex={selectedIndex}
                  className="w-full h-full"
                  onSelectIndex={(i) => {
                    const item = WORK_ITEMS[i];
                    if (item.slug) router.push(`/work/${item.slug}`);
                    else setSelectedIndex(i);
                  }}
                />
              </div>
            </div>
            <div className="relative z-10 h-full flex items-center">
              <div
                className="flex flex-col gap-4 w-full"
                style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
              >
                {WORK_ITEMS.map((item, i) => {
                  const isSelected = i === selectedIndex;
                  const href = item.slug ? `/work/${item.slug}` : undefined;
                  return (
                    <div
                      key={item.title}
                      className="flex flex-wrap items-center gap-x-4"
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        className="relative flex items-center gap-1.5 w-[320px] overflow-hidden transition-colors duration-300 cursor-pointer"
                        style={{ maxWidth: CASE_MEDIA_MAX_WIDTH_PX }}
                        onMouseEnter={() => setSelectedIndex(i)}
                        onClick={() =>
                          href ? router.push(href) : setSelectedIndex(i)
                        }
                        onFocus={() => setSelectedIndex(i)}
                      >
                        {/* Gradient background: fades in left to right */}
                        <div
                          className={`absolute inset-0 -z-10 case-title-bg ${isSelected ? "case-title-bg--visible" : ""}`}
                          style={{
                            background:
                              "linear-gradient(to right, rgba(23,133,248,0.1), rgba(23,133,248,0))",
                          }}
                          aria-hidden
                        />
                        <AccentBar active={isSelected} />
                        {href ? (
                          <Link
                            href={href}
                            className={`font-mono text-xs uppercase font-medium tracking-wide transition-colors duration-300 hover:opacity-80 ${
                              isSelected ? "text-zinc-600" : "text-zinc-400"
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.title}
                          </Link>
                        ) : (
                          <span
                            className={`font-mono text-xs uppercase font-medium tracking-wide transition-colors duration-300 ${
                              isSelected ? "text-zinc-600" : "text-zinc-400"
                            }`}
                          >
                            {item.title}
                          </span>
                        )}
                        {item.badge && (
                          <span className="font-mono text-[8px] uppercase font-medium text-blue-500">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.tag && (
                        <div
                          className="flex-1 min-w-0 flex justify-end"
                          style={{
                            opacity: isSelected ? 1 : 0,
                            transition: "opacity 0.35s ease-out",
                          }}
                        >
                          <TypedTag tag={item.tag} visible={isSelected} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile: vertical list — measure container + title, tag, illustration per case (01–06) */}
        <div className="flex flex-col lg:hidden" style={{ gap: 32 }}>
          {WORK_ITEMS.map((item, i) => {
            const href = item.slug ? `/work/${item.slug}` : undefined;
            const content = (
              <>
                <div className="flex flex-col" style={{ gap: 8 }}>
                  <h2 className="font-mono text-xs uppercase font-medium tracking-wide text-zinc-900">
                    {item.title}
                    {item.badge != null && (
                      <span className="font-mono text-[8px] uppercase font-medium text-blue-500 ml-1.5">
                        {item.badge}
                      </span>
                    )}
                  </h2>
                  {item.tag && (
                    <p className="font-mono text-xs uppercase text-zinc-400">
                      {item.tag}
                    </p>
                  )}
                </div>
                <div
                  className="w-full"
                  style={{
                    maxWidth: CASE_MEDIA_MAX_WIDTH_PX,
                    height: CASE_MEDIA_MOBILE_HEIGHT_PX,
                  }}
                >
                  <IsometricStack
                    selectedIndex={0}
                    singleCardIndex={i}
                    className="w-full h-full aspect-auto"
                  />
                </div>
              </>
            );
            return (
              <div
                key={item.title}
                className="relative w-full overflow-visible"
              >
                <MeasureGuide
                  label={String(i + 1).padStart(2, "0")}
                  className="h-full"
                />
                <article
                  className="flex flex-col w-full"
                  style={{
                    gap: CONTAINER_GAP_PX,
                    marginLeft: CONTENT_OFFSET_LEFT_PX,
                  }}
                >
                  {href ? (
                    <Link
                      href={href}
                      className="flex flex-col w-full hover:opacity-90 transition-opacity"
                      style={{ gap: CONTAINER_GAP_PX }}
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </article>
              </div>
            );
          })}
        </div>

        {/* Measure: gap at end of work container */}
        <div
          className="relative overflow-visible"
          style={{ height: SECTION_GAP_TOP_PX }}
        >
          <MeasureGuide label="GAP" className="h-full" />
        </div>
      </div>
    </div>
  );
}
