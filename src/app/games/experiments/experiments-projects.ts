import type { GamesCaseProject } from "../_components/games-case-project-types";
import {
  GAMEBOY_MIRROR_MEDIA,
  MARKETING_AGENCY_MEDIA,
  POWERPOINT_NIGHT_MEDIA,
  RADIAL_BITMAP_MEDIA,
  STEAMPUNK_DOODLES_MEDIA,
} from "./experiments-media";

function experimentProject(
  scopeLabel: string,
  description: string,
  scopeItems: GamesCaseProject["scopeItems"],
  options?: {
    mediaItems?: GamesCaseProject["mediaItems"];
    fillContainerWidth?: boolean;
  },
): GamesCaseProject {
  return {
    scopeLabel,
    description,
    scopeItems,
    mediaItems: options?.mediaItems,
    fillContainerWidth: options?.fillContainerWidth,
  };
}

export const EXPERIMENTS_GAMES_PROJECTS: GamesCaseProject[] = [
  experimentProject(
    "Powerpoint Night Animated Poster",
    "Animated poster for a Powerpoint Night I hosted with a friend.",
    [
      { label: "Timeline", value: "2 days" },
      { label: "Team", value: "Solo" },
      { label: "Skills", value: "Motion Design (Rive)" },
    ],
    { mediaItems: POWERPOINT_NIGHT_MEDIA },
  ),
  experimentProject(
    "Gameboy Mirror",
    "A painted Gameboy mirror made with a partner.",
    [
      { label: "Timeline", value: "3 days" },
      { label: "Team", value: "Partner and I :)" },
      { label: "Skills", value: "Acrylic Painting" },
    ],
    { mediaItems: GAMEBOY_MIRROR_MEDIA },
  ),
  experimentProject(
    "Steampunk Doodles",
    "Sketches for fun.",
    [
      { label: "Timeline", value: "2.5 hours" },
      { label: "Team", value: "Solo" },
      { label: "Skills", value: "Sketching (Procreate, Photoshop)" },
    ],
    { mediaItems: STEAMPUNK_DOODLES_MEDIA, fillContainerWidth: true },
  ),
  experimentProject(
    "Marketing Agency Site",
    "A marketing agency site for Otherworld, transporting visitors into another world while keeping CTAs and case studies within reach.",
    [
      { label: "Timeline", value: "2 weeks" },
      { label: "Team", value: "Solo Freelancer" },
      {
        label: "Skills",
        value: "Web Design (Figma), Web Developer (Framer, Framer Motion)",
      },
    ],
    { mediaItems: MARKETING_AGENCY_MEDIA },
  ),
  experimentProject(
    "Radial Bitmap Tool",
    "A bitmap tool that draws and edits radial patterns.",
    [
      { label: "Timeline", value: "1 day" },
      { label: "Team", value: "Solo Personal Project" },
      { label: "Skills", value: "Vibe-Coding (Cursor)" },
    ],
    { mediaItems: RADIAL_BITMAP_MEDIA },
  ),
];
