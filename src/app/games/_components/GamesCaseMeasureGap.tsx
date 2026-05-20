import { MeasureGuide } from "@/app/components/MeasureGuide";
import { SECTION_GAP_TOP_PX } from "@/lib/design-tokens";

export function GamesCaseMeasureGap() {
  return (
    <div
      className="relative overflow-visible w-full"
      style={{ height: SECTION_GAP_TOP_PX }}
    >
      <MeasureGuide label="GAP" className="h-full" />
    </div>
  );
}
