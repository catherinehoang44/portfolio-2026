import type { GamesCaseMediaItem } from "../_components/games-case-media-types";
import { CASE_MEDIA_HALF_CONTAINER_MAX_WIDTH_PX } from "@/lib/design-tokens";

export const POKEMON_FIRERED_MEDIA_BASE = "/work/experiments";

const POKEMON_DEMO_VIDEOS = [
  `${POKEMON_FIRERED_MEDIA_BASE}/pokemon-remake-1.mp4`,
  `${POKEMON_FIRERED_MEDIA_BASE}/pokemon-remake-2.mp4`,
  `${POKEMON_FIRERED_MEDIA_BASE}/pokemon-remake-3.mp4`,
  `${POKEMON_FIRERED_MEDIA_BASE}/pokemon-remake-4.mp4`,
] as const;

const POKEMON_DEMO_CAPTIONS = [
  "World exploration with AWSD movement",
  "Battle UI, interactions, and edge cases.",
  "Attack sequence and visual timings.",
  "End scene to restart demo.",
] as const;

/** Matches work Pokémon demo slots (428×310, object-contain). */
export const POKEMON_FIRERED_MEDIA_ITEMS: GamesCaseMediaItem[] =
  POKEMON_DEMO_VIDEOS.map((src, index) => ({
    kind: "video",
    src,
    caption: POKEMON_DEMO_CAPTIONS[index],
    tag: "Video",
    aspectRatio: "428/310",
    maxWidthPx: CASE_MEDIA_HALF_CONTAINER_MAX_WIDTH_PX,
  }));

export const POKEMON_FIRERED_GITHUB_URL =
  "https://github.com/catherinehoang44/pokemon-remake";
