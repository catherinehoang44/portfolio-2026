/**
 * Collage tiles for /fanime2027. Images live in public/images/fanime2027/.
 * Tiles without `src` render as placeholders.
 *
 * size: "sm" 1×1 · "wide" 2×1 · "tall" 1×2 · "lg" 2×2 (grid cells)
 * position: CSS object-position for the cropped thumbnail (fullscreen always shows the whole image).
 * fit: "contain" letterboxes instead of cropping; pair with `background` matching the art's edge color.
 */
export type CollageTileSize = "sm" | "wide" | "tall" | "lg";

export type CollageTile = {
  src?: string;
  alt: string;
  size: CollageTileSize;
  position?: string;
  fit?: "cover" | "contain";
  background?: string;
  /** Overrides `size` only in the 3-column layout (used to keep the last row filled). */
  sizeAt3Cols?: CollageTileSize;
};

/** Two related 16:9 images kept adjacent: full-width row side by side, stacked on 2 columns. */
export type CollagePair = {
  label: string;
  pair: [CollageTile, CollageTile];
};

export type CollageItem = CollageTile | CollagePair;

const img = (name: string) => `/images/fanime2027/${name}.jpg`;

export const FANIME_COLLAGE_ITEMS: CollageItem[] = [
  { src: img("girl-in-woods"), alt: "Girl sitting with knees bent in a misty forest", size: "lg" },
  { src: img("noot-noot"), alt: "Pingu “noot noot” poster with stars and arched window", size: "tall" },
  { src: img("steampunk-girl-sketches"), alt: "Sketch sheet of a steampunk girl with an ornate staff and expressions", size: "wide" },
  { src: img("five-nine-playhaus-banner"), alt: "5–9 Playhaus event banner hosted by Diem, with a starry-eyed character", size: "wide", fit: "contain", background: "#cb513c" },
  {
    label: "Bookbinding workshop slides",
    pair: [
      { src: img("bookbinding-cover"), alt: "Bookbinding workshop title slide with a pixel-type notebook cover", size: "wide" },
      { src: img("bookbinding-agenda-spread"), alt: "Bookbinding workshop agenda slide styled as an open notebook spread", size: "wide" },
    ],
  },
  { src: img("redhead-green"), alt: "Red-haired girl with dripping dress on green", size: "sm", position: "center 30%" },
  { src: img("utopia-horns"), alt: "Horned girl in a yellow hoodie with a “Utopia” speech bubble", size: "sm", position: "center 45%" },
  { src: img("beach"), alt: "Painted beach with palm trees and waves", size: "tall" },
  { src: img("duck-chibi"), alt: "Chibi duck with glasses waving", size: "sm", position: "center 40%" },
  { src: img("veggie-band"), alt: "Vegetable characters playing in a band", size: "wide", position: "center 40%" },
  { src: img("fisheye-selfie"), alt: "Fisheye selfie of two friends", size: "lg" },
  { src: img("boba-girl"), alt: "Girl sipping a drink with headphones around her neck", size: "sm", position: "center 30%" },
  { src: img("lovelee-laundromat"), alt: "Lovelee Laundromat game screen with a boat laundromat", size: "tall" },
  { src: img("train-couple"), alt: "Couple standing close on a sunlit train", size: "sm", position: "center 45%" },
  { src: img("bat-cats"), alt: "Fluffy white bat-winged cat stickers", size: "lg" },
  { src: img("gamer-girl"), alt: "Lavender-haired girl with headphones and a controller", size: "sm", sizeAt3Cols: "tall" },
  { src: img("lantern-girl"), alt: "Small girl holding a glowing jar in the dark", size: "wide" },
  { src: img("zombie-girl"), alt: "Grayscale girl with a cracked face sticking out her tongue", size: "tall" },
  { src: img("kitchen-counter"), alt: "Girl leaning on a kitchen counter", size: "tall" },
  { src: img("beanie-boy"), alt: "Boy in a beanie looking at his phone on orange", size: "wide", position: "center 40%" },
  { src: img("lollipop-boy"), alt: "Blond boy with a lollipop", size: "sm", position: "center 45%" },
  { src: img("blue-portrait"), alt: "Painterly close-up portrait on blue", size: "wide" },
  { src: img("chibi-poses"), alt: "Chibi character pose sheet", size: "sm" },
  { src: img("pink-frame-girl"), alt: "Girl making finger goggles against a pink frame", size: "sm", position: "center 30%" },
  { src: img("game-night-poster"), alt: "Pixel-art game night poster with a fluffy cat holding a controller", size: "sm", position: "center 35%" },
];
