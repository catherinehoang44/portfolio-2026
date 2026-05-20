"use client";

import { MeasureGuide } from "@/app/components/MeasureGuide";
import { ScopeDetails } from "@/app/components/ScopeDetails";
import { CONTENT_OFFSET_LEFT_PX } from "@/lib/design-tokens";
import type { ComponentProps } from "react";

type GamesCaseScopeSectionProps = ComponentProps<typeof ScopeDetails>;

export function GamesCaseScopeSection(props: GamesCaseScopeSectionProps) {
  return (
    <section className="relative w-full overflow-visible">
      <div className="absolute inset-0">
        <MeasureGuide label="SCOPE" className="h-full" />
      </div>
      <div
        className="flex w-full flex-col py-6"
        style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}
      >
        <ScopeDetails {...props} />
      </div>
    </section>
  );
}
