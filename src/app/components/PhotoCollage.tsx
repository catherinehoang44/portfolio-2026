"use client";

import {
  CASE_MEDIA_BORDER_RADIUS_PX,
  CASE_MEDIA_PLACEHOLDER_FILL,
  COLORS,
} from "@/lib/design-tokens";
import type { CollageItem, CollageTile } from "../fanime2027/fanime-collage";

function TileContent({
  tile,
  index,
  eager,
}: {
  tile: CollageTile;
  index: number;
  eager: boolean;
}) {
  if (!tile.src) {
    return (
      <div
        role="img"
        aria-label={tile.alt}
        className="w-full h-full flex items-center justify-center font-mono text-xs uppercase"
        style={{ color: COLORS.textMuted }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    );
  }
  return (
    <button
      type="button"
      aria-label={`View fullscreen: ${tile.alt}`}
      className="block w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500"
    >
      <img
        src={tile.src}
        alt={tile.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`w-full h-full ${tile.fit === "contain" ? "object-contain" : "object-cover"}`}
        style={{ objectPosition: tile.position }}
      />
    </button>
  );
}

function tileFrameProps(tile: CollageTile) {
  return {
    style: {
      borderRadius: CASE_MEDIA_BORDER_RADIUS_PX,
      background: tile.background ?? CASE_MEDIA_PLACEHOLDER_FILL,
    },
  };
}

export function PhotoCollage({
  items,
  label,
}: {
  items: CollageItem[];
  label: string;
}) {
  return (
    <div className="photo-collage-wrap">
      <ul className="photo-collage" aria-label={label}>
        {items.map((item, i) => {
          const eager = i < 4;
          if ("pair" in item) {
            return (
              <li key={i} className="photo-collage__pair" aria-label={item.label}>
                {item.pair.map((tile, j) => (
                  <div
                    key={j}
                    className={`photo-collage__tile ${tile.src ? "case-media" : ""}`}
                    {...tileFrameProps(tile)}
                  >
                    <TileContent tile={tile} index={i} eager={eager} />
                  </div>
                ))}
              </li>
            );
          }
          const sizeClasses = [
            `photo-collage__tile--${item.size}`,
            item.sizeAt3Cols && `photo-collage__tile--3col-${item.sizeAt3Cols}`,
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <li
              key={i}
              className={`photo-collage__tile ${sizeClasses} ${item.src ? "case-media" : ""}`}
              {...tileFrameProps(item)}
            >
              <TileContent tile={item} index={i} eager={eager} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
