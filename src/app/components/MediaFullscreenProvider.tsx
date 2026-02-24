"use client";

import React, { useEffect, useState } from "react";

type MediaType = "video" | "img" | "iframe";

type State = {
  isOpen: boolean;
  type: MediaType | null;
  src: string | null;
};

const defaultState: State = { isOpen: false, type: null, src: null };

export function MediaFullscreenProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(defaultState);

  useEffect(() => {
    if (!state.isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setState(defaultState);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [state.isOpen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (state.isOpen) {
        if (target.closest("[data-media-fullscreen-backdrop]")) setState(defaultState);
        return;
      }
      const container = target.closest(".case-media");
      if (!container) return;

      const video = container.querySelector("video");
      const iframe = container.querySelector("iframe");
      const imgs = container.querySelectorAll("img[src]");
      let img: HTMLImageElement | null = null;
      for (const el of imgs) {
        const s = el.getAttribute("src");
        if (s && !s.toLowerCase().endsWith(".svg")) {
          img = el as HTMLImageElement;
          break;
        }
      }

      const media = video || iframe || img;
      if (!media) return;

      const tagName = media.tagName.toLowerCase() as MediaType;
      const src = (media as HTMLVideoElement).src ?? (media as HTMLImageElement).getAttribute("src") ?? (media as HTMLIFrameElement).src;
      if (!src) return;

      e.preventDefault();
      e.stopPropagation();
      setState({ isOpen: true, type: tagName, src });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [state.isOpen]);

  return (
    <>
      {children}
      {state.isOpen && state.src && state.type && (
        <div
          data-media-fullscreen-backdrop
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 cursor-pointer"
          style={{ padding: 24 }}
          onClick={() => setState(defaultState)}
          role="button"
          tabIndex={0}
          aria-label="Close fullscreen (click anywhere)"
          onKeyDown={(e) => e.key === "Escape" && setState(defaultState)}
        >
          <div
            className="relative max-w-full max-h-full flex items-center justify-center overflow-hidden rounded-lg"
            style={{ boxShadow: "0 0 24px rgba(0,0,0,0.4)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {state.type === "video" && (
              <video
                src={state.src}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                controls
                autoPlay
                muted={false}
                loop
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            )}
            {state.type === "img" && (
              <img
                src={state.src}
                alt=""
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            )}
            {state.type === "iframe" && (
              <iframe
                src={state.src}
                title="Fullscreen media"
                className="w-[90vw] h-[90vh] max-w-full border-0 rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
