"use client";

import { useId, useState } from "react";

import {
  COLORS,
  CONTAINER_GAP_PX,
  SCOPE_LABEL_WIDTH_PX,
  SCOPE_HEADING_FONT_SIZE_PX,
  SCOPE_VALUE_FONT_SIZE_PX,
} from "@/lib/design-tokens";

export type ScopeItem = {
  label: string;
  value: string;
  /** Underlined “and more” toggles this list (alphabetical in data). */
  moreItems?: string[];
};

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
  const [openMoreLabel, setOpenMoreLabel] = useState<string | null>(null);
  const listIdPrefix = useId();

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
        {items.map(({ label, value, moreItems }) => {
          const listId = `${listIdPrefix}-${label}`;
          const hasMore = Boolean(moreItems?.length);
          const expanded = openMoreLabel === label;

          return (
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
                className="font-sans font-normal min-w-0 flex-1 flex flex-col"
                style={{
                  fontSize: SCOPE_VALUE_FONT_SIZE_PX,
                  color: COLORS.textMutedStrong,
                }}
              >
                <span>
                  {value}
                  {hasMore ? (
                    <>
                      {" "}
                      <button
                        type="button"
                        className="underline decoration-from-font underline-offset-2 p-0 border-0 bg-transparent cursor-pointer font-sans font-normal text-left"
                        style={{
                          fontSize: SCOPE_VALUE_FONT_SIZE_PX,
                          color: COLORS.textMutedStrong,
                        }}
                        aria-expanded={expanded}
                        aria-controls={listId}
                        onClick={() =>
                          setOpenMoreLabel((current) =>
                            current === label ? null : label,
                          )
                        }
                      >
                        and more
                      </button>
                    </>
                  ) : null}
                </span>
                {hasMore && expanded ? (
                  <ul
                    id={listId}
                    className="mt-2 list-disc pl-5 flex flex-col gap-1"
                    style={{ color: COLORS.textMutedStrong }}
                  >
                    {moreItems!.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}
