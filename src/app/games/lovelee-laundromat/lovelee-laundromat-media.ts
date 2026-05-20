import type { GamesCaseMediaItem } from "../_components/games-case-media-types";
import { CASE_MEDIA_HALF_CONTAINER_MAX_WIDTH_PX } from "@/lib/design-tokens";

export const LOVELEE_LAUDROMAT_MEDIA_BASE = "/work/lovelee-laundromat";

const HALF_CONTAINER = CASE_MEDIA_HALF_CONTAINER_MAX_WIDTH_PX;

export const LOVELEE_LAUDROMAT_MEDIA_ITEMS: GamesCaseMediaItem[] = [
  {
    kind: "image",
    src: `${LOVELEE_LAUDROMAT_MEDIA_BASE}/onboarding.png`,
    caption: "Onboarding screens",
    tag: "Image",
    aspectRatio: "1024/444",
    objectFit: "contain",
  },
  {
    kind: "image",
    src: `${LOVELEE_LAUDROMAT_MEDIA_BASE}/customize-character.png`,
    caption: "Work in progress: Character customization",
    tag: "Image",
    aspectRatio: "394/852",
    objectFit: "contain",
    maxWidthPx: HALF_CONTAINER,
  },
  {
    kind: "image",
    src: `${LOVELEE_LAUDROMAT_MEDIA_BASE}/home.png`,
    caption: "Work in progress: Home screen",
    tag: "Image",
    aspectRatio: "394/852",
    objectFit: "contain",
    maxWidthPx: HALF_CONTAINER,
  },
];
