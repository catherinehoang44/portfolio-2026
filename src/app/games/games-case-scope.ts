import type { ScopeItem } from "@/app/components/ScopeDetails";

export type GamesCaseScope = {
  /** Large heading in the scope block (project / case title). */
  scopeLabel: string;
  items: ScopeItem[];
};

export const GAMES_CASE_SCOPE = {
  pixeldoro: {
    scopeLabel: "Game Writing and Assets",
    items: [
      { label: "Timeline", value: "1 month" },
      { label: "Team", value: "Solo designer → 1 developer, 1 marketer" },
      {
        label: "Skills",
        value: "Pixel Art (Resprite), Story Writing",
      },
    ],
  },
  minecraftEducation: {
    scopeLabel: "Marketing Materials",
    items: [
      { label: "Timeline", value: "2 days" },
      { label: "Team", value: "Product Marketing Manager" },
      {
        label: "Skills",
        value: "Photoshop, Premiere Pro, Figma",
      },
    ],
  },
  pokemonFirered: {
    scopeLabel: "Remake",
    items: [
      { label: "Timeline", value: "2 weeks" },
      { label: "Team", value: "Sole designer and developer" },
      {
        label: "Skills",
        value: "Vibe-Coding (Cursor), Pixel Art (Resprite), Animation (Figma / Lottie)",
      },
    ],
  },
  loveleeLaundromat: {
    scopeLabel: "Mobile Game Design",
    items: [
      { label: "Timeline", value: "1 month" },
      { label: "Team", value: "Sole designer → 1 developer" },
      {
        label: "Skills",
        value: "Character and World Design (Figma, Procreate), Animation (Rive, Spine 2D)",
      },
    ],
  },
} as const satisfies Record<string, GamesCaseScope>;

/** Italic note under scope title (e.g. work-in-progress). */
export const GAMES_CASE_DESCRIPTION_PREFACES = {
  loveleeLaundromat:
    "Lovelee is a work in progress. This case study will be updated with additional imagery by early June.",
} as const satisfies Record<string, string>;

export const GAMES_CASE_DESCRIPTIONS = {
  pixeldoro:
    "Pixeldoro is a solarpunk Pomodoro RPG that turns focus sessions into a cozy, pixel-art adventure. The player plays as someone who has lost their memories and is venturing to different islands to discover why the world fragmented. Each pomodoro unlocks new memories, quests, collectables, and NPCs.\n\nI led game writing and visual assets with a developer and marketer to shape the world, story, and in-game rewards.",
  minecraftEducation:
    "Marketing assets for A Northwest Coast Experience world, in collaboration with kʷikʷəƛəm (Kwikwetlem First Nation) and School District 43 (Coquitlam) as part of their ongoing work to create more inclusive gaming ecosystems.",
  pokemonFirered:
    "As a personal project, I recreated key scenes from Pokémon FireRed to learn sprite management, battle UI, and animation timing. The playable demo walks through exploration, combat, and attack sequences built solo in two weeks.",
  loveleeLaundromat:
    "Lovelee Laundromat is a couples mobile game about running a laundromat on a boat together. Warm, character-driven, and built for two players. I designed the concept, character customization, environments, and animations.",
  adobe:
    "Web design for Adobe’s Learning Portal, the enterprise hub where learners discover courses, certifications, and training paths. This case study covers my contributions to layout, hierarchy, and learner-facing flows on a complex B2B product as a UX Manager (Design and Research).",
  experiments:
    "A collection of freelance work and side projects that explore my affinity for motion and sparkles.",
} as const satisfies Record<string, string>;
