import type { GamesCaseMediaItem } from "../_components/games-case-media-types";
import { CASE_MEDIA_HALF_CONTAINER_MAX_WIDTH_PX } from "@/lib/design-tokens";

/** Pixeldoro case media — served from /work/pixeldoro. */
export const PIXELDORO_MEDIA_BASE = "/work/pixeldoro";

const HALF_CONTAINER = CASE_MEDIA_HALF_CONTAINER_MAX_WIDTH_PX;

/**
 * Media for the games Pixeldoro case (aligned with portfolio-2025 Pixeldoro sections).
 * Add PNG/WebP files to public/work/pixeldoro/ and swap entries from video to image as needed.
 */
export const PIXELDORO_MEDIA_ITEMS: GamesCaseMediaItem[] = [
  {
    kind: "video",
    src: `${PIXELDORO_MEDIA_BASE}/pixeldoro.webm`,
    caption: "Concept idea",
    tag: "Video",
    aspectRatio: "16/10",
    maxWidthPx: HALF_CONTAINER,
  },
  {
    kind: "video",
    src: `${PIXELDORO_MEDIA_BASE}/environment.mp4`,
    caption: "Environmental design",
    tag: "Video",
    aspectRatio: "1024/788",
    objectFit: "contain",
  },
  {
    kind: "image",
    src: `${PIXELDORO_MEDIA_BASE}/128x64-isometric-spritesheet.png`,
    caption: "128x64 Isometric SpriteSheet",
    tag: "Image",
    aspectRatio: "1024/822",
    objectFit: "contain",
    maxWidthPx: HALF_CONTAINER,
  },
  {
    kind: "image",
    src: `${PIXELDORO_MEDIA_BASE}/64x64-spritesheet.png`,
    caption: "64x64 SpriteSheet",
    tag: "Image",
    aspectRatio: "977/889",
    objectFit: "contain",
    maxWidthPx: HALF_CONTAINER,
  },
  {
    kind: "image",
    src: `${PIXELDORO_MEDIA_BASE}/tutorial-screen.png`,
    caption: "Tutorial screen",
    tag: "Image",
    aspectRatio: "844/390",
    objectFit: "contain",
  },
  {
    kind: "image",
    src: `${PIXELDORO_MEDIA_BASE}/pomodoro-timer.png`,
    caption: "Pomodoro timer",
    tag: "Image",
    aspectRatio: "844/390",
    objectFit: "contain",
  },
];
