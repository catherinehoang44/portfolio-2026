"use client";

import {
  COLORS,
  CONTAINER_GAP_PX,
  SCOPE_LABEL_WIDTH_PX,
  SCOPE_HEADING_FONT_SIZE_PX,
  SCOPE_VALUE_FONT_SIZE_PX,
} from "@/lib/design-tokens";

export type ScopeItem = { label: string; value: string };

export function ScopeDetails({
  detailsLabel = "Details",
  scopeLabel = "Scope",
  items,
  className = "",
}: {
  detailsLabel?: string;
  scopeLabel?: string;
  items: ScopeItem[];
  className?: string;
}) {
  return (
    <aside
      className={`flex flex-col shrink-0 text-left ${className}`}
      style={{ gap: CONTAINER_GAP_PX }}
    >
      <p
        className="font-medium text-body"
        style={{ color: COLORS.textMutedStrong }}
      >
        {detailsLabel}
      </p>
      <h2
        className="font-sans font-light"
        style={{ color: COLORS.text, fontSize: SCOPE_HEADING_FONT_SIZE_PX }}
      >
        {scopeLabel}
      </h2>
      <dl className="flex flex-col gap-2">
        {items.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-baseline"
            style={{ gap: 0 }}
          >
            <dt
              className="shrink-0 font-mono"
              style={{
                width: SCOPE_LABEL_WIDTH_PX,
                fontSize: 14,
                lineHeight: 1,
                color: COLORS.textMuted,
              }}
            >
              {label}
            </dt>
            <dd
              className="font-sans font-normal w-fit"
              style={{
                fontSize: SCOPE_VALUE_FONT_SIZE_PX,
                color: COLORS.textMutedStrong,
              }}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
