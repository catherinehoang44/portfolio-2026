import type { ScopeItem } from "@/app/components/ScopeDetails";
import type { GamesCaseMediaItem } from "./games-case-media-types";

export type GamesCaseProject = {
  /** Large heading in the scope block (project title). */
  scopeLabel: string;
  description: string;
  /** Shown under the project title, before `description`. */
  descriptionPreface?: string;
  descriptionPrefaceItalic?: boolean;
  descriptionItalic?: boolean;
  scopeItems: ScopeItem[];
  /** One measure DIV per item (after description). */
  mediaItems?: GamesCaseMediaItem[];
  /** When true, media spans full case content width. */
  fillContainerWidth?: boolean;
};

export const PLACEHOLDER_SCOPE_ITEMS: ScopeItem[] = [
  { label: "Timeline", value: "—" },
  { label: "Team", value: "—" },
  { label: "Skills", value: "—" },
];
