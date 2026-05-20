type GamesCaseMediaBase = {
  caption?: string;
  tag?: "Image" | "Video" | "GIF";
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  /** `hug`: column width follows media (capped). `full`: full-width aspect box. Default: hug when objectFit is contain. */
  layout?: "full" | "hug";
  /** Optional cap (px) on media + caption stack width. */
  maxWidthPx?: number;
};

/** Media + caption share one width when content is narrower than the case column. */
export function gamesCaseMediaUsesHugLayout(media: GamesCaseMediaItem): boolean {
  if (media.layout === "full") return false;
  if (media.layout === "hug") return true;
  if (media.kind === "rive") return false;
  return (media.objectFit ?? "contain") === "contain";
}

export type GamesCaseMediaItem =
  | (GamesCaseMediaBase & { kind: "image"; src: string })
  | (GamesCaseMediaBase & { kind: "video"; src: string })
  | (GamesCaseMediaBase & { kind: "rive" });

export function gamesCaseMediaKey(media: GamesCaseMediaItem, index: number): string {
  if (media.kind === "rive") return `rive-${index}`;
  return `${media.src}-${index}`;
}
