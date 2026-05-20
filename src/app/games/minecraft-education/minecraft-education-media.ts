import type { GamesCaseMediaItem } from "../_components/games-case-media-types";
import { CASE_MEDIA_HALF_CONTAINER_MAX_WIDTH_PX } from "@/lib/design-tokens";

export const MINECRAFT_EDUCATION_MEDIA_BASE = "/work/minecraft-education";

export const MINECRAFT_EDUCATION_BLOG_URL =
  "https://education.minecraft.net/en-us/blog/pacific-nw-experience";

export const MINECRAFT_EDUCATION_MEDIA_ITEMS: GamesCaseMediaItem[] = [
  {
    kind: "image",
    src: `${MINECRAFT_EDUCATION_MEDIA_BASE}/trailer-end-slide.png`,
    caption: "Trailer end slide",
    tag: "Image",
    aspectRatio: "1024/576",
    objectFit: "contain",
  },
  {
    kind: "image",
    src: `${MINECRAFT_EDUCATION_MEDIA_BASE}/social-media-post.png`,
    caption: "Social media post",
    tag: "Image",
    aspectRatio: "1/1",
    objectFit: "contain",
    maxWidthPx: CASE_MEDIA_HALF_CONTAINER_MAX_WIDTH_PX,
  },
];
