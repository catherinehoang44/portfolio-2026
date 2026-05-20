import type { GamesCaseMediaItem } from "../_components/games-case-media-types";

const EXPERIMENTS_MEDIA_BASE = "/work/experiments";
const OTHERWORLD_MEDIA_BASE = "/work/otherworld";

/** Powerpoint Night — from work Experiments case (`toaster.webm`). */
export const POWERPOINT_NIGHT_MEDIA: GamesCaseMediaItem[] = [
  {
    kind: "video",
    src: `${EXPERIMENTS_MEDIA_BASE}/toaster.webm`,
    caption: "Powerpoint Night poster design",
    tag: "Video",
    aspectRatio: "16/10",
    objectFit: "contain",
  },
];

export const GAMEBOY_MIRROR_MEDIA: GamesCaseMediaItem[] = [
  {
    kind: "image",
    src: `${EXPERIMENTS_MEDIA_BASE}/gameboy-mirror.png`,
    caption: "Gameboy mirror",
    tag: "Image",
    aspectRatio: "768/1024",
    objectFit: "contain",
  },
];

export const STEAMPUNK_DOODLES_MEDIA: GamesCaseMediaItem[] = [
  {
    kind: "image",
    src: `${EXPERIMENTS_MEDIA_BASE}/steampunk-character-sketches.png`,
    caption: "Character sketches",
    tag: "Image",
    aspectRatio: "1024/576",
    objectFit: "contain",
  },
  {
    kind: "image",
    src: `${EXPERIMENTS_MEDIA_BASE}/steampunk-environment-sketches.png`,
    caption: "Environment sketches",
    tag: "Image",
    aspectRatio: "1024/576",
    objectFit: "contain",
  },
];

/** Marketing agency site — Otherworld case study media, one DIV per asset. */
export const MARKETING_AGENCY_MEDIA: GamesCaseMediaItem[] = [
  {
    kind: "video",
    src: `${OTHERWORLD_MEDIA_BASE}/otherworld-portal.mp4`,
    caption: "Scroll-driven zoom-in experience on page load",
    tag: "Video",
    aspectRatio: "1083/609",
    objectFit: "cover",
  },
  {
    kind: "video",
    src: `${OTHERWORLD_MEDIA_BASE}/otherworld-work.mp4`,
    caption: "Motion-based text reveals",
    tag: "Video",
    aspectRatio: "508/402",
    objectFit: "cover",
    objectPosition: "left center",
  },
  {
    kind: "video",
    src: `${OTHERWORLD_MEDIA_BASE}/otherworld-casenav.mp4`,
    caption: "Case navigation updates dynamically on scroll",
    tag: "Video",
    aspectRatio: "508/402",
    objectFit: "cover",
  },
  {
    kind: "video",
    src: `${OTHERWORLD_MEDIA_BASE}/otherworld-form.mp4`,
    caption: "Form with progressive glow",
    tag: "Video",
    aspectRatio: "1083/609",
    objectFit: "cover",
  },
  {
    kind: "video",
    src: `${OTHERWORLD_MEDIA_BASE}/otherworld-404.mp4`,
    caption: "Particles that respond to cursor movement",
    tag: "Video",
    aspectRatio: "1083/609",
    objectFit: "cover",
  },
];

/** Radial Bitmap Tool — from work Experiments case (`radial-bitmap.mp4`). */
export const RADIAL_BITMAP_MEDIA: GamesCaseMediaItem[] = [
  {
    kind: "video",
    src: `${EXPERIMENTS_MEDIA_BASE}/radial-bitmap.mp4`,
    caption: "Radial bitmap tool in action",
    tag: "Video",
    aspectRatio: "16/10",
    objectFit: "cover",
  },
];
